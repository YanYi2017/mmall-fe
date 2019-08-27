'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

require('Util/carousel/index.css');
var Carousel = require('Util/carousel/carousel.js');
var animations = require('Util/carousel/animations.js');

var _mm      = require('Util/mm.js');
var template = require('./carousel.string');

$(function() {
    //渲染轮播图的HTML并添加到容器中
    var carouselHTML = _mm.renderHTML(template);
    $('.banner-con').html(carouselHTML);

    //初始化轮播图
    var carousel = new Carousel($('.carousel')[0], {
        effect: animations.scrollX,  // 动画效果
        step: 20,
        autoplay: true,
        autoplaySpeed: 3000
      });

});