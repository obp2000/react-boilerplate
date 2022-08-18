module.exports = {
    presets: ['@babel/env', '@babel/react'],
    plugins: [
        '@babel/transform-runtime',
        '@babel/transform-async-to-generator',
        '@babel/transform-arrow-functions',
        '@babel/proposal-object-rest-spread',
        '@babel/proposal-class-properties'
    ]
};
