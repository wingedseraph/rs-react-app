import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true,
    host: '127.0.0.1',
  },
  plugins: [react(), tailwindcss()],
  define: {
    'process.env': {},
  },
});
