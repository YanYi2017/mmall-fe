'use strict';

require('./index.css');
require('Page/common/nav-simple/index.js');
var _mm = require('Util/mm.js');

$(function () {
    var type        = _mm.getURLParam('type') || 'default';
    var $element    = $('.' + type + '-success');
    //显示对应的提示元素
    $element.show();
});