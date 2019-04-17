'use strict';

require('./index.css');
require('Page/common/header/index.js');
require('Page/common/nav/index.js');

var _product = require('Service/product-service.js');
var _mm = require('Util/mm.js');
var listHTMLTemplate = require('./index.string');
var Pagination = require('Util/pagination/index.js');

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
        var _this = this;
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
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function (err) {
            _mm.errorTips(err);
        });
    },
    //加载分页信息
    loadPagination : function (pageInfo) {
        var _this = this;
        //若分页没有存在，创建一个分页
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            //指定容器
            container       : $('.pagination'),
            //指定点击事件绑定的方法
            onSelectPage    : function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};

$(function () {
    page.init();
});