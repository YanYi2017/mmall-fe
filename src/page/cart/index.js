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
    bindEvent : function () {
        var _this = this;
        
        //选中或取消选中某商品
        $(document).on('click', '.cart-select', function () {
            var $this = $(this),
                productId = $this.parent().data('product-id');
            //选中某商品
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function (res) {
                    _this.renderCartList(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
            //取消选中某商品
            else {
                _cart.unselectProduct(productId, function (res) {
                    _this.renderCartList(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
                
            }
        });
        
        //全选或取消全选
        $(document).on('click', '.cart-select-all', function () {
            var $this = $(this);
            //全选
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                    _this.renderCartList(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
            //取消全选
            else {
                _cart.unselectAllProduct(function (res) {
                    _this.renderCartList(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
                
            }
        });
    },
    onload : function () {
        var _this = this,
        $pageWrap = $('.page-wrap');
        //显示loading图标
        $pageWrap.html('<div class="loading"></div>');
        //获取购物车列表数据
        _cart.getCartList(function (res) {
            _this.renderCartList(res);
        }, function (errMsg) {
            _this.showCartError();
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
    },
    //显示错误信息
    showCartError: function () {
        $('.page-wrap').html('<p class="err-tips">出问题了，刷新下试试吧。</p>');
    }
};

$(function () {
    page.init();
});