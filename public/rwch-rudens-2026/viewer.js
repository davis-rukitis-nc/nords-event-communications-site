(() => {
  "use strict";

  const BASE = "/rwch-rudens-2026";
  const PAGES = 64;
  const RATIO = 297.638 / 425.197; // page width / height (trim size)
  const pad = (n) => String(n).padStart(2, "0");
  const src = (n, size) => `${BASE}/pages/${pad(n)}-${size}.webp`;

  const $ = (id) => document.getElementById(id);
  const stage = $("stage");
  const bookEl = $("book");
  const counter = $("counter");
  const progress = $("progress");
  const prevBtn = $("prev");
  const nextBtn = $("next");
  const sheet = $("sheet");
  const thumbs = $("thumbs");
  const zoomView = $("zoomview");
  const zoomScroll = $("zoom-scroll");
  const toast = $("toast");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Pages -------------------------------------------------------------
  const imgs = [];
  for (let n = 1; n <= PAGES; n++) {
    const page = document.createElement("div");
    page.className = "page";
    if (n === 1 || n === PAGES) page.dataset.density = "hard";
    const img = document.createElement("img");
    img.alt = `Page ${n}`;
    img.decoding = "async";
    img.draggable = false;
    page.appendChild(img);
    bookEl.appendChild(page);
    imgs.push(img);
  }

  let pageW = 0;
  function loadAround(index) {
    // index is 0-based; load a window so the next flips never show blank paper
    const from = Math.max(0, index - 3);
    const to = Math.min(PAGES - 1, index + 5);
    for (let i = from; i <= to; i++) {
      const img = imgs[i];
      img.sizes = `${Math.max(1, Math.round(pageW))}px`;
      if (!img.srcset) {
        img.srcset = `${src(i + 1, "m")} 700w, ${src(i + 1, "l")} 1300w`;
        img.src = src(i + 1, "m");
      }
    }
  }

  // ---- Layout ------------------------------------------------------------
  // Spread on wide screens, single page when one page alone would be clearly bigger.
  function layout() {
    const cs = getComputedStyle(stage);
    const W = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const H = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const spreadH = Math.min(H, W / 2 / RATIO);
    const singleH = Math.min(H, W / RATIO);
    const portrait = spreadH < singleH * 0.75;
    const h = Math.floor(portrait ? singleH : spreadH);
    const w = Math.floor(h * RATIO);
    pageW = w;
    bookEl.style.width = `${portrait ? w : w * 2}px`;
    bookEl.style.height = `${h}px`;
    return portrait;
  }

  // ---- Hash (#p=12) ------------------------------------------------------
  function pageFromHash() {
    const m = /^#p=(\d+)$/.exec(location.hash);
    const n = m ? parseInt(m[1], 10) : 1;
    return Math.min(PAGES, Math.max(1, n)) - 1;
  }
  function writeHash(index) {
    const url = index === 0 ? location.pathname + location.search : `#p=${index + 1}`;
    history.replaceState(null, "", url);
  }

  // ---- Flipbook ----------------------------------------------------------
  let pf = null;
  let current = pageFromHash();

  function visiblePages(index) {
    if (!pf || pf.getOrientation() === "portrait" || index === 0 || index === PAGES - 1) return [index];
    // landscape with cover: spreads are (1,2), (3,4) … in 0-based terms
    const left = index % 2 === 1 ? index : index - 1;
    return [left, Math.min(left + 1, PAGES - 1)];
  }

  function updateUI(index) {
    current = index;
    const vis = visiblePages(index);
    counter.textContent = vis.length > 1 ? `${vis[0] + 1}–${vis[1] + 1} / ${PAGES}` : `${vis[0] + 1} / ${PAGES}`;
    progress.style.width = `${((vis[vis.length - 1] + 1) / PAGES) * 100}%`;
    prevBtn.disabled = vis[0] === 0;
    nextBtn.disabled = vis[vis.length - 1] >= PAGES - 1;
    loadAround(index);
    writeHash(vis[0]);
    thumbs.querySelectorAll("button").forEach((b) => {
      b.setAttribute("aria-current", vis.includes(Number(b.dataset.i)) ? "true" : "false");
    });
  }

  function init() {
    if (!window.St || !window.St.PageFlip) {
      bookEl.innerHTML = `<p class="noscript"><a href="${BASE}/RWCH_rudens2026.pdf">Open the PDF</a></p>`;
      return;
    }
    const portrait = layout();
    loadAround(current);

    pf = new window.St.PageFlip(bookEl, {
      width: 700,
      height: Math.round(700 / RATIO),
      size: "stretch",
      minWidth: portrait ? 100000 : 1, // we decide orientation ourselves (see setOrientation)
      maxWidth: 4000,
      minHeight: 1,
      maxHeight: 6000,
      autoSize: false,
      showCover: true,
      usePortrait: true,
      drawShadow: true,
      maxShadowOpacity: 0.35,
      flippingTime: reduceMotion ? 150 : 700,
      mobileScrollSupport: false,
      showPageCorners: true,
      startPage: current,
    });
    pf.loadFromHTML(bookEl.querySelectorAll(".page"));
    // page-flip writes min-width = minWidth onto the block; we size the block ourselves
    bookEl.style.minWidth = "0";
    bookEl.style.minHeight = "0";
    pf.update();

    pf.on("flip", (e) => updateUI(e.data));
    pf.on("changeOrientation", () => updateUI(pf.getCurrentPageIndex()));
    updateUI(pf.getCurrentPageIndex());
  }

  function setOrientation() {
    if (!pf) return;
    const portrait = layout();
    pf.getSettings().minWidth = portrait ? 100000 : 1;
    bookEl.style.minWidth = "0";
    pf.update();
    loadAround(pf.getCurrentPageIndex());
  }

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeTimer);
    resizeTimer = requestAnimationFrame(setOrientation);
  });

  window.addEventListener("hashchange", () => {
    if (!pf) return;
    const i = pageFromHash();
    if (!visiblePages(current).includes(i)) pf.turnToPage(i);
    updateUI(pf.getCurrentPageIndex());
  });

  // ---- Controls ----------------------------------------------------------
  prevBtn.addEventListener("click", () => pf && pf.flipPrev());
  nextBtn.addEventListener("click", () => pf && pf.flipNext());

  document.addEventListener("keydown", (e) => {
    if (!pf) return;
    if (e.key === "Escape") { closeSheet(); closeZoom(); return; }
    if (!sheet.hidden || !zoomView.hidden) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); pf.flipNext(); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); pf.flipPrev(); }
    else if (e.key === "Home") { pf.turnToPage(0); updateUI(0); }
    else if (e.key === "End") { pf.turnToPage(PAGES - 1); updateUI(pf.getCurrentPageIndex()); }
  });

  // All pages
  for (let n = 1; n <= PAGES; n++) {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.i = String(n - 1);
    b.setAttribute("aria-label", `Go to page ${n}`);
    const img = document.createElement("img");
    img.loading = "lazy";
    img.alt = "";
    img.dataset.src = src(n, "t");
    const label = document.createElement("span");
    label.textContent = String(n);
    b.append(img, label);
    li.appendChild(b);
    thumbs.appendChild(li);
  }
  thumbs.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b || !pf) return;
    const i = Number(b.dataset.i);
    closeSheet();
    pf.turnToPage(i);
    updateUI(pf.getCurrentPageIndex());
  });

  let lastFocus = null;
  function openSheet() {
    lastFocus = document.activeElement;
    thumbs.querySelectorAll("img[data-src]").forEach((img) => { img.src = img.dataset.src; img.removeAttribute("data-src"); });
    sheet.hidden = false;
    const cur = thumbs.querySelector('button[aria-current="true"]');
    if (cur) { cur.scrollIntoView({ block: "center" }); cur.focus(); }
  }
  function closeSheet() {
    if (sheet.hidden) return;
    sheet.hidden = true;
    if (lastFocus) lastFocus.focus();
  }
  $("grid").addEventListener("click", openSheet);
  counter.addEventListener("click", openSheet);
  $("sheet-close").addEventListener("click", closeSheet);

  // Zoom: current page(s) at full resolution, scroll and pinch freely
  function openZoom() {
    if (!pf) return;
    lastFocus = document.activeElement;
    const vis = visiblePages(current);
    const fit = Math.max(window.innerWidth / vis.length, 320);
    const w = Math.round(Math.min(1300, fit * 2));
    zoomScroll.innerHTML = "";
    vis.forEach((i) => {
      const img = document.createElement("img");
      img.src = src(i + 1, "l");
      img.alt = `Page ${i + 1}`;
      img.width = w;
      img.height = Math.round(w / RATIO);
      zoomScroll.appendChild(img);
    });
    zoomView.hidden = false;
    $("zoom-close").focus();
  }
  function closeZoom() {
    if (zoomView.hidden) return;
    zoomView.hidden = true;
    zoomScroll.innerHTML = "";
    if (lastFocus) lastFocus.focus();
  }
  $("zoom").addEventListener("click", openZoom);
  $("zoom-close").addEventListener("click", closeZoom);

  // Share
  let toastTimer = 0;
  function say(text) {
    toast.textContent = text;
    toast.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("on"), 1800);
  }
  $("share").addEventListener("click", async () => {
    const url = location.href;
    if (navigator.share) {
      try { await navigator.share({ title: document.title, url }); } catch (_) { /* dismissed */ }
      return;
    }
    try { await navigator.clipboard.writeText(url); say("Link copied"); }
    catch (_) { say(url); }
  });

  // Full screen where the browser supports it (not iPhone Safari)
  const fsBtn = $("fullscreen");
  if (document.fullscreenEnabled) {
    fsBtn.hidden = false;
    fsBtn.addEventListener("click", () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen().catch(() => {});
    });
  }

  init();
})();
