require('dotenv').config();
const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs').promises;
const path = require('path');

/*
This script loads the latest API spec from the GitHub API.
Due to the GitHub API's rate limit, we must use the user token.
Set it using an environment var or the `.env` file.
*/

const url =
  'https://api.github.com/repos/utrad-ical/circus/git/trees/master?recursive=1';

const token = process.env.CIRCUS_DOCS_GH_TOKEN;

const categoryName = path => path.match(/src\/api\/(.+)\/index/)[1];

const asyncMap = async (arr, fn) => await Promise.all(arr.map(fn));

const fileExists = async path => {
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    return false;
  }
};

const load = async () => {
  const res = await axios.request({
    method: 'get',
    url,
    auth: { username: 'anyone', password: token },
  });
  const tree = res.data.tree;
  const deny = ['debug', 'login-info', 'logout', 'plugin-displays'];
  const yamlFiles = tree
    .filter(t => /^packages\/circus-api\/src\/api\/.*\.yaml$/.test(t.path))
    .filter(t => !deny.includes(categoryName(t.path)));

  const augumentWithExamples = async (category, route) => {
    const exampleFile = path.join(
      __dirname,
      'docs/dev/api-examples',
      category + '.md'
    );
    const mdExists = await fileExists(exampleFile);
    if (!mdExists) return route;
    const mdContent = await fs.readFile(exampleFile, 'utf8');
    const routeExists = mdContent.includes(
      `verb="${route.verb}" path="${route.path}"`
    );
    return routeExists ? { ...route, hasExample: true } : route;
  };

  const routes = await asyncMap(yamlFiles, async yamlFile => {
    const blobRes = await axios.request({
      method: 'get',
      url: yamlFile.url,
      ...(token ? { auth: { username: 'anyone', password: token } } : {}),
    });
    const yamlData = Buffer.from(blobRes.data.content, 'base64');
    const data = yaml.load(yamlData);
    const category = categoryName(yamlFile.path);
    return {
      category,
      name: data.name,
      description: data.description,
      routes: await asyncMap(data.routes, r =>
        augumentWithExamples(category, r)
      ),
    };
  });
  routes.sort((a, b) => {
    const aa = a.category.replace('admin/', 'zzz/');
    const bb = b.category.replace('admin/', 'zzz/');
    return aa.localeCompare(bb);
  });
  return routes;
};

const main = async () => {
  if (!token) {
    console.log('Exiting because no token was detected.');
    return;
  }
  const routes = await load();
  await fs.writeFile(
    __dirname + '/static/api.json',
    JSON.stringify(routes),
    'utf8'
  );
  console.log(`Wrote api.json with ${routes.length} categories`);
};

main().catch(err => {
  console.error(err);
  process.exit(-1);
});
