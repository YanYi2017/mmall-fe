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
    }
};

$(function () {
    page.init();
});