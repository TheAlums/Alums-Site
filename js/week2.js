(function () {
  window.FLOCK = window.FLOCK || {};
  if (FLOCK.meta) {
    FLOCK.meta.week = 2;
    FLOCK.meta.lastUpdated = "September 21, 2026";
  }
  function recLine(tgt, rec, yds, td) {
    if (tgt == null && rec == null) return "\u2014";
    return tgt + " tgt, " + rec + " rec, " + yds + " yds, " + td + " TD";
  }
  function isStat(s) {
    if (!s || s === "\u2014") return false;
    if (!/\d/.test(s)) return false;
    return !/snap|limited|mixed|depth|started|personnel|comeback|quiet|rotation/i.test(s);
  }
  var OL = ["OT", "OL", "G", "C", "OG", "OC"];
  var w = {
    herbert: { result: "L 14\u201326 vs LV", pass: "15/27, 192 yds, 1 TD, 2 INT", rush: "3\u20132", recLine: "\u2014", role: "", note: "", ppr: 9.9 },
    nix: { result: "W 20\u201313 vs JAX", pass: "22/31, 288 yds, 1 TD, 1 INT", rush: "\u2014", recLine: "\u2014", role: "", note: "", ppr: 15.1 },
    irving: { result: "L 23\u201319 vs CLE", pass: "\u2014", rush: "17 att, 89 yds", recLine: recLine(4, 4, 1, 0), role: "", note: "", ppr: 12.9 },
    franklin: { result: "W 20\u201313 vs JAX", pass: "\u2014", rush: "\u2014", recLine: recLine(2, 1, 27, 0), role: "", note: "", ppr: 3.7 },
    sadiq: { result: "L 17\u201320 OT vs GB", pass: "\u2014", rush: "\u2014", recLine: "\u2014", role: "", note: "", ppr: 3.4 },
    sewell: { result: "L 31\u201341 at BUF", pass: "\u2014", rush: "\u2014", recLine: "\u2014", role: "Started LT", note: "", ppr: "\u2014" },
    buckner: { result: "L 30\u201333 OT at KC", pass: "\u2014", rush: "\u2014", def: "5 tackles, 1 sack", recLine: "\u2014", role: "", note: "", teamScore: "L 30\u201333 OT" },
    juwan: { result: "W 24\u201317 at BAL", pass: "\u2014", rush: "\u2014", recLine: "\u2014", role: "", note: "", ppr: 5.8 },
    tez: { result: "L 23\u201319 vs CLE", pass: "\u2014", rush: "\u2014", recLine: "\u2014", role: "", note: "", ppr: 3.8 },
    ferguson: { result: "Mon vs NYG", pass: "\u2014", rush: "\u2014", recLine: "\u2014", role: "", note: "", ppr: "\u2014" },
    james: { result: "W 35\u201313 vs MIA", pass: "\u2014", rush: "\u2014", recLine: "\u2014", role: "", note: "", ppr: 1.2 }
  };
  if (FLOCK.players) {
    FLOCK.players.forEach(function (p) {
      p.week1 = p.week1 || {};
      if (w[p.id]) {
        Object.keys(w[p.id]).forEach(function (k) { p.week1[k] = w[p.id][k]; });
        if (p.fantasy && typeof w[p.id].ppr === "number") p.fantasy.week1PPR = w[p.id].ppr;
      }
      if (OL.indexOf(p.pos) >= 0) {
        p.fantasyRelevant = true;
        p.week1.ppr = "\u2014";
        p.week1.pass = "\u2014";
        p.week1.rush = "\u2014";
        p.week1.recLine = "\u2014";
        p.week1.note = "";
        if (!p.week1.role) p.week1.role = "Starter";
      }
      ["pass", "rush", "recLine", "def", "kick"].forEach(function (k) {
        if (p.week1[k] && !isStat(String(p.week1[k])) && String(p.week1[k]) !== "\u2014") p.week1[k] = "\u2014";
      });
      p.week1.note = "";
      if (p.week1.result && !/^[WL]\b|^Mon\b|^Sun\b|^Thu\b|^\u2014$/.test(String(p.week1.result))) {
        p.week1.result = "\u2014";
      }
    });
  }
  FLOCK.news = FLOCK.news || [];
  FLOCK.news.unshift({
    id: "w2-board",
    featured: true,
    tag: "Week 2",
    title: "Nix answers. Herbert does not. Irving still the lead Duck back.",
    dek: "Week 2: Broncos 20\u201313, Chargers 14\u201326, Irving 89 rush yards, Buckner a sack on Sunday night.",
    time: "Sep 21, 2026",
    source: "The Alums desk",
    href: "https://www.espn.com/nfl/scoreboard/_/week/2/year/2026/seasontype/2",
    playerIds: ["nix", "herbert", "irving", "buckner"]
  });
})();
