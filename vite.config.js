import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        pokedex: resolve(__dirname, 'pokedex.html'),
      },
    },
  },
});