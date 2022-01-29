const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const entry = "./src/index.jsx"

const output = {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js"
}

const js_rules = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: ["babel-loader"]
}

const css_rules = {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
}

const sass_rules = {
    test: /\.s[ac]ss$/i,
    use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader",
        // Compiles Sass to CSS
        "sass-loader",
    ],
}

const woff_rules = {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    // loader: "url-loader?limit=10000&mimetype=application/font-woff"
    // use: [{
    //     loader: "url-loader",
    //     options: {
    //         limit: 10000,
    //         mimetype: "application/font-woff"
    //     }
    // }],
    type: "asset/inline",
}

const font_rules = {
    test: /\.(eot|ttf|otf)$/i,
    type: 'asset/resource'
}

const image_rules = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource'
}

const resolve = {
    extensions: ['.js', '.jsx'],
    alias: {
        'react-dom': '@hot-loader/react-dom'
    }
}

// const externals = {
//     'config': JSON.stringify({
//         BACKEND: "http://127.0.0.1:3000"
//     })
// }

const html_settings = {
    // template: "./src/index.html",
    inject: true,
    templateContent: `
                <head>
                  <title>Best&C react frontend</title>
                </head>
                <body>
                  <div id="root"></div>
                </body>
            `,
    meta: {
        viewport: "width=device-width, initial-scale=1.0",
        charset: "UTF-8",
        'X-UA-Compatible': {
            'http-equiv': 'X-UA-Compatible',
            'content': 'ie=edge'
        }
    },
    favicon: "./src/favicon.ico",
    title: "Best&C react frontend",
}

const devtool = "source-map"

module.exports = {
    entry,
    output,
    module: {
        rules: [js_rules, css_rules, sass_rules, woff_rules,
            font_rules, image_rules
        ]
    },
    resolve,
    // externals,
    plugins: [new HtmlWebpackPlugin(html_settings)],
    devtool
}