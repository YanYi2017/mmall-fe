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
    }
};

module.exports = _cart;