var Carousel = function(root, option) {
  this.root = root;
  this.animation = option.effect;
  this.step = option.step;
  this.autoplay = option.autoplay;
  this.autoplaySpeed = option.autoplaySpeed;

  this.animating = false;
  this.currIndex = 0;
  this.panels = Array.prototype.slice.call(this.root.querySelectorAll('.panels a'));
  this.dotsCtx = this.root.querySelector('.dots');
  this.dots = Array.prototype.slice.call(this.dotsCtx.querySelectorAll('li'));
  this.prev = this.root.querySelector('.prev');
  this.next = this.root.querySelector('.next');

  this.bind();
}

Carousel.prototype.bind = function () {
  var that = this;

  console.log(this.animation);
  // 为上一页按钮绑定事件处理函数
  that.prev.onclick = function (e) {
    if (that.animating) return;
    that.animating = true;

    var length = that.panels.length;
    var fromIndex = that.currIndex;
    var toIndex = (fromIndex - 1 + length) % length;

    that.setDots(toIndex);
    that.setPanels(fromIndex, toIndex, 'left');
  };

  // 为下一页按钮绑定事件处理函数
  that.next.onclick = function (e) {
    if (that.animating) return;
    that.animating = true;

    var length = that.panels.length;
    var fromIndex = that.currIndex;
    var toIndex = (fromIndex + 1 + length) % length;

    that.setDots(toIndex);
    that.setPanels(fromIndex, toIndex, 'right');
  };

  // 为dot绑定点击事件处理函数
  that.dotsCtx.onclick = function (e) {
    if (e.target.nodeName !== 'SPAN') return;
    if (that.animating) return;
    that.animating = true;

    var fromIndex = that.currIndex;
    var toIndex = that.dots.indexOf(e.target);
    var dir = toIndex < fromIndex ? 'left' : 'right';

    that.setDots(toIndex);
    that.setPanels(fromIndex, toIndex, dir);
  }

  // 自动播放
  if (that.autoplay) {
    var event = new Event('click');
    window.setInterval(function () {
      that.next.dispatchEvent(event);
    }, that.autoplaySpeed);
  }
};

Carousel.prototype.setDots = function (index) {
  // 取消现在活动的dot
  this.dots.forEach(function (dot) {
    if (dot.classList.contains('active') > 0) {
      dot.classList.remove('active');
    }
  });
  // 设置新的活动dot
  this.dots[index].classList.add('active');
  this.currIndex = index;  // 设置新的index
};

Carousel.prototype.setPanels = function (fromIndex, toIndex, dir) {
  var that = this;
  var fromNode = that.panels[fromIndex];
  var toNode = that.panels[toIndex];
  var step = that.step;

  that.animation(fromNode, toNode, step, dir, function () {
    // 重置所有的panel
    that.panels.forEach(function (panel) {
      panel.style.zIndex = 1;
      panel.style.opacity = 0;
    });

    // 设置当前panel
    that.panels[toIndex].style.zIndex = 10;
    that.panels[toIndex].style.opacity = 1;
    that.animating = false;
  });
}

module.exports = Carousel;