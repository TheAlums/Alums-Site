(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 6;
  if (FLOCK.meta) {
    FLOCK.meta.week = 6;
    FLOCK.meta.lastUpdated = "October 2026";
  }
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      if (!p.weeks[6]) {
        p.weeks[6] = { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 6) === 6) {
        p.week1 = p.weeks[6];
        if (p.fantasy && typeof p.weeks[6].ppr === "number") p.fantasy.week1PPR = p.weeks[6].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 6;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
