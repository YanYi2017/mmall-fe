'use strict';

require('./index.css');
require('Page/common/header/index.js');
require('Page/common/nav/index.js');
var navSide = require('Page/common/nav-side/index.js');
var _mm = require('Util/mm.js');

navSide.init({
    name : 'about'
});