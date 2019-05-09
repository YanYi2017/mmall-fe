'use strict';

var _mm                     = require('Util/mm.js');
var _address                = require('Service/address-service.js');
var _cities                 = require('Util/cities/index.js');
var addressModalTemplate    = require('./address-modal.string');

var _addressModal = {
    option : {
        isUpdate    : null,
        onSuccess   : null
    },
    show : function (option) {
        //缓存
        this.option = option;
        this.$modalWrap = $('.modal-wrap');
        //渲染页面
        this.loadModal();
        //绑定事件
        this.bindEvent();
    },
    //加载模态对话框
    loadModal : function () {
        var addressModalHTML = _mm.renderHTML(addressModalTemplate, this.option.data);
        this.$modalWrap.html(addressModalHTML);
        //加载省份
        this.loadProvinces();
    },
    //绑定事件
    bindEvent : function () {
        var _this = this;

        //省份和城市的二级联动
        this.$modalWrap.find('#receiver-province').change(function () {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        //点击提交收货地址
        this.$modalWrap.find('.address-btn').click(function () {
            var receiverInfo = _this.getReceiverInfo();
            var isUpdate = _this.option.isUpdate;

            //使用新地址，且验证通过
            if (!isUpdate && receiverInfo.status) {
                _address.addReceiver(receiverInfo.data, function (res) {
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess();
                }, function (errMsg) {
                    _mm.errorTips(receiverInfo.data.errMsg);
                });
            }
            //未通过验证
            else {
                _mm.errorTips(receiverInfo.errMsg);
            }

        });
        //点击叉号或蒙版区域时，关闭模态对话框
        this.$modalWrap.find('.close').click(function () {
            _this.hide();
        });
        //保证点击modal内容区时，不关闭弹窗
        this.$modalWrap.find('.modal-container').click(function (e) {
            e.stopPropagation();
        });
       
    },
    //关闭模态对话框
    hide : function () {
        this.$modalWrap.html('');
    },
    //加载省份信息
    loadProvinces : function () {
        var provinces           = _cities.getProvinces() || [];
        var $provinceSelect     = this.$modalWrap.find('#receiver-province');
        
        $provinceSelect.html(this.getSelectOptions(provinces));
    },
    //加载城市信息
    loadCities : function (province) {
        var cities          = _cities.getCities(province) || [];
        var $citySelect     = this.$modalWrap.find('#receiver-city');

        $citySelect.html(this.getSelectOptions(cities));
    },
    //传入数组，获取相应option标签HTML代码片段
    getSelectOptions : function (optionArray) {
        var html = '<option value="">请选择</option>';
        
        for (var i = 0, length = optionArray.length; i < length; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>'
        }
        return html;
    },
    //获取表单里收件人信息，并做表单验证
    getReceiverInfo : function () {
        var receiverInfo = {};
        var result = {
            status : false,
            data   : null,
            errMsg : null
        };

        receiverInfo.receiverName       = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince   = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity       = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress    = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone      = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip        = $.trim(this.$modalWrap.find('#receiver-zip').val());
    
        //表单验证
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请选择收件人详细地址';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请选择收件人手机号';
        }
        //所有验证都通过
        else {
            result.status   = true;
            result.data     = receiverInfo;
        }

        return result;
    }
};

module.exports = _addressModal;