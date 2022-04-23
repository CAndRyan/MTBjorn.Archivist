const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonDevConfig = require('./webpack.config.dev');

module.exports = merge(commonDevConfig, {
    entry: './ui/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        library: 'archivistUi',
        libraryTarget: 'umd',
        globalObject: 'this',
        publicPath: ''
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Archivist | development',
            template: 'ui/index.html'
        })
    ]
});
