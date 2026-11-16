// deno-fmt-ignore-file
// biome-ignore-all format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse, SearchCodecsForPages } from 'waku/router';

// prettier-ignore
import type { getConfig as File_404_getConfig } from './pages/404';
// prettier-ignore
import type { getConfig as File_DocsPath_getConfig } from './pages/docs/[...path]';
// prettier-ignore
import type { getConfig as File_DocsIndex_getConfig } from './pages/docs/index';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_Layout_getConfig } from './pages/_layout';
// prettier-ignore
import type { getConfig as File_DocsLayout_getConfig } from './pages/docs/_layout';

// prettier-ignore
type Page =
| ({ path: '/404' } & GetConfigResponse<typeof File_404_getConfig>)
| ({ path: '/docs/[...path]' } & GetConfigResponse<typeof File_DocsPath_getConfig>)
| ({ path: '/docs' } & GetConfigResponse<typeof File_DocsIndex_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>);

// prettier-ignore
type Layout =
| ({ path: '/' } & Awaited<ReturnType<typeof File_Layout_getConfig>>)
| ({ path: '/docs' } & Awaited<ReturnType<typeof File_DocsLayout_getConfig>>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
    layouts: Layout;
  }
  interface SearchCodecsConfig extends SearchCodecsForPages<Page> {}
}
