(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.players = FLOCK.players || [];
  function p(o) { FLOCK.players.push(o); }
  function w(result, extra) {
    var x = { result: result, pass: "\u2014", rush: "\u2014", recLine: "\u2014", note: "" };
    Object.keys(extra || {}).forEach(function (k) { x[k] = extra[k]; });
    return x;
  }
  var extra = [
    { id: "hurts", name: "Jalen Hurts", pos: "QB", team: "PHI", teamName: "Philadelphia Eagles", league: "NFL", school: "alabama", years: 7, draft: "2020 \u00b7 R2", status: "Starter", jersey: 1, featured: true, fantasyRelevant: true,
      week1: w("W 24\u201320 at TEN", { pass: "26/37, 264 yds, 2 TD, 2 INT", rush: "5 att, 16 yds", ppr: 16.2 }), fantasy: { week1PPR: 16.2 } },
    { id: "young", name: "Bryce Young", pos: "QB", team: "CAR", teamName: "Carolina Panthers", league: "NFL", school: "alabama", years: 4, draft: "2023 \u00b7 R1 #1", status: "Starter", jersey: 9, featured: true, fantasyRelevant: true,
      week1: w("W 34\u20133 at ATL", { pass: "287 yds", ppr: 18.5 }), fantasy: { week1PPR: 18.5 } },
    { id: "gibbs", name: "Jahmyr Gibbs", pos: "RB", team: "DET", teamName: "Detroit Lions", league: "NFL", school: "alabama", years: 4, draft: "2023 \u00b7 R1", status: "Starter", jersey: 0, featured: true, fantasyRelevant: true,
      week1: w("L 31\u201341 at BUF", { rush: "16 att, 52 yds", recLine: "6 tgt, 6 rec, 61 yds, 1 TD", ppr: 23.3 }), fantasy: { week1PPR: 23.3 } },
    { id: "henry", name: "Derrick Henry", pos: "RB", team: "BAL", teamName: "Baltimore Ravens", league: "NFL", school: "alabama", years: 11, draft: "2016 \u00b7 R2", status: "Starter", jersey: 22, featured: true, fantasyRelevant: true,
      week1: w("L 17\u201324 vs NO", { rush: "68 yds", ppr: 6.8 }), fantasy: { week1PPR: 6.8 } },
    { id: "dsmith", name: "DeVonta Smith", pos: "WR", team: "PHI", teamName: "Philadelphia Eagles", league: "NFL", school: "alabama", years: 6, draft: "2021 \u00b7 R1 #10", status: "Starter", jersey: 6, featured: true, fantasyRelevant: true,
      week1: w("W 24\u201320 at TEN", { recLine: "13 tgt, 10 rec, 117 yds, 1 TD", ppr: 27.7 }), fantasy: { week1PPR: 27.7 } },
    { id: "waddle", name: "Jaylen Waddle", pos: "WR", team: "DEN", teamName: "Denver Broncos", league: "NFL", school: "alabama", years: 6, draft: "2021 \u00b7 R1", status: "Starter", jersey: 17, featured: true, fantasyRelevant: true,
      week1: w("W 20\u201313 vs JAX", { recLine: "\u2014", ppr: 8.4 }), fantasy: { week1PPR: 8.4 } },
    { id: "jwilliams", name: "Jameson Williams", pos: "WR", team: "DET", teamName: "Detroit Lions", league: "NFL", school: "alabama", years: 5, draft: "2022 \u00b7 R1", status: "Starter", jersey: 9, featured: true, fantasyRelevant: true,
      week1: w("L 31\u201341 at BUF", { recLine: "\u2014", ppr: 7.1 }), fantasy: { week1PPR: 7.1 } },

    { id: "stroud", name: "C.J. Stroud", pos: "QB", team: "HOU", teamName: "Houston Texans", league: "NFL", school: "ohiostate", years: 4, draft: "2023 \u00b7 R1 #2", status: "Starter", jersey: 7, featured: true, fantasyRelevant: true,
      week1: w("L 6\u201320 vs CIN", { pass: "30/55, 353 yds, 0 TD, 0 INT", rush: "3 att, 29 yds", ppr: 17.0 }), fantasy: { week1PPR: 17.0 } },
    { id: "olave", name: "Chris Olave", pos: "WR", team: "NO", teamName: "New Orleans Saints", league: "NFL", school: "ohiostate", years: 5, draft: "2022 \u00b7 R1", status: "Starter", jersey: 12, featured: true, fantasyRelevant: true,
      week1: w("W 24\u201317 at BAL", { recLine: "10 tgt, 8 rec, 86 yds, 1 TD", ppr: 22.6 }), fantasy: { week1PPR: 22.6 } },
    { id: "gwilson", name: "Garrett Wilson", pos: "WR", team: "NYJ", teamName: "New York Jets", league: "NFL", school: "ohiostate", years: 5, draft: "2022 \u00b7 R1 #10", status: "Starter", jersey: 5, featured: true, fantasyRelevant: true,
      week1: w("L 17\u201320 OT vs GB", { recLine: "\u2014", ppr: 9.2 }), fantasy: { week1PPR: 9.2 } },
    { id: "jsn", name: "Jaxon Smith-Njigba", pos: "WR", team: "SEA", teamName: "Seattle Seahawks", league: "NFL", school: "ohiostate", years: 4, draft: "2023 \u00b7 R1 #20", status: "Starter", jersey: 11, featured: true, fantasyRelevant: true,
      week1: w("\u2014", { recLine: "\u2014", ppr: 16.4 }), fantasy: { week1PPR: 16.4 } },
    { id: "mclaurin", name: "Terry McLaurin", pos: "WR", team: "WAS", teamName: "Washington Commanders", league: "NFL", school: "ohiostate", years: 8, draft: "2019 \u00b7 R3", status: "Starter", jersey: 17, featured: true, fantasyRelevant: true,
      week1: w("\u2014", { recLine: "\u2014", ppr: 5.4 }), fantasy: { week1PPR: 5.4 } },
    { id: "judkins", name: "Quinshon Judkins", pos: "RB", team: "CLE", teamName: "Cleveland Browns", league: "NFL", school: "ohiostate", years: 2, draft: "2025 \u00b7 mid", status: "Rotation", jersey: 10, featured: false, fantasyRelevant: true,
      week1: w("W 23\u201319 at TB", { rush: "\u2014", ppr: 4.8 }), fantasy: { week1PPR: 4.8 } },

    { id: "stafford", name: "Matthew Stafford", pos: "QB", team: "LAR", teamName: "Los Angeles Rams", league: "NFL", school: "georgia", years: 18, draft: "2009 \u00b7 R1 #1", status: "Starter", jersey: 9, featured: true, fantasyRelevant: true,
      week1: w("Mon vs NYG", { pass: "\u2014", ppr: null }), fantasy: { week1PPR: 0 } },
    { id: "jcook", name: "James Cook", pos: "RB", team: "BUF", teamName: "Buffalo Bills", league: "NFL", school: "georgia", years: 5, draft: "2022 \u00b7 R2", status: "Starter", jersey: 4, featured: true, fantasyRelevant: true,
      week1: w("W 41\u201331 vs DET", { rush: "135 yds", ppr: 13.5 }), fantasy: { week1PPR: 13.5 } },
    { id: "swift", name: "D'Andre Swift", pos: "RB", team: "CHI", teamName: "Chicago Bears", league: "NFL", school: "georgia", years: 7, draft: "2020 \u00b7 R2", status: "Starter", jersey: 4, featured: true, fantasyRelevant: true,
      week1: w("\u2014", { rush: "\u2014", ppr: 8.1 }), fantasy: { week1PPR: 8.1 } },
    { id: "mcconkey", name: "Ladd McConkey", pos: "WR", team: "LAC", teamName: "Los Angeles Chargers", league: "NFL", school: "georgia", years: 3, draft: "2024 \u00b7 R2", status: "Starter", jersey: 15, featured: true, fantasyRelevant: true,
      week1: w("W 26\u201314 vs LV", { recLine: "\u2014", ppr: 11.2 }), fantasy: { week1PPR: 11.2 } },
    { id: "bowers", name: "Brock Bowers", pos: "TE", team: "LV", teamName: "Las Vegas Raiders", league: "NFL", school: "georgia", years: 3, draft: "2024 \u00b7 R1 #13", status: "Out", jersey: 89, featured: true, fantasyRelevant: true,
      week1: w("Out \u2014 knee", { recLine: "\u2014", ppr: 0 }), fantasy: { week1PPR: 0 } },
    { id: "zbranch", name: "Zachariah Branch", pos: "WR", team: "ATL", teamName: "Atlanta Falcons", league: "NFL", school: "georgia", years: 1, draft: "2026 \u00b7", status: "Rotation", jersey: 17, featured: false, fantasyRelevant: true,
      week1: w("L 3\u201334 vs CAR", { recLine: "\u2014", ppr: 3.2 }), fantasy: { week1PPR: 3.2 } },

    { id: "allar", name: "Drew Allar", pos: "QB", team: "PIT", teamName: "Pittsburgh Steelers", league: "NFL", school: "pennstate", years: 1, draft: "2026 \u00b7", status: "Backup", jersey: 16, featured: false, fantasyRelevant: true,
      week1: w("\u2014", { pass: "\u2014", ppr: 0 }), fantasy: { week1PPR: 0 } },
    { id: "kallen", name: "Kaytron Allen", pos: "RB", team: "WAS", teamName: "Washington Commanders", league: "NFL", school: "pennstate", years: 1, draft: "2026 \u00b7 R6", status: "Rotation", jersey: 26, featured: false, fantasyRelevant: true,
      week1: w("\u2014", { rush: "\u2014", ppr: 2.4 }), fantasy: { week1PPR: 2.4 } },
    { id: "freiermuth", name: "Pat Freiermuth", pos: "TE", team: "PIT", teamName: "Pittsburgh Steelers", league: "NFL", school: "pennstate", years: 6, draft: "2021 \u00b7 R2", status: "Starter", jersey: 88, featured: true, fantasyRelevant: true,
      week1: w("\u2014", { recLine: "\u2014", ppr: 7.6 }), fantasy: { week1PPR: 7.6 } },
    { id: "singleton", name: "Nicholas Singleton", pos: "RB", team: "TEN", teamName: "Tennessee Titans", league: "NFL", school: "pennstate", years: 1, draft: "2026 \u00b7", status: "Rotation", jersey: 35, featured: false, fantasyRelevant: true,
      week1: w("L 20\u201324 vs PHI", { rush: "\u2014", ppr: 3.1 }), fantasy: { week1PPR: 3.1 } }
  ];
  extra.forEach(p);
  var bark = FLOCK.players.find(function (x) { return x.id === "barkley"; });
  if (bark) {
    bark.week1 = w("W 24\u201320 at TEN", { rush: "4 att, 9 yds", recLine: "2 tgt, 1 rec, 11 yds", ppr: 2.0 });
    if (bark.fantasy) bark.fantasy.week1PPR = 2.0;
  }
  var mhj = FLOCK.players.find(function (x) { return x.id === "mhj"; });
  if (mhj && mhj.week1 && mhj.week1.ppr == null) mhj.week1.ppr = 4.2;
})();
