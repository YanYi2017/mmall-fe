'use strict';

var _mm = require('Util/mm.js');

var _product = {
    //获取产品列表
    getProductList : function (param, resolve, reject) {
        _mm.request({
            url : _mm.getServerURL('/product/list.do'),
            data : param,
            success : resolve,
            error : reject
        });
    }
};

module.exports = _product;