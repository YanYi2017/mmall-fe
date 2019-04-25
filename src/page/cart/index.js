'use strict';

require('./index.css');
require('Page/common/nav/index.js');
require('Page/common/header/index.js');

var _cart           = require('Service/cart-service.js'),
    _mm             = require('Util/mm.js'),
    templateHTML    = require('./index.string');

var page = {
    data : {
        cartInfo : ''
    },
    init : function () {
        this.onload();
        this.bindEvent();
    },
    bindEvent : function () {
        var _this = this;
        
        //选中或取消选中某商品
        $(document).on('click', '.cart-select', function () {
            var $this       = $(this),
                productId   = $this.parents('tr').data('product-id');
            //选中某商品
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function (res) {
                    _this.renderCartList(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
            //取消选中某商品
            else {
                _cart.unselectProduct(productId, function (res) {
                    _this.renderCartList(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
                
            }
        });
        
        //全选或取消全选
        $(document).on('click', '.cart-select-all', function () {
            var $this = $(this);
            //全选
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                    _this.renderCartList(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
            //取消全选
            else {
                _cart.unselectAllProduct(function (res) {
                    _this.renderCartList(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
                
            }
        });

        //通过输入框改变商品数量
        // $(document).on('keyup', '.count-input', function (e) {
        //     var count = Number($(this).val());
        //     var inputRegExp = /[0-9]|Backspace|Delete|Left|Right|Up|Down/;
        //     console.log(typeof e.key);
        //     console.log(e.key);
        //     console.log(inputRegExp.test(e.key));
        //     //如果输入的不是数字，则通过preventDefault()阻止文字的输入
        //     if (inputRegExp.test(e.key)) {
        //         console.log('输入成功');
        //         console.log(count);
        //         if (count > 200) {
        //             console.log('输入多了');
        //         }
        //     } else {
        //         e.preventDefault();
        //         console.log('输入失败');
        //     }
        //     // var $this = $(this),
        //     //     count = $this.val(),
        //     //     minCount = 1,
        //     //     maxCount = $this.data('max');
        //     // if (count < minCount) {
        //     //     _mm.errorTips('商品数量不能为负');
        //     //     count = minCount;
        //     // }
        //     // if (count > maxCount) {
        //     //     _mm.errorTips('最多只能购买' + maxCount + '件商品');
        //     //     count = maxCount;
        //     // }

        // });

        //通过按钮改变商品数量
        $(document).on('click', '.count-btn', function () {
            var $this       = $(this),
                $countInput = $this.siblings('.count-input'),
                count       = Number($countInput.val()),
                productId   = $this.parents('tr').data('product-id'),
                minCount    = 1,
                maxCount    = Number($countInput.data('max')),
                newCount    = 0;
            //如果点击的是加号
            if ($this.data('opera-type') === 'plus') {
                if (count < maxCount) {
                    newCount = count + 1;
                } else {
                    _mm.errorTips('库中该商品只有' + maxCount + '件了');
                    newCount = maxCount;
                    return;
                }
            }
            //如果点击的是减号
            if ($this.data('opera-type') === 'minus') {
                if (count > minCount) {
                    newCount = count - 1;
                } else {
                    newCount = minCount;
                    return;
                }
            }
            //更新购物车商品数量
            _cart.update({
                productId   : productId,
                count       : newCount
            }, function (res) {
                _this.renderCartList(res);
            }, function (errMsg) {
                _this.showCartError();
            });
        });
    },
    onload : function () {
        var _this       = this,
            $pageWrap   = $('.page-wrap');
        //显示loading图标
        $pageWrap.html('<div class="loading"></div>');
        //获取购物车列表数据
        _cart.getCartList(function (res) {
            _this.renderCartList(res);
        }, function (errMsg) {
            _this.showCartError();
        });
    },
    //渲染购物车数据
    renderCartList: function (data) {
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;
        var cartHTML = '';
        cartHTML = _mm.renderHTML(templateHTML, data);
        $('.page-wrap').html(cartHTML);
    },
    //处理请求得到的数据
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    //显示错误信息
    showCartError: function () {
        $('.page-wrap').html('<p class="err-tips">出问题了，刷新下试试吧。</p>');
    }
};

$(function () {
    page.init();
});