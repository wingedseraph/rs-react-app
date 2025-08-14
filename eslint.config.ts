import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', '.next/*'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      eslintPluginPrettier,
      perfectionist.configs['recommended-natural'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@next/next': nextPlugin,
      perfectionistPlugin: perfectionist,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    // @ts-expect-error nextJS issue with eslint@9
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...react.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactHooks.configs.recommended.rules,
      '@next/next/no-img-element': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      '@typescript-eslint/no-explicit-any': 2,
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-warning-comments': [
        'warn',
        {
          location: 'start',
          terms: ['todo', 'fix'],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
);
