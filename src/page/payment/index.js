'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _mm = require('Util/mm.js');
var _payment = require('Service/payment-service.js');
var htmlTemplate = require('./index.string');

//页面逻辑
var page = {
    data : {
        orderNum : _mm.getURLParam('orderNumber')
    },
    init : function () {
        this.onload();
    },
    onload: function () {
    },
};

$(function () {
    page.init();
});