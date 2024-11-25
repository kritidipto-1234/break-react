import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-extra-semi': 'off',
      'react-hooks/exhaustive-deps': 'error', // Change this to 'error'
      'no-unused-vars': 'off',
      'prefer-const': 'off',
      // 'no-console': ['warn'],
    },
  },
  {
    ignores: [
      // 'src/useHookContext.tsx',
      'declaration.d.ts',
      // Add any files or directories you want to ignore
    ],
  },
];