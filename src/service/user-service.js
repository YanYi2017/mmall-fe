'use strict';

var _mm = require('Util/mm.js');

var _user = {
    //用户登录
    login : function (userInfo, resolve, reject) {
        _mm.request({
            type    : 'POST',
            url     :  _mm.getServerURL('/user/login.do'),
            data    : userInfo,
            success : resolve,
            error   : reject
        });
    },
    //用户注册
    register : function (reginfo, resolve, reject) {
        _mm.request({
            type    : 'POST',
            url     : _mm.getServerURL('/user/register.do'),
            data    : reginfo,
            success : resolve,
            error   : reject
        });
    },
    //检查用户名
    checkUsername : function (username, resolve, reject) {
        _mm.request({
            type    :'POST',
            url     : _mm.getServerURL('/user/check_valid.do'),
            data    : {
                type    : 'username',
                str     : username
            },
            success : resolve,
            error   : reject
        });
    },
    //检查用户登录状态
    checkLogin : function (resolve, reject) {
        _mm.request({
            type    : 'POST',
            url     : _mm.getServerURL('/user/get_user_info.do'),
            success : resolve,
            error   : reject
        });
    },
    //获取用户密码提示问题
    getQuestion : function (username, resolve, reject) {
        _mm.request({
            type    : 'POST',
            url     : _mm.getServerURL('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            success : resolve,
            error   : reject
        });
    },
    //获取Token
    getToken : function (userInfo, resolve, reject) {
        _mm.request({
            type    : 'POST',
            url     : _mm.getServerURL('/user/forget_check_answer.do'),
            data    : userInfo,
            success : resolve,
            error   : reject
        });
    },
    //重置密码
    resetPassword : function (userInfo, resolve, reject) {
        _mm.request({
            type    : 'POST',
            url     : _mm.getServerURL('/user/forget_reset_password.do'),
            data    : userInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取用户信息
    getUserInfo : function (resolve, reject) {
        _mm.request({
            type    : 'POST',
            url     : _mm.getServerURL('/user/get_information.do'),
            success : resolve,
            error   : reject
        });
    },
    updateUserInfo : function (userInfo, resolve, reject) {
        _mm.request({
            type    : 'POST',
            url     : _mm.getServerURL('/user/update_information.do'),
            data    : userInfo,
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