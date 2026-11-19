import reactHooks from 'eslint-plugin-react-hooks'

export default [
  { ignores: ['dist/**'] },
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { console: 'readonly', window: 'readonly', document: 'readonly', innerWidth: 'readonly', process: 'readonly', crypto: 'readonly', FormData: 'readonly' },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z]' }],
      ...reactHooks.configs.recommended.rules,
    },
  },
]
