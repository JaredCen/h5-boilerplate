const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const utils = require('./utils');


module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        filename: '[name].js',
        chunkFilename: utils.assetsPath('js/[name].chunk.js')
    },
    devServer: {
        host: '0.0.0.0',
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ]
});