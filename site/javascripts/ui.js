/* =========================================================
   UI controls: theme presets, colors, zoom, page width, font,
   density, progress bar, page tools and keyboard shortcuts.
   Settings are saved in the browser (localStorage).

   >>> CHANGE THE DEFAULTS HERE <<<
   ========================================================= */
(function () {
  "use strict";

  var KEY = "docs-ui-prefs-v1";
  var DEFAULTS = {
    preset: "Indigo",     // name of a preset below
    scheme: "default",    // default = light, slate = dark
    primary: "indigo",    // header and link color
    accent: "indigo",     // highlight color
    fit: true,            // true = use the full screen width
    zoom: 1.1,            // 1 = normal, 1.1 = 10% larger on first launch
    font: "default",      // default | system | serif | mono
    density: "comfortable", // comfortable | compact
    progress: true        // reading progress bar
  };

  var PRESETS = [
    { name: "Indigo",   scheme: "default", primary: "indigo",      accent: "indigo" },
    { name: "Ocean",    scheme: "default", primary: "cyan",        accent: "light-blue" },
    { name: "Forest",   scheme: "default", primary: "green",       accent: "light-green" },
    { name: "Sunset",   scheme: "default", primary: "deep-orange", accent: "amber" },
    { name: "Rose",     scheme: "default", primary: "pink",        accent: "pink" },
    { name: "Midnight", scheme: "slate",   primary: "deep-purple", accent: "purple" },
    { name: "Graphite", scheme: "slate",   primary: "blue-grey",   accent: "teal" },
    { name: "Mono",     scheme: "default", primary: "black",       accent: "blue" }
  ];

  var HEX = {
    "red": "#ef5350", "pink": "#e91e63", "purple": "#ab47bc", "deep-purple": "#7e57c2",
    "indigo": "#3f51b5", "blue": "#2196f3", "light-blue": "#03a9f4", "cyan": "#00bcd4",
    "teal": "#009688", "green": "#4caf50", "light-green": "#7cb342", "lime": "#c0ca33",
    "yellow": "#f9a825", "amber": "#ffa000", "orange": "#fb8c00", "deep-orange": "#ff7043",
    "brown": "#795548", "grey": "#757575", "blue-grey": "#546e7a", "black": "#212121"
  };
  var NO_ACCENT = ["brown", "grey", "blue-grey", "black", "white"];

  var root = document.documentElement;
  var prefs = load();
  var panel, fab, toast, bar, toastTimer;

  /* ---------- storage ---------- */
  function load() {
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {}
    var out = {};
    for (var k in DEFAULTS) { out[k] = (k in saved) ? saved[k] : DEFAULTS[k]; }
    return out;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) {}
  }

  /* ---------- apply functions ---------- */
  function setSchemeViaMaterial(s) {
    var inp = document.querySelector('input[data-md-color-scheme="' + s + '"]');
    if (inp && !inp.checked) {
      inp.checked = true;
      inp.dispatchEvent(new Event("change", { bubbles: true }));
    }
    document.body.setAttribute("data-md-color-scheme", s);
  }
  function applyColors() {
    var b = document.body;
    if (!b) return;
    if (prefs.scheme) setSchemeViaMaterial(prefs.scheme);
    b.setAttribute("data-md-color-primary", prefs.primary);
    b.setAttribute("data-md-color-accent", prefs.accent);
  }
  function applyFit() { root.classList.toggle("fit-width", !!prefs.fit); }
  function applyZoom() {
    root.style.fontSize = "";
    var base = parseFloat(getComputedStyle(root).fontSize);
    root.style.fontSize = (base * prefs.zoom).toFixed(2) + "px";
  }
  function applyFont() { root.setAttribute("data-ui-font", prefs.font); }
  function applyDensity() { root.setAttribute("data-ui-density", prefs.density); }
  function applyProgress() { root.setAttribute("data-ui-progress", prefs.progress ? "on" : "off"); }
  function applyAll() {
    applyFit(); applyFont(); applyDensity(); applyProgress(); applyZoom(); applyColors();
  }

  /* Keep our colors when Material's header toggle resets them */
  function watchPalette() {
    new MutationObserver(function () {
      var b = document.body;
      if (b.getAttribute("data-md-color-primary") !== prefs.primary) {
        b.setAttribute("data-md-color-primary", prefs.primary);
      }
      if (b.getAttribute("data-md-color-accent") !== prefs.accent) {
        b.setAttribute("data-md-color-accent", prefs.accent);
      }
      var s = b.getAttribute("data-md-color-scheme");
      if (s && prefs.scheme !== s && prefs.scheme !== null) { prefs.scheme = s; save(); }
    }).observe(document.body, {
      attributes: true,
      attributeFilter: ["data-md-color-primary", "data-md-color-accent", "data-md-color-scheme"]
    });
  }

  /* ---------- small helpers ---------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 1600);
  }
  function setZoom(z) {
    prefs.zoom = Math.min(1.6, Math.max(0.8, Math.round(z * 100) / 100));
    save(); applyZoom(); refreshPanel();
  }
  function setMode(m) {
    prefs.scheme = m; prefs.preset = "";
    save(); applyColors(); refreshPanel();
  }
  function setFit(v) { prefs.fit = v; save(); applyFit(); refreshPanel(); }
  function copyLink() {
    var done = function () { showToast("Page link copied"); };
    if (navigator.clipboard) { navigator.clipboard.writeText(location.href).then(done); }
    else { showToast(location.href); }
  }
  function setAllDetails(open) {
    var list = document.querySelectorAll("article details");
    for (var i = 0; i < list.length; i++) { list[i].open = open; }
    showToast((open ? "Expanded " : "Collapsed ") + list.length + " sections");
  }

  /* ---------- panel ---------- */
  function build() {
    if (document.getElementById("ui-fab")) return;

    bar = el("div"); bar.id = "ui-progress"; document.body.appendChild(bar);
    toast = el("div"); toast.id = "ui-toast"; document.body.appendChild(toast);

    fab = el("button", "", "&#9881;");
    fab.id = "ui-fab";
    fab.title = "Settings (Alt+T)";
    fab.setAttribute("aria-label", "Open settings");
    fab.onclick = togglePanel;
    document.body.appendChild(fab);

    panel = el("div");
    panel.id = "ui-panel";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Display settings");

    var t = el("div", "ui-title", "<span>Display settings</span>");
    var x = el("button", "ui-close", "&times;");
    x.setAttribute("aria-label", "Close");
    x.onclick = togglePanel;
    t.appendChild(x);
    panel.appendChild(t);

    /* Theme presets */
    panel.appendChild(el("h4", "", "Theme presets"));
    var presets = el("div", "ui-presets");
    PRESETS.forEach(function (p) {
      var b = el("button", "ui-preset");
      b.dataset.preset = p.name;
      var dark = p.scheme === "slate";
      b.innerHTML = '<i style="background:linear-gradient(135deg,' + HEX[p.primary] +
        " 55%," + HEX[p.accent] + ' 55%);' + (dark ? "box-shadow: inset 0 0 0 3px #222;" : "") +
        '"></i>' + p.name;
      b.onclick = function () {
        prefs.preset = p.name; prefs.scheme = p.scheme;
        prefs.primary = p.primary; prefs.accent = p.accent;
        save(); applyColors(); refreshPanel();
      };
      presets.appendChild(b);
    });
    panel.appendChild(presets);

    /* Light / dark mode */
    panel.appendChild(el("h4", "", "Mode"));
    var modeRow = el("div", "ui-row");
    [["default", "Light"], ["slate", "Dark"]].forEach(function (m) {
      var b = el("button", "ui-btn", m[1]);
      b.dataset.mode = m[0];
      b.onclick = function () { setMode(m[0]); };
      modeRow.appendChild(b);
    });
    panel.appendChild(modeRow);

    /* Custom color */
    panel.appendChild(el("h4", "", "Custom color"));
    var sw = el("div", "ui-swatches");
    Object.keys(HEX).forEach(function (c) {
      var s = el("button", "ui-swatch");
      s.style.background = HEX[c];
      s.dataset.color = c;
      s.title = c;
      s.onclick = function () {
        prefs.primary = c;
        prefs.accent = NO_ACCENT.indexOf(c) > -1 ? "indigo" : c;
        prefs.preset = "";
        save(); applyColors(); refreshPanel();
      };
      sw.appendChild(s);
    });
    panel.appendChild(sw);

    /* Layout */
    panel.appendChild(el("h4", "", "Page width"));
    var lay = el("div", "ui-row");
    var bFit = el("button", "ui-btn", "Fit screen"); bFit.dataset.fit = "1";
    var bCen = el("button", "ui-btn", "Centered"); bCen.dataset.fit = "0";
    bFit.onclick = function () { setFit(true); };
    bCen.onclick = function () { setFit(false); };
    lay.appendChild(bFit); lay.appendChild(bCen);
    panel.appendChild(lay);

    /* Zoom */
    panel.appendChild(el("h4", "", "Zoom"));
    var z = el("div", "ui-row");
    var zm = el("button", "ui-btn", "A&minus;");
    var zv = el("span", "ui-zoom-val"); zv.id = "ui-zoom-val";
    var zp = el("button", "ui-btn", "A+");
    var zr = el("button", "ui-btn", "Reset");
    zm.onclick = function () { setZoom(prefs.zoom - 0.05); };
    zp.onclick = function () { setZoom(prefs.zoom + 0.05); };
    zr.onclick = function () { setZoom(1); };
    z.appendChild(zm); z.appendChild(zv); z.appendChild(zp); z.appendChild(zr);
    panel.appendChild(z);

    /* Font */
    panel.appendChild(el("h4", "", "Font"));
    var sel = el("select");
    sel.id = "ui-font";
    [["default", "Default (Roboto)"], ["system", "System"], ["serif", "Serif"], ["mono", "Monospace"]]
      .forEach(function (o) {
        var op = el("option", "", o[1]); op.value = o[0]; sel.appendChild(op);
      });
    sel.onchange = function () { prefs.font = sel.value; save(); applyFont(); };
    panel.appendChild(sel);

    /* Density */
    panel.appendChild(el("h4", "", "Density"));
    var den = el("div", "ui-row");
    ["comfortable", "compact"].forEach(function (d) {
      var b = el("button", "ui-btn", d.charAt(0).toUpperCase() + d.slice(1));
      b.dataset.density = d;
      b.onclick = function () { prefs.density = d; save(); applyDensity(); refreshPanel(); };
      den.appendChild(b);
    });
    panel.appendChild(den);

    /* Options */
    panel.appendChild(el("h4", "", "Options"));
    var lab = el("label", "ui-check", '<input type="checkbox" id="ui-prog"> Reading progress bar');
    lab.querySelector("input").onchange = function (e) {
      prefs.progress = e.target.checked; save(); applyProgress();
    };
    panel.appendChild(lab);

    /* Page tools */
    panel.appendChild(el("h4", "", "Page tools"));
    var tools = el("div", "ui-row");
    [
      ["Copy link", copyLink],
      ["Print", function () { window.print(); }],
      ["Expand all", function () { setAllDetails(true); }],
      ["Collapse all", function () { setAllDetails(false); }],
      ["Top", function () { window.scrollTo({ top: 0, behavior: "smooth" }); }]
    ].forEach(function (a) {
      var b = el("button", "ui-btn", a[0]); b.onclick = a[1]; tools.appendChild(b);
    });
    panel.appendChild(tools);

    /* Reset */
    var reset = el("button", "ui-btn", "Reset everything to defaults");
    reset.style.marginTop = "0.9rem";
    reset.onclick = function () {
      for (var k in DEFAULTS) { prefs[k] = DEFAULTS[k]; }
      save(); applyAll(); refreshPanel(); showToast("Settings reset");
    };
    panel.appendChild(reset);

    document.body.appendChild(panel);
    refreshPanel();
  }

  function refreshPanel() {
    if (!panel) return;
    var i, list;
    list = panel.querySelectorAll(".ui-preset");
    for (i = 0; i < list.length; i++) {
      list[i].classList.toggle("is-on", list[i].dataset.preset === prefs.preset);
    }
    list = panel.querySelectorAll(".ui-swatch");
    for (i = 0; i < list.length; i++) {
      list[i].classList.toggle("is-on", list[i].dataset.color === prefs.primary);
    }
    list = panel.querySelectorAll("[data-mode]");
    for (i = 0; i < list.length; i++) {
      list[i].classList.toggle("is-on", list[i].dataset.mode === (prefs.scheme || "default"));
    }
    list = panel.querySelectorAll("[data-fit]");
    for (i = 0; i < list.length; i++) {
      list[i].classList.toggle("is-on", (list[i].dataset.fit === "1") === !!prefs.fit);
    }
    list = panel.querySelectorAll("[data-density]");
    for (i = 0; i < list.length; i++) {
      list[i].classList.toggle("is-on", list[i].dataset.density === prefs.density);
    }
    document.getElementById("ui-zoom-val").textContent = Math.round(prefs.zoom * 100) + "%";
    document.getElementById("ui-font").value = prefs.font;
    document.getElementById("ui-prog").checked = !!prefs.progress;
  }

  function togglePanel() {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) refreshPanel();
  }

  /* ---------- per-page features ---------- */
  function updateProgress() {
    if (!bar) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, p)) + "%";
  }
  function initTables() {
    if (typeof Tablesort === "undefined") return;
    var tables = document.querySelectorAll("article table:not([class])");
    for (var i = 0; i < tables.length; i++) {
      if (!tables[i].dataset.sortReady) {
        new Tablesort(tables[i]);
        tables[i].dataset.sortReady = "1";
      }
    }
  }
  function onPage() { initTables(); updateProgress(); }

  /* ---------- keyboard shortcuts (Alt + key) ---------- */
  document.addEventListener("keydown", function (e) {
    var t = e.target;
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    if (e.key === "Escape" && panel && !panel.hidden) { togglePanel(); return; }
    if (!e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.code === "KeyT") { e.preventDefault(); togglePanel(); }
    else if (e.code === "Equal") { e.preventDefault(); setZoom(prefs.zoom + 0.05); }
    else if (e.code === "Minus") { e.preventDefault(); setZoom(prefs.zoom - 0.05); }
    else if (e.code === "Digit0") { e.preventDefault(); setZoom(1); }
    else if (e.code === "KeyD") { e.preventDefault(); setMode(prefs.scheme === "slate" ? "default" : "slate"); }
    else if (e.code === "KeyW") { e.preventDefault(); setFit(!prefs.fit); }
  });

  /* ---------- start ---------- */
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyZoom, 150);
  });
  window.addEventListener("scroll", updateProgress, { passive: true });

  function start() {
    applyAll();
    build();
    watchPalette();
    onPage();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
  if (typeof document$ !== "undefined") {
    document$.subscribe(onPage);
  }
})();
