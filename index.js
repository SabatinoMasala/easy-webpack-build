const webpack = require('webpack');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const projectRoot = process.cwd();
const utils = require('./utils');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const simpleBuildConfig = require(`${projectRoot}/simple-build-conf.js`);

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

const config = {
    mode: 'development',
    entry: simpleBuildConfig.entry,
    module: {
        rules: [
        {
            test: /\.s?[ac]ss$/i,
            use: [
                'vue-style-loader',
            {
                loader: 'style-loader',
            },
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
        new VueLoaderPlugin()
    ],
    resolve: {
        modules: simpleBuildConfig.resolve_modules,
        extensions: ['.js', '.vue', '.json'],
        alias
    },
    output: {
        filename: '[name].js',
        path: '/',
        publicPath: 'http://localhost:8080/',
    },
};

const compiler = webpack(config);
const devServerOptions = {
    contentBase: './public',
    hot: true,
    stats: {
        colors: true,
    },
    public: 'http://localhost:8080/',
    publicPath: '/',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
}
const server = new WebpackDevServer(compiler, devServerOptions);
server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080');
});
