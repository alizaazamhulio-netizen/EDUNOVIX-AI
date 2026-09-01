// fluid-dynamics.js
/* ===== MDCAT Fluid Dynamics — chapter logic, simulations, quiz ===== */
(function () {
  "use strict";

  var RHO = 1000, G = 9.8;
  var KEY = { read: "fd.read.v1", num: "fd.num.v1", quiz: "fd.quiz.v1", best: "fd.best.v1" };

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function load(k, f) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch (e) { return f; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------------- TOC + progress ---------------- */
  var sections = $$("section.chapter-section");
  var readState = load(KEY.read, {});
  var tocLinks = $("#tocLinks");

  sections.forEach(function (sec, i) {
    var a = document.createElement("a");
    a.href = "#" + sec.id;
    a.dataset.sec = sec.id;
    a.innerHTML = '<span class="dot"></span><span>' + (i + 1) + ". " + sec.dataset.title + "</span>";
    tocLinks.appendChild(a);
  });
  $("#metaSections").textContent = String(sections.length);

  function renderProgress() {
    var total = sections.length, done = 0;
    sections.forEach(function (sec) {
      var isRead = !!readState[sec.id];
      if (isRead) done++;
      var btn = $('[data-read="' + sec.id + '"]');
      if (btn) {
        btn.setAttribute("aria-pressed", isRead ? "true" : "false");
        btn.textContent = isRead ? "Read ✓" : "Mark as read";
      }
      var link = $('#tocLinks a[data-sec="' + sec.id + '"]');
      if (link) link.classList.toggle("done", isRead);
    });
    var pct = Math.round((done / total) * 100);
    $("#progressFill").style.width = pct + "%";
    $("#progressText").textContent = pct + "%";
  }

  $$(".read-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.dataset.read;
      if (readState[id]) delete readState[id]; else readState[id] = true;
      save(KEY.read, readState);
      renderProgress();
    });
  });

  $("#resetProgress").addEventListener("click", function () {
    readState = {}; save(KEY.read, readState); renderProgress();
  });

  // active section highlighting
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          $$("#tocLinks a").forEach(function (a) { a.classList.toggle("active", a.dataset.sec === en.target.id); });
        }
      });
    }, { rootMargin: "-84px 0px -70% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }
  renderProgress();

  /* ---------------- Search ---------------- */
  var index = sections.map(function (sec) {
    return { id: sec.id, title: sec.dataset.title, text: (sec.innerText || "").replace(/\s+/g, " ") };
  });
  var sInput = $("#searchInput"), sBox = $("#searchResults");

  function clearMarks() {
    $$("mark.hit").forEach(function (m) {
      var p = m.parentNode; p.replaceChild(document.createTextNode(m.textContent), m); p.normalize();
    });
  }

  function runSearch() {
    var q = sInput.value.trim().toLowerCase();
    sBox.innerHTML = "";
    if (q.length < 2) { sBox.classList.remove("open"); return; }
    var hits = [];
    index.forEach(function (it) {
      var lt = it.title.toLowerCase(), lx = it.text.toLowerCase();
      var pos = lx.indexOf(q);
      if (lt.indexOf(q) > -1 || pos > -1) {
        var snip = pos > -1 ? it.text.substr(Math.max(0, pos - 40), 110) : it.title;
        hits.push({ id: it.id, title: it.title, snip: snip });
      }
    });
    if (!hits.length) {
      sBox.innerHTML = '<div class="sr-empty">No matches for “' + q + '”.</div>';
    } else {
      hits.forEach(function (h) {
        var b = document.createElement("button");
        b.type = "button";
        b.innerHTML = '<span class="sr-sec">' + h.title + "</span>…" + h.snip.replace(/[<>]/g, "") + "…";
        b.addEventListener("click", function () {
          sBox.classList.remove("open");
          var sec = document.getElementById(h.id);
          sec.scrollIntoView({ behavior: "smooth", block: "start" });
          clearMarks();
          highlight(sec, q);
        });
        sBox.appendChild(b);
      });
    }
    sBox.classList.add("open");
  }

  function highlight(root, q) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      if (!node.nodeValue) return;
      var i = node.nodeValue.toLowerCase().indexOf(q);
      if (i < 0 || node.parentNode.nodeName === "SCRIPT") return;
      var mid = node.splitText(i);
      mid.splitText(q.length);
      var mark = document.createElement("mark");
      mark.className = "hit";
      mark.textContent = mid.nodeValue;
      mid.parentNode.replaceChild(mark, mid);
    });
  }

  sInput.addEventListener("input", runSearch);
  sInput.addEventListener("focus", runSearch);
  document.addEventListener("click", function (e) {
    if (!sBox.contains(e.target) && e.target !== sInput) sBox.classList.remove("open");
  });

  /* ---------------- Canvas helper ---------------- */
  function setupCanvas(cv) {
    function resize() {
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600;
      var h = parseInt(cv.getAttribute("height"), 10) || 220;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.height = h + "px";
      var ctx = cv.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cv._w = w; cv._h = h;
    }
    resize();
    window.addEventListener("resize", resize);
    return cv.getContext("2d");
  }

  var loops = [];
  function addLoop(fn) { loops.push({ fn: fn, on: true }); return loops[loops.length - 1]; }
  var last = performance.now();
  function tick(now) {
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    loops.forEach(function (l) { if (l.on) l.fn(dt); });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  function bindPlay(name, loop) {
    var btn = document.querySelector('[data-play="' + name + '"]');
    if (!btn) return;
    btn.addEventListener("click", function () {
      loop.on = !loop.on;
      btn.textContent = loop.on ? "Pause" : "Play";
    });
  }

  /* ---------------- 1. Streamline flow ---------------- */
  (function () {
    var cv = $("#cvStream"); if (!cv) return;
    var ctx = setupCanvas(cv);
    var speed = 1, lines = 7, t = 0;
    var rs = $("#rngStreamSpeed"), rl = $("#rngStreamLines");
    rs.addEventListener("input", function () { speed = +rs.value; $("#valStreamSpeed").textContent = speed.toFixed(1) + "×"; });
    rl.addEventListener("input", function () { lines = +rl.value; $("#valStreamLines").textContent = lines; });

    var loop = addLoop(function (dt) {
      t += dt * speed;
      var w = cv._w, h = cv._h;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#08131f"; ctx.fillRect(0, 0, w, h);
      // obstacle
      var ox = w * 0.55, oy = h / 2, orad = h * 0.18;
      for (var i = 0; i < lines; i++) {
        var y0 = (h / (lines + 1)) * (i + 1);
        ctx.beginPath();
        for (var x = 0; x <= w; x += 4) {
          var dy = y0 - oy;
          var dx = x - ox;
          var infl = Math.exp(-(dx * dx) / (2 * (orad * 1.6) * (orad * 1.6)));
          var push = (dy >= 0 ? 1 : -1) * infl * orad * 0.9 * (1 - Math.min(1, Math.abs(dy) / (h * 0.45)));
          var y = y0 + push;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(143,227,214,.45)"; ctx.lineWidth = 1.2; ctx.stroke();
        // particles
        for (var k = 0; k < 4; k++) {
          var px = ((t * 90 + k * (w / 4) + i * 25) % (w + 40)) - 20;
          if (px < 0) continue;
          var ddx = px - ox, ddy = y0 - oy;
          var inf2 = Math.exp(-(ddx * ddx) / (2 * (orad * 1.6) * (orad * 1.6)));
          var py = y0 + (ddy >= 0 ? 1 : -1) * inf2 * orad * 0.9 * (1 - Math.min(1, Math.abs(ddy) / (h * 0.45)));
          ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 6.2832);
          ctx.fillStyle = "#7fd7ff"; ctx.fill();
        }
      }
      ctx.beginPath(); ctx.arc(ox, oy, orad, 0, 6.2832);
      ctx.fillStyle = "#123650"; ctx.fill();
      ctx.strokeStyle = "#4d7ea0"; ctx.stroke();
      ctx.fillStyle = "rgba(232,242,248,.8)"; ctx.font = "12px sans-serif";
      ctx.fillText("Streamlines never cross · steady flow", 12, 18);
    });
    bindPlay("stream", loop);
  })();

  /* ---------------- 2. Continuity ---------------- */
  (function () {
    var cv = $("#cvCont"); if (!cv) return;
    var ctx = setupCanvas(cv);
    var A1 = 0.040, A2 = 0.016, v1 = 1.5;
    var parts = [];
    for (var i = 0; i < 90; i++) parts.push({ x: Math.random(), lane: Math.random() });

    function radiusAt(fx) { // fraction 0..1 across canvas → pipe half-height fraction
      var a;
      if (fx < 0.33) a = A1;
      else if (fx > 0.67) a = A2;
      else {
        var s = (fx - 0.33) / 0.34;
        s = s * s * (3 - 2 * s);
        a = A1 + (A2 - A1) * s;
      }
      return a;
    }

    function update() {
      $("#valA1").textContent = A1.toFixed(3) + " m²";
      $("#valA2").textContent = A2.toFixed(3) + " m²";
      $("#valV1").textContent = v1.toFixed(1) + " m/s";
      var v2 = A1 * v1 / A2;
      $("#outV2").textContent = v2.toFixed(2) + " m/s";
      $("#outQ").textContent = (A1 * v1).toFixed(3) + " m³/s";
      $("#outRatio").textContent = (v2 / v1).toFixed(2);
    }
    $("#rngA1").addEventListener("input", function () { A1 = +this.value / 1000; update(); });
    $("#rngA2").addEventListener("input", function () { A2 = +this.value / 1000; update(); });
    $("#rngV1").addEventListener("input", function () { v1 = +this.value; update(); });
    update();

    var loop = addLoop(function (dt) {
      var w = cv._w, h = cv._h, mid = h / 2;
      var maxA = 0.060;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#08131f"; ctx.fillRect(0, 0, w, h);

      // pipe walls
      ctx.beginPath();
      for (var x = 0; x <= w; x += 3) {
        var r = (radiusAt(x / w) / maxA) * (h * 0.40) + 6;
        if (x === 0) ctx.moveTo(x, mid - r); else ctx.lineTo(x, mid - r);
      }
      for (var x2 = w; x2 >= 0; x2 -= 3) {
        var r2 = (radiusAt(x2 / w) / maxA) * (h * 0.40) + 6;
        ctx.lineTo(x2, mid + r2);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(28,90,130,.35)"; ctx.fill();
      ctx.strokeStyle = "#5a92b5"; ctx.lineWidth = 2; ctx.stroke();

      // particles: speed ∝ 1/A
      parts.forEach(function (p) {
        var a = radiusAt(p.x);
        var v = (A1 * v1) / a; // m/s
        p.x += (v * dt) / 12;
        if (p.x > 1) { p.x -= 1; p.lane = Math.random(); }
        var r = (a / maxA) * (h * 0.40) + 4;
        var y = mid + (p.lane * 2 - 1) * r * 0.82;
        var px = p.x * w;
        var speedNorm = Math.min(1, v / 8);
        ctx.beginPath(); ctx.arc(px, y, 2.4, 0, 6.2832);
        ctx.fillStyle = "rgb(" + Math.round(110 + 145 * speedNorm) + "," + Math.round(215 - 90 * speedNorm) + ",255)";
        ctx.fill();
      });

      ctx.fillStyle = "rgba(232,242,248,.9)"; ctx.font = "12px sans-serif";
      ctx.fillText("A₁ = " + A1.toFixed(3) + " m², v₁ = " + v1.toFixed(1) + " m/s", 10, 16);
      var v2 = A1 * v1 / A2;
      ctx.textAlign = "right";
      ctx.fillText("A₂ = " + A2.toFixed(3) + " m², v₂ = " + v2.toFixed(2) + " m/s", w - 10, 16);
      ctx.textAlign = "left";
    });
    bindPlay("cont", loop);
  })();

  /* ---------------- 3. Bernoulli ---------------- */
  (function () {
    var cv = $("#cvBern"); if (!cv) return;
    var ctx = setupCanvas(cv);
    var v1 = 2, ar = 0.5, dh = 0, p1 = 120;
    var els = { v1: $("#rngBv1"), ar: $("#rngBar"), h: $("#rngBh"), p: $("#rngBp1") };

    function calc() {
      var v2 = v1 / ar;
      var P1 = p1 * 1000;
      var P2 = P1 + 0.5 * RHO * (v1 * v1 - v2 * v2) - RHO * G * dh;
      return { v2: v2, P1: P1, P2: P2 };
    }
    function update() {
      $("#valBv1").textContent = v1.toFixed(1) + " m/s";
      $("#valBar").textContent = ar.toFixed(2);
      $("#valBh").textContent = dh.toFixed(1) + " m";
      $("#valBp1").textContent = p1 + " kPa";
      var c = calc();
      $("#outBv2").textContent = c.v2.toFixed(2) + " m/s";
      $("#outBp2").textContent = (c.P2 / 1000).toFixed(1) + " kPa";
      var d = (c.P2 - c.P1) / 1000;
      $("#outBdp").textContent = (d >= 0 ? "+" : "−") + Math.abs(d).toFixed(1) + " kPa";
      $("#outBverdict").textContent = c.v2 > v1 ? "Faster → lower P" : (c.v2 < v1 ? "Slower → higher P" : "Same speed");
      draw();
    }
    els.v1.addEventListener("input", function () { v1 = +this.value; update(); });
    els.ar.addEventListener("input", function () { ar = +this.value; update(); });
    els.h.addEventListener("input", function () { dh = +this.value; update(); });
    els.p.addEventListener("input", function () { p1 = +this.value; update(); });
    $("#bernReset").addEventListener("click", function () {
      v1 = 2; ar = 0.5; dh = 0; p1 = 120;
      els.v1.value = 2; els.ar.value = 0.5; els.h.value = 0; els.p.value = 120;
      update();
    });

    function draw() {
      var w = cv._w, h = cv._h;
      var c = calc();
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#08131f"; ctx.fillRect(0, 0, w, h);
      var y1 = h * 0.62;
      var y2 = Math.max(30, Math.min(h - 40, y1 - dh * 22));
      var r1 = 22, r2 = Math.max(7, 22 * ar);

      ctx.beginPath();
      ctx.moveTo(0, y1 - r1);
      ctx.bezierCurveTo(w * 0.5, y1 - r1, w * 0.5, y2 - r2, w, y2 - r2);
      ctx.lineTo(w, y2 + r2);
      ctx.bezierCurveTo(w * 0.5, y2 + r2, w * 0.5, y1 + r1, 0, y1 + r1);
      ctx.closePath();
      ctx.fillStyle = "rgba(28,90,130,.35)"; ctx.fill();
      ctx.strokeStyle = "#5a92b5"; ctx.lineWidth = 2; ctx.stroke();

      function bar(x, label, P, v, y) {
        var pk = P / 1000;
        var hgt = Math.max(4, Math.min(h * 0.42, pk * 0.42));
        ctx.fillStyle = P >= 0 ? "#8fe3d6" : "#e38f8f";
        ctx.fillRect(x - 11, h - 24 - hgt, 22, hgt);
        ctx.fillStyle = "rgba(232,242,248,.9)"; ctx.font = "11px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(pk.toFixed(0) + " kPa", x, h - 10);
        ctx.fillText(label + " v=" + v.toFixed(1), x, h - 30 - hgt);
        ctx.beginPath(); ctx.arc(x, y, 4, 0, 6.2832); ctx.fillStyle = "#ffd479"; ctx.fill();
        ctx.textAlign = "left";
      }
      bar(w * 0.14, "P₁", c.P1, v1, y1);
      bar(w * 0.86, "P₂", c.P2, c.v2, y2);
      if (c.P2 < 0) {
        ctx.fillStyle = "#ffb4b4"; ctx.font = "12px sans-serif";
        ctx.fillText("P₂ below zero — not physical, lower the speed", 12, 18);
      }
    }
    update();
    window.addEventListener("resize", function () { setTimeout(draw, 60); });
  })();

  /* ---------------- 4. Venturi ---------------- */
  (function () {
    var cv = $("#cvVen"); if (!cv) return;
    var ctx = setupCanvas(cv);
    var narrow = 50, v1 = 2;
    var parts = []; for (var i = 0; i < 80; i++) parts.push({ x: Math.random(), lane: Math.random() });

    function areaFrac(fx) {
      var f = 1 - narrow / 100;
      if (fx < 0.3 || fx > 0.7) return 1;
      var s = fx < 0.4 ? (fx - 0.3) / 0.1 : (fx > 0.6 ? (0.7 - fx) / 0.1 : 1);
      s = Math.max(0, Math.min(1, s)); s = s * s * (3 - 2 * s);
      return 1 + (f - 1) * s;
    }
    function update() {
      var f = 1 - narrow / 100;
      var v2 = v1 / f;
      var dp = 0.5 * RHO * (v2 * v2 - v1 * v1);
      $("#valVenN").textContent = narrow + "%";
      $("#valVenV").textContent = v1.toFixed(1) + " m/s";
      $("#outVenV2").textContent = v2.toFixed(2) + " m/s";
      $("#outVenDp").textContent = (dp / 1000).toFixed(1) + " kPa";
      $("#outVenH").textContent = (dp / (RHO * G)).toFixed(2) + " m";
    }
    $("#rngVenN").addEventListener("input", function () { narrow = +this.value; update(); });
    $("#rngVenV").addEventListener("input", function () { v1 = +this.value; update(); });
    update();

    var loop = addLoop(function (dt) {
      var w = cv._w, h = cv._h, mid = h * 0.62, R = h * 0.16;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#08131f"; ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      for (var x = 0; x <= w; x += 3) { var r = areaFrac(x / w) * R; if (x === 0) ctx.moveTo(x, mid - r); else ctx.lineTo(x, mid - r); }
      for (var x2 = w; x2 >= 0; x2 -= 3) { ctx.lineTo(x2, mid + areaFrac(x2 / w) * R); }
      ctx.closePath();
      ctx.fillStyle = "rgba(28,90,130,.35)"; ctx.fill();
      ctx.strokeStyle = "#5a92b5"; ctx.lineWidth = 2; ctx.stroke();

      // manometer tubes
      var f = 1 - narrow / 100, v2 = v1 / f;
      var dp = 0.5 * RHO * (v2 * v2 - v1 * v1);
      var hcol = Math.min(mid - R - 10, (dp / (RHO * G)) * 22);
      function tube(x, drop) {
        var top = mid - R - 8;
        ctx.strokeStyle = "#7fa9c6"; ctx.lineWidth = 1.5;
        ctx.strokeRect(x - 7, top - (mid - R - 12), 14, (mid - R - 12));
        var full = mid - R - 12;
        var col = Math.max(4, full - drop);
        ctx.fillStyle = "#7fd7ff";
        ctx.fillRect(x - 6, top - col, 12, col);
      }
      tube(w * 0.16, 0);
      tube(w * 0.5, hcol);
      tube(w * 0.84, 0);

      parts.forEach(function (p) {
        var a = areaFrac(p.x);
        var v = v1 / a;
        p.x += (v * dt) / 9;
        if (p.x > 1) { p.x -= 1; p.lane = Math.random(); }
        var r = a * R;
        var y = mid + (p.lane * 2 - 1) * r * 0.8;
        var sn = Math.min(1, v / 12);
        ctx.beginPath(); ctx.arc(p.x * w, y, 2.3, 0, 6.2832);
        ctx.fillStyle = "rgb(" + Math.round(110 + 145 * sn) + "," + Math.round(215 - 90 * sn) + ",255)";
        ctx.fill();
      });

      ctx.fillStyle = "rgba(232,242,248,.9)"; ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("throat: A↓ v↑ P↓", w * 0.5, h - 10);
      ctx.textAlign = "left";
    });
    bindPlay("ven", loop);
  })();

  /* ---------------- 5. Torricelli ---------------- */
  (function () {
    var cv = $("#cvTor"); if (!cv) return;
    var ctx = setupCanvas(cv);
    var H = 3, yh = 1, g = 9.8;
    var drops = [];

    function update() {
      if (yh > H) { yh = H; $("#rngTorY").value = String(H); }
      var hd = Math.max(0, H - yh);
      var v = Math.sqrt(2 * g * hd);
      $("#valTorH").textContent = H.toFixed(1) + " m";
      $("#valTorY").textContent = yh.toFixed(1) + " m";
      $("#valTorG").textContent = g.toFixed(1) + " m/s²";
      $("#outTorh").textContent = hd.toFixed(2) + " m";
      $("#outTorV").textContent = v.toFixed(2) + " m/s";
      $("#outTorX").textContent = (2 * Math.sqrt(hd * yh)).toFixed(2) + " m";
    }
    $("#rngTorH").addEventListener("input", function () { H = +this.value; update(); });
    $("#rngTorY").addEventListener("input", function () { yh = +this.value; update(); });
    $("#rngTorG").addEventListener("input", function () { g = +this.value; update(); });
    update();

    var acc = 0;
    var loop = addLoop(function (dt) {
      var w = cv._w, h = cv._h;
      var scale = (h - 40) / 5.5;                 // px per metre
      var ground = h - 18;
      var tankX = 40, tankW = Math.min(150, w * 0.32);
      var hd = Math.max(0, H - yh);
      var v = Math.sqrt(2 * g * hd);

      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#08131f"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#4d7ea0"; ctx.lineWidth = 2;
      ctx.strokeRect(tankX, ground - 5 * scale, tankW, 5 * scale);
      ctx.fillStyle = "rgba(60,150,200,.35)";
      ctx.fillRect(tankX + 1, ground - H * scale, tankW - 2, H * scale);
      ctx.fillStyle = "#3b6b4a"; ctx.fillRect(0, ground, w, h - ground);

      var holeY = ground - yh * scale, holeX = tankX + tankW;
      ctx.fillStyle = "#ffd479"; ctx.fillRect(holeX - 3, holeY - 3, 6, 6);

      acc += dt;
      if (acc > 0.03 && v > 0.05) { acc = 0; drops.push({ x: holeX, y: holeY, vx: v, vy: 0 }); }
      drops.forEach(function (d) {
        d.vy += g * dt;
        d.x += d.vx * dt * scale;
        d.y += d.vy * dt * scale;
      });
      drops = drops.filter(function (d) { return d.y < ground + 2 && d.x < w + 10; });
      if (drops.length > 400) drops.splice(0, drops.length - 400);
      ctx.fillStyle = "#7fd7ff";
      drops.forEach(function (d) { ctx.beginPath(); ctx.arc(d.x, d.y, 2.2, 0, 6.2832); ctx.fill(); });

      ctx.strokeStyle = "rgba(255,212,121,.7)"; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(tankX, ground - H * scale); ctx.lineTo(holeX + 8, ground - H * scale); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(232,242,248,.9)"; ctx.font = "12px sans-serif";
      ctx.fillText("h = " + hd.toFixed(2) + " m", tankX + 6, ground - (yh + hd / 2) * scale);
      ctx.fillText("v = √(2gh) = " + v.toFixed(2) + " m/s", holeX + 12, holeY - 8);
    });
    bindPlay("tor", loop);
  })();

  /* ---------------- Numericals ---------------- */
  var NUMS = [
    { id: "n1", q: "Water flows at 2.0 m/s through a pipe of area 0.030 m². The pipe narrows to 0.010 m². Find the speed in the narrow section.", unit: "m/s", ans: 6,
      sol: "A₁v₁ = A₂v₂\n(0.030)(2.0) = (0.010) v₂\nv₂ = 0.060 / 0.010 = 6.0 m/s" },
    { id: "n2", q: "A pipe of cross-sectional area 0.025 m² carries water at 4.0 m/s. Find the volume flow rate Q.", unit: "m³/s", ans: 0.1,
      sol: "Q = A v = (0.025)(4.0) = 0.10 m³/s" },
    { id: "n3", q: "A force of 250 N acts normally on an area of 0.50 m². Find the pressure.", unit: "Pa", ans: 500,
      sol: "P = F/A = 250 / 0.50 = 500 Pa" },
    { id: "n4", q: "Water (ρ = 1000 kg/m³) flows horizontally. At point 1: v₁ = 3.0 m/s, P₁ = 150 kPa. At point 2 the speed is 5.0 m/s. Find P₂ in kPa.", unit: "kPa", ans: 142,
      sol: "P₂ = P₁ + ½ρ(v₁² − v₂²)\n= 150000 + 500(9 − 25)\n= 150000 − 8000 = 142000 Pa = 142 kPa" },
    { id: "n5", q: "A tank has water 5.0 m above a small hole. Take g = 9.8 m/s². Find the speed of efflux.", unit: "m/s", ans: 9.9,
      sol: "v = √(2gh) = √(2 × 9.8 × 5.0) = √98 = 9.90 m/s" },
    { id: "n6", q: "In a Venturi meter the throat area is one third of the inlet area. If the inlet speed is 1.2 m/s, find the throat speed.", unit: "m/s", ans: 3.6,
      sol: "A₁v₁ = A₂v₂ with A₂ = A₁/3\nv₂ = 3 v₁ = 3 × 1.2 = 3.6 m/s" }
  ];

  var numState = load(KEY.num, {});
  var numWrap = $("#numericals");
  NUMS.forEach(function (n, i) {
    var d = document.createElement("div");
    d.className = "numerical";
    d.innerHTML =
      '<div class="q"><b>Q' + (i + 1) + ".</b> " + n.q + "</div>" +
      '<div class="num-row">' +
        '<input type="text" inputmode="decimal" placeholder="answer in ' + n.unit + '" data-in="' + n.id + '" />' +
        '<button class="btn" data-check="' + n.id + '">Check</button>' +
        '<button class="btn ghost" data-sol="' + n.id + '">Show solution</button>' +
      "</div>" +
      '<div class="feedback" data-fb="' + n.id + '"></div>' +
      '<div class="solution" data-solbox="' + n.id + '">' + n.sol + "</div>";
    numWrap.appendChild(d);

    var input = $('[data-in="' + n.id + '"]', d);
    var fb = $('[data-fb="' + n.id + '"]', d);
    var solBox = $('[data-solbox="' + n.id + '"]', d);
    if (numState[n.id] != null) { input.value = numState[n.id]; }

    function check() {
      var raw = input.value.trim();
      numState[n.id] = raw; save(KEY.num, numState);
      var val = parseFloat(raw);
      fb.classList.add("show");
      if (isNaN(val)) { fb.className = "feedback show bad"; fb.textContent = "Enter a number first."; return; }
      var ok = Math.abs(val - n.ans) <= Math.abs(n.ans) * 0.02 + 1e-9;
      fb.className = "feedback show " + (ok ? "ok" : "bad");
      fb.textContent = ok ? "Correct — " + n.ans + " " + n.unit : "Not quite. Try again, or view the solution.";
    }
    $('[data-check="' + n.id + '"]', d).addEventListener("click", check);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") check(); });
    input.addEventListener("input", function () { numState[n.id] = input.value; save(KEY.num, numState); });
    $('[data-sol="' + n.id + '"]', d).addEventListener("click", function () {
      solBox.classList.toggle("show");
      this.textContent = solBox.classList.contains("show") ? "Hide solution" : "Show solution";
    });
  });

  /* ---------------- Quiz ---------------- */
  var QUIZ = [
    { q: "Fluid dynamics is the study of:", o: ["Fluids at rest", "Fluids in motion and the forces involved", "Only gases", "Only solids"], a: 1,
      e: "Fluid dynamics deals with fluids in motion; fluid statics deals with fluids at rest." },
    { q: "Which of the following are fluids?", o: ["Liquids only", "Gases only", "Both liquids and gases", "Neither"], a: 2,
      e: "A fluid is anything that can flow — liquids and gases both qualify." },
    { q: "The equation of continuity is based on the conservation of:", o: ["Momentum", "Energy", "Mass", "Charge"], a: 2,
      e: "A₁v₁ = A₂v₂ comes directly from conservation of mass for an incompressible fluid." },
    { q: "If the cross-sectional area of a pipe is halved, the fluid speed:", o: ["Halves", "Doubles", "Stays the same", "Becomes four times"], a: 1,
      e: "A₁v₁ = A₂v₂ with A₂ = A₁/2 gives v₂ = 2v₁." },
    { q: "The SI unit of volume flow rate Q = Av is:", o: ["m²/s", "m³/s", "kg/s", "Pa·s"], a: 1,
      e: "Area (m²) × speed (m/s) = m³/s." },
    { q: "The SI unit of pressure is the:", o: ["Newton", "Joule", "Pascal", "Watt"], a: 2,
      e: "P = F/A, so 1 Pa = 1 N/m²." },
    { q: "For a horizontal pipe, if the fluid speed increases the pressure:", o: ["Increases", "Decreases", "Stays constant", "Becomes zero"], a: 1,
      e: "P₁ + ½ρv₁² = P₂ + ½ρv₂²: larger v means smaller P." },
    { q: "The Venturi effect occurs at:", o: ["The widest part of a pipe", "The narrow section of a pipe", "The pipe entrance only", "A closed valve"], a: 1,
      e: "In the throat: area ↓ → speed ↑ → pressure ↓." },
    { q: "Torricelli's law gives the speed of efflux as:", o: ["v = √(gh)", "v = 2gh", "v = √(2gh)", "v = ½gh²"], a: 2,
      e: "v = √(2gh), where h is the liquid height above the opening." },
    { q: "Viscosity is best described as:", o: ["Density of a fluid", "Internal resistance to relative motion of fluid layers", "Pressure of a fluid", "Volume flow rate"], a: 1,
      e: "Viscosity is internal friction between fluid layers — honey has more than water." }
  ];

  var quizWrap = $("#quiz");
  var quizState = load(KEY.quiz, {});
  $("#metaQuiz").textContent = String(QUIZ.length);
  var best = load(KEY.best, null);
  if (best != null) $("#metaBest").textContent = best + "/" + QUIZ.length;

  QUIZ.forEach(function (item, qi) {
    var d = document.createElement("div");
    d.className = "quiz-q";
    var opts = item.o.map(function (t, oi) {
      return '<label class="opt" data-opt="' + qi + "-" + oi + '"><input type="radio" name="q' + qi + '" value="' + oi + '" /><span>' + t + "</span></label>";
    }).join("");
    d.innerHTML = '<div class="qtext">' + (qi + 1) + ". " + item.q + "</div>" + opts +
      '<div class="feedback" data-qfb="' + qi + '"></div>';
    quizWrap.appendChild(d);
  });

  function answeredCount() { return Object.keys(quizState).length; }
  function refreshCount() { $("#quizAnswered").textContent = answeredCount() + " of " + QUIZ.length + " answered"; }

  quizWrap.addEventListener("change", function (e) {
    var t = e.target;
    if (t && t.type === "radio") {
      var qi = t.name.slice(1);
      quizState[qi] = +t.value;
      save(KEY.quiz, quizState);
      refreshCount();
    }
  });

  // restore saved answers
  Object.keys(quizState).forEach(function (qi) {
    var el = quizWrap.querySelector('input[name="q' + qi + '"][value="' + quizState[qi] + '"]');
    if (el) el.checked = true;
  });
  refreshCount();

  $("#submitQuiz").addEventListener("click", function () {
    var score = 0;
    QUIZ.forEach(function (item, qi) {
      var chosen = quizState[qi];
      var fb = quizWrap.querySelector('[data-qfb="' + qi + '"]');
      item.o.forEach(function (_, oi) {
        var lab = quizWrap.querySelector('[data-opt="' + qi + "-" + oi + '"]');
        lab.classList.remove("correct", "wrong");
        if (oi === item.a) lab.classList.add("correct");
        else if (chosen === oi) lab.classList.add("wrong");
      });
      fb.className = "feedback show " + (chosen === item.a ? "ok" : "bad");
      fb.textContent = (chosen === item.a ? "Correct. " : "Correct answer: " + item.o[item.a] + ". ") + item.e;
      if (chosen === item.a) score++;
    });
    var card = $("#scoreCard");
    card.classList.add("show");
    $("#scoreBig").textContent = score + " / " + QUIZ.length;
    var pct = Math.round((score / QUIZ.length) * 100);
    $("#scoreMsg").textContent = pct >= 90 ? "Excellent — MDCAT ready on this chapter."
      : pct >= 70 ? "Good. Revise the questions you missed."
      : pct >= 50 ? "Fair. Re-read Bernoulli and continuity, then retry."
      : "Read the chapter again from section 1, then retry the quiz.";
    var prevBest = load(KEY.best, null);
    if (prevBest == null || score > prevBest) { save(KEY.best, score); prevBest = score; }
    $("#metaBest").textContent = prevBest + "/" + QUIZ.length;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  $("#retryQuiz").addEventListener("click", function () {
    quizState = {}; save(KEY.quiz, quizState);
    $$('#quiz input[type="radio"]').forEach(function (r) { r.checked = false; });
    $$("#quiz .opt").forEach(function (l) { l.classList.remove("correct", "wrong"); });
    $$("#quiz .feedback").forEach(function (f) { f.className = "feedback"; f.textContent = ""; });
    $("#scoreCard").classList.remove("show");
    refreshCount();
    $("#quiz").scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
