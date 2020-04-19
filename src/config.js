const projectRoot = process.cwd();
const yargs = require('yargs');

const argv = yargs
    .option('config', {
        alias: 'c',
        description: 'Config file',
        type: 'string',
    })
    .option('analyze', {
        alias: 'a',
        description: 'Analyze',
        type: 'boolean',
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
    output: 'dist',
    publicPath: '/',
    manifest: 'manifest.json',
    alias: {},
    hmrFile: `${projectRoot}/storage/w_hmr`,
    resolve_modules: [],
    vue_only_runtime: false,
    analyze: argv.analyze,
    config: {
        sassLoader: {}
    },
    devServer: {
        port: 8080
    },
    s3: {
        enabled: false,
        bucket: 'your-bucket',
        accessKeyId: 'access-key',
        secretAccessKey: 'secret-key',
        cdnBase: 'https://foo.bar',
        region: 'eu-central-1'
    }
};

module.exports = Object.assign({}, BaseConfig, UserConfig);
