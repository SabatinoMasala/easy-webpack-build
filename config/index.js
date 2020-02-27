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
        hmrFile: path.resolve(projectRoot, 'storage/w_hmr'),
        productionSourceMap: true
    },
    dev: {
        port: process.env.PORT || 8080,
        autoOpenBrowser: false
    }
};

let mergedConfig = Object.assign({}, config, overrideConfig);

module.exports = mergedConfig;
