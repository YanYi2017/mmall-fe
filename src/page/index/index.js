'use strict';

import _ from 'lodash';
import './index.css';
import _mm from 'Util/mm.js';
console.log('Hello index');

var data = {
    screenName: 'ddfhg'
};
var template = '<div>{{screenName}}</div>';

console.log(_mm.renderHTML(template, data));

console.log(_mm.validate('', 'required'));