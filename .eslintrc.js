module.exports = {
  'root': true,
  'overrides': [
    {
      'env': {
        'node': true,
        'es2022': true,
      },
      'files': ['**/*.js', '**/*.jsx'],
      'parserOptions': {
        'ecmaVersion': 'latest',
      },
      'plugins': ['jest', 'prettier'],
      'extends': ['eslint:recommended', 'plugin:jest/recommended', 'plugin:jest/style', 'prettier'],
      'rules': {
        'prefer-const': 'error',
        'prettier/prettier': 'error',
      },
    },
    {
      'files': ['*.test.js', '*.test.jsx'],
      'rules': {
        'jest/expect-expect': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/no-done-callback': 'off',
        'jest/no-standalone-expect': 'off',
        'no-unused-vars': 'off',
      },
    },
    {
      'files': ['**/*.ts', '**/*.tsx'],
      'env': {
        'node': true,
        'es2022': true,
      },
      'extends': ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
      'parser': '@typescript-eslint/parser',
      'parserOptions': {
        'project': 'tsconfig.json',
        'sourceType': 'module',
      },
      'plugins': ['@typescript-eslint', 'prettier'],
      'rules': {
        // adminrest/v1.ts and schemaregistry/v1.ts come from the IBM OpenAPI SDK
        // generator, which emits namespaces, `any` params and empty interfaces
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'prettier/prettier': 'error',
      },
    },
  ],
};
