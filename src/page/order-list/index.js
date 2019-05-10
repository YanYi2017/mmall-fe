'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _mm = require('Util/mm.js');
var _user = require('Service/user-service.js');
var navSide = require('Page/common/nav-side/index.js');
var htmlTemplate = require('./index.string');

//页面逻辑
var page = {
    init : function () {
        this.onload();
    },
    onload: function () {
        //初始化左侧导航栏
        navSide.init({
            name : 'order-list'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo : function () {
        var userHTML = '';
        _user.getUserInfo(function (res) {
            userHTML = _mm.renderHTML(htmlTemplate, res);
            $('.panel-body').html(userHTML);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        });
    }
};

$(function () {
    page.init();
});