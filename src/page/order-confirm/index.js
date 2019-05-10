'use strict';

require('./index.css');
require('Page/common/header/index.js');
require('Page/common/nav/index.js');

var _order              = require('Service/order-service.js'),
    _address            = require('Service/address-service.js'),
    _mm                 = require('Util/mm.js'),
    _addressModal        = require('./address-modal.js'),
    addressTemplate     = require('./address-list.string'),
    productTemplate     = require('./product-list.string'),
    modalTemplate       = require('./address-modal.string');

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
    bindEvent : function () {
        var _this = this;
        //选择地址
        $(document).on('click', '.address-item', function () {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        //订单提交
        $(document).on('click', '.order-submit', function () {
            var shippingId = _this.data.selectedAddressId;

            //判断是否选中地址
            if (shippingId) {
                console.log(true);
                //提交订单
                _order.createOrder({
                    shippingId : shippingId
                }, function (res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                console.log(false);
                _mm.errorTips('请选择收货地址后再提交');
            }
        });
        //添加新的收件人地址
        $(document).on('click', '.address-new', function () {
            _addressModal.show({
                isUpdate    : false,
                onSuccess   : function () {
                    _this.loadAddressList();
                }
            });
        });
        //编辑收件人地址
        $(document).on('click', '.address-update', function (e) {
            //阻止事件传播，防止触发选中地址功能
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            
            _address.getAddress(shippingId, function (res) {
                _addressModal.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function () {
                        _this.loadAddressList();
                    }
                });
            }, function (errMsg) {
                _mm.errorTips(errMsg);
            });
        });
        //删除收件人地址
        $(document).on('click', '.address-delete', function (e) {
            //阻止事件传播，防止触发选中地址功能
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            
            if (window.confirm('确定要删除该地址？')) {
                _address.deleteAddress(shippingId, function (res) {
                    _this.loadAddressList();
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
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
            $('.product-con').html('<p class="err-tip">' + errMsg + '</p>');
        });
    }
};

$(function () {
    page.init();
});