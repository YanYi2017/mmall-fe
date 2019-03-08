'use strict';

import _ from 'lodash';
import './index.css';
import _mm from 'Util/mm.js';

$('body').html('index hello');

console.log('Hello index');

_mm.request({
    url: '/product/list.do?keyword=1',
    success: function (res) {
        console.log(res);
    },
    error: function (errMsg) {
        console.log(errMsg);
    }
});