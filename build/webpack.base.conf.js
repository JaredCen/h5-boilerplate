const utils = require('./utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {},
    output: {
        path: utils.resolve('dist'),
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {}
    },
    module: {
        rules: [{
            test: /\.js/,
            include: [utils.resolve('src')],
            use: [{
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }, {
                loader: 'babel-loader',
            }]
        }, {
            test: /\.(css|less)/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?sourceMap', 'less-loader?sourceMap', 'postcss-loader?sourceMap']
            }),
            include: [utils.resolve('src')],
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('media/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    }
}