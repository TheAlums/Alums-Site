(function () {
  function ready(fn) {
    if (document.readyState === "complete") fn();
    else window.addEventListener("load", fn);
  }
  ready(function () {
    var el = document.querySelector("#home-performers");
    if (!el || !window.FLOCK || !FLOCK.hasSnap) return;
    var sid = (FLOCK.meta && FLOCK.meta.schoolId) || "oregon";
    var DEF = ["DL","DE","DT","EDGE","LB","OLB","ILB","DB","CB","S","FS","SS"];
    function isDef(p) { return DEF.indexOf(p.pos) >= 0; }
    function teamScore(p) {
      if (p.week1 && p.week1.teamScore) return p.week1.teamScore;
      var m = String((p.week1 && p.week1.result) || "").match(/[WL]\s+\d+[\u2013\-]\d+/);
      return m ? m[0] : "\u2014";
    }
    function line(p) {
      var w = p.week1 || {};
      if (p.pos === "QB") return w.pass || "\u2014";
      if (p.pos === "RB") return (w.rush && w.rush !== "\u2014") ? w.rush : "\u2014";
      if (p.pos === "WR" || p.pos === "TE") return w.recLine || "\u2014";
      if (["OT","OL","G","C","OG"].indexOf(p.pos) >= 0) return w.olLine || "\u2014";
      if (isDef(p)) return w.def || "\u2014";
      return "\u2014";
    }
    var rows = FLOCK.players.filter(function (p) {
      return (p.school || "oregon") === sid && (p.league || "NFL") !== "CFL" && FLOCK.hasSnap(p);
    }).sort(function (a, b) {
      var av = isDef(a) ? 0 : Number(a.week1 && a.week1.ppr) || 0;
      var bv = isDef(b) ? 0 : Number(b.week1 && b.week1.ppr) || 0;
      return bv - av;
    });
    el.innerHTML = rows.map(function (p, i) {
      var ppr = isDef(p) ? teamScore(p) + "*" : ((p.week1 && p.week1.ppr != null) ? p.week1.ppr : "\u2014");
      return "<tr><td class=\"num\">" + (i + 1) + "</td><td><a href=\"player.html?id=" + p.id + "\">" + p.name + "</a></td><td>" + p.pos + "</td><td>" + p.team + "</td><td>" + ((p.week1 && p.week1.result) || "\u2014") + "</td><td>" + line(p) + "</td><td class=\"num\">" + ppr + "</td></tr>";
    }).join("");
  });
})();
