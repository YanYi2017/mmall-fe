'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _mm = require('Util/mm.js'),
    _product = require('Service/product-service.js'),
    templateHTML = require('./index.string');

var page = {
    init : function () {
        this.onload();
    },
    bindEvent : function () {},
    onload : function () {
        this.loadDetail();
    },
    //加载商品详细数据
    loadDetail : function () {
        var productID = _mm.getURLParam('productID'),
            detailHTML = '',
            $pageWrap = $('.page-wrap'),
            _this = this;
        //显示loading图标
        $pageWrap.html('<div class="loading"></div>');
        // 请求商品详细数据
        _product.getProductDetail(productID, function (res) {
            //修改数据类型
            _this.filter(res);
            //渲染页面
            detailHTML = _mm.renderHTML(templateHTML, res);
            $pageWrap.html(detailHTML);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
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

