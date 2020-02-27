const utils = require('../utils');

module.exports = function() {
    return {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src')]
    };
};
