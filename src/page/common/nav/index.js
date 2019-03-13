'use strict';

import './index.css';

var nav = {
    init: function () {
        this.bindEvent();
        this.loadCartCount();
        this.loadUserInfo();
        return this;
    },
    bindEvent: function () {},
    loadUserInfo: function () {},
    loadCartCount: function () {}
};

module.exports = nav();