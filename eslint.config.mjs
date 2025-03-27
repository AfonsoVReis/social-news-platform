import { dirname } from 'path';
import { fileURLToPath } from 'url';
import pluginImport from 'eslint-plugin-import';
import pluginSortKeysFix from 'eslint-plugin-sort-keys-fix';
import { FlatCompat } from '@eslint/eslintrc';
import pluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ),
  {
    plugins: {
      import: pluginImport,
      'sort-destructure-keys': pluginSortDestructureKeys,
      'sort-keys-fix': pluginSortKeysFix,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'func-style': ['error', 'expression'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'ignore',
        },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: '*', prev: ['function', 'if'] },
      ],
      'prefer-arrow-callback': 'error',
      'prettier/prettier': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-sort-props': ['error'],
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': ['error'],
      'sort-destructure-keys/sort-destructure-keys': [
        'error',
        { caseSensitive: false },
      ],
      'sort-destructure-keys/sort-destructure-keys': [
        'error',
        { caseSensitive: false },
      ],
      'sort-keys-fix/sort-keys-fix': 'error',
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
  },
];

export default eslintConfig;
