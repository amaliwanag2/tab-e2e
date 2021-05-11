module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    // Set Jest rules only for test files.
    // https://stackoverflow.com/a/49211283
    {
      files: ['**/*.test.js', '**/__mocks__/**/*.js'],
      extends: ['plugin:jest/recommended'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      rules: {
        'global-require': 0,
        'jest/valid-title': 'warn',
        'jest/no-export': 0,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    es6: true,
  },
  settings: {
    // Handle linting for absolute imports.
    'import/resolver': {
      alias: [['src', './src']],
    },
    // https://github.com/yannickcr/eslint-plugin-react/issues/1955#issuecomment-619475509
    react: {
      version: 'latest',
    },
  },
}
