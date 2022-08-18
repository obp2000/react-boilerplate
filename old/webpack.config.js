const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

const entry = "./src/index.jsx"

const output = {
    path: path.resolve(__dirname, "dist"),
    filename: 'build/[name].js',
    // filename: '[name].bundle.js',
    // publicPath: path.resolve(__dirname, "public"),
    // chunkFilename: '[name].bundle.js',
    // filename: "index-bundle.js"
}

const devServer = {
    // static: path.resolve(__dirname, 'dist'),
    // static: {
    //   directory: path.join(__dirname, 'public'),
    // },
    port: 8080,
    hot: true,
    historyApiFallback: true,
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
        {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
        },
        // Compiles Sass to CSS
        "sass-loader",
    ],
}

const woff_rules = {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
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
    extensions: ['.js', '.jsx', '.scss'],
    // alias: {
    //     'react-dom': '@hot-loader/react-dom',
    //     'react-dom/client': '@hot-loader/react-dom/client'
    // }
}

const optimization = {
    splitChunks: {
        cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
        }
    }
}

const html_settings = {
    // filename: 'index.html',
    // template: path.resolve( __dirname, 'src/index.html'),
    inject: true,
    meta: {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1.0",
        'X-UA-Compatible': {
            'http-equiv': 'X-UA-Compatible',
            content: 'ie=edge'
        },
        'theme-color': "#000000",
        description: 'Best&C react frontend'
    },
    title: "Best&C",
    // favicon: path.resolve( __dirname, 'src/assets/favicon.ico'),
    // manifest: path.resolve( __dirname, 'src/assets/manifest.json'),
}

const copy_patterns = [
    {
        from: path.resolve( __dirname, 'src/assets/favicon.ico' ),
        to: path.resolve( __dirname, 'dist/assets/favicon.ico' )
    }
]


const devtool = "source-map"

module.exports = {
    entry,
    output,
    devServer,
    module: {
        rules: [
            js_rules,
            css_rules,
            sass_rules,
            woff_rules,
            font_rules,
            image_rules
        ]
    },
    resolve,
    optimization,
    plugins: [  new HtmlWebpackPlugin(html_settings),
                new CopyWebpackPlugin({patterns: copy_patterns})
              ],
    devtool,
}
