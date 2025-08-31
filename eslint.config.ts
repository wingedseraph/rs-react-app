import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintConfigPrettier,

  {
    ignores: ["dist", "**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
  },

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-warning-comments": [
        "warn",
        { terms: ["todo", "fix", "refactor"], location: "start" },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
);
