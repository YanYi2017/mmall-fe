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
    mode : 'development',
    entry : {
        'common'                : './src/page/common/index.js',
        'index'                 : './src/page/index/index.js',
        'list'                  : './src/page/list/index.js',
        'detail'                : './src/page/detail/index.js',
        'cart'                  : './src/page/cart/index.js',
        'order-confirm'         : './src/page/order-confirm/index.js',
        'order-list'            : './src/page/order-list/index.js',
        'order-detail'          : './src/page/order-detail/index.js',
        'payment'               : './src/page/payment/index.js',
        'user-login'            : './src/page/user-login/index.js',
        'user-register'         : './src/page/user-register/index.js',
        'user-password-reset'   : './src/page/user-password-reset/index.js',
        'user-center'           : './src/page/user-center/index.js',
        'user-center-update'    : './src/page/user-center-update/index.js',
        'user-password-update'  : './src/page/user-password-update/index.js',
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
        contentBase: './dist',
        proxy: {
            '**/*.do': {
                target: 'http://test.happymmall.com',
                changeOrigin: true
            }
        }
    },
    plugins: [
        //单独打包CSS文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        }),
        //自动创建HTML模板
        new HTMLWebpackPlugin(getHtmlConfig('index', '首页')),
        new HTMLWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HTMLWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        new HTMLWebpackPlugin(getHtmlConfig('cart', '购物车页')),
        new HTMLWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HTMLWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HTMLWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HTMLWebpackPlugin(getHtmlConfig('payment', '订单支付')),
        new HTMLWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HTMLWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HTMLWebpackPlugin(getHtmlConfig('user-password-reset', '用户密码找回')),
        new HTMLWebpackPlugin(getHtmlConfig('user-center', '用户个人中心')),
        new HTMLWebpackPlugin(getHtmlConfig('user-center-update', '修改用户个人信息')),
        new HTMLWebpackPlugin(getHtmlConfig('user-password-update', '修改密码')),
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
        path        : path.resolve(__dirname, 'dist'),
        publicPath  : '/'
    }
};