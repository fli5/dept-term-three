import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  // JavaScript + TypeScript Files
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: { js },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    extends: ['js/recommended'],
  },

  // TypeScript Files
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@typescript-eslint': tsPlugin },
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 2020, sourceType: 'module', ecmaFeatures: { jsx: true } },
    },
    rules: tsPlugin.configs.recommended.rules,
  },

  // React Files
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { react: reactPlugin },
    rules: reactPlugin.configs.recommended.rules,
    settings: { react: { version: 'detect' } },
  },

  //Jest Files
  {
    files: ['**/*.test.{ts,tsx,js,jsx}'],
    languageOptions: { globals: { ...globals.jest } },
    rules: {},
  },
]);
