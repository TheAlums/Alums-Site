(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 8;
  if (FLOCK.meta) {
    FLOCK.meta.week = 8;
    FLOCK.meta.lastUpdated = "November 2, 2026";
  }
  // Rely on box-feed.js to pull and apply /api/week/8 data
  // Fallback empty stamps so pages don't break before feed arrives
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      if (!p.weeks[8]) {
        p.weeks[8] = { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 8) === 8) {
        p.week1 = p.weeks[8];
        if (p.fantasy && typeof p.weeks[8].ppr === "number") p.fantasy.week1PPR = p.weeks[8].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 8;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
