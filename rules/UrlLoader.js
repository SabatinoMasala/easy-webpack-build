const utils = require('../utils');

module.exports = function(regex, name) {
    return {
        test: regex,
        loader: 'url-loader',
        options: {
            esModule: false,
            limit: 10000,
            name: utils.assetsPath(name)
        }
    }
};
