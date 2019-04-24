'use strict';

var _mm = require('Util/mm.js');

var _cart = {
    //获取购物车中商品数量
    getCartCount: function (resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    //向购物车中添加商品
    addToCart: function (info, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/cart/add.do'),
            data    : info,
            success : resolve,
            error   : reject
        });
    },
    //获取购物车列表数据
    getCartList: function (resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    //购物车中选中某个商品
    selectProduct: function (productId, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/cart/select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    //购物车中取消选中某个商品
    unselectProduct: function (productId, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/cart/un_select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    //全选
    selectAllProduct: function (resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    //取消全选
    unselectAllProduct: function (resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _cart;