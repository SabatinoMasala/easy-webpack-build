const path = require('path');
const projectRoot = process.cwd();

let overrideConfig = {};
try {
    const SimpleBuildConf = require(`${projectRoot}/simple-build-conf.js`);
    if (SimpleBuildConf.config) {
        overrideConfig = Object.assign({}, overrideConfig, SimpleBuildConf.config);
    }
} catch (e) {
}

let config = {
    build: {
        manifest: 'manifest.json',
        env: require('./prod.env'),
        // assetsRoot: path.resolve(__dirname, '../../../public'),
        // hmrFile: path.resolve(__dirname, '../../../storage/w_hmr'),
        hmrFile: path.resolve(projectRoot, 'storage/w_hmr'),
        assetsRoot: path.resolve(projectRoot, 'public'),
        assetsSubDirectory: 'dist',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        assetsRoot: '/',
        port: process.env.PORT || 8080,
        autoOpenBrowser: false,
        assetsSubDirectory: 'dist',
        assetsPublicPath: '/',
        proxyTable: {
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
};

let mergedConfig = Object.assign({}, config, overrideConfig);

module.exports = mergedConfig;
