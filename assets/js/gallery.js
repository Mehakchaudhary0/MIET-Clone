// gallery.js — simple lightbox for .gal figure > img thumbnails
document.addEventListener('DOMContentLoaded', function () {
  var thumbs = document.querySelectorAll('.gal img');
  if (!thumbs.length) return;

  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<span class="close">&times;</span><img alt="">';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img');

  thumbs.forEach(function (img) {
    img.addEventListener('click', function () {
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      lb.classList.add('open');
    });
  });
  lb.addEventListener('click', function () { lb.classList.remove('open'); });
});
