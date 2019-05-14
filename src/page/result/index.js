'use strict';

require('./index.css');
require('Page/common/nav-simple/index.js');
var _mm = require('Util/mm.js');

$(function () {
    var type        = _mm.getURLParam('type') || 'default';
    var $element    = $('.' + type + '-success');

    if ('payment' === type) {
        var orderNumber = _mm.getURLParam('orderNumber');

        $element.find('.order-number').attr('href', './order-detail.html?orderNumber=' + orderNumber);
    }
    //显示对应的提示元素
    $element.show();
});