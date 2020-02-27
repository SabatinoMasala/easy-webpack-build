const merge = require('webpack-merge');
const base = require('./webpack.base.conf');

const override = {
    mode: 'development',
};

module.exports = merge(base, override);
