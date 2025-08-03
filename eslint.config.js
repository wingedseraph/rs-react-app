import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-compiler/react-compiler': 'error',
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 2,
      'no-warning-comments': [
        'warn',
        {
          terms: ['todo', 'fix'],
          location: 'start',
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
