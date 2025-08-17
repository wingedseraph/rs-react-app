import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint, { configs } from 'typescript-eslint';

export default tseslint.config(
  configs.stylisticTypeChecked,
  configs.strictTypeChecked,
  {
    ignores: [
      'dist',
      '.next/*',
      '**/*.test.{ts,tsx}',
      '**/*.spec.{ts,tsx}',
      '.next/*',
    ],
  },

  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.recommendedTypeChecked,
      eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      '@stylistic': stylistic,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    // @ts-expect-error nextJS issue with eslint@9
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      '@next/next/no-img-element': 'error',
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },
        { blankLine: 'always', next: '*', prev: ['case', 'default'] },
        { blankLine: 'always', next: '*', prev: 'import' },
        { blankLine: 'any', next: 'import', prev: 'import' },
      ],

      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
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
