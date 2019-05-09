'use strict';

var _mm             = require('Util/mm.js');
var _cities         = require('Util/cities/index.js');
var addressModalTemplate   = require('./address-modal.string');

var _addressModal = {
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
        //加载城市
        // this.loadCities();
    },
    //绑定事件
    bindEvent : function () {
        var _this = this;
        //省份和城市的二级联动
        $(document).on('change', '#receiver-province', function () {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
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

        console.log(province);
        console.log(cities);
        $citySelect.html(this.getSelectOptions(cities));
    },
    //传入数组，获取相应option标签HTML代码片段
    getSelectOptions : function (optionArray) {
        var html = '<option value="">请选择</option>';
        
        for (var i = 0, length = optionArray.length; i < length; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>'
        }
        return html;
    }
};

module.exports = _addressModal;