'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');
require('Util/carousel/index.js');

var _mm      = require('Util/mm.js');
var template = require('./carousel.string');

$(function() {
    //渲染轮播图的HTML并添加到容器中
    var carouselHTML = _mm.renderHTML(template);
    $('.banner-con').html(carouselHTML);
    //初始化轮播图
    var $carousel = $('.banner').unslider({
        dots: true
    });
    //绑定轮播图前后滚动按钮点击事件
    $('.banner-arrow').click(function () {
        //判断点击的是向前滚动按钮还是向后滚动按钮
        var fn = this.className.split(' ')[1];
        //滚动轮播图
        $carousel.data('unslider')[fn]();
    });
});