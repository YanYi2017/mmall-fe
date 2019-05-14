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
        var $pageWrap = $('.page-wrap');
        var paymentHTML = '';
        
        _payment.getPaymentInfo(this.data.orderNumber, function (res) {
            paymentHTML = _mm.renderHTML(htmlTemplate, res);
            $pageWrap.html(paymentHTML);
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tips">' + errMsg + '</p>');
        });
    }
};

$(function () {
    page.init();
});