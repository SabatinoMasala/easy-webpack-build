const config = require('./config');
const path = require('path');
const fs = require('fs');

exports.assetsPath = function(_path) {
    return path.posix.join('dist', _path);
};

exports.removeHmrFile = function() {
    if (fs.existsSync(config.build.hmrFile)) {
        fs.unlinkSync(config.build.hmrFile);
    }
};

exports.createHmrFile = function() {
    fs.closeSync(fs.openSync(config.build.hmrFile, 'w'));
    fs.chmodSync(config.build.hmrFile, '777');
    console.log('Created hmr file');
};
