const config = require('./config');
const path = require('path');

exports.assetsPath = function(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;
    const myPath = path.posix.join(assetsSubDirectory, _path);
    return myPath;
};
