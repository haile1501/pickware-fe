import path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
      {
        find: /^magic-story-book$/,
        replacement: path.join(process.cwd(), 'node_modules/magic-story-book/src/stories'),
      },
    ],
  },
  server: {
    port: 9000,
  },
  preview: {
    port: 9000,
  },
});
