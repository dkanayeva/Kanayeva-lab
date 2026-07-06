document.addEventListener('DOMContentLoaded', function () {
  // mobile sidebar toggle
  var toggle = document.querySelector('.nav-toggle');
  var sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
    document.querySelectorAll('.sidebar a').forEach(function (link) {
      link.addEventListener('click', function () { sidebar.classList.remove('open'); });
    });
  }

  // draw-on animation for any Nyquist trace marked .draw
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.draw').forEach(function (path) {
    if (reduce) return;
    var len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.getBoundingClientRect(); // force reflow
    path.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.2,.7,.3,1)';
    requestAnimationFrame(function () {
      path.style.strokeDashoffset = '0';
    });
  });

  // gentle reveal on scroll for sections
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('section, .person, .pub, .news-item').forEach(function (el) {
    if (reduce) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(el);
  });
});
