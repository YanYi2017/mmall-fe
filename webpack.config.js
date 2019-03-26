const path                  = require('path');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');   //获取CSS单独打包插件
const HTMLWebpackPlugin     = require('html-webpack-plugin');       //获取自动创建HTML页面插件

//定义一个返回HTMLWebpackPlugin参数对象的方法
const getHtmlConfig = function (name, _title) {
    return {
        title       : _title,
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        inject      : true,
        hash        : true,
        chunks      : ['base', 'common', name]
    };
};

module.exports = {
    mode : 'production',
    entry : {
        'common'                : './src/page/common/index.js',
        'index'                 : './src/page/index/index.js',
        'user-login'            : './src/page/user-login/index.js',
        'user-password-reset'   : './src/page/user-password-reset/index.js',
        'user-register'         : './src/page/user-register/index.js',
        'result'                : './src/page/result/index.js'
    },
    optimization: {
        //分离共同模块
        splitChunks: {
            chunks  : 'all',
            name    : 'base'
        }
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        //单独打包CSS文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        }),
        //自动创建HTML模板
        new HTMLWebpackPlugin(getHtmlConfig('index', '首页')),
        new HTMLWebpackPlugin(getHtmlConfig('user-login', '登录页')),
        new HTMLWebpackPlugin(getHtmlConfig('user-password-reset', '密码找回页')),
        new HTMLWebpackPlugin(getHtmlConfig('user-register', '注册页')),
        new HTMLWebpackPlugin(getHtmlConfig('result', '结果提示页'))
    ],
    module: {
        rules: [
            //使用CSS-loader加载CSS文件，并使用MiniCssExtractPlugin插件打包到单独文件内
            {
                test: /\.css$/,
                use : [
                    {
                        loader  : MiniCssExtractPlugin.loader,
                        options : {
                            publicPath: '../'
                        }
                    },
                    'css-loader'
                ]
            },
            //使用file-loader加载图片和字体
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use : [
                    {
                        loader  : 'file-loader',
                        options : {
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            //使用html-loader加载.sting文件
            {
                test: /\.string$/,
                use : [
                    {
                        loader  : 'html-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            Node_modules    : path.resolve(__dirname, 'node_modules'),
            Image           : path.resolve(__dirname, 'src/image'),
            Page            : path.resolve(__dirname, 'src/page'),
            Service         : path.resolve(__dirname, 'src/service'),
            Util            : path.resolve(__dirname, 'src/util'),
            View            : path.resolve(__dirname, 'src/view')
        }
    },
    output: {
        filename    : 'js/[name].js',
        path        : path.resolve(__dirname, 'dist')
    }
};