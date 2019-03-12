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
    //统一登陆处理
    doLogin: function () {
        window.location.href = './login.html?redirct=' + encodeURIComponent(window.location.href);   //使用encodeURIComponent完全编码，防止特殊字符截断
    }
};

module.exports = _mm;