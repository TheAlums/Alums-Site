(function () {
  const SKILL = ["QB", "RB", "WR", "TE"];
  const WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  function weekBox(p) {
    var n = (window.FLOCK && FLOCK.viewWeek) || 11;
    if (p && p.weeks && p.weeks[n]) return p.weeks[n];
    return {};
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
  function bestByPosForSchool(sid) {
    var pool = skillPool().filter(function (p) { return (p.school || "oregon") === sid; });
    return SKILL.map(function (pos) {
      var rows = pool.filter(function (p) { return p.pos === pos; }).sort(function (a, b) { return ppr(b) - ppr(a); });
      return rows[0] || { pos: pos, name: "-", pprMissing: true, weeks: {} };
    });
  }
  function renderCup() {
    const el = document.querySelector("#school-rank");
    if (!el || !FLOCK.schools) return;
    const ranked = FLOCK.schools.map(function (s) {
      const top = bestByPosForSchool(s.id);
      const total = Math.round(top.reduce(function (sum, p) { return sum + (p.pprMissing ? 0 : ppr(p)); }, 0) * 10) / 10;
      return Object.assign({}, s, { total: total, top: top });
    }).sort(function (a, b) { return b.total - a.total; });
    el.innerHTML = ranked.map(function (s, i) {
      const names = s.top.map(function (p) {
        var score = p.pprMissing ? "-" : (weekBox(p).ppr != null ? weekBox(p).ppr : "-");
        return p.pos + " " + (p.name || "-") + " " + score;
      }).join(" / ");
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
          (weekBox(p).ppr != null ? weekBox(p).ppr : "-") + "</td><td>" + (i === 0 ? "Crown" : "") + "</td></tr>";
      }).join("");
      return "<article class=\"school-tile\"><h3>" + pos + "</h3><p style=\"margin:6px 0 12px\">" +
        crown.name + " - " + schoolName(crown.school || "oregon") + "</p>" +
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
        "</a></td><td>" + p.team + "</td><td>" + (weekBox(p).ppr != null ? weekBox(p).ppr : "-") + "</td></tr>";
    }).join("");
  }
  function draw() {
    renderCup();
    renderPosWars();
    renderKings();
  }
  /* One active view at a time: a single week (cup, position wars, kings) or This Season (js/season.js). */
  function setMode(mode) {
    FLOCK.viewMode = mode === "season" ? "season" : "week";
    document.querySelectorAll("[data-view]").forEach(function (sec) {
      sec.hidden = sec.getAttribute("data-view") !== FLOCK.viewMode;
    });
    if (FLOCK.viewMode === "season" && FLOCK.renderSeason) FLOCK.renderSeason();
  }
  FLOCK.setViewMode = setMode;
  function bootToggle() {
    const bar = document.querySelector("#week-toggle");
    if (!bar) return;
    FLOCK.viewWeek = FLOCK.viewWeek || 11;
    const current = FLOCK.viewWeek;
    const seasonOn = FLOCK.viewMode === "season";
    bar.innerHTML = WEEKS.map(function (n) {
      return "<button class=\"filter" + (!seasonOn && n === current ? " active" : "") + "\" data-week=\"" + n + "\">Week " + n + "</button>";
    }).join("") + "<button class=\"filter" + (seasonOn ? " active" : "") + "\" data-week=\"season\">This Season</button>";
    bar.onclick = function (e) {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      bar.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      if (btn.dataset.week === "season") {
        setMode("season");
        return;
      }
      setMode("week");
      FLOCK.viewWeek = Number(btn.dataset.week);
      if (FLOCK.setViewWeek) FLOCK.setViewWeek(FLOCK.viewWeek);
      if (FLOCK.pullBoxFeed) FLOCK.pullBoxFeed(FLOCK.viewWeek);
      draw();
    };
  }
  window.addEventListener("load", function () {
    FLOCK.viewWeek = FLOCK.viewWeek || 11;
    /* re-run every week sheet so players added after the week files (alumni.js) get stamped too */
    if (FLOCK.setViewWeek) FLOCK.setViewWeek(FLOCK.viewWeek);
    bootToggle();
    setMode(FLOCK.viewMode || "week");
    draw();
  });
  document.addEventListener("flock:week", draw);
})();
