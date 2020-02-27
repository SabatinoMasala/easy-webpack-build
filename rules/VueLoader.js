const vueLoaderConfig = {
    transformAssetUrls: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
};

module.exports = function() {
    return {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
    }
};
