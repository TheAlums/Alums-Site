(function () {
  window.FLOCK = window.FLOCK || {};
  if (FLOCK.meta) {
    FLOCK.meta.week = 2;
    FLOCK.meta.lastUpdated = "September 22, 2026";
  }
  function recLine(tgt, rec, yds, td) {
    if (tgt == null && rec == null) return "\u2014";
    return tgt + " tgt, " + rec + " rec, " + yds + " yds, " + td + " TD";
  }
  function olLine(snaps, pen) {
    var s = (snaps == null || snaps === "") ? "\u2014" : snaps;
    var p = (pen == null || pen === "") ? "\u2014" : pen;
    return s + " snaps, " + p + " pen";
  }
  function isStat(s) {
    if (!s || s === "\u2014") return false;
    if (!/\d/.test(s)) return false;
    return !/limited|mixed|depth|started|personnel|comeback|quiet|rotation/i.test(s);
  }
  var OL = ["OT", "OL", "G", "C", "OG", "OC"];
  var w = {
    herbert: { result: "L 14\u201326 vs LV", pass: "15/27, 192 yds, 1 TD, 2 INT", rush: "3\u20132", recLine: "\u2014", ppr: 9.9 },
    nix: { result: "W 20\u201313 vs JAX", pass: "22/31, 288 yds, 1 TD, 1 INT", rush: "5 att, 6 yds", recLine: "\u2014", ppr: 15.5 },
    irving: { result: "L 23\u201319 vs CLE", pass: "\u2014", rush: "17 att, 89 yds", recLine: recLine(4, 4, 1, 0), ppr: 12.9 },
    franklin: { result: "W 20\u201313 vs JAX", pass: "\u2014", rush: "\u2014", recLine: recLine(2, 1, 27, 0), ppr: 3.7 },
    sadiq: { result: "L 17\u201320 OT vs GB", pass: "\u2014", rush: "\u2014", recLine: "\u2014", ppr: 3.4 },
    sewell: { result: "L 31\u201341 at BUF", snaps: 65, penalties: "\u2014", olLine: olLine(65, "\u2014"), ppr: "\u2014" },
    buckner: { result: "L 30\u201333 OT at KC", def: "5 tackles, 1 sack", teamScore: "L 30\u201333 OT" },
    juwan: { result: "W 24\u201317 at BAL", recLine: "\u2014", ppr: 5.8 },
    tez: { result: "L 23\u201319 vs CLE", recLine: "\u2014", ppr: 3.8 },
    ferguson: { result: "W 28\u20136 vs NYG", recLine: recLine(9, 6, 54, 1), ppr: 17.4 },
    jennings: { result: "DNP (personal) at CHI", recLine: recLine(0, 0, 0, 0), ppr: 0 },
    james: { result: "W 35\u201313 vs MIA", rush: "\u2014", ppr: 1.2 }
  };
  function keyFor(p) {
    if (w[p.id]) return p.id;
    var n = String(p.name || "").toLowerCase();
    if (/ferguson/.test(n)) return "ferguson";
    if (/jennings/.test(n)) return "jennings";
    if (/jauan/.test(n)) return "jennings";
    return p.id;
  }
  if (FLOCK.players) {
    FLOCK.players.forEach(function (p) {
      p.week1 = p.week1 || {};
      var key = keyFor(p);
      if (w[key]) {
        Object.keys(w[key]).forEach(function (k) { p.week1[k] = w[key][k]; });
        if (p.fantasy && typeof w[key].ppr === "number") p.fantasy.week1PPR = w[key].ppr;
        if (key === "jennings") {
          p.team = p.team || "MIN";
          p.pos = p.pos || "WR";
        }
      }
      if (OL.indexOf(p.pos) >= 0) {
        p.fantasyRelevant = true;
        p.week1.ppr = "\u2014";
        p.week1.pass = "\u2014";
        p.week1.rush = "\u2014";
        p.week1.recLine = "\u2014";
        p.week1.note = "";
        p.week1.role = "";
        if (!p.week1.olLine) p.week1.olLine = olLine(p.week1.snaps, p.week1.penalties);
      }
      ["pass", "rush", "recLine", "def", "kick"].forEach(function (k) {
        if (p.week1[k] && !isStat(String(p.week1[k])) && String(p.week1[k]) !== "\u2014") p.week1[k] = "\u2014";
      });
      p.week1.note = "";
      if (p.week1.result && !/^[WL]\b|^Mon\b|^Sun\b|^Thu\b|^DNP\b|^\u2014$/.test(String(p.week1.result))) {
        p.week1.result = "\u2014";
      }
    });
  }
})();
