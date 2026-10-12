(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 4;
  if (FLOCK.meta) {
    FLOCK.meta.week = 4;
    FLOCK.meta.lastUpdated = "October 12, 2026";
  }
  var sheet = {
    acarter: { result: "W 36-24 vs ARI", def: "played", snaps: 1 },
    barkley: { result: "L 20-24 vs LAR", rush: "2 att, 8 yds", recLine: "1 tgt, 1 rec, 2 yds, 0 TD", snaps: 1, ppr: 2 },
    bowers: { result: "L 27-30 vs KC", recLine: "6 tgt, 6 rec, 86 yds, 1 TD", snaps: 1, ppr: 20.6 },
    buckner: { result: "W 30-13 at WSH", def: "played", snaps: 1 },
    egbuka: { result: "L 14-17 vs GB", recLine: "2 tgt, 2 rec, 13 yds, 0 TD", snaps: 1, ppr: 3.3 },
    evanwilliams: { result: "W 17-14 at TB", def: "1 sack", snaps: 1 },
    freiermuth: { result: "L 24-27 at CLE", recLine: "3 tgt, 3 rec, 17 yds, 1 TD", snaps: 1, ppr: 10.7 },
    gibbs: { result: "L 26-32 at CAR", rush: "15 att, 46 yds, 1 TD", recLine: "4 tgt, 4 rec, 31 yds, 0 TD", snaps: 1, ppr: 17.7 },
    gwilson: { result: "L 12-23 at CHI", recLine: "3 tgt, 3 rec, 27 yds, 0 TD", snaps: 1, ppr: 5.7 },
    henderson: { result: "W 29-26 at BUF", rush: "14 att, 42 yds", recLine: "0 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 4.2 },
    henry: { result: "W 24-18 vs TEN", rush: "23 att, 73 yds, 1 TD", recLine: "2 tgt, 2 rec, 6 yds, 0 TD", snaps: 1, ppr: 15.9 },
    herbert: { result: "L 23-30 at SEA", pass: "19/31, 189 yds, 1 TD, 2 INT", rush: "6 att, 40 yds", recLine: "0 tgt, 0 rec, 0 yds, 0 TD", def: "played", snaps: 1, ppr: 11.6 },
    holland: { result: "W 36-24 vs ARI", def: "played", snaps: 1 },
    hurts: { result: "L 20-24 vs LAR", pass: "12/27, 93 yds, 2 TD, 0 INT", rush: "5 att, 18 yds", snaps: 1, ppr: 13.5 },
    irving: { result: "L 14-17 vs GB", rush: "16 att, 61 yds", snaps: 1, ppr: 6.1 },
    jbrisker: { result: "L 24-27 at CLE", def: "played", snaps: 1 },
    jsn: { result: "W 30-23 vs LAC", recLine: "5 tgt, 5 rec, 76 yds, 0 TD", snaps: 1, ppr: 12.6 },
    judkins: { result: "W 27-24 vs PIT", rush: "17 att, 53 yds, 1 TD", recLine: "6 tgt, 6 rec, 43 yds, 0 TD", snaps: 1, ppr: 21.6 },
    jwilliams: { result: "L 26-32 at CAR", recLine: "6 tgt, 6 rec, 102 yds, 0 TD", snaps: 1, ppr: 16.2 },
    kallen: { result: "L 13-30 vs IND", rush: "3 att, 1 yds", snaps: 1, ppr: 0.1 },
    mariota: { result: "L 13-30 vs IND", pass: "3/4, 46 yds, 0 TD, 0 INT", rush: "1 att, 35 yds", snaps: 1, ppr: 5.3 },
    mcconkey: { result: "L 23-30 at SEA", recLine: "0 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 0 },
    nix: { result: "L 14-24 at SF", pass: "25/42, 214 yds, 1 TD, 0 INT", rush: "2 att, 10 yds", snaps: 1, ppr: 13.6 },
    olave: { result: "L 24-45 vs ATL", recLine: "8 tgt, 8 rec, 116 yds, 0 TD", snaps: 1, ppr: 19.6 },
    pickens: { result: "W 34-30 at HOU", recLine: "2 tgt, 2 rec, 75 yds, 0 TD", snaps: 1, ppr: 9.5 },
    roquan: { result: "W 24-18 vs TEN", def: "played", snaps: 1 },
    singleton: { result: "L 18-24 at BAL", rush: "3 att, 2 yds", snaps: 1, ppr: 0.2 },
    stafford: { result: "W 24-20 at PHI", pass: "32/51, 317 yds, 0 TD, 2 INT", rush: "3 att, 10 yds", snaps: 1, ppr: 9.7 },
    stroud: { result: "L 30-34 vs DAL", pass: "21/31, 347 yds, 2 TD, 0 INT", rush: "2 att, 12 yds", snaps: 1, ppr: 23.1 },
    swift: { result: "W 23-12 vs NYJ", rush: "15 att, 58 yds", recLine: "2 tgt, 2 rec, 16 yds, 0 TD", snaps: 1, ppr: 9.4 },
    thibodeaux: { result: "W 36-24 vs ARI", def: "played", snaps: 1 },
    thieneman: { result: "W 23-12 vs NYJ", def: "played", snaps: 1 },
    waddle: { result: "L 14-24 at SF", recLine: "5 tgt, 5 rec, 35 yds, 1 TD", snaps: 1, ppr: 14.5 },
    warren: { result: "W 30-13 at WSH", recLine: "5 tgt, 5 rec, 41 yds, 0 TD", snaps: 1, ppr: 9.1 },
    young: { result: "W 32-26 vs DET", pass: "29/41, 329 yds, 2 TD, 0 INT", rush: "3 att, 3 yds", snaps: 1, ppr: 21.5 },
    zbranch: { result: "W 45-24 at NO", recLine: "2 tgt, 2 rec, 10 yds, 0 TD", snaps: 1, ppr: 3 }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = sheet[p.id];
      if (!box && /smith-njigba|jsn/i.test(p.name || "")) box = sheet.jsn;
      if (!box && /evan williams/i.test(p.name || "")) box = sheet.evanwilliams;
      if (!box && /juwan johnson/i.test(p.name || "")) box = sheet.juwan;
      if (box) p.weeks[4] = box;
      else if (!p.weeks[4]) p.weeks[4] = { result: "-", snaps: 0, ppr: "-" };
      if ((FLOCK.viewWeek || 4) === 4) {
        p.week1 = p.weeks[4];
        if (p.fantasy && typeof p.weeks[4].ppr === "number") p.fantasy.week1PPR = p.weeks[4].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else { FLOCK.viewWeek = Number(n) || 4; if (FLOCK.stampWeeks) FLOCK.stampWeeks(); }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
