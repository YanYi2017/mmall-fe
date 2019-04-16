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
        this.bindEvent();
    },
    bindEvent : function () {
        var _this = this;

        //绑定点击排序按钮事件
        $('.sort-item').click(function () {
            var $this = $(this);    //监听函数内部的this指向触发事件的那个元素节点
            _this.data.listParam.pageNum = 1;

            //如果点击的是推荐排序按钮
            if ($this.data('type') === 'default') {
                //改变样式
                $this.addClass('active').siblings('.sort-item').removeClass('active');
                //改变排序方式
                _this.data.listParam.orderBy = 'default';
            }
            //如果点击的是价格排序按钮
            else if ($this.data('type') === 'price') {
                //active类的处理
                $this.addClass('active').siblings('.sort-item').removeClass('active');
                //升序、降序处理
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';                    
                }
            }
            //重新加载列表
            _this.loadList();
        });
    },
    onLoad : function () {
        this.loadList();
    },
    //加载list数据
    loadList : function () {
        var listHTML = '';
        var $pListCon = $('.p-list-con');

        //显示加载图片
        $pListCon.html('<div class="loading"></div>');
        //请求产品列表数据
        _product.getProductList(this.data.listParam, function (res) {
            listHTML = _mm.renderHTML(listHTMLTemplate, {
                list : res.list
            });
            $pListCon.html(listHTML);
        }, function (err) {
            _mm.errorTips(err);
        });
    }
};

$(function () {
    page.init();
});