(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 10;
  if (FLOCK.meta) {
    FLOCK.meta.week = 10;
    FLOCK.meta.lastUpdated = "November 16, 2026";
  }
  var w10 = {
    juwan: { result: "W 20-17 vs CAR", recLine: "2 rec, 28 yds, 0 TD", snaps: 1, ppr: 4.8 },
    sadiq: { result: "L 12-31 vs BUF", recLine: "1 rec, 3 yds, 0 TD", snaps: 1, ppr: 1.3 },
    gibbs: { result: "W 35-10 vs NE", rush: "22 att, 153 yds, 2 TD", recLine: "7 rec, 99 yds, 0 TD", snaps: 1, ppr: 37.2 },
    stroud: { result: "L 24-27 at CLE", pass: "20/38, 211 yds, 3 TD, 1 INT", rush: "3 att, 20 yds", snaps: 1, ppr: 18.4 },
    stafford: { result: "W 34-6 at ARI", pass: "18/26, 249 yds, 3 TD, 1 INT", rush: "2 att, -2 yds", snaps: 1, ppr: 20.0 },
    young: { result: "W 20-17 at NO", pass: "17/30, 200 yds, 0 TD, 0 INT", rush: "1 att, 1 yds", snaps: 1, ppr: 8.0 },
    jsn: { result: "W 21-13 at LV", recLine: "8 rec, 171 yds, 1 TD", snaps: 1, ppr: 31.1 },
    pickens: { result: "L 40-46 vs SF", recLine: "11 rec, 145 yds, 3 TD", snaps: 1, ppr: 43.5 },
    gwilson: { result: "L 12-31 vs BUF", recLine: "7 rec, 106 yds, 0 TD", snaps: 1, ppr: 17.6 },
    olave: { result: "L 17-20 vs CAR", recLine: "3 rec, 30 yds, 0 TD", snaps: 1, ppr: 6.0 },
    jwilliams: { result: "W 35-10 vs NE", recLine: "4 rec, 50 yds, 0 TD", snaps: 1, ppr: 9.0 },
    bowers: { result: "L 13-21 vs SEA", recLine: "2 rec, 18 yds, 0 TD", snaps: 1, ppr: 3.8 },
    freiermuth: { result: "L 18-38 at CIN", recLine: "2 rec, 35 yds, 1 TD", snaps: 1, ppr: 11.5 },
    warren: { result: "W 24-22 vs MIA", rush: "1 att, 3 yds", recLine: "2 rec, 1 yds, 0 TD", snaps: 1, ppr: 2.4 },
    judkins: { result: "W 27-24 vs HOU", rush: "10 att, 38 yds, 1 TD", recLine: "3 rec, 33 yds, 0 TD", snaps: 1, ppr: 13.1 },
    kallen: { result: "L 22-24 at IND", rush: "1 att, 0 yds", recLine: "1 rec, -4 yds, 0 TD", snaps: 1, ppr: 0.6 },
    acarter: { result: "L 21-24 vs WSH", def: "3 tackles", snaps: 1 },
    buckner: { result: "W 46-40 at DAL", def: "3 tackles", snaps: 1 },
    evanwilliams: { result: "L 10-30 vs MIN", def: "8 tackles, 1 PD", snaps: 1 },
    gonzalez: { result: "L 10-35 at DET", def: "3 tackles, 1 INT", snaps: 1 },
    holland: { result: "L 21-24 vs WSH", def: "3 tackles, 1 INT", snaps: 1 },
    jbrisker: { result: "L 18-38 at CIN", def: "10 tackles", snaps: 1 },
    thibodeaux: { result: "L 21-24 vs WSH", def: "8 tackles", snaps: 1 }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = w10[p.id];
      if (box) {
        p.weeks[10] = box;
      } else if (!p.weeks[10]) {
        p.weeks[10] = { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 10) === 10) {
        p.week1 = p.weeks[10];
        if (p.fantasy && typeof p.weeks[10].ppr === "number") p.fantasy.week1PPR = p.weeks[10].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 10;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
