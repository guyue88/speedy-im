module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'import',
    '@typescript-eslint',
  ],
  env: {
    es6: true,
    node: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.ts', '.js'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        ts: 'never',
      },
    ],
    'class-methods-use-this': 'off',
    'no-console': ['error', { allow: ['warn'] }],
    'max-len': ['error', { code: 150 }],
    'no-mixed-operators': 'off',
    camelcase: 'off',
    'consistent-return': 'off',
  },
};
