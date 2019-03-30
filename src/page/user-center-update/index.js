'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _mm = require('Util/mm.js');
var _user = require('Service/user-service.js');
var navSide = require('Page/common/nav-side/index.js');
var htmlTemplate = require('./index.string');

//页面逻辑
var page = {
    init : function () {
        this.onload();
        this.bindEvent();
    },
    onload : function () {
        //初始化左侧导航栏
        navSide.init({
            name :'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    bindEvent : function () {
        var _this = this;
        //点击提交按钮后
        $(document).on('click', '.btn-submit', function () {
            //声明一个对象用来存储待提交的数据
            var formData = {
                email    : $.trim($('#email').val()),
                phone    : $.trim($('#phone').val()),
                question : $.trim($('#question').val()),
                answer   : $.trim($('#answer').val())
            };
            var validateResult = _this.formValidate(formData);
            //如果验证通过
            if (validateResult.status) {
                //更新用户信息
                _user.updateUserInfo(formData, function (res, msg) {
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
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
    //加载用户信息
    loadUserInfo : function () {
        var userHTML = '';
        _user.getUserInfo(function (res) {
            userHTML = _mm.renderHTML(htmlTemplate, res);
            $('.panel-body').html(userHTML);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        });
    },
    //判断信息是否合格
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };

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
});