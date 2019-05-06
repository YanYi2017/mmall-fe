'use strict';
var _mm = require('Util/mm.js');

var _order = {
    //获取商品清单
    getProductList : function (resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    //创建新订单
    createOrder : function (shippingId, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/order/create.do'),
            data    : shippingId,
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _order;