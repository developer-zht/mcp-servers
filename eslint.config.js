// {
//   "root": true,
//   "parser": "@typescript-eslint/parser",
//   "parserOptions": {
//     "ecmaVersion": 2022,
//     "sourceType": "module",
//     "project": "./tsconfig.json"
//   },
//   "plugins": ["@typescript-eslint"],
//   "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
//   "rules": {
//     "@typescript-eslint/no-explicit-any": "warn",
//     "@typescript-eslint/no-unused-vars": [
//       "warn",
//       {
//         "argsIgnorePattern": "^_"
//       }
//     ]
//   },
//   "ignorePatterns": ["dist", "node_modules"]
// }

// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  // 1️⃣ 忽略目录（等价于 ignorePatterns）
  {
    ignores: ['dist', 'node_modules'],
  },

  // 2️⃣ JS 推荐规则（等价于 eslint:recommended）
  js.configs.recommended,

  // 3️⃣ TypeScript 配置
  ...tseslint.configs.recommended,

  // 4️⃣ 你自己的规则 & parserOptions
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: globals.node, // ← 关键!
      sourceType: 'commonjs',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: ['./packages/*/tsconfig.eslint.json'],
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];
