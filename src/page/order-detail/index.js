'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _mm = require('Util/mm.js');
var _order = require('Service/order-service.js');
var navSide = require('Page/common/nav-side/index.js');
var htmlTemplate = require('./index.string');

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
        var _this = this;
        //取消订单
        $(document).on('click', '.order-cancel', function () {
            if (window.confirm('确定要取消该订单？')) {
                _order.cancelOrder(_this.data.orderNum, function (res) {
                    _mm.successTips('成功取消该订单');
                    _this.loadOrderDetail();
                }, function (errMsg) {
                    _mm.errMsg(errMsg);
                });
            }
        });
    },
    //加载订单详情
    loadOrderDetail : function () {
        var _this = this;
        var $content = $('.content');
        var orderDetailHTML = '';

        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNum, function (res) {
            //处理数据，添加needPay和isCancelable属性
            _this.filterData(res);
            orderDetailHTML = _mm.renderHTML(htmlTemplate, res);
            $content.html(orderDetailHTML);
        }, function (errMsg) {
            $content.html('<div class="err-tips">' + errMsg +'</div>');
        });
    },
    //处理数据
    filterData : function (data) {
        data.needPay        = data.status === 10;
        data.isCancelable   = data.status === 10;
    }
};

$(function () {
    page.init();
});