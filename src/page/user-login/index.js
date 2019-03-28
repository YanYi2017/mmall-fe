'use strict';

require('./index.css');
require('Page/common/nav-simple/index.js');

var _user   = require('Service/user-service.js');
var _mm     = require('Util/mm.js');

//表单里的错误提示
var formError = {
    show : function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};
//页面逻辑部分
var page = {
    //初始化
    init : function () {
        this.bindEvent();
    },
    //绑定事件
    bindEvent : function () {
        var _this = this;
        //点击登录按钮时提交
        $('#submit').click(function (e) {
            _this.submit();
        });
        //按下回车按钮时提交
        $('.user-content').keyup(function (e) {
            if ('Enter' === e.key) {
                _this.submit();
            }
        });
    },
    //表单提交
    submit : function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        //对表单字段进行验证
        var validateResult = this.formValidate(formData);
        
        //如果验证成功
        if (validateResult.status) {
            //提交
            _user.login(formData, function (res) {
                //成功
                window.location.href = _mm.getURLParam('redirect') || './index.html';
            }, function (errMsg) {
                //失败
                formError.show(errMsg);
            });
        }
        //如果验证失败
        else {
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    //表单字段验证，主要进行非空验证
    formValidate : function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        //对用户名进行非空验证
        if (!_mm.validate(formData.username, 'required')) {
            result.msg = '用户名不能为空';
            return result;
        }
        //对密码进行非空验证
        if (!_mm.validate(formData.password, 'required')) {
            result.msg = '密码不能为空';
            return result;
        }
        //如果用户名和密码非空验证都通过
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};

$(function () {
    page.init()
});