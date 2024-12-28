const baseConfig = require('../../eslint.config.base.cjs');

const tsParser = require('@typescript-eslint/parser');
const tseslint = require('typescript-eslint');

module.exports = [
  ...baseConfig,
  {
    ignores: ['**/*.cjs'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          './tsconfig.app.json',
          './tsconfig.spec.json',
          './tsconfig.storybook.json',
        ],
      },
    },
    rules: {
      //'@typescript-eslint/explicit-module-boundary-types': ['error'],
    },
  },
  ...tseslint.configs.recommendedTypeChecked,
];
