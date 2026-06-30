import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/wedding-family/',
  plugins: [react()],
  publicDir: 'img',
});
