module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'no-only-tests'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': ['off'],
    'no-console': ['error'],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        semi: true,
        printWidth: 100,
        arrowParens: 'avoid',
        tabWidth: 2,
      },
    ],
    'no-only-tests/no-only-tests': 'error',
  },
};
