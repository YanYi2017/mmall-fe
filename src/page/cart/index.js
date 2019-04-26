'use strict';

require('./index.css');
require('Page/common/header/index.js');

var _cart           = require('Service/cart-service.js'),
    _mm             = require('Util/mm.js'),
    templateHTML    = require('./index.string'),
    nav             = require('Page/common/nav/index.js');

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
        //判断输入是否有效，无效则阻止输入
        $(document).on('keydown', '.count-input', function (e) {
            var count        = Number($(this).val()),
                inputRegExp  = /[0-9]|Backspace|Delete|Left|Right|Up|Down|Table/;
            //如果输入的不是数字或方向键，则通过preventDefault()阻止输入
            if (!inputRegExp.test(e.key)) {
                e.preventDefault();
            }
        });
        //判断最终输入框中的数字，并更新总价
        $(document).on('blur', '.count-input', function (e) {
            var $this       = $(this),
                inputCount  = Number($this.val()),
                productId   = $this.parents('tr').data('product-id'),
                minCount    = 1,
                maxCount    = Number($this.data('max')),
                newCount    = 0;

            if (inputCount > maxCount) {
                _mm.errorTips('库中该商品只有' + maxCount + '件了');
                newCount    = maxCount;
            }
            else if (inputCount <= minCount) {
                newCount    = minCount;
            } else {
                newCount    = inputCount;
            }
            
            //更新购物车商品数量和价格
            _cart.update({
                productId   : productId,
                count       : newCount
            }, function (res) {
                _this.renderCartList(res);
            }, function (errMsg) {
                _this.showCartError();
            });
        });

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
            //更新购物车商品数量和价格
            _cart.update({
                productId   : productId,
                count       : newCount
            }, function (res) {
                _this.renderCartList(res);
            }, function (errMsg) {
                _this.showCartError();
            });
        });

        //删除单个商品
        $(document).on('click', '.cart-delete', function () {
            if (confirm('确认要删除当前商品？')) {
                var productId = $(this).parents('tr').data('product-id');
                _this.deleteCartProduct(productId);          
            }
        });
        //删除选中的商品
        $(document).on('click', '.cart-delete-selected', function () {            
            if (confirm('确定要删除选中商品？')) {
                var $checkedBox = $('tbody tr[data-product-id] input:checked'),
                    productIdArray = [];

                //循环查找选中商品的productId，并放到数组中
                for (var i = 0; i < $checkedBox.length; i++) {
                    productIdArray.push($($checkedBox[i]).parents('tr').data('product-id'));
                }

                if (productIdArray.length) {
                    _this.deleteCartProduct(productIdArray.join(','));
                } else {
                    _mm.errorTips('请选择要删除的商品');
                }
            }
        });
        //购物车提交
        $(document).on('click', '.submit-btn', function () {
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './order-confirm.html';
            } else {
                _mm.errorTips('请选择商品后提交');
            }
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
        //更新导航条中购物车商品数量
        nav.loadCartCount();
    },
    //处理请求得到的数据
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    //显示错误信息
    showCartError: function () {
        $('.page-wrap').html('<p class="err-tips">出问题了，刷新下试试吧。</p>');
    },
    //删除指定商品，支持批量删除，productId之间用逗号分隔
    deleteCartProduct: function (productIds) {
        var _this = this;

        _cart.deleteProduct(productIds, function (res) {
            _this.renderCartList(res);
        }, function (errMsg) {
            _this.showCartError();
        });
    }
};

$(function () {
    page.init();
});