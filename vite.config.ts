import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@shared': '/src/shared',
      '@pages': '/src/pages',
      '@widgets': '/src/widgets',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@app/styles/forward.scss" as *;`,
      },
    },
  },
});
