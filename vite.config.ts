import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@wallet': path.resolve(__dirname, 'src/modules/wallet'),
      '@abis': path.resolve(__dirname, 'src/modules/abis'),
    },
  },
  plugins: [react({ plugins: [['@swc/plugin-emotion', {}]] }), eslint()],
});
