'use strict';
var Hogan = require('hogan');

var config = {
    serverHost: ''  //方便以后改写服务器地址
};

var _mm = {
    //网络请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type    : param.type        || 'get',
            url     : param.url         || '',
            dataType: param.dataType    || 'json',
            data    : param.data        || '',
            success : function (res) {
                //请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //未登录，需要强制登陆
                else if (10 === res.status) {
                    _this.doLogin();
                }
                //请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);                    
                }                
            },
            error   : function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器端地址
    getServerURL: function (path) {
        return config.serverHost + path;
    },
    //获取URL参数
    getURLParam: function (name) {
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染HTML模板
    renderHTML: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate);
        var result   = template.render(data);
        return result;
    },
    //成功提示
    successTips: function (msg) {
        alert(msg || "操作成功！");
    },
    //失败提示
    errorTips: function (msg) {
        alert(msg || "出错了！");
    },
    //验证功能，支持非空、手机号和邮箱判断
    validate: function (value, type) {
        var value = $.trim(value);
        var emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
        //非空验证
        if ('required' === type) {
            return !!value;
        }
        //手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if ('email' === type) {
            return emailRegExp.test(value);
        }
    },
    //统一登陆处理
    doLogin: function () {
        window.location.href = './login.html?redirct=' + encodeURIComponent(window.location.href);   //使用encodeURIComponent完全编码，防止特殊字符截断
    },
    //统一跳转回主页
    goHome: function () {
        window.location.href = './index.html';
    }
};

module.exports = _mm;