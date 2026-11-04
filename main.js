(function () {
  "use strict";

  /* ---------- Project list ---------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  var list = document.getElementById("project-list");
  if (list && typeof PROJECTS !== "undefined") {
    PROJECTS.forEach(function (p) {
      var article = el("article", "project");

      var meta = el("div", "project-meta");
      meta.appendChild(el("div", "", p.kind || ""));
      if (p.status) meta.appendChild(el("span", "status", p.status));
      article.appendChild(meta);

      var body = el("div", "project-body");
      body.appendChild(el("h3", "", p.title));
      body.appendChild(el("p", "", p.summary));

      if (p.details) {
        var details = el("details");
        details.appendChild(el("summary", "", "More detail"));
        details.appendChild(el("p", "", p.details));
        body.appendChild(details);
      }

      if (p.tags && p.tags.length) {
        var tags = el("ul", "tags");
        tags.setAttribute("aria-label", "Technologies used");
        p.tags.forEach(function (t) { tags.appendChild(el("li", "", t)); });
        body.appendChild(tags);
      }

      if (p.links && p.links.length) {
        var links = el("ul", "links");
        p.links.forEach(function (l) {
          var li = el("li");
          var a = el("a", "", l.label);
          a.href = l.href;
          li.appendChild(a);
          links.appendChild(li);
        });
        body.appendChild(links);
      }

      article.appendChild(body);
      list.appendChild(article);
    });
  }

  /* ---------- Hero particle shower ---------- */
  var hero = document.querySelector(".hero");
  var canvas = document.getElementById("shower");
  if (!hero || !canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var palette = ["#17203a", "#2745d6", "#e8a317", "#c2410c"];
  var MAX_PARTICLES = 450;
  var w = 0, h = 0;
  var particles = [];
  var running = false;
  var idleFrames = 0;

  function resize() {
    var rect = canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function fire(x) {
    if (particles.length > MAX_PARTICLES - 20) return;
    particles.push({
      x: x,
      y: 0,
      vx: (Math.random() - 0.5) * 0.5,
      vy: 4,
      e: 1,
      g: 0
    });
  }

  // Advance every particle one step, drawing its segment. Each one may split in two.
  function step() {
    var next = [];
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var px = p.x, py = p.y;
      p.x += p.vx;
      p.y += p.vy;

      ctx.strokeStyle = palette[Math.min(p.g, palette.length - 1)];
      ctx.lineWidth = Math.max(0.7, 2.4 - p.g * 0.5);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      p.e -= 0.006;
      if (p.e <= 0 || p.y > h || p.x < 0 || p.x > w) continue;

      var canSplit = p.g < 4 && particles.length + next.length < MAX_PARTICLES;
      if (canSplit && Math.random() < 0.025) {
        var half = p.e / 2;
        var speed = Math.hypot(p.vx, p.vy) * 0.97;
        var angle = Math.atan2(p.vy, p.vx);
        [-1, 1].forEach(function (dir) {
          var a = angle + dir * (0.25 + Math.random() * 0.5);
          next.push({ x: p.x, y: p.y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, e: half, g: p.g + 1 });
        });
      } else {
        next.push(p);
      }
    }
    particles = next;
  }

  function frame() {
    // Fade old trails a little each frame so showers leave a soft afterglow.
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";

    step();
    idleFrames = particles.length ? 0 : idleFrames + 1;

    if (idleFrames < 150) {
      requestAnimationFrame(frame);
    } else {
      running = false;
      ctx.clearRect(0, 0, w, h);
    }
  }

  function start() {
    if (running) return;
    running = true;
    idleFrames = 0;
    requestAnimationFrame(frame);
  }

  function renderStatic() {
    // For visitors who prefer reduced motion: draw a few finished showers, no animation.
    resize();
    ctx.clearRect(0, 0, w, h);
    particles = [];
    [0.2, 0.55, 0.82].forEach(function (f) { fire(w * f); });
    var guard = 0;
    while (particles.length && guard < 1500) { step(); guard++; }
  }

  function localX(evt) {
    return evt.clientX - canvas.getBoundingClientRect().left;
  }

  resize();

  if (reduceMotion) {
    renderStatic();
    window.addEventListener("resize", renderStatic);
    return;
  }

  window.addEventListener("resize", resize);

  hero.addEventListener("pointerdown", function (evt) {
    fire(localX(evt));
    start();
  });

  var lastMove = 0;
  hero.addEventListener("pointermove", function (evt) {
    if (evt.pointerType === "touch") return;
    var now = performance.now();
    if (now - lastMove < 450) return;
    lastMove = now;
    fire(localX(evt));
    start();
  });

  // One opening moment on page load.
  [0.18, 0.5, 0.8].forEach(function (f, i) {
    setTimeout(function () { fire(w * f); start(); }, 250 + i * 350);
  });
})();
