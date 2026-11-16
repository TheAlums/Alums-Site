(function () {
  const SKILL = ["QB", "RB", "WR", "TE"];
  const WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  function weekBox(p) {
    var n = (window.FLOCK && FLOCK.viewWeek) || 10;
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
  function schoolCup(schoolId) {
    const rows = (FLOCK.players || []).filter(function (p) {
      return (p.school || "oregon") === schoolId && SKILL.includes(p.pos);
    });
    const byPos = {};
    SKILL.forEach(function (pos) {
      const best = rows.filter(function (p) { return p.pos === pos; }).sort(function (a, b) { return ppr(b) - ppr(a); })[0];
      byPos[pos] = best || null;
    });
    const total = SKILL.reduce(function (s, pos) { return s + (byPos[pos] ? ppr(byPos[pos]) : 0); }, 0);
    return { total: Math.round(total * 10) / 10, byPos: byPos };
  }
  function render() {
    const el = document.getElementById("school-rank");
    if (!el) return;
    const schools = (FLOCK.schools || []).map(function (s) {
      return Object.assign({}, s, schoolCup(s.id));
    }).sort(function (a, b) { return b.total - a.total; });
    el.innerHTML = schools.map(function (s, i) {
      const names = SKILL.map(function (pos) {
        const p = s.byPos[pos];
        return p ? p.name + " " + ppr(p) : "\u2014";
      }).join(" \u00b7 ");
      const link = s.href ? '<a href="' + s.href + '">' + s.channel + '</a>' : s.channel;
      return '<tr><td class="num">' + (i + 1) + '</td><td>' + link + '</td><td>' + s.name + '</td><td class="num">' + s.total.toFixed(1) + '</td><td>' + names + '</td></tr>';
    }).join("");
  }
  function weekBar() {
    const el = document.getElementById("week-toggle");
    if (!el) return;
    const bar = document.createElement("div");
    bar.className = "filters";
    bar.innerHTML = WEEKS.map(function (n) {
      const active = n === (FLOCK.viewWeek || 10) ? " active" : "";
      return '<button class="filter' + active + '" data-week="' + n + '">Week ' + n + '</button>';
    }).join("");
    el.appendChild(bar);
    bar.onclick = function (e) {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      const n = Number(btn.dataset.week);
      if (FLOCK.setViewWeek) FLOCK.setViewWeek(n);
      bar.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      render();
    };
  }
  window.addEventListener("load", function () {
    weekBar();
    render();
  });
  document.addEventListener("flock:week", render);
})();
