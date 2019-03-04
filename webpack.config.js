const path = require('path');

let config = {
    entry : {
        'common': './src/page/common/index.js',
        'index' : './src/page/index/index.js',
        'login' : './src/page/login/index.js',
    },
    output: {
        filename : 'js/[name].js',
        path : path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common'
        }
    },
    mode : 'development'
};

module.exports = config;