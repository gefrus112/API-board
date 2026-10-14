/* ============================================================
   API Board v1.4 — static GitHub Pages script
   Theme toggle · scroll reveal · dynamic grids · editor stub
   ============================================================ */

(function () {
  /* ---- Theme toggle ---- */
  var html = document.documentElement;
  var saved = localStorage.getItem("ab-theme");
  if (saved) html.setAttribute("data-ab-theme", saved);
  var btn = document.getElementById("theme-toggle");
  if (btn) btn.addEventListener("click", function () {
    var next = html.getAttribute("data-ab-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-ab-theme", next);
    localStorage.setItem("ab-theme", next);
  });

  /* ---- APIs list ---- */
  var apis = [
    { icon: "i-movie", name: "Movie Search", desc: "Posters, plot, cast, ratings, and streaming availability." },
    { icon: "i-weather", name: "Weather Forecast", desc: "Current conditions, 7-day forecast, 30 years of history." },
    { icon: "i-track", name: "Rapid Tracking", desc: "200+ carriers auto-detected. Webhook alerts." },
    { icon: "i-geo", name: "IP Geolocation", desc: "Country, city, ISP, ASN, and proxy/VPN detection." },
    { icon: "i-fx", name: "Currency Exchange", desc: "Live FX rates for 170+ currencies." },
    { icon: "i-jokes", name: "Jokes", desc: "Programming, dad, and knock-knock jokes in 6 languages." },
    { icon: "i-news", name: "News Headlines", desc: "Top stories from 80,000+ sources in 50+ countries." },
    { icon: "i-qr", name: "QR Generator", desc: "Generate QR codes for URLs, vCards, Wi-Fi, crypto." },
    { icon: "i-sports", name: "Sports Scores", desc: "Live scores, schedules, and standings for 30+ leagues." },
    { icon: "i-books", name: "Books", desc: "30M+ books searchable by ISBN, title, author, genre." },
    { icon: "i-recipes", name: "Recipes", desc: "2M+ recipes by ingredients, diet, cuisine, or meal type." },
    { icon: "i-users", name: "Random User", desc: "Mock profiles for testing, demos, and seed data." },
    { icon: "i-email", name: "Email & Signup", desc: "Branded signup pages, magic-link, inbound email webhooks." }
  ];
  var grid = document.getElementById("api-grid");
  if (grid) apis.forEach(function (a) {
    var c = document.createElement("div");
    c.className = "card reveal";
    c.innerHTML =
      '<svg class="icon"><use href="#' + a.icon + '"/></svg>' +
      '<h3>' + a.name + ' <span class="free">FREE</span></h3>' +
      '<p>' + a.desc + '</p>';
    grid.appendChild(c);
  });

  /* ---- Downloads list ---- */
  var items = [
    { icon: "i-download", name: "install-apiboard-vs.bat", desc: "Install the API Board Connect extension into VS 2022.", url: "https://github.com/gefrus112/API-board/raw/main/public/downloads/install-apiboard-vs.bat" },
    { icon: "i-download", name: "install-esharp.bat", desc: "Install the e# language toolchain and VS project template.", url: "https://github.com/gefrus112/API-board/raw/main/public/downloads/install-esharp.bat" },
    { icon: "i-download", name: "connect-style-sheets.bat", desc: "Drop style.css into any project root.", url: "https://github.com/gefrus112/API-board/raw/main/public/downloads/connect-style-sheets.bat" },
    { icon: "i-download", name: "game-launcher-detector.bat", desc: "Detect Steam, Roblox, Minecraft, Epic Games installed games.", url: "https://github.com/gefrus112/API-board/raw/main/public/downloads/game-launcher-detector.bat" },
    { icon: "i-download", name: "hello.esharp", desc: "First e# program — combine Movie + Weather scenes.", url: "https://github.com/gefrus112/API-board/raw/main/public/downloads/hello.esharp" },
    { icon: "i-download", name: "style.css", desc: "Drop-in stylesheet with .ab-card, .ab-btn, .ab-badge classes.", url: "https://github.com/gefrus112/API-board/raw/main/public/downloads/style.css" }
  ];
  var dl = document.getElementById("download-grid");
  if (dl) items.forEach(function (d) {
    var c = document.createElement("a");
    c.className = "card reveal";
    c.href = d.url;
    c.target = "_blank";
    c.rel = "noreferrer";
    c.innerHTML =
      '<svg class="icon"><use href="#' + d.icon + '"/></svg>' +
      '<h3>' + d.name + '</h3>' +
      '<p>' + d.desc + '</p>';
    dl.appendChild(c);
  });

  /* ---- Scroll reveal via IntersectionObserver ---- */
  function setupReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.dataset.delay || "0", 10);
          setTimeout(function () { el.classList.add("is-visible"); }, delay);
          io.unobserve(el);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupReveal);
  } else {
    setupReveal();
  }

  /* ---- e# editor Ctrl+S "compile" stub ---- */
  var ed = document.getElementById("esharp-editor");
  if (ed) {
    ed.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        ed.style.borderColor = "#10b981";
        var msg = document.createElement("div");
        msg.textContent = "✓ Compiled (stub) — no syntax errors detected.";
        msg.style.cssText = "color:#10b981;font-size:13px;margin-top:8px;font-family:var(--mono);";
        ed.parentElement.appendChild(msg);
        setTimeout(function () {
          ed.style.borderColor = "";
          msg.remove();
        }, 1800);
      }
    });
  }
})();
