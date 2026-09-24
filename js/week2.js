(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = FLOCK.viewWeek || 2;
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
  var w2 = {
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
    james: { result: "W 35\u201313 vs MIA", rush: "\u2014", snaps: 0, ppr: "\u2014" },
    hurts: { result: "W 24\u201320 at TEN", pass: "26/37, 264 yds, 2 TD, 2 INT", rush: "5 att, 16 yds", snaps: 1, ppr: 16.2 },
    young: { result: "W 34\u20133 at ATL", pass: "287 yds", snaps: 1, ppr: 18.5 },
    gibbs: { result: "L 31\u201341 at BUF", rush: "16 att, 52 yds", recLine: recLine(6, 6, 61, 1), snaps: 1, ppr: 23.3 },
    henry: { result: "L 17\u201324 vs NO", rush: "68 yds", snaps: 1, ppr: 6.8 },
    dsmith: { result: "W 24\u201320 at TEN", recLine: recLine(13, 10, 117, 1), snaps: 1, tgt: 13, rec: 10, recYds: 117, recTD: 1, ppr: 27.7 },
    waddle: { result: "W 20\u201313 vs JAX", recLine: "138 yds", snaps: 1, recYds: 138, ppr: 19.8 },
    jwilliams: { result: "L 31\u201341 at BUF", snaps: 1, ppr: 7.1 },
    stroud: { result: "L 6\u201320 vs CIN", pass: "30/55, 353 yds, 0 TD, 0 INT", rush: "3 att, 29 yds", snaps: 1, ppr: 17.0 },
    olave: { result: "W 24\u201317 at BAL", recLine: recLine(10, 8, 86, 1), snaps: 1, tgt: 10, rec: 8, recYds: 86, recTD: 1, ppr: 22.6 },
    gwilson: { result: "L 17\u201320 OT vs GB", snaps: 1, ppr: 9.2 },
    jsn: { result: "W 31\u20137 at ARI", recLine: "155 yds", snaps: 1, recYds: 155, ppr: 21.5 },
    mclaurin: { result: "L 20\u201337 at DAL", snaps: 1, ppr: 5.4 },
    judkins: { result: "W 23\u201319 at TB", snaps: 1, ppr: 4.8 },
    stafford: { result: "W 28\u20136 vs NYG", snaps: 1, ppr: 14.0 },
    jcook: { result: "W 41\u201331 vs DET", rush: "135 yds", snaps: 1, ppr: 13.5 },
    swift: { result: "L 3\u20139 vs MIN", snaps: 1, ppr: 8.1 },
    mcconkey: { result: "L 14\u201326 vs LV", snaps: 1, ppr: 11.2 },
    bowers: { result: "DNP \u2014 knee", snaps: 0, ppr: 0 },
    zbranch: { result: "L 3\u201334 vs CAR", snaps: 1, ppr: 3.2 },
    barkley: { result: "W 24\u201320 at TEN", rush: "4 att, 9 yds", recLine: recLine(2, 1, 11, 0), snaps: 1, ppr: 2.0 },
    freiermuth: { result: "L 3\u201320 at NE", snaps: 1, ppr: 7.6 },
    mhj: { result: "L 7\u201331 vs SEA", snaps: 1, ppr: 4.2 },
    egbuka: { result: "L 19\u201323 vs CLE", snaps: 1, ppr: 11.2 }
  };
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
      }) || (typeof box.ppr === "number" && box.ppr > 0);
      box.snaps = played ? 1 : 0;
    }
    if (box.result && !/^[WL]\b|^Mon\b|^Sun\b|^Thu\b|^DNP\b|^\u2014$/.test(String(box.result))) {
      box.result = "\u2014";
    }
    return box;
  }
  function keyFor(p) {
    if (w2[p.id]) return p.id;
    var n = String(p.name || "").toLowerCase();
    if (/ferguson/.test(n)) return "ferguson";
    if (/smith-njigba|jsn/.test(n)) return "jsn";
    return p.id;
  }
  FLOCK.stampWeeks = function () {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      if (!p.weeks[1]) p.weeks[1] = finishWeek(copy(p.week1 || {}), p.pos);
      var key = keyFor(p);
      if (w2[key]) p.weeks[2] = finishWeek(copy(w2[key]), p.pos);
      else if (!p.weeks[2]) p.weeks[2] = finishWeek(copy(p.week1 || {}), p.pos);
      var show = p.weeks[FLOCK.viewWeek] || p.weeks[2] || p.weeks[1];
      p.week1 = show;
      if (p.fantasy && typeof show.ppr === "number") p.fantasy.week1PPR = show.ppr;
    });
  };
  FLOCK.setViewWeek = function (n) {
    FLOCK.viewWeek = Number(n) || 2;
    if (FLOCK.meta) FLOCK.meta.week = FLOCK.viewWeek;
    FLOCK.stampWeeks();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
  FLOCK.stampWeeks();
})();
