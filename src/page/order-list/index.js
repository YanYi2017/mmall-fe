'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _mm = require('Util/mm.js');
var _order = require('Service/order-service.js');
var navSide = require('Page/common/nav-side/index.js');
var htmlTemplate = require('./index.string');
var Pagination = require('Util/pagination/index.js');

//页面逻辑
var page = {
    data : {
        listParam : {
            pageNum     : 1,
            pageSize    : 10
        }
    },
    init : function () {
        this.onload();
    },
    onload: function () {
        //初始化左侧导航栏
        navSide.init({
            name : 'order-list'
        });
        //加载订单列表
        this.loadOrderList();
    },
    //加载订单列表
    loadOrderList : function () {
        var _this           = this;
        var orderListHTML   = '';
        var $listCon        = $('.order-list-con');

        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(_this.data.listParam, function (res) {
            orderListHTML = _mm.renderHTML(htmlTemplate, res);
            $listCon.html(orderListHTML);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function (errMsg) {
            $listCon.html('<p class="err-tips">加载订单失败，请刷新后重试</p>');
        });
    },
    //加载分页信息
    loadPagination : function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};

$(function () {
    page.init();
});