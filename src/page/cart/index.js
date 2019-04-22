'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _cart = require('Service/cart-service.js'),
    _mm = require('Util/mm.js'),
    templateHTML = require('./index.string');

var page = {
    data : {
        cartInfo : ''
    },
    init : function () {
        this.onload();
        this.bindEvent();
    },
    bindEvent : function () {},
    onload : function () {
        var _this = this,
            $pageWrap = $('.page-wrap');
        //显示loading图标
        $pageWrap.html('<div class="loading"></div>');
        //获取购物车列表数据
        _cart.getCartList(function (res) {
            console.log(res);
            _this.renderCartList(res);
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tips">出问题了，刷新下试试吧。</p>');
        });
    },
    //渲染购物车数据
    renderCartList: function (data) {
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;
        var cartHTML = '';
        cartHTML = _mm.renderHTML(templateHTML, data);
        $('.page-wrap').html(cartHTML);
    },
    //处理请求得到的数据
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    }
};

$(function () {
    page.init();
});