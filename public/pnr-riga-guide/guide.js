// Two small jobs: colour the bar while it sits on the orange header,
// and mark the section you are reading in the bar.
(function () {
  var bar = document.querySelector('.bar');
  var hero = document.querySelector('.hero');
  var strip = document.querySelector('.bar-links');
  var links = Array.prototype.slice.call(strip.querySelectorAll('a'));
  if (!('IntersectionObserver' in window)) return;

  var barH = function () { return bar.getBoundingClientRect().height; };

  new IntersectionObserver(function (entries) {
    bar.classList.toggle('on-orange', entries[0].isIntersecting);
  }, { rootMargin: '-' + Math.round(barH()) + 'px 0px 0px 0px', threshold: 0 }).observe(hero);
  bar.classList.add('on-orange');

  var current = null;
  function mark(id) {
    if (id === current) return;
    current = id;
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      if (on) {
        a.setAttribute('aria-current', 'true');
        var left = a.offsetLeft - strip.offsetLeft - 8;
        if (left < strip.scrollLeft || left + a.offsetWidth > strip.scrollLeft + strip.clientWidth - 32) {
          strip.scrollTo({ left: left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        }
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) mark(en.target.id); });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(function (s) { obs.observe(s); });

  // Clear the marker when back up on the header
  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) mark(null);
  }, { rootMargin: '0px 0px -70% 0px' }).observe(hero);
})();
