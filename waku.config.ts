import { defineConfig } from 'waku/config';
import docsMdx from './src/mdx/vitePlugin.ts';

export default defineConfig({
  vite: {
    plugins: [docsMdx()]
  }
});
