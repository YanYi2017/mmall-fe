'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _mm = require('Util/mm.js'),
    _product = require('Service/product-service.js'),
    templateHTML = require('./index.string');

var page = {
    data : {
        productID : _mm.getURLParam('productID') || ''
    },
    init : function () {
        this.onload();
    },
    bindEvent : function () {},
    onload : function () {
        //若productID不存在，则回到主页
        if (!this.data.productID) {
            _mm.goHome();
        }
        this.loadDetail();
    },
    //加载商品详细数据
    loadDetail : function () {
        var detailHTML = '',
            $pageWrap = $('.page-wrap'),
            _this = this;
        //显示loading图标
        $pageWrap.html('<div class="loading"></div>');
        // 请求商品详细数据
        _product.getProductDetail(_this.data.productID, function (res) {
            //修改数据类型
            _this.filter(res);
            //渲染页面
            detailHTML = _mm.renderHTML(templateHTML, res);
            $pageWrap.html(detailHTML);
        }, function (errMsg) {
            $pageWrap.html('<div class="err-tips">' + errMsg + '</div>');
        });
    },
    //数据处理
    filter : function (res) {
        res.subImages = res.subImages.split(',');
    }
};

$(function () {
    page.init();
});

