(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 1;
  if (FLOCK.meta) {
    FLOCK.meta.week = 1;
    FLOCK.meta.lastUpdated = "September 15, 2026";
  }
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      if (!p.weeks[1]) {
        p.weeks[1] = p.week1 || { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 1) === 1) {
        p.week1 = p.weeks[1];
        if (p.fantasy && typeof p.weeks[1].ppr === "number") p.fantasy.week1PPR = p.weeks[1].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 1;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
