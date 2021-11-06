var tNode = document.getElementById('simple-tooltip');

function setTooltipText(e) {
    var el = e.target;
    var value = e.target.getAttribute('data-tooltip');
    tNode.style.display = 'block';
    tNode.style.opacity = '0';
    tNode.children[1].innerHTML = value;
    window.requestAnimationFrame( () => {
      var pos = el.getBoundingClientRect(), _pos = tNode.getBoundingClientRect();
      var x, y, aY, cenX = pos.left + pos.width/2, _halfX = _pos.width/2, cenY = pos.top + pos.height/2, _halfY = _pos.height/2,
          a = tNode.children[0];
      if (window.innerWidth < cenX + _halfX) {
        x = pos.right - _pos.width;
        a.style.right = pos.width/2-10 + 'px';
        a.style.left = 'auto';
      } else if (0 > cenX - _halfX) {
        x = pos.left;
        a.style.left = pos.width/2-10 + 'px';
        a.style.right = '';
      } else {
        x=cenX-_halfX;
        a.style.right = '';
        a.style.left = '';
      }
      if (0 >= pos.top-_pos.height-5) {
        y = pos.bottom+2;
        aY = 'bottom';
      } else {
        y=pos.top-_pos.height-5;
        aY = 'top';
      }
      tNode.setAttribute('x-placement', aY);
      tNode.style.transform = 'translate3d(' + x+'px,' + y + 'px,0)';
      tNode.style.opacity = '1';
    });
};
function hideTooltip () {
  tNode.style.opacity = '0';
  tNode.children[1].innerHTML = '';
  tNode.style.display = 'none';
  tNode.style.transform = '';
}
Vue.directive('tooltip', {
  bind: function (el, binding, vnode) {
    el.setAttribute('data-tooltip', binding.value)
    el.addEventListener('mouseenter', setTooltipText);
    el.addEventListener('mouseout', hideTooltip);
  },
  update: function (el, binding, vnode) {
    if (binding.value  === el.getAttribute('data-tooltip') ) return;
    el.setAttribute('data-tooltip', binding.value);
  },
  unbind: function (el) {
    el.removeEventListener('mouseenter', setTooltipText);
    el.removeEventListener('mouseout', hideTooltip);
  }
});