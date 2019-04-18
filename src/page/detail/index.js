'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _mm = require('Util/mm.js'),
    templateHTML = require('./index.string');

var page = {
    init : function () {
        this.onload();
    },
    bindEvent : function () {},
    onload : function () {
        this.loadDetail();
    },
    loadDetail : function () {
        var detailHTML = _mm.renderHTML(templateHTML, {});
        $('.page-container').html(detailHTML);
    }
};

$(function () {
    page.init();
});

