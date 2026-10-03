// slider.js — tab switchers and auto-scrolling logo rails
document.addEventListener('DOMContentLoaded', function () {
  // generic tab switcher: any .tabs block toggles matching .pane[data-t] siblings
  document.querySelectorAll('.tabs').forEach(function (tabGroup) {
    var tabs = tabGroup.querySelectorAll('.tab');
    var panesWrap = tabGroup.parentElement;
    tabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('on'); });
        btn.classList.add('on');
        panesWrap.querySelectorAll('.pane').forEach(function (p) { p.classList.remove('on'); });
        var target = panesWrap.querySelector('#' + btn.dataset.t);
        if (target) target.classList.add('on');
      });
    });
  });

  // duplicate marquee rail content once so the CSS loop is seamless
  document.querySelectorAll('.rail .row[data-loop]').forEach(function (row) {
    row.innerHTML += row.innerHTML;
  });
});


  // horizontal department scroller on the home Academics section
  document.querySelectorAll('.academic-scroll-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrap = btn.closest('.about, #academics, section');
      var pane = wrap ? wrap.querySelector('.pane.on') : document.querySelector('.pane.on');
      if (!pane) return;
      pane.scrollBy({ left: btn.dataset.dir === 'left' ? -pane.clientWidth * .85 : pane.clientWidth * .85, behavior: 'smooth' });
    });
  });
