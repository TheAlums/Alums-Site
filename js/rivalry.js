(function () {
  const SKILL = ["QB", "RB", "WR", "TE"];
  function weekBox(p) {
    var n = (window.FLOCK && FLOCK.viewWeek) || 2;
    if (p.weeks && p.weeks[n]) return p.weeks[n];
    return p.week1 || {};
  }
  function ppr(p) {
    var n = Number(weekBox(p).ppr);
    return isNaN(n) ? 0 : n;
  }
  function schoolName(id) {
    const s = (FLOCK.schools || []).find(function (x) { return x.id === id; });
    return s ? s.name : id;
  }
  function schoolHref(id) {
    const s = (FLOCK.schools || []).find(function (x) { return x.id === id; });
    return s && s.href ? s.href : "#";
  }
  function skillPool() {
    return (FLOCK.players || []).filter(function (p) {
      return (p.league || "NFL") !== "CFL" && SKILL.indexOf(p.pos) >= 0;
    });
  }
  function bestAtPos(pos) {
    const bySchool = {};
    skillPool().filter(function (p) { return p.pos === pos; }).forEach(function (p) {
      const sid = p.school || "oregon";
      if (!bySchool[sid] || ppr(p) > ppr(bySchool[sid])) bySchool[sid] = p;
    });
    return Object.keys(bySchool).map(function (sid) { return bySchool[sid]; })
      .sort(function (a, b) { return ppr(b) - ppr(a); });
  }
  function renderCup() {
    const el = document.querySelector("#school-rank");
    if (!el || !FLOCK.schools) return;
    const ranked = FLOCK.schools.map(function (s) {
      const rows = skillPool().filter(function (p) { return (p.school || "oregon") === s.id; });
      const top = rows.slice().sort(function (a, b) { return ppr(b) - ppr(a); }).slice(0, s.topN || 5);
      const total = Math.round(top.reduce(function (sum, p) { return sum + ppr(p); }, 0) * 10) / 10;
      return Object.assign({}, s, { total: total, top: top });
    }).sort(function (a, b) { return b.total - a.total; });
    el.innerHTML = ranked.map(function (s, i) {
      const names = s.top.map(function (p) { return p.name + " " + (weekBox(p).ppr != null ? weekBox(p).ppr : "\u2014"); }).join(" \u00b7 ") || "\u2014";
      return "<tr><td>" + (i + 1) + "</td><td><a href=\"" + s.href + "\">" + s.channel + "</a></td><td>" + s.name + "</td><td>" + s.total.toFixed(1) + "</td><td>" + names + "</td></tr>";
    }).join("");
  }
  function renderPosWars() {
    const root = document.querySelector("#pos-wars");
    if (!root || !window.FLOCK) return;
    root.innerHTML = SKILL.map(function (pos) {
      const rows = bestAtPos(pos);
      if (!rows.length) return "";
      const crown = rows[0];
      const list = rows.map(function (p, i) {
        return "<tr><td>" + (i + 1) + "</td><td>" + p.name + "</td><td>" +
          schoolName(p.school || "oregon") + "</td><td>" + p.team + "</td><td>" +
          (weekBox(p).ppr != null ? weekBox(p).ppr : "\u2014") + "</td><td>" + (i === 0 ? "Crown" : "") + "</td></tr>";
      }).join("");
      return "<article class=\"school-tile\"><h3>" + pos + "</h3><p style=\"margin:6px 0 12px\">" +
        crown.name + " \u00b7 " + schoolName(crown.school || "oregon") + "</p>" +
        "<div class=\"table-wrap\"><table><thead><tr><th>#</th><th>Player</th><th>School</th><th>Club</th><th>PPR</th><th></th></tr></thead><tbody>" +
        list + "</tbody></table></div></article>";
    }).join("");
  }
  function renderKings() {
    const el = document.querySelector("#sunday-kings");
    if (!el || !window.FLOCK) return;
    const rows = skillPool().slice().sort(function (a, b) { return ppr(b) - ppr(a); }).slice(0, 10);
    el.innerHTML = rows.map(function (p, i) {
      return "<tr><td>" + (i + 1) + "</td><td>" + p.name + "</td><td>" + p.pos + "</td><td><a href=\"" +
        schoolHref(p.school || "oregon") + "\">" + schoolName(p.school || "oregon") +
        "</a></td><td>" + p.team + "</td><td>" + (weekBox(p).ppr != null ? weekBox(p).ppr : "\u2014") + "</td></tr>";
    }).join("");
  }
  function draw() {
    renderCup();
    renderPosWars();
    renderKings();
  }
  function bootToggle() {
    const bar = document.querySelector("#week-toggle");
    if (!bar) return;
    const current = FLOCK.viewWeek || 2;
    bar.innerHTML = [1, 2].map(function (n) {
      return "<button class=\"filter" + (n === current ? " active" : "") + "\" data-week=\"" + n + "\">Week " + n + "</button>";
    }).join("");
    bar.onclick = function (e) {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      bar.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      if (FLOCK.setViewWeek) FLOCK.setViewWeek(btn.dataset.week);
      else { FLOCK.viewWeek = Number(btn.dataset.week); draw(); }
    };
  }
  window.addEventListener("load", function () {
    bootToggle();
    draw();
  });
  document.addEventListener("flock:week", draw);
})();
