(function () {
      var els = document.querySelectorAll('.reveal');
      if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -10% 0px' });
      els.forEach(function (e) { io.observe(e); });

      var links = document.querySelectorAll('.toc a');
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id); });
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      links.forEach(function (l) { var t = document.querySelector(l.getAttribute('href')); if (t) spy.observe(t); });
      // tap to enlarge
      var dlg = document.createElement('dialog');
      dlg.className = 'lightbox';
      dlg.setAttribute('aria-label', 'Enlarged image');
      dlg.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close">&times;</button><p class="lightbox-cap"></p><div class="lightbox-scroll"><img alt=""></div>';
      document.body.appendChild(dlg);
      var big = dlg.querySelector('img'), box = dlg.querySelector('.lightbox-scroll'), cap = dlg.querySelector('.lightbox-cap');
      dlg.querySelector('.lightbox-close').addEventListener('click', function () { dlg.close(); });
      dlg.addEventListener('click', function (e) { if (e.target === box) dlg.close(); });
      big.addEventListener('click', function () { box.classList.toggle('is-full'); });
      dlg.addEventListener('close', function () { box.classList.remove('is-full'); document.body.style.overflow = ''; });
      document.querySelectorAll('figure.shot img').forEach(function (img) {
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'zoomable';
        btn.setAttribute('aria-label', 'Enlarge image: ' + img.alt);
        img.parentNode.insertBefore(btn, img); btn.appendChild(img);
        btn.addEventListener('click', function () {
          big.src = img.dataset.full || img.currentSrc || img.src; big.alt = img.alt;
          var fc = btn.closest('figure').querySelector('figcaption'); cap.textContent = fc ? fc.textContent : '';
          document.body.style.overflow = 'hidden'; dlg.showModal();
        });
      });
    })();
