module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'stylelint.config.cjs', 'coverage'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'simple-import-sort'],
    rules: {
        "simple-import-sort/imports": [
            "error",
            {
                "groups": [
                    ["^react", "^@?\\w"],
                    ["^(@|components)(/.*|$)"],
                    ["^\\u0000"],
                    ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                    ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                    ["^.+\\.?(css)$"]
                ]
            }
        ]
    },
};
