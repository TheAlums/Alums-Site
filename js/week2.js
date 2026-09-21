(function () {
  window.FLOCK = window.FLOCK || {};
  if (FLOCK.meta) {
    FLOCK.meta.week = 2;
    FLOCK.meta.lastUpdated = "September 21, 2026";
  }
  var w = {
    herbert: { result: "L 14\u201326 vs LV", pass: "15/27, 192 yds, 1 TD, 2 INT", rush: "3\u20132", ppr: 9.9, note: "Sacked three times. Second straight home loss." },
    nix: { result: "W 20\u201313 vs JAX", pass: "22/31, 288 yds, 1 TD, 1 INT", rush: "\u2014", ppr: 15.1, note: "Broncos regroup after the Week 1 Kansas City loss." },
    irving: { result: "L 23\u201319 vs CLE", pass: "\u2014", rush: "17\u201389", recLine: "4 rec, 1 yd", ppr: 12.9, note: "Led Tampa in rushing again. 0\u20132 start." },
    franklin: { result: "W 20\u201313 vs JAX", pass: "\u2014", rush: "\u2014", recLine: "On the field for the comeback", ppr: 6.2, note: "Nix bounce-back game." },
    sadiq: { result: "L 17\u201320 OT vs GB", pass: "\u2014", rush: "\u2014", recLine: "Limited", ppr: 3.4, note: "Jets fell in overtime." },
    sewell: { result: "L 31\u201341 at BUF", pass: "\u2014", rush: "\u2014", ppr: 0, note: "Started at LT. Bills 41, Lions 31." },
    buckner: { result: "L 30\u201333 OT at KC", pass: "\u2014", rush: "\u2014", def: "5 tackles, 1 sack", ppr: 11.0, teamScore: "L 30\u201333 OT", note: "Sack on Sunday Night Football." },
    juwan: { result: "W 24\u201317 at BAL", pass: "\u2014", rush: "\u2014", recLine: "Saints TE snaps", ppr: 5.8, note: "Saints stunned Baltimore." },
    mhj: { result: "L 7\u201331 vs SEA", pass: "\u2014", rush: "\u2014", recLine: "Quiet in a Seattle blowout", ppr: 4.2, note: "Cardinals dropped another to Seattle." },
    barkley: { result: "W 24\u201320 at TEN", pass: "\u2014", rush: "Eagles committee", ppr: 11.6, note: "Eagles held on in Nashville." },
    parsons: { result: "W 20\u201317 OT at NYJ", pass: "\u2014", rush: "\u2014", teamScore: "W 20\u201317 OT", ppr: 0, note: "Packers escaped MetLife in overtime." }
  };
  if (FLOCK.players) {
    FLOCK.players.forEach(function (p) {
      if (!w[p.id]) return;
      p.week1 = Object.assign({}, p.week1 || {}, w[p.id]);
      if (p.fantasy && typeof w[p.id].ppr === "number") p.fantasy.week1PPR = w[p.id].ppr;
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
