(function () {
  const SKILL = ["QB", "RB", "WR", "TE"];
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
      const score = Number(p.week1 && p.week1.ppr) || 0;
      if (!bySchool[sid] || score > (Number(bySchool[sid].week1 && bySchool[sid].week1.ppr) || 0)) bySchool[sid] = p;
    });
    return Object.keys(bySchool).map(function (sid) { return bySchool[sid]; })
      .sort(function (a, b) { return (Number(b.week1.ppr) || 0) - (Number(a.week1.ppr) || 0); });
  }
  function renderPosWars() {
    const root = document.querySelector("#pos-wars");
    if (!root || !window.FLOCK) return;
    root.innerHTML = SKILL.map(function (pos) {
      const rows = bestAtPos(pos);
      if (!rows.length) return "";
      const crown = rows[0];
      const list = rows.map(function (p, i) {
        const mark = i === 0 ? "Crown" : "";
        return "<tr><td>" + (i + 1) + "</td><td>" + p.name + "</td><td>" +
          schoolName(p.school || "oregon") + "</td><td>" + p.team + "</td><td>" +
          (p.week1.ppr != null ? p.week1.ppr : "\u2014") + "</td><td>" + mark + "</td></tr>";
      }).join("");
      return "<article class=\"school-tile\"><h3>" + pos + " war</h3><p style=\"margin:6px 0 12px\">" +
        crown.name + " \u00b7 " + schoolName(crown.school || "oregon") + "</p>" +
        "<div class=\"table-wrap\"><table><thead><tr><th>#</th><th>Player</th><th>School</th><th>Club</th><th>PPR</th><th></th></tr></thead><tbody>" +
        list + "</tbody></table></div></article>";
    }).join("");
  }
  function renderKings() {
    const el = document.querySelector("#sunday-kings");
    if (!el || !window.FLOCK) return;
    const rows = skillPool().slice().sort(function (a, b) {
      return (Number(b.week1 && b.week1.ppr) || 0) - (Number(a.week1 && a.week1.ppr) || 0);
    }).slice(0, 10);
    el.innerHTML = rows.map(function (p, i) {
      return "<tr><td>" + (i + 1) + "</td><td>" + p.name + "</td><td>" + p.pos + "</td><td><a href=\"" +
        schoolHref(p.school || "oregon") + "\">" + schoolName(p.school || "oregon") +
        "</a></td><td>" + p.team + "</td><td>" + (p.week1.ppr != null ? p.week1.ppr : "\u2014") + "</td></tr>";
    }).join("");
  }
  window.addEventListener("load", function () {
    renderPosWars();
    renderKings();
  });
})();
