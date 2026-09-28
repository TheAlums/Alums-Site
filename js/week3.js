(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 3;
  if (FLOCK.meta) {
    FLOCK.meta.week = 3;
    FLOCK.meta.lastUpdated = "September 27, 2026";
  }
  var w3 = {
    herbert: { result: "L 16-24 at BUF", pass: "20/34, 226 yds, 1 TD, 1 INT", rush: "4 att, 17 yds", snaps: 1, ppr: 12.7 },
    nix: { result: "W 30-26 vs LAR", pass: "17/34, 186 yds, 2 TD, 1 INT", rush: "4 att, 7 yds, 1 TD", snaps: 1, ppr: 20.1 },
    mariota: { result: "W 33-31 vs SEA", pass: "19/31, 183 yds, 3 TD, 0 INT", rush: "5 att, 11 yds", snaps: 1, ppr: 20.4 },
    irving: { result: "L 16-23 vs MIN", rush: "15 att, 46 yds", recLine: "2 rec, 12 yds, 0 TD", snaps: 1, ppr: 7.8 },
    franklin: { result: "W 30-26 vs LAR", recLine: "1 rec, 21 yds, 0 TD", snaps: 1, ppr: 3.1 },
    ferguson: { result: "L 26-30 at DEN", recLine: "1 rec, 9 yds, 0 TD", snaps: 1, ppr: 1.9 },
    juwan: { result: "L 27-35 vs LV", recLine: "8 rec, 53 yds, 2 TD", snaps: 1, ppr: 25.3 },
    waddle: { result: "W 30-26 vs LAR", rush: "1 att, 14 yds", recLine: "2 rec, 10 yds, 0 TD", snaps: 1, ppr: 4.4 },
    buckner: { result: "W 19-17 vs HOU", def: "1.5 sack", snaps: 1 },
    holland: { result: "W 12-7 vs TEN", def: "played", snaps: 1 },
    evanwilliams: { result: "L 14-35 vs ATL", def: "played", snaps: 1 },
    gonzalez: { result: "L 6-35 at JAX", def: "played", snaps: 1 },
    thibodeaux: { result: "W 12-7 vs TEN", def: "played", snaps: 1 },
    young: { result: "L 18-21 at CLE", pass: "26/48, 291 yds, 1 TD, 1 INT", snaps: 1, ppr: 13.6 },
    gibbs: { result: "W 31-24 vs NYJ", rush: "20 att, 99 yds, 2 TD", recLine: "7 rec, 65 yds, 1 TD", snaps: 1, ppr: 41.4 },
    henry: { result: "W 34-31 at DAL", rush: "26 att, 89 yds, 2 TD", recLine: "1 rec, 0 yds, 0 TD", snaps: 1, ppr: 21.9 },
    jwilliams: { result: "W 31-24 vs NYJ", recLine: "4 rec, 49 yds, 0 TD", snaps: 1, ppr: 8.9 },
    stroud: { result: "L 17-19 at IND", pass: "16/27, 167 yds, 1 TD, 0 INT", rush: "2 att, 10 yds", snaps: 1, ppr: 11.7 },
    olave: { result: "L 27-35 vs LV", recLine: "9 rec, 107 yds, 0 TD", snaps: 1, ppr: 19.7 },
    gwilson: { result: "L 24-31 at DET", recLine: "10 rec, 107 yds, 1 TD", snaps: 1, ppr: 26.7 },
    jsn: { result: "L 31-33 at WSH", recLine: "10 rec, 128 yds, 2 TD", snaps: 1, ppr: 35.4 },
    mclaurin: { result: "W 33-31 vs SEA", recLine: "6 rec, 77 yds, 1 TD", snaps: 1, ppr: 19.7 },
    judkins: { result: "W 21-18 vs CAR", rush: "18 att, 70 yds", recLine: "2 rec, 9 yds, 0 TD", snaps: 1, ppr: 9.9 },
    henderson: { result: "L 6-35 at JAX", rush: "8 att, 23 yds", recLine: "1 rec, 6 yds, 0 TD", snaps: 1, ppr: 3.9 },
    egbuka: { result: "L 16-23 vs MIN", recLine: "5 rec, 62 yds, 0 TD", snaps: 1, ppr: 11.2 },
    stafford: { result: "L 26-30 at DEN", pass: "30/55, 390 yds, 2 TD, 2 INT", rush: "2 att, 13 yds", snaps: 1, ppr: 20.9 },
    mcconkey: { result: "L 16-24 at BUF", recLine: "4 rec, 66 yds, 0 TD", snaps: 1, ppr: 10.6 },
    bowers: { result: "W 35-27 at NO", recLine: "10 rec, 116 yds, 1 TD", snaps: 1, ppr: 27.6 },
    zbranch: { result: "W 35-14 at GB", recLine: "1 rec, 7 yds, 0 TD", snaps: 1, ppr: 1.7 },
    pickens: { result: "L 31-34 vs BAL", recLine: "7 rec, 82 yds, 0 TD", snaps: 1, ppr: 15.2 },
    roquan: { result: "W 34-31 at DAL", def: "1 sack", snaps: 1 },
    freiermuth: { result: "W 30-27 vs CIN", rush: "1 att, 1 yds", recLine: "2 rec, 30 yds, 0 TD", snaps: 1, ppr: 5.1 },
    warren: { result: "W 19-17 vs HOU", rush: "1 att, 2 yds", recLine: "9 rec, 55 yds, 0 TD", snaps: 1, ppr: 14.7 },
    jbrisker: { result: "W 30-27 vs CIN", def: "played", snaps: 1 }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = w3[p.id];
      if (!box && /smith-njigba|jsn/i.test(p.name || "")) box = w3.jsn;
      if (!box && /evan williams/i.test(p.name || "")) box = w3.evanwilliams;
      if (!box && /juwan johnson/i.test(p.name || "")) box = w3.juwan;
      if (box) {
        p.weeks[3] = box;
      } else if (!p.weeks[3]) {
        p.weeks[3] = { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 3) === 3) {
        p.week1 = p.weeks[3];
        if (p.fantasy && typeof p.weeks[3].ppr === "number") p.fantasy.week1PPR = p.weeks[3].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 3;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
