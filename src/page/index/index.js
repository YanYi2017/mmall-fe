'use strict';

import _ from 'lodash';
import './index.css';
import _mm from 'Util/mm.js';

$('body').html('index hello');

console.log('Hello index');

console.log(_mm.getServerURL('test.index.js'));
console.log(_mm.getURLParam('key'));