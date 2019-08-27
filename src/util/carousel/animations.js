var animations = {
  // 渐变动画效果
  fade: function (fromNode, toNode, step, dir, onFinish) {
    var fromNodeOpacity = 1;
    var toNodeOpacity = 0;
    var speed = step || 0.02;

    function fromNodeAnimation() {
      if (fromNodeOpacity > 0) {
        fromNodeOpacity -= speed;
        fromNode.style.opacity = fromNodeOpacity;
        window.requestAnimationFrame(fromNodeAnimation);
      } else {
        fromNode.style.opacity = 0;
      }

    }

    function toNodeAnimation() {
      if (toNodeOpacity < 1) {
        toNodeOpacity += speed;
        toNode.style.opacity = toNodeOpacity;
        window.requestAnimationFrame(toNodeAnimation);
      } else {
        toNode.style.opacity = 1;
        onFinish();
      }
    }

    fromNodeAnimation();
    toNodeAnimation();
  },

  // 左右切换动画效果
  scrollX: function (fromNode, toNode, step, dir, onFinish) {
    var width = parseInt(window.getComputedStyle(fromNode).width);
    var offsetX = width;
    var fromNodeOffset = 0;
    var toNodeOffset = 0;
    var dir = dir || 'right';

    fromNode.style.opacity = 1;
    toNode.style.opacity = 1;

    var speed = step || 5;

    function fromNodeAnimation() {
      if (fromNodeOffset < offsetX) {

        // 根据dir来决定动画的方向
        switch (dir) {
          case 'left':
            fromNode.style.left = 0 + fromNodeOffset + 'px';
            break;
          case 'right':
          default:
            fromNode.style.left = 0 - fromNodeOffset + 'px';
        }
        fromNodeOffset += speed;

        window.requestAnimationFrame(fromNodeAnimation);
      }
    }

    function toNodeAnimation() {
      if (toNodeOffset < offsetX) {

        // 根据dir来决定移动的方向
        switch (dir) {
          case 'left':
            toNode.style.left = -width + toNodeOffset + 'px';
            break;
          case 'right':
          default:
            toNode.style.left = width - toNodeOffset + 'px';
        }
        toNodeOffset += speed;

        window.requestAnimationFrame(toNodeAnimation);
      } else {
        onFinish();
        fromNode.style.left = '0px';
        toNode.style.left = '0px';
      }
    }

    fromNodeAnimation();
    toNodeAnimation();
  }
};

module.exports = animations;