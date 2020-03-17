const config = require('./config');
const path = require('path');
const fs = require('fs');

exports.assetsPath = function(_path) {
    return path.posix.join('dist', _path);
};

exports.removeHmrFile = function() {
    if (fs.existsSync(config.hmrFile)) {
        fs.unlinkSync(config.hmrFile);
    }
};

exports.createHmrFile = function() {
    fs.closeSync(fs.openSync(config.hmrFile, 'w'));
    fs.chmodSync(config.hmrFile, '777');
    console.log('Created hmr file');
};

exports.resolve = function resolve(dir) {
    return path.join(process.cwd(), dir);
};
