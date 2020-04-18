const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const utils = require('../src/utils');

const StyleLoader = require('./rules/StyleLoader');
const BabelLoader = require('./rules/BabelLoader');
const UrlLoader = require('./rules/UrlLoader');
const VueLoader = require('./rules/VueLoader');

const ProjectConfig = require('../src/config');

const alias = Object.assign({
    '@': utils.resolve('src/js'),
    '~': utils.resolve('src/js'),
    '@@': utils.resolve('src'),
    '~~': utils.resolve('src')
}, ProjectConfig.alias);

const config = {
    entry: ProjectConfig.entry,
    module: {
        rules: [],
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin(ProjectConfig.provides)
    ],
    resolve: {
        modules: ProjectConfig.resolve_modules,
        extensions: ['.js', '.vue', '.json'],
        alias
    },
    output: {
        filename: `${ProjectConfig.output}/js/[name].js`,
        path: '/',
        publicPath: `http://localhost:${ProjectConfig.devServer.port}/`,
    },
};

config.module.rules.push(StyleLoader());
config.module.rules.push(VueLoader());
config.module.rules.push(BabelLoader());
config.module.rules.push(UrlLoader(/\.(png|jpe?g|gif|svg)(\?.*)?$/, 'img/[name].[hash:7].[ext]'));
config.module.rules.push(UrlLoader(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, 'media/[name].[hash:7].[ext]'));
config.module.rules.push(UrlLoader(/\.(woff2?|eot|ttf|otf)(\?.*)?$/, 'fonts/[name].[hash:7].[ext]'));

if (!ProjectConfig.vue_only_runtime) {
    config.resolve.alias['vue$'] = 'vue/dist/vue';
}

module.exports = config;
