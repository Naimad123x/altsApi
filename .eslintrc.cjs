module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  "ignorePatterns": ["**/public/badges/**"],
  plugins: ['@typescript-eslint'],
  root: true,
  "rules": {
    "@typescript-eslint/array-type": "warn",
    "indent": ["error", 2],
    "@typescript-eslint/ban-ts-comment": 0,
    '@typescript-eslint/no-var-requires': 0,
  },
  env: {
    browser: false,
    node: true,
  },
};