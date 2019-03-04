const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry : {
        'common': './src/page/common/index.js',
        'index' : './src/page/index/index.js',
        'login' : './src/page/login/index.js',
    },
    output: {
        filename : 'js/[name].js',
        path : path.resolve(__dirname, 'dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common'
        }
    },
    mode : 'production'
};