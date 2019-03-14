'use strict';

var _mm = require('Util/mm.js');

var _user = {
    //检查用户登录状态
    checkLogin : function(resolve, reject) {
        _mm.request({
            type    : 'POST',
            url     : _mm.getServerURL('/user/get_user_info.do'),
            success : resolve,
            error   : reject
        });
    },
    //登出
    logout : function (resolve, reject) {
        _mm.request({
            type    : 'POST',
            url     : _mm.getServerURL('/user/logout.do'),
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _user;