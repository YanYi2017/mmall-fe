'use strict';

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
    //同一登陆处理
    doLogin: function () {
        window.location.href = './login.html?redirct=' + encodeURIComponent(window.location.href);   //使用encodeURIComponent完全编码，防止特殊字符截断
    }
};

module.exports = _mm;