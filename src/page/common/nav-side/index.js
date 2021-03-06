'use strict';

require('./index.css');
var _mm = require('Util/mm.js');
var template = require('./index.string');
//侧边导航业务逻辑
var navSide = {
    option: {
        name: '',
        navList: [
            { name : 'user-center',  desc : '个人中心',   href: './user-center.html'},
            { name : 'order-list',   desc : '我的订单',   href: './order-list.html'},
            { name : 'user-password-update',  desc : '修改密码',   href: './user-password-update.html'},
            { name : 'about',        desc : '关于MMall',  href: './about.html'}
        ]
    },
    init: function (option) {
        //合并选项
        $.extend(this.option, option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav: function () {
        //计算active数据
        var i;
        var length  = this.option.navList.length;
        for (i = 0; i < length; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }
        //渲染list数据
        var navHTML = _mm.renderHTML(template, {
            navList: this.option.navList
        });
        //把渲染好的navHTML添加到容器中
        $('.nav-side').html(navHTML);
    }
};
module.exports = navSide;