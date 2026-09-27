(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = FLOCK.viewWeek || 2;
  if (FLOCK.meta) {
    FLOCK.meta.week = 2;
    FLOCK.meta.lastUpdated = "September 23, 2026";
  }
  function recLine(tgt, rec, yds, td) {
    if (tgt == null && rec == null) return "-";
    return tgt + " tgt, " + rec + " rec, " + yds + " yds, " + td + " TD";
  }
  function olLine(snaps, pen) {
    var s = (snaps == null || snaps === "") ? "-" : snaps;
    var p = (pen == null || pen === "") ? "-" : pen;
    return s + " snaps, " + p + " pen";
  }
  function defLine(tck, extra) {
    var parts = [];
    if (tck != null) parts.push(tck + " tackles");
    if (extra) parts.push(extra);
    return parts.join(", ") || "-";
  }
  function isStat(s) {
    if (!s || s === "-") return false;
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
    herbert: { result: "L 14-26 vs LV", pass: "15/27, 192 yds, 1 TD, 2 INT", rush: "3 att, 2 yds", snaps: 1, ppr: 9.9 },
    nix: { result: "W 20-13 vs JAX", pass: "22/31, 288 yds, 1 TD, 1 INT", rush: "5 att, 6 yds", snaps: 1, ppr: 15.5 },
    mariota: { result: "L 20-37 at DAL", pass: "11/16, 111 yds, 1 TD, 0 INT", snaps: 1, ppr: 8.4 },
    irving: { result: "L 19-23 vs CLE", rush: "17 att, 89 yds", recLine: recLine(4, 4, 1, 0), snaps: 1, ppr: 12.9 },
    franklin: { result: "W 20-13 vs JAX", recLine: recLine(2, 1, 27, 0), tgt: 2, rec: 1, recYds: 27, recTD: 0, snaps: 1, ppr: 3.7 },
    ferguson: { result: "W 28-6 vs NYG", recLine: recLine(9, 6, 54, 1), tgt: 9, rec: 6, recYds: 54, recTD: 1, snaps: 1, ppr: 17.4 },
    sadiq: { result: "L 17-20 OT vs GB", snaps: 0, ppr: "-" },
    juwan: { result: "W 24-17 at BAL", snaps: 0, ppr: "-" },
    tez: { result: "L 19-23 vs CLE", snaps: 0, ppr: "-" },
    james: { result: "W 35-13 vs MIA", snaps: 0, ppr: "-" },
    sewell: { result: "L 31-41 at BUF", snaps: 65, olLine: olLine(65, "-"), ppr: "-" },
    buckner: { result: "L 30-33 OT at KC", def: defLine(5, "1 sack, 1 PD"), tackles: 5, sacks: 1, snaps: 1 },
    holland: { result: "L 6-28 at LAR", def: defLine(8, "1 INT, 1 FF, 1 FR"), tackles: 8, snaps: 1 },
    evanwilliams: { result: "W 20-17 OT vs NYJ", def: defLine(10, "1 TFL, 2 PD"), tackles: 10, snaps: 1 },
    thieneman: { result: "L 3-9 vs MIN", def: defLine(7, "1 PD"), tackles: 7, snaps: 1 },
    gonzalez: { result: "W 20-3 vs PIT", def: defLine(4, "2 PD"), tackles: 4, snaps: 1 },
    thibodeaux: { result: "L 6-28 at LAR", def: "played", snaps: 1 },
    hurts: { result: "W 24-20 at TEN", pass: "26/37, 264 yds, 2 TD, 2 INT", rush: "5 att, 16 yds", snaps: 1, ppr: 16.2 },
    young: { result: "W 34-3 at ATL", pass: "287 yds", snaps: 1, ppr: 18.5 },
    gibbs: { result: "L 31-41 at BUF", rush: "16 att, 52 yds", recLine: recLine(8, 6, 61, 1), tgt: 8, rec: 6, recYds: 61, recTD: 1, snaps: 1, ppr: 23.3 },
    henry: { result: "L 17-24 vs NO", rush: "16 att, 68 yds, 1 TD", recLine: recLine(3, 3, 19, 0), tgt: 3, rec: 3, recYds: 19, recTD: 0, snaps: 1, ppr: 17.7 },
    dsmith: { result: "W 24-20 at TEN", recLine: recLine(13, 10, 117, 1), tgt: 13, rec: 10, recYds: 117, recTD: 1, snaps: 1, ppr: 27.7 },
    waddle: { result: "W 20-13 vs JAX", recLine: recLine(10, 8, 138, 0), tgt: 10, rec: 8, recYds: 138, recTD: 0, snaps: 1, ppr: 21.8 },
    jwilliams: { result: "L 31-41 at BUF", snaps: 1, ppr: 7.1 },
    stroud: { result: "L 6-20 vs CIN", pass: "30/55, 353 yds, 0 TD, 0 INT", rush: "3 att, 29 yds", snaps: 1, ppr: 17.0 },
    olave: { result: "W 24-17 at BAL", recLine: recLine(10, 8, 86, 1), tgt: 10, rec: 8, recYds: 86, recTD: 1, snaps: 1, ppr: 22.6 },
    gwilson: { result: "L 17-20 OT vs GB", recLine: recLine(7, 5, 57, 1), tgt: 7, rec: 5, recYds: 57, recTD: 1, snaps: 1, ppr: 16.7 },
    jsn: { result: "W 31-7 at ARI", recLine: "155 yds", recYds: 155, snaps: 1, ppr: 21.5 },
    mclaurin: { result: "L 20-37 at DAL", recLine: recLine(9, 2, 50, 0), tgt: 9, rec: 2, recYds: 50, recTD: 0, snaps: 1, ppr: 7.0 },
    judkins: { result: "W 23-19 at TB", rush: "12 att, 21 yds", recLine: recLine(5, 5, 27, 0), tgt: 5, rec: 5, recYds: 27, recTD: 0, snaps: 1, ppr: 9.8 },
    henderson: { result: "W 20-3 vs PIT", rush: "16 att, 76 yds, 1 TD", snaps: 1, ppr: 13.6 },
    egbuka: { result: "L 19-23 vs CLE", recLine: recLine(5, 3, 16, 1), tgt: 5, rec: 3, recYds: 16, recTD: 1, snaps: 1, ppr: 10.6 },
    stafford: { result: "W 28-6 vs NYG", pass: "22/31, 327 yds, 4 TD, 1 INT", snaps: 1, ppr: 27.1 },
    jcook: { result: "W 41-31 vs DET", rush: "21 att, 135 yds, 1 TD", snaps: 55, ppr: 19.5 },
    swift: { result: "L 3-9 vs MIN", rush: "16 att, 45 yds", recLine: recLine(5, 5, 54, 0), tgt: 5, rec: 5, recYds: 54, recTD: 0, snaps: 1, ppr: 14.9 },
    mcconkey: { result: "L 14-26 vs LV", recLine: recLine(3, 3, 35, 0), tgt: 3, rec: 3, recYds: 35, recTD: 0, snaps: 31, ppr: 6.5 },
    bowers: { result: "DNP - knee", snaps: 0, ppr: 0 },
    zbranch: { result: "L 3-34 vs CAR", recLine: recLine(2, 2, 14, 0), tgt: 2, rec: 2, recYds: 14, recTD: 0, st: "7 yd PR", snaps: 1, ppr: 3.4 },
    pickens: { result: "W 37-20 vs WSH", recLine: recLine(8, 6, 40, 0), tgt: 8, rec: 6, recYds: 40, recTD: 0, snaps: 1, ppr: 10.0 },
    roquan: { result: "L 17-24 vs NO", def: defLine(8, ""), tackles: 8, snaps: 68 },
    barkley: { result: "W 24-20 at TEN", rush: "4 att, 9 yds", recLine: recLine(2, 1, 11, 0), tgt: 2, rec: 1, recYds: 11, recTD: 0, snaps: 12, ppr: 3.0 },
    freiermuth: { result: "L 3-20 at NE", recLine: recLine(4, 4, 32, 0), tgt: 4, rec: 4, recYds: 32, recTD: 0, snaps: 46, ppr: 7.2 },
    kallen: { result: "L 20-37 at DAL", rush: "5 att, 24 yds", snaps: 6, ppr: 2.4 },
    singleton: { result: "L 20-24 vs PHI", rush: "4 att, 10 yds", snaps: 6, ppr: 1.0 },
    allar: { result: "DNP", snaps: 0, ppr: 0 },
    warren: { result: "L 30-33 OT at KC", recLine: recLine(6, 6, 21, 1), tgt: 6, rec: 6, recYds: 21, recTD: 1, snaps: 58, ppr: 14.1 },
    acarter: { result: "L 6-28 at LAR", def: defLine(3, "1 sack, 1 TFL"), tackles: 3, sacks: 1, snaps: 55 },
    jbrisker: { result: "L 3-20 at NE", def: defLine(6, ""), tackles: 6, snaps: 54 }
  };
  function finishWeek(box, pos) {
    box = box || {};
    if (OL.indexOf(pos) >= 0) {
      box.ppr = "-";
      box.pass = "-";
      box.rush = "-";
      box.recLine = "-";
      box.note = "";
      if (!box.olLine) box.olLine = olLine(box.snaps, box.penalties);
    }
    ["pass", "rush", "recLine", "def", "kick"].forEach(function (k) {
      if (box[k] && !isStat(String(box[k])) && String(box[k]) !== "-") box[k] = "-";
    });
    box.note = "";
    if (box.result && /^DNP\b/i.test(String(box.result))) box.snaps = 0;
    if (box.snaps == null) {
      var played = ["pass", "rush", "recLine", "def", "olLine"].some(function (k) {
        return isStat(String(box[k] || ""));
      }) || (typeof box.ppr === "number" && box.ppr > 0);
      box.snaps = played ? 1 : 0;
    }
    return box;
  }
  function keyFor(p) {
    if (w2[p.id]) return p.id;
    var n = String(p.name || "").toLowerCase();
    if (/ferguson/.test(n)) return "ferguson";
    if (/smith-njigba|jsn/.test(n)) return "jsn";
    if (/holland/.test(n)) return "holland";
    if (/thieneman/.test(n)) return "thieneman";
    if (/gonzalez/.test(n)) return "gonzalez";
    if (/evan williams/.test(n)) return "evanwilliams";
    if (/mariota/.test(n)) return "mariota";
    if (/abdul carter/.test(n)) return "acarter";
    if (/tyler warren/.test(n)) return "warren";
    if (/pickens/.test(n)) return "pickens";
    if (/roquan/.test(n)) return "roquan";
    if (/henderson/.test(n)) return "henderson";
    return p.id;
  }
  FLOCK.stampWeeks = function () {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      if (!p.weeks[1]) p.weeks[1] = finishWeek(copy(p.week1 || {}), p.pos);
      var key = keyFor(p);
      if (w2[key]) p.weeks[2] = finishWeek(copy(w2[key]), p.pos);
      else if (!p.weeks[2]) p.weeks[2] = finishWeek({ result: "-", snaps: 0, ppr: "-" }, p.pos);
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
