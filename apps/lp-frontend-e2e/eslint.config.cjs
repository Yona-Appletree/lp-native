const playwright = require('eslint-plugin-playwright');
const baseConfig = require('../../eslint.config.base.cjs');

module.exports = [
  playwright.configs['flat/recommended'],

  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.js'],
    // Override or add rules here
    rules: {},
  },
];
