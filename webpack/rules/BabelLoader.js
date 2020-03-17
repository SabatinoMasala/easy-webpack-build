const utils = require('../../src/utils');

module.exports = function() {
    return {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src')]
    };
};
