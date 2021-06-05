require('dotenv').config();
const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs').promises;

/*
This script loads the latest API spec from the GitHub API.
Due to the GitHub API's rate limit, we must use the user token.
Set it using an environment var or the `.env` file.
*/

const url =
  'https://api.github.com/repos/utrad-ical/circus/git/trees/master?recursive=1';

const token = process.env.CIRCUS_DOCS_GH_TOKEN;

const categoryName = path => path.match(/src\/api\/(.+)\/index/)[1];

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

  const routes = await Promise.all(
    yamlFiles.map(async yamlFile => {
      const blobRes = await axios.request({
        method: 'get',
        url: yamlFile.url,
        ...(token ? { auth: { username: 'anyone', password: token } } : {}),
      });
      const yamlData = Buffer.from(blobRes.data.content, 'base64');
      const data = yaml.load(yamlData);
      return {
        category: categoryName(yamlFile.path),
        name: data.name,
        description: data.description,
        routes: data.routes,
      };
    })
  );
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
