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
  function copy(obj) {
    var out = {};
    Object.keys(obj || {}).forEach(function (k) { out[k] = obj[k]; });
    return out;
  }
  var OL = ["OT", "OL", "G", "C", "OG", "OC"];
  var w = {
    herbert: { result: "L 14\u201326 vs LV", pass: "15/27, 192 yds, 1 TD, 2 INT", rush: "3\u20132", recLine: "\u2014", snaps: 1, ppr: 9.9 },
    nix: { result: "W 20\u201313 vs JAX", pass: "22/31, 288 yds, 1 TD, 1 INT", rush: "5 att, 6 yds", recLine: "\u2014", snaps: 1, ppr: 15.5 },
    irving: { result: "L 23\u201319 vs CLE", pass: "\u2014", rush: "17 att, 89 yds", recLine: recLine(4, 4, 1, 0), snaps: 1, ppr: 12.9 },
    franklin: { result: "W 20\u201313 vs JAX", pass: "\u2014", rush: "\u2014", recLine: recLine(2, 1, 27, 0), snaps: 1, ppr: 3.7 },
    sadiq: { result: "L 17\u201320 OT vs GB", pass: "\u2014", rush: "\u2014", recLine: "\u2014", snaps: 0, ppr: "\u2014" },
    sewell: { result: "L 31\u201341 at BUF", snaps: 65, penalties: "\u2014", olLine: olLine(65, "\u2014"), ppr: "\u2014" },
    buckner: { result: "L 30\u201333 OT at KC", def: "5 tackles, 1 sack", snaps: 1, teamScore: "L 30\u201333 OT" },
    juwan: { result: "W 24\u201317 at BAL", recLine: "\u2014", snaps: 0, ppr: "\u2014" },
    tez: { result: "L 23\u201319 vs CLE", recLine: "\u2014", snaps: 0, ppr: "\u2014" },
    ferguson: { result: "W 28\u20136 vs NYG", recLine: recLine(9, 6, 54, 1), snaps: 1, tgt: 9, rec: 6, recYds: 54, recTD: 1, ppr: 17.4 },
    james: { result: "W 35\u201313 vs MIA", rush: "\u2014", snaps: 0, ppr: "\u2014" }
  };
  function keyFor(p) {
    if (w[p.id]) return p.id;
    var n = String(p.name || "").toLowerCase();
    if (/ferguson/.test(n)) return "ferguson";
    return p.id;
  }
  function finishWeek(box, pos) {
    box = box || {};
    if (OL.indexOf(pos) >= 0) {
      box.ppr = "\u2014";
      box.pass = "\u2014";
      box.rush = "\u2014";
      box.recLine = "\u2014";
      box.note = "";
      if (!box.olLine) box.olLine = olLine(box.snaps, box.penalties);
    }
    ["pass", "rush", "recLine", "def", "kick"].forEach(function (k) {
      if (box[k] && !isStat(String(box[k])) && String(box[k]) !== "\u2014") box[k] = "\u2014";
    });
    box.note = "";
    if (box.result && /^DNP\b/i.test(String(box.result))) box.snaps = 0;
    if (box.snaps == null) {
      var played = ["pass", "rush", "recLine", "def", "olLine"].some(function (k) {
        return isStat(String(box[k] || ""));
      });
      box.snaps = played ? 1 : 0;
    }
    if (box.result && !/^[WL]\b|^Mon\b|^Sun\b|^Thu\b|^DNP\b|^\u2014$/.test(String(box.result))) {
      box.result = "\u2014";
    }
    return box;
  }
  if (FLOCK.players) {
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      if (!p.weeks[1]) p.weeks[1] = finishWeek(copy(p.week1 || {}), p.pos);
      var key = keyFor(p);
      var w2 = w[key] ? copy(w[key]) : { result: "\u2014", snaps: 0, ppr: "\u2014" };
      if (p.roster && p.roster !== "active" && w2.snaps == null) w2.snaps = 0;
      p.weeks[2] = finishWeek(w2, p.pos);
      p.week1 = p.weeks[2];
      if (p.fantasy && typeof p.weeks[2].ppr === "number") p.fantasy.week1PPR = p.weeks[2].ppr;
    });
  }
})();
