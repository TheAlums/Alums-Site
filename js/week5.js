(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 5;
  if (FLOCK.meta) {
    FLOCK.meta.week = 5;
    FLOCK.meta.lastUpdated = "October 12, 2026";
  }
  var sheet = {
    acarter: { result: "- 27-27 at WSH", def: "1 sack", snaps: 1 },
    bowers: { result: "L 17-45 at NE", recLine: "8 tgt, 8 rec, 110 yds, 1 TD", snaps: 1, ppr: 25 },
    buckner: { result: "L 22-34 at PIT", def: "1 sack", snaps: 1 },
    egbuka: { result: "W 24-16 at DAL", rush: "1 att, 14 yds, 1 TD", recLine: "6 tgt, 6 rec, 38 yds, 0 TD", snaps: 1, ppr: 17.2 },
    evanwilliams: { result: "W 31-7 vs CHI", def: "played", snaps: 1 },
    franklin: { result: "W 23-17 at LAC", recLine: "2 tgt, 2 rec, 16 yds, 0 TD", snaps: 1, ppr: 3.6 },
    freiermuth: { result: "W 34-22 vs IND", rush: "1 att, 1 yds", recLine: "5 tgt, 5 rec, 44 yds, 2 TD", snaps: 1, ppr: 21.5 },
    gibbs: { result: "W 45-21 at ARI", rush: "25 att, 151 yds, 2 TD", recLine: "5 tgt, 5 rec, 56 yds, 0 TD", snaps: 1, ppr: 37.7 },
    gwilson: { result: "W 17-12 vs CLE", recLine: "7 tgt, 7 rec, 104 yds, 1 TD", snaps: 1, ppr: 23.4 },
    henderson: { result: "W 45-17 vs LV", rush: "4 att, 22 yds", recLine: "1 tgt, 1 rec, 16 yds, 0 TD", snaps: 1, ppr: 4.8 },
    henry: { result: "W 30-23 at ATL", rush: "24 att, 102 yds", recLine: "1 tgt, 1 rec, 18 yds, 1 TD", snaps: 1, ppr: 19 },
    herbert: { result: "L 17-23 vs DEN", pass: "14/24, 121 yds, 1 TD, 1 INT", rush: "6 att, 54 yds", snaps: 1, ppr: 12.2 },
    holland: { result: "- 27-27 at WSH", def: "played", snaps: 1 },
    hurts: { result: "L 17-19 at JAX", pass: "21/40, 220 yds, 1 TD, 0 INT", rush: "2 att, 2 yds", snaps: 1, ppr: 13 },
    irving: { result: "W 24-16 at DAL", rush: "21 att, 165 yds, 1 TD", recLine: "2 tgt, 2 rec, 10 yds, 1 TD", snaps: 1, ppr: 31.5 },
    jbrisker: { result: "W 34-22 vs IND", def: "played", snaps: 1 },
    jsn: { result: "L 29-32 vs SF", rush: "1 att, 16 yds", recLine: "5 tgt, 5 rec, 102 yds, 1 TD", def: "played", snaps: 1, ppr: 22.8 },
    judkins: { result: "L 12-17 at NYJ", rush: "14 att, 44 yds", recLine: "3 tgt, 3 rec, 6 yds, 0 TD", snaps: 1, ppr: 8 },
    jwilliams: { result: "W 45-21 at ARI", recLine: "2 tgt, 2 rec, 47 yds, 2 TD", snaps: 1, ppr: 18.7 },
    mclaurin: { result: "- 27-27 vs NYG", recLine: "4 tgt, 4 rec, 62 yds, 0 TD", snaps: 1, ppr: 10.2 },
    nix: { result: "W 23-17 at LAC", pass: "16/27, 123 yds, 1 TD, 0 INT", rush: "4 att, 10 yds", snaps: 1, ppr: 9.9 },
    olave: { result: "L 13-23 vs MIN", recLine: "4 tgt, 4 rec, 46 yds, 0 TD", def: "played", snaps: 1, ppr: 8.6 },
    pickens: { result: "L 16-24 vs TB", recLine: "9 tgt, 9 rec, 130 yds, 1 TD", snaps: 1, ppr: 28 },
    roquan: { result: "W 30-23 at ATL", def: "played", snaps: 1 },
    stroud: { result: "W 26-3 at TEN", pass: "26/34, 261 yds, 1 TD, 0 INT", rush: "6 att, 5 yds, 1 TD", snaps: 1, ppr: 20.9 },
    swift: { result: "L 7-31 at GB", rush: "9 att, 43 yds, 1 TD", recLine: "4 tgt, 4 rec, 30 yds, 0 TD", snaps: 1, ppr: 17.3 },
    thibodeaux: { result: "- 27-27 at WSH", def: "played", snaps: 1 },
    thieneman: { result: "L 7-31 at GB", def: "played", snaps: 1 },
    waddle: { result: "W 23-17 at LAC", rush: "1 att, 9 yds", recLine: "2 tgt, 2 rec, 19 yds, 0 TD", snaps: 1, ppr: 4.8 },
    warren: { result: "L 22-34 at PIT", rush: "1 att, 1 yds, 1 TD", recLine: "7 tgt, 7 rec, 83 yds, 0 TD", snaps: 1, ppr: 21.4 },
    zbranch: { result: "L 23-30 vs BAL", recLine: "2 tgt, 2 rec, 15 yds, 0 TD", snaps: 1, ppr: 3.5 }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = sheet[p.id];
      if (!box && /smith-njigba|jsn/i.test(p.name || "")) box = sheet.jsn;
      if (!box && /evan williams/i.test(p.name || "")) box = sheet.evanwilliams;
      if (!box && /juwan johnson/i.test(p.name || "")) box = sheet.juwan;
      if (box) p.weeks[5] = box;
      else if (!p.weeks[5]) p.weeks[5] = { result: "-", snaps: 0, ppr: "-" };
      if ((FLOCK.viewWeek || 5) === 5) {
        p.week1 = p.weeks[5];
        if (p.fantasy && typeof p.weeks[5].ppr === "number") p.fantasy.week1PPR = p.weeks[5].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else { FLOCK.viewWeek = Number(n) || 5; if (FLOCK.stampWeeks) FLOCK.stampWeeks(); }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
