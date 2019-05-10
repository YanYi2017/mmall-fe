'use strict';

var _mm = require('Util/mm.js');

var _address = {
    //获取地址列表
    getAddressList : function (resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/shipping/list.do'),
            data    : {
                pageSize : 50
            },
            success : resolve,
            error   : reject
        });
    },
    //添加新地址
    addAddress : function (receiverInfo, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/shipping/add.do'),
            data    : receiverInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取收件人地址信息
    getAddress : function (shippingId, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/shipping/select.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    //更新收件人地址信息
    updateAddress : function (receiverInfo, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/shipping/update.do'),
            data    : receiverInfo,
            success : resolve,
            error   : reject
        });
    },
    //删除收件人地址
    deleteAddress : function (shippingId, resolve, reject) {
        _mm.request({
            url     : _mm.getServerURL('/shipping/del.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },

};

module.exports = _address;