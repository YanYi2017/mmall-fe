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
    data : {
        username : '',
        question : '',
        answer   : '',
        token    : ''
    },
    init : function () {
        this.onload();
        this.bindEvent();
    },
    onload : function() {
        this.loadStepUsername();
    },
    bindEvent : function () {
        var _this = this;
        //点击用户名输入窗口的按钮
        $('#submit-username').click(function (e) {
            var username = $.trim($('#username').val());
            //如果username不为空
            if (username) {
                //获取密码提示问题
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepAnswer();
                }, function (errMsg) {
                    //获取密码提示问题失败
                    formError.show(errMsg);
                });
            }
            //如果username为空
            else {
                formError.show('用户名不能为空');
            }
        });
        //点击密码提示问题答案输入窗口的按钮
        $('#submit-answer').click(function (e) {
            var answer = $.trim($('#answer').val());
            //如果用户输入的密码提示问题答案不为空
            if (answer) {
                _user.getToken({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer : answer,
                }, function (res) {
                    //获取token成功
                    _this.data.answer  = answer;
                    _this.data.token   = res;
                    _this.loadStepPassword();
                }, function (errMsg) {
                    //获取token失败
                    formError.show(errMsg);
                });
            }
            //如果用户输入的密码提示问题答案为空
            else {
                formError.show('答案不能为空');
            }
        });
        //点击新密码输入窗口的按钮
        $('#submit-password').click(function () {
            var passwordNew = $.trim($('#password').val());
            //如果用户输入的密码不为空且至少6位
            if (passwordNew.length >= 6) {
                _user.resetPassword({
                    username    : _this.data.username,
                    forgetToken : _this.data.token,
                    passwordNew : passwordNew
                }, function (res) {
                    //修改成功
                    window.location.href = './result.html?type=password-reset';
                }, function (errMsg) {
                    //修改失败
                    formError.show(errMsg);
                });
            }
            //如果用户输入的密码为空或小于6位数
            else {
                formError.show('请输入不少于六位的新密码');
            }
        });
    },
    //加载用户名输入窗口
    loadStepUsername : function() {
        $('.step-username').show();
    },
    //加载密码提示问题答案输入窗口
    loadStepAnswer : function() {
        //隐藏错误信息
        formError.hide();
        //隐藏用户名输入窗口
        $('.step-username').hide();
        //显示密码提示问题答案输入窗口
        $('.step-answer').show().find('#question').text(this.data.question);
    },
    //加载新密码输入窗口
    loadStepPassword : function() {
        //隐藏错误信息
        formError.hide();
        //隐藏密码提示问题答案输入窗口
        $('.step-answer').hide();
        //显示新密码输入窗口
        $('.step-password').show();
    }
};

$(function () {
    page.init();
});