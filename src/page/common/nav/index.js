'use strict';

require('./index.css');
var _mm     = require('Util/mm.js');
var _user   = require('Service/user-service.js');
var _cart    = require('Service/cart-service.js');

var nav = {
    init: function () {
        this.bindEvent();
        this.loadCartCount();
        this.loadUserInfo();
        return this;
    },
    bindEvent: function () {
        //登陆点击事件
        $('.js-login').click(function () {
            _mm.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function () {
            window.location.href = './user-register.html';
        });
        //退出点击事件
        $('.js-logout').click(_user.logout(function (res) {
            window.location.reload();
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        }));
    },
    //加载用户信息
    loadUserInfo: function () {
        _user.checkLogin(function (res) {
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        }, function (errMsg) {
            //Do Nothing
        });
    },
    //加载购物车中商品数量
    loadCartCount: function () {
        _cart.getCartCount(function(res) {
            $('.nav .cart-count').text(res || 0);
        }, function (errMsg) {
            $('.nav .cart-count').text(0);
        });
    }
};

module.exports = nav.init();