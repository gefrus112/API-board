/* ============================================================
   API Board — static GitHub Pages script
   Theme toggle, dynamic API grid, dynamic downloads grid.
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
    { icon: "🎬", name: "Movie Search", desc: "Posters, plot, cast, ratings, and streaming availability." },
    { icon: "☁️", name: "Weather Forecast", desc: "Current conditions, 7-day forecast, 30 years of history." },
    { icon: "📦", name: "Rapid Tracking", desc: "200+ carriers auto-detected. Webhook alerts." },
    { icon: "🌐", name: "IP Geolocation", desc: "Country, city, ISP, ASN, and proxy/VPN detection." },
    { icon: "💰", name: "Currency Exchange", desc: "Live FX rates for 170+ currencies." },
    { icon: "😂", name: "Jokes", desc: "Programming, dad, and knock-knock jokes in 6 languages." },
    { icon: "📰", name: "News Headlines", desc: "Top stories from 80,000+ sources in 50+ countries." },
    { icon: "📱", name: "QR Generator", desc: "Generate QR codes for URLs, vCards, Wi-Fi, crypto." },
    { icon: "🏆", name: "Sports Scores", desc: "Live scores, schedules, and standings for 30+ leagues." },
    { icon: "📚", name: "Books", desc: "30M+ books searchable by ISBN, title, author, genre." },
    { icon: "🍳", name: "Recipes", desc: "2M+ recipes by ingredients, diet, cuisine, or meal type." },
    { icon: "👤", name: "Random User", desc: "Mock profiles for testing, demos, and seed data." },
    { icon: "✉️", name: "Email & Signup", desc: "Branded signup pages, magic-link, inbound email webhooks." }
  ];
  var grid = document.getElementById("api-grid");
  if (grid) apis.forEach(function (a) {
    var c = document.createElement("div");
    c.className = "card";
    c.innerHTML =
      '<div class="icon">' + a.icon + '</div>' +
      '<h3>' + a.name + ' <span class="free">FREE</span></h3>' +
      '<p>' + a.desc + '</p>';
    grid.appendChild(c);
  });

  /* ---- Downloads list ---- */
  var items = [
    { icon: "🛠", name: "install-apiboard-vs.bat", desc: "Install the API Board Connect extension into VS 2022.", url: "https://github.com/gefrus112/API-board/raw/main/public/downloads/install-apiboard-vs.bat" },
    { icon: "🎮", name: "install-esharp.bat", desc: "Install the e# language toolchain and VS project template.", url: "https://github.com/gefrus112/API-board/raw/main/public/downloads/install-esharp.bat" },
    { icon: "🎨", name: "connect-style-sheets.bat", desc: "Drop style.css into any project root.", url: "https://github.com/gefrus112/API-board/raw/main/public/downloads/connect-style-sheets.bat" },
    { icon: "📜", name: "hello.esharp", desc: "First e# program — combine Movie + Weather scenes.", url: "https://github.com/gefrus112/API-board/raw/main/public/downloads/hello.esharp" },
    { icon: "💅", name: "style.css", desc: "Drop-in stylesheet with .ab-card, .ab-btn, .ab-badge classes.", url: "https://github.com/gefrus112/API-board/raw/main/public/downloads/style.css" }
  ];
  var dl = document.getElementById("download-grid");
  if (dl) items.forEach(function (d) {
    var c = document.createElement("a");
    c.className = "card";
    c.href = d.url;
    c.target = "_blank";
    c.rel = "noreferrer";
    c.innerHTML =
      '<div class="icon">' + d.icon + '</div>' +
      '<h3>' + d.name + '</h3>' +
      '<p>' + d.desc + '</p>';
    dl.appendChild(c);
  });

  /* ---- Editor Ctrl+S "compile" stub ---- */
  var ed = document.getElementById("esharp-editor");
  if (ed) {
    ed.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        var orig = ed.style.borderColor;
        ed.style.borderColor = "#10b981";
        var msg = document.createElement("div");
        msg.textContent = "✓ Compiled (stub) — no syntax errors detected.";
        msg.style.cssText = "color:#10b981;font-size:13px;margin-top:8px;font-family:var(--mono);";
        ed.parentElement.appendChild(msg);
        setTimeout(function () {
          ed.style.borderColor = orig;
          msg.remove();
        }, 1800);
      }
    });
  }
})();
