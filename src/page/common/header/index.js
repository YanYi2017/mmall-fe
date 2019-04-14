'use strict';

require('./index.css');
var _mm = require('Util/mm.js');
//通用header
var header = {
    init: function () {
        this.onload();
        this.bindEvent();
    },
    onload: function () {
        var keyword = _mm.getURLParam('keyword');
        //若keyword存在，则回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function () {
        var _this = this;
        //点击搜索按钮后，做搜索提交
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        //输入回车后，搜索提交
        $('#search-input').keydown(function (e) {
            /** KeyboardEvent.keyCode已过时
            *   if (13 === e.keyCode) {
            *       _this.searchSubmit();
            *   }
            */
            if ('Enter' === e.key) {
                _this.searchSubmit();
            }
        });

    },
    //搜索提交
    searchSubmit: function () {
        var keyword = $.trim($('#search-input').val());
        //若keyword存在，则跳转到list页面
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        }
        //若keyword为空，则跳转到首页
        else {
            _mm.goHome();
        }
    }
}

header.init();