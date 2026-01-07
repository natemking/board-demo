const config = {
    printWidth: 100,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'avoid',
    singleAttributePerLine: true,
    endOfLine: 'lf',
    plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
    tailwindStylesheet: './src/app/globals.css',
    tailwindFunctions: ['clsx', 'cn'],
};

export default config;
