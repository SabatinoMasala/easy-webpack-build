const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const currentEnv = process.env.NODE_ENV;

const devWebpack = require('./webpack.dev.conf.js');
const prdWebpack = require('./webpack.prod.conf.js');

const webpackConfig = currentEnv === 'production' ? prdWebpack : devWebpack;

const compiler = webpack(webpackConfig);
if (currentEnv === 'production') {
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
