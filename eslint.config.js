import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylistic],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@stylistic/ts': stylisticTs,
            react,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["error", {
                "argsIgnorePattern": "^_",
                "caughtErrorsIgnorePattern": "^_",
            }],
            "@typescript-eslint/no-explicit-any": "off",
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-floating-promises": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/prefer-promise-reject-errors": "off",
        },
    },
)
