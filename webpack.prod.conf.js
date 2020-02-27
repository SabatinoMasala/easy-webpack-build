const merge = require('webpack-merge');
const base = require('./webpack.base.conf');
const webpack = require('webpack');
const projectRoot = process.cwd();
const CopyWebpackPlugin = require('copy-webpack-plugin');
const simpleBuildConfig = require(`${projectRoot}/simple-build-conf.js`);
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const override = {
    mode: 'production',
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            // new OptimizeCSSAssetsPlugin({}),
            // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
            new UglifyJsPlugin({
                uglifyOptions: {
                    drop_console: true,
                    warnings: false
                },
                sourceMap: true,
                parallel: true
            })
        ]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new CopyWebpackPlugin([
            {
                from: `${projectRoot}/src/static`,
                to: 'dist',
                ignore: ['.*']
            }
        ]),
        new ManifestPlugin({
            fileName: 'manifest.json',
            map(item) {
                console.log('item');
                if (item.isInitial || item.name.indexOf('vendor.js') !== -1 || item.name.indexOf('vendor.css') !== -1) {
                    const regex = /\.([0-9a-z]+)(?:[\?#]|$)/i;
                    let ext = item.name.match(regex)[0].replace('.', '');
                    if (ext.indexOf('map') !== -1) {
                        ext = 'js';
                    }
                    item.name = `dist/${ext}/${item.name}`;
                }
                item.name = `/${item.name}`;
                return item;
            }
        }),
        new MiniCssExtractPlugin({
            filename: `dist/css/[name].[hash].css`,
            chunkFilename: `dist/css/[id].[hash].css`
        })
    ],
    output: {
        filename: `dist/[name].[hash].js`,
        chunkFilename: `dist/[id].[hash].js`,
        path: `${projectRoot}/public`,
        publicPath: '/',
    },
};

if (!simpleBuildConfig.vue_only_runtime) {
    override.resolve = {
        alias: {
            'vue$': 'vue/dist/vue.min'
        }
    }
}

module.exports = merge(base, override);
