const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LodashModulePlugin = require('lodash-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
    },
    devtool: '#source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                },
                manifest: {
                    name: 'manifest',
                    chunks: ['vendor']
                }
            }
        }
    },
    plugins: [
        new LodashModulePlugin(),
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: false
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                safe: true
            }            
        })
    ]
});