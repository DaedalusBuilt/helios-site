// Shared nav, footer, page links and image lightbox for every portfolio page.
// Each page sets <body data-page="..."> to mark its nav link.
(() => {
  const PAGES = [
    ['home', './', 'Home'],
    ['proposal', 'proposal.html', 'Proposal'],
    ['gantt', 'gantt.html', 'Gantt chart'],
    ['journeys', 'journeys.html', 'Unrulr journeys'],
    ['reflections', 'reflections.html', 'Reflections'],
    ['research', 'research.html', 'Research'],
  ];
  const here = document.body.dataset.page;

  const nav = document.createElement('header');
  nav.className = 'nav';
  nav.innerHTML = `<div class="wrap">
    <a class="brand" href="./"><span class="sun"></span>Helios<span class="who" style="color:var(--dim);font-weight:500">&nbsp;· Asher Greer</span></a>
    <nav class="links" aria-label="Pages">
      ${PAGES.map(([k, h, t]) => `<a href="${h}"${k === here ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
      <a class="cta" href="project/">3D tour</a>
    </nav></div>`;
  document.body.prepend(nav);
  const cur = nav.querySelector('[aria-current]');
  if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest', inline: 'center' });

  // previous / next page
  const i = PAGES.findIndex(p => p[0] === here);
  const main = document.querySelector('main');
  if (i > 0 && main) {
    const prev = PAGES[i - 1], next = PAGES[i + 1];
    const s = document.createElement('section');
    s.className = 'block';
    s.innerHTML = `<div class="wrap"><div class="pager">
      <a href="${prev[1]}"><span>Previous</span><b>← ${prev[2]}</b></a>
      ${next ? `<a class="next" href="${next[1]}"><span>Next</span><b>${next[2]} →</b></a>`
             : `<a class="next" href="project/"><span>See it</span><b>3D tour →</b></a>`}
    </div></div>`;
    main.append(s);
  }

  const foot = document.createElement('footer');
  foot.innerHTML = `<div class="wrap">
    <span>Helios · Asher Greer · Dawson School Technology Capstone, 2026</span>
    <span>Every number on these pages comes from the project's own logs and files.</span></div>`;
  document.body.append(foot);

  // jump to #section after the page (and any script-built content) is in place
  if (location.hash.length > 1) {
    const go = () => { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) t.scrollIntoView(); };
    requestAnimationFrame(go);
    addEventListener('load', go, { once: true });
  }

  // click an image to see it large
  const lb = document.createElement('dialog');
  lb.className = 'lb';
  lb.innerHTML = '<img alt=""><p></p>';
  document.body.append(lb);
  lb.addEventListener('click', () => lb.close());
  document.addEventListener('click', e => {
    const img = e.target.closest('img.zoom');
    if (!img || !lb.showModal) return;
    lb.querySelector('img').src = img.currentSrc || img.src;
    lb.querySelector('img').alt = img.alt;
    lb.querySelector('p').textContent = img.alt;
    lb.showModal();
  });
})();
