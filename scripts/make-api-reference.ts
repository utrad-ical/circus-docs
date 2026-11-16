import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as yaml from 'js-yaml';

// Loads the route definitions of CIRCUS API from GitHub
// and writes the data for the API reference pages.
//
//   node scripts/make-api-reference.ts [--if-missing]

/**
 * The tag or branch of utrad-ical/circus to read.
 * Keep this in line with the version the docs describe.
 */
const ref = '1.15.0';

const treeUrl = `https://api.github.com/repos/utrad-ical/circus/git/trees/${ref}?recursive=1`;

const root = path.join(import.meta.dirname, '..');
const outFile = path.join(root, 'src/generated/api.json');
const examplesDir = path.join(root, 'docs/dev/api-examples');

try {
  process.loadEnvFile(path.join(root, '.env'));
} catch {
  // .env is optional
}

// This token is optional.
// Just be aware of GitHub's rate limits for unauthenticated requests.
const token = process.env.CIRCUS_DOCS_GH_TOKEN;

type Route = { verb?: string; path: string; [key: string]: unknown };

const fetchJson = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'circus-docs',
      ...(token
        ? {
            Authorization:
              'Basic ' + Buffer.from(`anyone:${token}`).toString('base64')
          }
        : {})
    }
  });
  if (!res.ok) throw new Error(`Request failed with ${res.status}: ${url}`);
  return await res.json();
};

const categoryName = (filePath: string) =>
  filePath.match(/src\/api\/(.+)\/index/)![1]!;

const readExample = async (category: string) => {
  try {
    return await fs.readFile(path.join(examplesDir, category + '.md'), 'utf8');
  } catch {
    return null;
  }
};

const load = async () => {
  const { tree } = (await fetchJson(treeUrl)) as {
    tree: { path: string; url: string }[];
  };
  const deny = ['debug', 'login-info', 'logout', 'plugin-displays'];
  const yamlFiles = tree
    .filter(t => /^packages\/circus-api\/src\/api\/.*\.yaml$/.test(t.path))
    .filter(t => !deny.includes(categoryName(t.path)));

  const categories = await Promise.all(
    yamlFiles.map(async yamlFile => {
      const blob = (await fetchJson(yamlFile.url)) as { content: string };
      const data = yaml.load(
        Buffer.from(blob.content, 'base64').toString('utf8')
      ) as { name: string; description?: string; routes: Route[] };
      const category = categoryName(yamlFile.path);
      const example = await readExample(category);
      return {
        category,
        name: data.name,
        description: data.description,
        routes: data.routes.map(route =>
          example?.includes(`verb="${route.verb}" path="${route.path}"`)
            ? { ...route, hasExample: true }
            : route
        )
      };
    })
  );
  const sortKey = (category: string) => category.replace('admin/', 'zzz/');
  return categories.sort((a, b) =>
    sortKey(a.category).localeCompare(sortKey(b.category))
  );
};

if (process.argv.includes('--if-missing')) {
  const exists = await fs.access(outFile).then(
    () => true,
    () => false
  );
  if (exists) process.exit(0);
}

const categories = await load();
await fs.mkdir(path.dirname(outFile), { recursive: true });
await fs.writeFile(outFile, JSON.stringify(categories), 'utf8');
console.log(
  `Wrote ${path.relative(root, outFile)} with ${categories.length} categories (${ref})`
);
