const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const devWebpack = require('../webpack/webpack.dev.conf.js');
const prdWebpack = require('../webpack/webpack.prod.conf.js');
const fs = require('fs');
const utils = require('./utils');

module.exports = function(env) {
    const webpackConfig = env === 'production' ? prdWebpack : devWebpack;
    const compiler = webpack(webpackConfig);
    if (env === 'production') {
        utils.removeHmrFile();
        compiler.run((err, stats) => {

            if (err) {
                console.error(err.stack || err);
                if (err.details) {
                    console.error(err.details);
                }
                process.exit(1);
                return;
            }

            console.log(stats.toString({
                chunks: true,
                colors: true
            }));

            if (stats.hasErrors()) {
                console.log('Stats has errors, exiting');
                process.exit(1);
            }
        });
    } else {

        utils.createHmrFile();

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
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            },
        };
        const server = new WebpackDevServer(compiler, devServerOptions);
        server.listen(8080, '127.0.0.1', () => {
            console.log('Starting server on http://localhost:8080');
        });

    }

}
