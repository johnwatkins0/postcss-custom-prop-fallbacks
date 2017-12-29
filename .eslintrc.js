module.exports = {
    parser: 'babel-eslint',
    env: { es6: true, 'jest/globals': true },
    extends: ['eslint:recommended', 'eslint-config-postcss'],
    plugins: ['jest'],
    rules: {
        'comma-dangle': 0,
    },
};
