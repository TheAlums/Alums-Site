(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.players = FLOCK.players || [];
  function p(o) { FLOCK.players.push(o); }
  function w(result, extra) {
    var x = { result: result, pass: "-", rush: "-", recLine: "-", note: "", snaps: 1 };
    Object.keys(extra || {}).forEach(function (k) { x[k] = extra[k]; });
    return x;
  }
  /* Rows now come from the canonical alumni file (data/alumni.json -> js/alumni-canonical.js). */
  var extra = FLOCK.alumniView ? FLOCK.alumniView("alumni") : [];

  extra.forEach(function (row) {
    if (!FLOCK.players.some(function (x) { return x.id === row.id; })) p(row);
  });
  /* re-run every loaded week sheet (not just weeks 1-2) so these players get weeks 3-10 too */
  if (FLOCK.setViewWeek) FLOCK.setViewWeek(FLOCK.viewWeek);
  else if (FLOCK.stampWeeks) FLOCK.stampWeeks();
})();
