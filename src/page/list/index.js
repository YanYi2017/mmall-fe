'use strict';

require('./index.css');
require('Page/common/header/index.js');
require('Page/common/nav/index.js');

var _product = require('Service/product-service.js');
var _mm = require('Util/mm.js');
var listHTMLTemplate = require('./index.string');

//页面逻辑
var page = {
    data : {
        listParam : {
            categoryId  : _mm.getURLParam('categoryId') || '',
            keyword     : _mm.getURLParam('keyword')    || '',
            pageNum     : _mm.getURLParam('pageNum')    || 1,
            pageSize    : _mm.getURLParam('pageSize')   || 10,
            orderBy     : _mm.getURLParam('orderBy')    || 'default'
        }
    },
    init : function () {
        this.onLoad();
    },
    onLoad : function () {
        this.loadList();
    },
    //加载list数据
    loadList : function () {
        var listHTML = '';
        _product.getProductList(this.data.listParam, function (res) {
            console.log(res);
            listHTML = _mm.renderHTML(listHTMLTemplate, {
                list : res.list
            });
            console.log(listHTML);
            $('.p-list-con').html(listHTML);
        }, function (err) {
            _mm.errorTips(err);
        });
    }
};

$(function () {
    page.init();
});