'use strict';

require('./index.css');
require('Page/common/header/index.js');
require('Page/common/nav/index.js');

var _order          = require('Service/order-service.js'),
    _mm             = require('Util/mm.js'),
    templateHTML    = require('./index.string');