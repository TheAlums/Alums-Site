(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 9;
  if (FLOCK.meta) {
    FLOCK.meta.week = 9;
    FLOCK.meta.lastUpdated = "November 9, 2026";
  }
  var w9 = {
    juwan: { result: "W 23-22 vs CLE", recLine: "2 rec, 34 yds, 1 TD", snaps: 1, ppr: 15.4 },
    sadiq: { result: "L 12-35 at KC", recLine: "4 rec, 49 yds, 0 TD", snaps: 1, ppr: 8.9 },
    herbert: { result: "L 22-44 vs HOU", pass: "13/23, 193 yds, 1 TD, 1 INT", rush: "1 att, 7 yds", snaps: 1, ppr: 10.4 },
    nix: { result: "W 26-21 at CAR", pass: "25/37, 237 yds, 2 TD, 1 INT", rush: "5 att, 2 yds", snaps: 1, ppr: 15.5 },
    irving: { result: "L 24-27 at CHI", rush: "20 att, 97 yds, 2 TD", recLine: "4 rec, 28 yds, 0 TD", snaps: 1, ppr: 28.5 },
    franklin: { result: "W 26-21 at CAR", recLine: "3 rec, 31 yds, 0 TD", snaps: 1, ppr: 6.1 },
    gibbs: { result: "W 19-9 at MIA", rush: "20 att, 74 yds, 1 TD", snaps: 1, ppr: 13.4 },
    henry: { result: "L 10-33 vs JAX", rush: "17 att, 57 yds, 0 TD", snaps: 1, ppr: 5.7 },
    stroud: { result: "W 44-22 at LAC", pass: "21/35, 384 yds, 5 TD, 1 INT", rush: "2 att, 20 yds", snaps: 1, ppr: 35.4 },
    stafford: { result: "W 20-13 at WSH", pass: "26/43, 228 yds, 1 TD, 1 INT", rush: "1 att, 1 yds", snaps: 1, ppr: 10.1 },
    young: { result: "L 21-26 vs DEN", pass: "28/39, 276 yds, 3 TD, 1 INT", rush: "1 att, 13 yds", snaps: 1, ppr: 20.0 },
    bowers: { result: "L 17-38 at SF", recLine: "7 rec, 111 yds, 1 TD", snaps: 1, ppr: 24.1 },
    olave: { result: "W 23-22 vs CLE", recLine: "7 rec, 98 yds, 0 TD", snaps: 1, ppr: 16.8 },
    jsn: { result: "W 17-3 vs ARI", recLine: "7 rec, 51 yds, 0 TD", snaps: 1, ppr: 12.1 },
    warren: { result: "L 23-27 vs DAL", recLine: "4 rec, 44 yds, 0 TD", snaps: 1, ppr: 8.4 },
    buckner: { result: "L 23-27 vs DAL", def: "1 tackle", snaps: 1 },
    thibodeaux: { result: "W 19-11 at PHI", def: "4 tackles", snaps: 1 },
    holland: { result: "W 19-11 at PHI", def: "4 tackles", snaps: 1 },
    gonzalez: { result: "L 27-45 vs GB", def: "10 tackles", snaps: 1 },
    roquan: { result: "L 10-33 vs JAX", def: "8 tackles", snaps: 1 }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = w9[p.id];
      if (!box && /juwan johnson/i.test(p.name || "")) box = w9.juwan;
      if (!box && /kenyon sadiq/i.test(p.name || "")) box = w9.sadiq;
      if (box) {
        p.weeks[9] = box;
      } else if (!p.weeks[9]) {
        p.weeks[9] = { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 9) === 9) {
        p.week1 = p.weeks[9];
        if (p.fantasy && typeof p.weeks[9].ppr === "number") p.fantasy.week1PPR = p.weeks[9].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 9;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
