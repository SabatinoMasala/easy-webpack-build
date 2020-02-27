const projectRoot = process.cwd();
const yargs = require('yargs');

const argv = yargs
    .option('config', {
        alias: 'c',
        description: 'Config file',
        type: 'string',
    })
    .argv;

let UserConfig = {};
try {
    UserConfig = require(`${projectRoot}/${argv.config || 'simple-build-conf.js'}`);
} catch(e) {
    console.log('No config file found');
}

const BaseConfig = {
    entry: [],
    alias: {},
    hmrFile: `${projectRoot}/storage/w_hmr`,
    resolve_modules: [],
    vue_only_runtime: false,
    config: {
        sassLoader: {}
    }
};

module.exports = Object.assign({}, BaseConfig, UserConfig);
