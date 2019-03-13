'use strict';

import './index.css';
import _mm from 'Util/mm.js';
import 'Node_modules/_@fortawesome_fontawesome-free@5.7.2@@fortawesome/fontawesome-free/css/all.min.css';
console.log('Hello index');

var data = {
    screenName: 'ddfhg'
};
var template = '<div>{{screenName}}</div>';

console.log(_mm.renderHTML(template, data));

console.log(_mm.validate('', 'required'));