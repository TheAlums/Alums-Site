/* The Alums — ProDucks player dictionary
   Source of truth for who is on an NFL club.
   Stats sheets only fill after snaps > 0.
   Roster authority: GoDucks NFL #ProDucks, updated Sept 22, 2026. */
(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.dictionaryMeta = {
    school: "oregon",
    source: "GoDucks NFL #ProDucks",
    sourceUrl: "https://goducks.com/sports/2021/10/29/ducks-in-the-nfl",
    asOf: "2026-09-22"
  };
  function row(o) {
    return {
      id: o.id, name: o.name, pos: o.pos, team: o.team, teamName: o.teamName,
      jersey: o.jersey, school: "oregon", league: "NFL",
      yearsAtOregon: o.yearsAtOregon || "", roster: o.roster, statusLabel: o.statusLabel
    };
  }
  /* Rows now come from the canonical alumni file (data/alumni.json -> js/alumni-canonical.js). */
  FLOCK.dictionary = FLOCK.alumniView ? FLOCK.alumniView("dictionary") : [];

  FLOCK.hasSnap = function (p) {
    var w = (p && p.week1) || {};
    if (w.dnp === true) return false;
    if (w.result && /^DNP\b/i.test(String(w.result))) return false;
    if (w.snaps != null && w.snaps !== "" && w.snaps !== "\u2014") {
      var n = Number(w.snaps);
      return !isNaN(n) && n > 0;
    }
    return false;
  };
  FLOCK.mergeDictionary = function () {
    FLOCK.players = FLOCK.players || [];
    var byId = {};
    FLOCK.players.forEach(function (p) { byId[p.id] = p; });
    FLOCK.dictionary.forEach(function (d) {
      var p = byId[d.id];
      if (!p) {
        p = {
          id: d.id, name: d.name, pos: d.pos, team: d.team, teamName: d.teamName,
          league: "NFL", school: "oregon", jersey: d.jersey, yearsAtOregon: d.yearsAtOregon,
          featured: false, fantasyRelevant: ["QB","RB","WR","TE"].indexOf(d.pos) >= 0 && d.roster === "active",
          week1: { result: "\u2014", snaps: 0, ppr: "\u2014" }, season: {}, fantasy: {}
        };
        FLOCK.players.push(p);
        byId[d.id] = p;
      }
      p.roster = d.roster;
      p.statusLabel = d.statusLabel;
      p.team = d.team;
      p.teamName = d.teamName;
      p.pos = p.pos || d.pos;
      p.school = "oregon";
      p.week1 = p.week1 || {};
      if (d.roster !== "active" && p.week1.snaps == null) p.week1.snaps = 0;
    });
    var active = FLOCK.dictionary.filter(function (d) { return d.roster === "active"; });
    var teams = {};
    active.forEach(function (d) { teams[d.team] = true; });
    FLOCK.meta = FLOCK.meta || {};
    FLOCK.meta.activeCount = active.length;
    FLOCK.meta.practiceCount = FLOCK.dictionary.filter(function (d) { return d.roster === "practice"; }).length;
    FLOCK.meta.reserveCount = FLOCK.dictionary.filter(function (d) { return d.roster === "ir" || d.roster === "pup"; }).length;
    FLOCK.meta.deskCount = FLOCK.dictionary.length;
    FLOCK.meta.teamsRepresented = Object.keys(teams).length;
    FLOCK.meta.dictionaryAsOf = FLOCK.dictionaryMeta.asOf;
  };
  FLOCK.mergeDictionary();
})();
