'use strict';

require('./index.css');
require('Page/common/nav-simple/index.js');

var _user   = require('Service/user-service.js');
var _mm     = require('Util/mm.js');

//表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

//页面逻辑部分
var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //验证username
        $('#username').blur(function () {
            var username = $.trim($(this).val());
            //如果用户名为空，不做验证
            if (!username) {
                return;
            }
            //异步验证用户名是否存在
            _user.checkUsername(username, function (res) {
                //成功时的操作
                formError.hide();
            }, function (errMsg) {
                //失败时报错
                formError.show(errMsg);
            });
        });
        //点击注册按钮时提交
        $('#submit').click(function (e) {
            _this.submit();
        });
        //按下回车键时提交
        $('.user-content').keyup(function (e) {
            if ('Enter' === e.key) {
                _this.submit();
            }
        });
    },
    submit: function () {
        var formData = {
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val())
        };
        //对表单字段进行验证
        var validateResult = this.formValidate(formData);

        //如果验证成功
        if (validateResult.status) {
            _user.register(formData, function (res) {
                //注册成功后的操作
                window.location.href = './result.html?type=register';
            }, function (errMsg) {
                //注册失败后进行错误提示
                formError.show(validateResult.msg);
            });
        }
        //如果验证不成功
        else {
            formError.show(validateResult.msg);
        }
    },
    formValidate: function (formData) {
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
        //验证密码长度
        if (formData.password.length < 6) {
            result.msg = '密码长度不能少于6位';
            return result;
        }
        //验证两个输入的密码是否一致
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
        //验证手机号
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        //验证邮箱
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        //验证密码提示问题
        if (!_mm.validate(formData.question, 'required')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        //验证密码提示问题答案
        if (!_mm.validate(formData.answer, 'required')) {
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        //如果验证都通过
        result.status = true;
        result.msg ='验证通过';
        return result;
    }
};

$(function () {
    page.init();
})