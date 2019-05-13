'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _mm = require('Util/mm.js'),
    _product = require('Service/product-service.js'),
    _cart = require('Service/cart-service.js'),
    templateHTML = require('./index.string');

var page = {
    data : {
        productId : _mm.getURLParam('productId') || ''
    },
    init : function () {
        this.onload();
        this.bindEvent();
    },
    bindEvent : function () {
        var newSrc  = '',
            _this   = this;

        //鼠标移动到缩略图上，切换预览图片
        $(document).on('mouseenter', '.p-img-item', function () {
            newSrc = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', newSrc);
        });
        //加减数量功能
        $(document).on('click', '.p-count-btn', function () {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $count = $('.p-count'),
                currCount = Number($count.val()),
                minCount = 1,
                maxCount = _this.data.detailInfo.stock;

            //如果点击加号
            if (type === 'plus') {
                $count.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            //如果点击减号
            if (type === 'minus') {
                $count.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        //加入购物车
        $(document).on('click', '.cart-add', function () {
            _cart.addToCart({
                productId : _this.data.productId,
                count     : $('.p-count').val()
            }, function (res) {
                window.location.href = './result.html?type=cart-add';
            }, function (errMsg) {
                _mm.errorTips(errMsg);
            });
        });
    },
    onload : function () {
        //若productId不存在，则回到主页
        if (!this.data.productId) {
            _mm.goHome();
        }
        this.loadDetail();
    },
    //加载商品详细数据
    loadDetail : function () {
        var detailHTML = '',
            $pageWrap = $('.page-wrap'),
            _this = this;
        //显示loading图标
        $pageWrap.html('<div class="loading"></div>');
        // 请求商品详细数据
        _product.getProductDetail(_this.data.productId, function (res) {
            //修改数据类型
            _this.filter(res);
            //缓存响应信息
            _this.data.detailInfo = res
            //渲染页面
            detailHTML = _mm.renderHTML(templateHTML, res);
            $pageWrap.html(detailHTML);
        }, function (errMsg) {
            $pageWrap.html('<div class="err-tips">' + errMsg + '</div>');
        });
    },
    //数据处理
    filter : function (res) {
        res.subImages = res.subImages.split(',');
    }
};

$(function () {
    page.init();
});

