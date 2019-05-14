'use strict';

var _mm = require('Util/mm.js');

var _payment = {
    //获取支付信息
    getPaymentInfo : function (orderNumber, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/order/pay.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    //获取支付信息
    getPaymentStatus : function (orderNumber, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/order/query_order_pay_status.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _payment;