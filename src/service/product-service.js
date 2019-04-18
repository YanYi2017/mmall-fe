'use strict';

var _mm = require('Util/mm.js');

var _product = {
    //获取产品列表
    getProductList : function (param, resolve, reject) {
        _mm.request({
            url         : _mm.getServerURL('/product/list.do'),
            data        : param,
            success     : resolve,
            error       : reject
        });
    },
    //获取产品详细信息
    getProductDetail : function (productID, resolve, reject) {
        _mm.request({
            url         : _mm.getServerURL('/product/detail.do'),
            data        : {
                productId : productID
            },
            success     : resolve,
            error       : reject
        });
    }
};

module.exports = _product;