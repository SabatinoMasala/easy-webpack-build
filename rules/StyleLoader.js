const ProjectConfig = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// In production we'll extract CSS to files, in development we just use style-loader for convenience
const styleLoader = process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader;

module.exports = function() {
    return {
        test: /\.s?[ac]ss$/i,
        use: [
            styleLoader,
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                loader: 'sass-loader?sourceMap',
                options: ProjectConfig.config.sassLoader
            }
        ],
    }
};
