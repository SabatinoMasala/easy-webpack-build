const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const currentEnv = process.env.NODE_ENV;
const devWebpack = require('./webpack.dev.conf.js');
const prdWebpack = require('./webpack.prod.conf.js');
const config = require('./config');
const webpackConfig = currentEnv === 'production' ? prdWebpack : devWebpack;
const fs = require('fs');
const utils = require('./utils');

const compiler = webpack(webpackConfig);
if (currentEnv === 'production') {
    utils.removeHmrFile();
    compiler.run((err, stats) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(stats.toString({
            chunks: true,
            colors: true
        }));
    });
} else {
    fs.closeSync(fs.openSync(config.build.hmrFile, 'w'));
    fs.chmodSync(config.build.hmrFile, '777');
    console.log('Created hmr file');
    const devServerOptions = {
        contentBase: './public',
        hot: true,
        disableHostCheck: true,
        stats: {
            colors: true,
        },
        public: 'http://localhost:8080',
        publicPath: 'http://localhost:8080/',
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

}
