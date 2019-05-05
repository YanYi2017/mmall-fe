'use strict';

require('./index.css');
require('Page/common/header/index.js');
require('Page/common/nav/index.js');

var _order              = require('Service/order-service.js'),
    _address            = require('Service/address-service.js'),
    _mm                 = require('Util/mm.js'),
    addressTemplate     = require('./address-list.string'),
    productTemplate     = require('./product-list.string');

var page = {
    data : {
        selectedAddressId : null
    },
    init : function () {
        this.onload();
        this.bindEvent();
    },
    onload : function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function () {},
    //加载地址清单
    loadAddressList : function () {
        _address.getAddressList(function (res) {
            var addressListHTML = _mm.renderHTML(addressTemplate, res);

            $('.address-con').html(addressListHTML);
        }, function (errMsg) {
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        });
    },
    //加载产品清单
    loadProductList : function () {
        _order.getProductList(function (res) {
            var productListHTML = _mm.renderHTML(productTemplate, res);

            $('.product-con').html(productListHTML);
        }, function (errMsg) {
            console.log(errMsg);
        });
    }
};

$(function () {
    page.init();
});