'user strict';

require('./index.css');
var templatePagination = require('./index.string'),
    _mm                = require('Util/mm.js');

var Pagination = function () {
    var _this = this;
    this.defaultOptions = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null
    };
    //事件的处理
    $(document).on('click','.pg-con .pg-item', function () {
        var $this = $(this);
        //若点击的带有disabled和active类，不做任何处理
        if ($this.hasClass('disabled') || $this.hasClass('active')) {
            return;
        }
        _this.options.onSelectPage($this.data('value'));
    });
};
//渲染分页组件
Pagination.prototype.render = function (userOption) {
    //合并
    this.options = $.extend({}, this.defaultOptions, userOption);
    //判断容器是否为合法的jQuery对象，若不是则跳出
    if (!(this.options.container instanceof jQuery)) {
        return;
    }
    //判断是否只有1页，若是则不需要显示分页
    if (this.options.pages === 1) {
        return;
    }
    //渲染分页内容
    this.options.container.html(this.getPaginationHTML());
};
//获取分页HTML
Pagination.prototype.getPaginationHTML = function () {
    var options     = this.options,
        html        = '',
        pageArray   = []
        start       = options.pageNum - options.pageRange > 1 ? options.pageNum - options.pageRange : 1
        end         = options.pageNum + options.pageRange < options.pages ? options.pageNum + options.pageRange : options.pages;
    //上一页按钮
    pageArray.push({
        name     : '上一页',
        value    : options.prePage,
        disabled : !options.hasPreviousPage
    });
    //数字按钮
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name    : i,
            value   : i,
            active  : (i === options.pageNum)
        });
    }
    //下一页按钮
    pageArray.push({
        name     : '下一页',
        value    : options.nextPage,
        disabled : !options.hasNextPage
    });
    //渲染并返回HTML
    html = _mm.renderHTML(templatePagination, {
        pageArray   : pageArray,
        pageNum     : options.pageNum,
        pages       : options.pages
    });
    return html;
};

module.exports = Pagination;