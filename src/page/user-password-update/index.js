'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _mm = require('Util/mm.js');
var _user = require('Service/user-service.js');
var navSide = require('Page/common/nav-side/index.js');

//页面逻辑
var page = {
    init : function () {
        this.onload();
        this.bindEvent();
    },
    onload : function () {
        //初始化左侧导航栏
        navSide.init({
            name :'user-password-update'
        });
    },
    bindEvent : function () {
        var _this = this;
        //点击提交按钮后
        $(document).on('click', '.btn-submit', function () {
            //声明一个对象用来存储待提交的数据
            var formData = {
                passwordOld      : $.trim($('#password-old').val()),
                passwordNew      : $.trim($('#password-new').val()),
                passwordConfirm  : $.trim($('#password-confirm').val())
            };
            var validateResult = _this.formValidate(formData);
            //如果验证通过
            if (validateResult.status) {
                //更新用户密码
                _user.updatePassword({
                    passwordOld : formData.passwordOld,
                    passwordNew : formData.passwordNew
                }, function (res, msg) {
                    _mm.successTips(msg);
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
            //如果验证未通过
            else {
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    //判断信息是否合格
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };

        //验证原始密码是否为空
        if (!formData.passwordOld) {
            result.msg = '原始密码不能为空';
            return result;
        }
        //验证新密码长度是否大于6位
        if (formData.passwordNew.length < 6) {
            result.msg = '请输入6位以上的新密码';
            return result;
        }
        //验证两次输入的新密码是否一样
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
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
});