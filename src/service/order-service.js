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
    },
    //获取订单列表
    getOrderList : function (listParam, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/order/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    //获取订单详情
    getOrderDetail : function (orderNum, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/order/detail.do'),
            data    : {
                orderNo : orderNum
            },
            success : resolve,
            error   : reject
        });
    },
    //取消订单
    cancelOrder : function (orderNum, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/order/cancel.do'),
            data    : {
                orderNo : orderNum
            },
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _order;