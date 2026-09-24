(function () {
  window.FLOCK = window.FLOCK || {};
  var DEFAULT = "https://thealums.greg-lansing.workers.dev/api/week/";
  FLOCK.applyBoxFeed = function (payload) {
    if (!payload || !payload.players || !FLOCK.players) return 0;
    var n = 0;
    var week = Number(payload.week) || FLOCK.viewWeek || 2;
    FLOCK.players.forEach(function (p) {
      var box = payload.players[p.id];
      if (!box) return;
      p.weeks = p.weeks || {};
      p.weeks[week] = box;
      if ((FLOCK.viewWeek || week) === week) p.week1 = box;
      if (p.fantasy && typeof box.ppr === "number") p.fantasy.week1PPR = box.ppr;
      n++;
    });
    FLOCK.meta = FLOCK.meta || {};
    FLOCK.meta.feedPulledAt = payload.pulledAt;
    FLOCK.meta.feedMatched = payload.matched;
    document.dispatchEvent(new CustomEvent("flock:week"));
    return n;
  };
  FLOCK.pullBoxFeed = function (week) {
    week = week || FLOCK.viewWeek || 2;
    var base = (FLOCK.meta && FLOCK.meta.boxFeed) || DEFAULT;
    return fetch(base + week, { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (json) {
        if (!json || !json.players) return 0;
        return FLOCK.applyBoxFeed(json);
      })
      .catch(function () { return 0; });
  };
  window.addEventListener("load", function () {
    setTimeout(function () { FLOCK.pullBoxFeed(FLOCK.viewWeek || 2); }, 400);
  });
})();
