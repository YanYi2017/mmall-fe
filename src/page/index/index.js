'use strict';

import _ from 'lodash';
import './index.css';
import _mm from 'Util/mm.js';

$('body').html('index hello');

console.log('Hello index');

var data = {
    screenName: 'ddfhg'
};
var template = '<div>{{screenName}}</div>';

console.log(_mm.renderHTML(template, data));

_mm.successTips();
_mm.errorTips();