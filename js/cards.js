(function () {
  function role(p) {
    if (p.roster === "practice") return "Practice squad";
    if (p.roster === "ir") return "IR";
    if (p.roster === "pup") return "PUP";
    var s = String(p.status || p.statusLabel || "").toLowerCase();
    if (/start/.test(s)) return "Starter";
    if (/practice/.test(s)) return "Practice squad";
    if (/backup|depth|rookie|limited/.test(s)) return "Rotation";
    if (/rotation/.test(s)) return "Rotation";
    return p.roster === "active" ? "Rotation" : (p.statusLabel || "Rotation");
  }
  function ppr(p) {
    if (window.FLOCK && FLOCK.hasSnap && !FLOCK.hasSnap(p)) return "\u2014";
    var n = p.week1 && p.week1.ppr;
    if (n == null || n === "") return "\u2014";
    return n;
  }
  function years(p) {
    var y = p.years;
    if (y == null || y === "") return "";
    return " \u00b7 " + y + " yr" + (y === 1 ? "" : "s");
  }
  function card(p) {
    var week = (window.FLOCK && FLOCK.meta && FLOCK.meta.week) || 2;
    return '<a class="player-card" href="player.html?id=' + p.id + '">' +
      '<div class="pc-name">' + p.name + '</div>' +
      '<div class="pc-meta">' + p.pos + ' \u00b7 ' + (p.teamName || p.team) + years(p) + '</div>' +
      '<div class="chips">' +
        '<span class="chip gold">' + role(p) + '</span>' +
        '<span class="chip">' + (p.draft || "\u2014") + '</span>' +
        '<span class="chip">Oregon ' + (p.yearsAtOregon || "") + '</span>' +
      '</div>' +
      '<div class="pc-week">Week ' + week + ' PPR: ' + ppr(p) + '</div>' +
    '</a>';
  }
  function paint() {
    var el = document.querySelector("#roster-grid");
    if (!el || !window.FLOCK || !FLOCK.players) return;
    var cards = el.querySelectorAll(".player-card");
    if (!cards.length) return;
    cards.forEach(function (node) {
      var href = node.getAttribute("href") || "";
      var id = (href.split("id=")[1] || "").split("&")[0];
      var p = FLOCK.players.find(function (x) { return x.id === id; });
      if (p) node.outerHTML = card(p);
    });
  }
  window.addEventListener("load", function () { setTimeout(paint, 0); });
  document.addEventListener("click", function (e) {
    if (e.target.closest("#filters .filter")) setTimeout(paint, 0);
  });
  document.addEventListener("input", function (e) {
    if (e.target.id === "search") setTimeout(paint, 0);
  });
})();
