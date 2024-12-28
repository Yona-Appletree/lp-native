const nxPlugin = require('@nx/eslint-plugin');
const eslintPluginUnusedImports = require('eslint-plugin-unused-imports');
const tseslint = require('typescript-eslint');
const tsParser = require('@typescript-eslint/parser');

/* eslint-env node */
module.exports = [
  { plugins: { '@nx': nxPlugin } },

  // ---------------------------------------------------------------------------
  // @nx/enforce-module-boundaries
  //
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // unused-imports
  //
  {
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // typescript
  //
  {
    ignores: ['**/*.cjs'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.spec.json'],
      },
    },
    rules: {
      //'@typescript-eslint/explicit-module-boundary-types': ['error'],
    },
  },
  ...tseslint.configs.recommendedTypeChecked,
];
