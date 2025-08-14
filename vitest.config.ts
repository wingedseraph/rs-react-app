/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  test: {
    setupFiles: ['src/__tests__/setup.jsdom.ts'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text'],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
        'src/main.tsx',
      ],
    },
  },
});
