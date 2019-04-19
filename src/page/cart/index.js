'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var page = {
    init : function () {
        this.onload();
        this.bindEvent();
    },
    bindEvent : function () {},
    onload : function () {
        $('.page-wrap').html('<div class="loading"></div>');
    }
};

$(function () {
    page.init();
});