'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _mm          = require('Util/mm.js');
var _payment     = require('Service/payment-service.js');
var htmlTemplate = require('./index.string');

//页面逻辑
var page = {
    data : {
        orderNumber : _mm.getURLParam('orderNumber')
    },
    init : function () {
        this.onload();
    },
    onload: function () {
        var _this = this;
        var $pageWrap = $('.page-wrap');
        var paymentHTML = '';
        
        _payment.getPaymentInfo(this.data.orderNumber, function (res) {
            //渲染页面
            paymentHTML = _mm.renderHTML(htmlTemplate, res);
            $pageWrap.html(paymentHTML);
            //监听订单状态
            _this.listenOrderStatus();
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tips">' + errMsg + '</p>');
        });
    },
    //监听订单状态
    listenOrderStatus : function () {
        var _this = this;
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
                if (res === true) {
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            });
        }, 5e3);
    }
};

$(function () {
    page.init();
});