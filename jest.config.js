const config = {
    verbose: true,
    setupFilesAfterEnv: ['./src/setupTests.js'],
    moduleNameMapper: {
        ".+\\.(css|style|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
    },
    testEnvironment: 'jest-environment-jsdom',
}

module.exports = config
