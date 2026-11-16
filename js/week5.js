(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 5;
  if (FLOCK.meta) {
    FLOCK.meta.week = 5;
    FLOCK.meta.lastUpdated = "October 2026";
  }
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      if (!p.weeks[5]) {
        p.weeks[5] = { result: "-", snaps: 0, ppr: "-" };
      }
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
    else {
      FLOCK.viewWeek = Number(n) || 5;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
