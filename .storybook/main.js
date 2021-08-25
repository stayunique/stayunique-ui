module.exports = {
    stories: ["../src/**/*.stories.tsx"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    typescript: {
        check: true,
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: prop => (prop.parent ? /@material-ui/.test(prop.parent.fileName) || !/node_modules/.test(prop.parent.fileName) || /react-select/.test(prop.parent.fileName) : true),
            compilerOptions: {
                allowSyntheticDefaultImports: false
            }
        }
    }
};
