const path = require('path');
const projectRoot = process.cwd();
const simpleBuildConfig = require(`${projectRoot}/simple-build-conf.js`);
const webpack = require('webpack');
const utils = require('./utils');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
    return path.join(projectRoot, dir);
}

const vueLoaderConfig = {};

const alias = Object.assign({
    '@': resolve('src/js'),
    '~': resolve('src/js'),
    '@@': resolve('src'),
    '~~': resolve('src')
}, simpleBuildConfig.alias);

const styleLoader = process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader;

const config = {
    entry: simpleBuildConfig.entry,
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    'vue-style-loader',
                    styleLoader,
                    'css-loader',
                    {
                        loader: 'sass-loader?sourceMap',
                        options: simpleBuildConfig.config.sassLoader
                    }
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin(simpleBuildConfig.provides)
    ],
    resolve: {
        modules: simpleBuildConfig.resolve_modules,
        extensions: ['.js', '.vue', '.json'],
        alias
    },
    output: {
        filename: 'dist/js/[name].js',
        path: '/',
        publicPath: 'http://localhost:8080/',
    },
};

if (!simpleBuildConfig.vue_only_runtime) {
    config.resolve.alias['vue$'] = 'vue/dist/vue';
}

module.exports = config;
