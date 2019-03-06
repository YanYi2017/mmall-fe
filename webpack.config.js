const path                  = require('path');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');   //获取CSS单独打包插件
const HTMLWebpackPlugin     = require('html-webpack-plugin');       //获取自动创建HTML页面插件

//定义一个返回HTMLWebpackPlugin参数对象的方法
const getHtmlConfig = function (name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['base', 'common', name]
    };
};

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
        //单独打包CSS文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        //自动创建HTML模板
        new HTMLWebpackPlugin(getHtmlConfig('index')),
        new HTMLWebpackPlugin(getHtmlConfig('login'))
    ],
    module: {
        rules: [
            //使用CSS-loader加载CSS文件，并使用MiniCssExtractPlugin插件打包到单独文件内
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
        //分离共同模块
        splitChunks: {
            chunks: 'all',
            name: 'base'
        }
    },
    mode : 'production'
};