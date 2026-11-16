(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 4;
  if (FLOCK.meta) {
    FLOCK.meta.week = 4;
    FLOCK.meta.lastUpdated = "October 2026";
  }
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      if (!p.weeks[4]) {
        p.weeks[4] = { result: "-", snaps: 0, ppr: "-" };
      }
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
    else {
      FLOCK.viewWeek = Number(n) || 4;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
