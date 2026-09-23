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
  FLOCK.dictionary = [
    row({ id: "armstead", name: "Arik Armstead", pos: "DT", team: "JAC", teamName: "Jacksonville Jaguars", jersey: 91, yearsAtOregon: "2012-14", roster: "active", statusLabel: "53-man" }),
    row({ id: "bass", name: "T.J. Bass", pos: "OL", team: "DAL", teamName: "Dallas Cowboys", jersey: 66, yearsAtOregon: "2020-22", roster: "active", statusLabel: "53-man" }),
    row({ id: "bassa", name: "Jeffrey Bassa", pos: "LB", team: "KC", teamName: "Kansas City Chiefs", jersey: 31, yearsAtOregon: "2021-24", roster: "active", statusLabel: "53-man" }),
    row({ id: "benson", name: "Malik Benson", pos: "WR", team: "LV", teamName: "Las Vegas Raiders", jersey: 19, yearsAtOregon: "2025", roster: "active", statusLabel: "53-man" }),
    row({ id: "boettcher", name: "Bryce Boettcher", pos: "LB", team: "IND", teamName: "Indianapolis Colts", jersey: 50, yearsAtOregon: "2021-25", roster: "active", statusLabel: "53-man" }),
    row({ id: "buckner", name: "DeForest Buckner", pos: "DL", team: "IND", teamName: "Indianapolis Colts", jersey: 99, yearsAtOregon: "2012-15", roster: "active", statusLabel: "53-man" }),
    row({ id: "burch", name: "Jordan Burch", pos: "OLB", team: "ARI", teamName: "Arizona Cardinals", jersey: 52, yearsAtOregon: "2020-24", roster: "active", statusLabel: "53-man" }),
    row({ id: "caldwell", name: "Jamaree Caldwell", pos: "DL", team: "LAC", teamName: "Los Angeles Chargers", jersey: 99, yearsAtOregon: "2022-24", roster: "active", statusLabel: "53-man" }),
    row({ id: "canady", name: "Jadon Canady", pos: "DB", team: "KC", teamName: "Kansas City Chiefs", jersey: 22, yearsAtOregon: "2025", roster: "active", statusLabel: "53-man" }),
    row({ id: "conerly", name: "Josh Conerly Jr.", pos: "OL", team: "WAS", teamName: "Washington Commanders", jersey: 72, yearsAtOregon: "2022-24", roster: "active", statusLabel: "53-man" }),
    row({ id: "cornelius", name: "Ajani Cornelius", pos: "OL", team: "DAL", teamName: "Dallas Cowboys", jersey: 65, yearsAtOregon: "2020-24", roster: "active", statusLabel: "53-man" }),
    row({ id: "dorlus", name: "Brandon Dorlus", pos: "DL", team: "ATL", teamName: "Atlanta Falcons", jersey: 54, yearsAtOregon: "2019-23", roster: "active", statusLabel: "53-man" }),
    row({ id: "dye", name: "Troy Dye", pos: "LB", team: "LAC", teamName: "Los Angeles Chargers", jersey: 43, yearsAtOregon: "2016-19", roster: "active", statusLabel: "53-man" }),
    row({ id: "ferguson", name: "Terrance Ferguson", pos: "TE", team: "LAR", teamName: "Los Angeles Rams", jersey: 18, yearsAtOregon: "2021-24", roster: "active", statusLabel: "53-man" }),
    row({ id: "forsyth", name: "Alex Forsyth", pos: "OL", team: "DEN", teamName: "Denver Broncos", jersey: 54, yearsAtOregon: "2017-22", roster: "active", statusLabel: "53-man" }),
    row({ id: "franklin", name: "Troy Franklin", pos: "WR", team: "DEN", teamName: "Denver Broncos", jersey: 11, yearsAtOregon: "2021-23", roster: "active", statusLabel: "53-man" }),
    row({ id: "gonzalez", name: "Christian Gonzalez", pos: "CB", team: "NE", teamName: "New England Patriots", jersey: 0, yearsAtOregon: "2022", roster: "active", statusLabel: "53-man" }),
    row({ id: "harkey", name: "Alex Harkey", pos: "OL", team: "LAC", teamName: "Los Angeles Chargers", jersey: 73, yearsAtOregon: "2025", roster: "active", statusLabel: "53-man" }),
    row({ id: "harmon", name: "Derrick Harmon", pos: "DT", team: "PIT", teamName: "Pittsburgh Steelers", jersey: 99, yearsAtOregon: "2024", roster: "active", statusLabel: "53-man" }),
    row({ id: "herbert", name: "Justin Herbert", pos: "QB", team: "LAC", teamName: "Los Angeles Chargers", jersey: 10, yearsAtOregon: "2016-19", roster: "active", statusLabel: "53-man" }),
    row({ id: "holland", name: "Jevon Holland", pos: "S", team: "NYG", teamName: "New York Giants", jersey: 8, yearsAtOregon: "2018-20", roster: "active", statusLabel: "53-man" }),
    row({ id: "irving", name: "Bucky Irving", pos: "RB", team: "TB", teamName: "Tampa Bay Buccaneers", jersey: 7, yearsAtOregon: "2022-23", roster: "active", statusLabel: "53-man" }),
    row({ id: "james", name: "Jordan James", pos: "RB", team: "SF", teamName: "San Francisco 49ers", jersey: 29, yearsAtOregon: "2022-24", roster: "active", statusLabel: "53-man" }),
    row({ id: "juwan", name: "Juwan Johnson", pos: "TE", team: "NO", teamName: "New Orleans Saints", jersey: 83, yearsAtOregon: "2019", roster: "active", statusLabel: "53-man" }),
    row({ id: "tez", name: "Tez Johnson", pos: "WR", team: "TB", teamName: "Tampa Bay Buccaneers", jersey: 15, yearsAtOregon: "2023-24", roster: "active", statusLabel: "53-man" }),
    row({ id: "lenoir", name: "Deommodore Lenoir", pos: "DB", team: "SF", teamName: "San Francisco 49ers", jersey: 2, yearsAtOregon: "2017-20", roster: "active", statusLabel: "53-man" }),
    row({ id: "mariota", name: "Marcus Mariota", pos: "QB", team: "WAS", teamName: "Washington Commanders", jersey: 8, yearsAtOregon: "2011-14", roster: "active", statusLabel: "53-man" }),
    row({ id: "mundt", name: "Johnny Mundt", pos: "TE", team: "PHI", teamName: "Philadelphia Eagles", jersey: 83, yearsAtOregon: "2013-16", roster: "active", statusLabel: "53-man" }),
    row({ id: "nix", name: "Bo Nix", pos: "QB", team: "DEN", teamName: "Denver Broncos", jersey: 10, yearsAtOregon: "2022-23", roster: "active", statusLabel: "53-man" }),
    row({ id: "jpj", name: "Jackson Powers-Johnson", pos: "OL", team: "LV", teamName: "Las Vegas Raiders", jersey: 58, yearsAtOregon: "2021-23", roster: "active", statusLabel: "53-man" }),
    row({ id: "pregnon", name: "Emmanuel Pregnon", pos: "OL", team: "JAC", teamName: "Jacksonville Jaguars", jersey: 75, yearsAtOregon: "2025", roster: "active", statusLabel: "53-man" }),
    row({ id: "sadiq", name: "Kenyon Sadiq", pos: "TE", team: "NYJ", teamName: "New York Jets", jersey: 16, yearsAtOregon: "2023-25", roster: "active", statusLabel: "53-man" }),
    row({ id: "sewell", name: "Penei Sewell", pos: "OL", team: "DET", teamName: "Detroit Lions", jersey: 58, yearsAtOregon: "2018-20", roster: "active", statusLabel: "53-man" }),
    row({ id: "thibodeaux", name: "Kayvon Thibodeaux", pos: "DE", team: "NYG", teamName: "New York Giants", jersey: 5, yearsAtOregon: "2019-21", roster: "active", statusLabel: "53-man" }),
    row({ id: "thieneman", name: "Dillon Thieneman", pos: "DB", team: "CHI", teamName: "Chicago Bears", jersey: 31, yearsAtOregon: "2025", roster: "active", statusLabel: "53-man" }),
    row({ id: "evanwilliams", name: "Evan Williams", pos: "DB", team: "GB", teamName: "Green Bay Packers", jersey: 33, yearsAtOregon: "2023", roster: "active", statusLabel: "53-man" }),
    row({ id: "jamalhill", name: "Jamal Hill", pos: "LB", team: "HOU", teamName: "Houston Texans", jersey: 56, yearsAtOregon: "2019-23", roster: "active", statusLabel: "53-man" }),
    row({ id: "reed", name: "Nikko Reed", pos: "DB", team: "NYG", teamName: "New York Giants", jersey: 35, yearsAtOregon: "2023-24", roster: "active", statusLabel: "53-man" }),
    row({ id: "brown", name: "Pharaoh Brown", pos: "TE", team: "IND", teamName: "Indianapolis Colts", jersey: 49, yearsAtOregon: "2012-16", roster: "practice", statusLabel: "Practice squad" }),
    row({ id: "pherbert", name: "Patrick Herbert", pos: "TE", team: "LAC", teamName: "Los Angeles Chargers", jersey: 81, yearsAtOregon: "2019-24", roster: "practice", statusLabel: "Practice squad" }),
    row({ id: "sjones", name: "Steven Jones", pos: "OL", team: "PIT", teamName: "Pittsburgh Steelers", jersey: 79, yearsAtOregon: "2018-23", roster: "practice", statusLabel: "Practice squad" }),
    row({ id: "muhammad", name: "Jabbar Muhammad", pos: "DB", team: "JAC", teamName: "Jacksonville Jaguars", jersey: 37, yearsAtOregon: "2024", roster: "practice", statusLabel: "Practice squad" }),
    row({ id: "throckmorton", name: "Calvin Throckmorton", pos: "OL", team: "DEN", teamName: "Denver Broncos", jersey: 76, yearsAtOregon: "2015-19", roster: "practice", statusLabel: "Practice squad" }),
    row({ id: "whittington", name: "Noah Whittington", pos: "RB", team: "HOU", teamName: "Houston Texans", jersey: 26, yearsAtOregon: "2022-25", roster: "practice", statusLabel: "Practice squad" }),
    row({ id: "basso", name: "Luke Basso", pos: "LS", team: "DEN", teamName: "Denver Broncos", jersey: "", yearsAtOregon: "2021-25", roster: "practice", statusLabel: "Practice squad" }),
    row({ id: "gabriel", name: "Dillon Gabriel", pos: "QB", team: "CLE", teamName: "Cleveland Browns", jersey: 6, yearsAtOregon: "2024", roster: "ir", statusLabel: "Reserve/Injured" }),
    row({ id: "taimani", name: "Taki Taimani", pos: "DL", team: "MIN", teamName: "Minnesota Vikings", jersey: 94, yearsAtOregon: "2022-23", roster: "ir", statusLabel: "Reserve/Injured" }),
    row({ id: "riley", name: "Jordon Riley", pos: "DT", team: "GB", teamName: "Green Bay Packers", jersey: 97, yearsAtOregon: "2022", roster: "pup", statusLabel: "Reserve/PUP" }),
    row({ id: "noahsewell", name: "Noah Sewell", pos: "LB", team: "CHI", teamName: "Chicago Bears", jersey: 44, yearsAtOregon: "2020-22", roster: "pup", statusLabel: "Reserve/PUP" }),
    row({ id: "world", name: "Isaiah World", pos: "OL", team: "LAC", teamName: "Los Angeles Chargers", jersey: 67, yearsAtOregon: "2025", roster: "pup", statusLabel: "Reserve/PUP" })
  ];
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
