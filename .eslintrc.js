module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "google"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        semi: ["error", "never"],
        "require-jsdoc": 0
    },
    "settings": {
        "react": {
            "version": "detect", // React version. "detect" automatically picks the version you have installed.
        }
    }
}