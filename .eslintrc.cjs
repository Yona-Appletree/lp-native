const eslintPluginUnusedImports = require('eslint-plugin-unused-imports');

/* eslint-env node */
module.exports = [
  {
    plugins: [eslintPluginUnusedImports],
  },
];

// {
// extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint'],
//   root: true,
// };
