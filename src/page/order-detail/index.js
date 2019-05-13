'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _mm = require('Util/mm.js');
var navSide = require('Page/common/nav-side/index.js');

var page = {
    data : {
        orderNum : _mm.getURLParam('orderNumber')
    },
    init : function () {
        this.onload();
        this.bindEvent();
    },
    onload : function () {
        //初始化左侧菜单
        navSide.init({
            name : 'order-list'
        });
        //加载订单详情
        this.loadOrderDetail();
    },
    bindEvent : function () {

    },
    //加载订单详情
    loadOrderDetail : function () {

    }
};

$(function () {
    page.init();
});