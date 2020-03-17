const path = require('path');

module.exports = {
    lint: true,
    vue_only_runtime: false,
    resolve_modules: [
        path.resolve(__dirname, 'src/js'),
        path.resolve(__dirname, 'src/static'),
        path.resolve(__dirname, 'src/styles'),
        'node_modules'
    ],
    provides: {
        '$': 'jquery',
        'window.jQuery': 'jquery',
        'Tether': 'tether',
        'window.Tether': 'tether'
    },
    entry: {
        bundle: './src/js/bundle.js',
        styles: './src/styles/styles.scss'
    },
    config: {
        sassLoader: {
            prependData: '@import "~global_variables.scss";'
        }
    }
}
