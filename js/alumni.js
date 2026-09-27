(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.players = FLOCK.players || [];
  function p(o) { FLOCK.players.push(o); }
  function w(result, extra) {
    var x = { result: result, pass: "-", rush: "-", recLine: "-", note: "", snaps: 1 };
    Object.keys(extra || {}).forEach(function (k) { x[k] = extra[k]; });
    return x;
  }
  var extra = [
    { id: "hurts", name: "Jalen Hurts", pos: "QB", team: "PHI", teamName: "Philadelphia Eagles", league: "NFL", school: "alabama", years: 7, draft: "2020 R2", status: "Starter", jersey: 1, featured: true, fantasyRelevant: true,
      week1: w("W 24-20 at TEN", { pass: "26/37, 264 yds, 2 TD, 2 INT", rush: "5 att, 16 yds", ppr: 16.2 }), fantasy: { week1PPR: 16.2, proj: 19.4 } },
    { id: "young", name: "Bryce Young", pos: "QB", team: "CAR", teamName: "Carolina Panthers", league: "NFL", school: "alabama", years: 4, draft: "2023 R1 #1", status: "Starter", jersey: 9, featured: true, fantasyRelevant: true,
      week1: w("W 34-3 at ATL", { pass: "287 yds", ppr: 18.5 }), fantasy: { week1PPR: 18.5, proj: 16.2 } },
    { id: "gibbs", name: "Jahmyr Gibbs", pos: "RB", team: "DET", teamName: "Detroit Lions", league: "NFL", school: "alabama", years: 4, draft: "2023 R1", status: "Starter", jersey: 0, featured: true, fantasyRelevant: true,
      week1: w("L 31-41 at BUF", { rush: "16 att, 52 yds", recLine: "8 tgt, 6 rec, 61 yds, 1 TD", ppr: 23.3 }), fantasy: { week1PPR: 23.3, proj: 18.1 } },
    { id: "henry", name: "Derrick Henry", pos: "RB", team: "BAL", teamName: "Baltimore Ravens", league: "NFL", school: "alabama", years: 11, draft: "2016 R2", status: "Starter", jersey: 22, featured: true, fantasyRelevant: true,
      week1: w("L 17-24 vs NO", { rush: "16 att, 68 yds, 1 TD", ppr: 17.7 }), fantasy: { week1PPR: 17.7, proj: 16.0 } },
    { id: "dsmith", name: "DeVonta Smith", pos: "WR", team: "PHI", teamName: "Philadelphia Eagles", league: "NFL", school: "alabama", years: 6, draft: "2021 R1 #10", status: "Starter", jersey: 6, featured: true, fantasyRelevant: true,
      week1: w("W 24-20 at TEN", { recLine: "13 tgt, 10 rec, 117 yds, 1 TD", ppr: 27.7 }), fantasy: { week1PPR: 27.7, proj: 14.8 } },
    { id: "waddle", name: "Jaylen Waddle", pos: "WR", team: "DEN", teamName: "Denver Broncos", league: "NFL", school: "alabama", years: 6, draft: "2021 R1", status: "Starter", jersey: 17, featured: true, fantasyRelevant: true,
      week1: w("W 20-13 vs JAX", { recLine: "10 tgt, 8 rec, 138 yds, 0 TD", recYds: 138, ppr: 21.8 }), fantasy: { week1PPR: 21.8, proj: 13.2 } },
    { id: "jwilliams", name: "Jameson Williams", pos: "WR", team: "DET", teamName: "Detroit Lions", league: "NFL", school: "alabama", years: 5, draft: "2022 R1", status: "Starter", jersey: 9, featured: true, fantasyRelevant: true,
      week1: w("L 31-41 at BUF", { ppr: 7.1 }), fantasy: { week1PPR: 7.1, proj: 10.4 } },
    { id: "stroud", name: "C.J. Stroud", pos: "QB", team: "HOU", teamName: "Houston Texans", league: "NFL", school: "ohiostate", years: 4, draft: "2023 R1 #2", status: "Starter", jersey: 7, featured: true, fantasyRelevant: true,
      week1: w("L 6-20 vs CIN", { pass: "30/55, 353 yds, 0 TD, 0 INT", rush: "3 att, 29 yds", ppr: 17.0 }), fantasy: { week1PPR: 17.0, proj: 17.6 } },
    { id: "olave", name: "Chris Olave", pos: "WR", team: "NO", teamName: "New Orleans Saints", league: "NFL", school: "ohiostate", years: 5, draft: "2022 R1", status: "Starter", jersey: 12, featured: true, fantasyRelevant: true,
      week1: w("W 24-17 at BAL", { recLine: "10 tgt, 8 rec, 86 yds, 1 TD", tgt: 10, rec: 8, recYds: 86, recTD: 1, ppr: 22.6 }), fantasy: { week1PPR: 22.6, proj: 13.9 } },
    { id: "gwilson", name: "Garrett Wilson", pos: "WR", team: "NYJ", teamName: "New York Jets", league: "NFL", school: "ohiostate", years: 5, draft: "2022 R1 #10", status: "Starter", jersey: 5, featured: true, fantasyRelevant: true,
      week1: w("L 17-20 OT vs GB", { recLine: "7 tgt, 5 rec, 57 yds, 1 TD", ppr: 16.7 }), fantasy: { week1PPR: 16.7, proj: 13.1 } },
    { id: "jsn", name: "Jaxon Smith-Njigba", pos: "WR", team: "SEA", teamName: "Seattle Seahawks", league: "NFL", school: "ohiostate", years: 4, draft: "2023 R1 #20", status: "Starter", jersey: 11, featured: true, fantasyRelevant: true,
      week1: w("W 31-7 at ARI", { recLine: "155 yds", recYds: 155, ppr: 21.5 }), fantasy: { week1PPR: 21.5, proj: 15.6 } },
    { id: "mclaurin", name: "Terry McLaurin", pos: "WR", team: "WAS", teamName: "Washington Commanders", league: "NFL", school: "ohiostate", years: 8, draft: "2019 R3", status: "Starter", jersey: 17, featured: true, fantasyRelevant: true,
      week1: w("L 20-37 at DAL", { recLine: "9 tgt, 2 rec, 50 yds, 0 TD", ppr: 7.0 }), fantasy: { week1PPR: 7.0, proj: 12.0 } },
    { id: "judkins", name: "Quinshon Judkins", pos: "RB", team: "CLE", teamName: "Cleveland Browns", league: "NFL", school: "ohiostate", years: 2, draft: "2025", status: "Rotation", jersey: 10, featured: false, fantasyRelevant: true,
      week1: w("W 23-19 at TB", { rush: "12 att, 21 yds", recLine: "5 tgt, 5 rec, 27 yds, 0 TD", ppr: 9.8 }), fantasy: { week1PPR: 9.8, proj: 8.2 } },
    { id: "henderson", name: "TreVeyon Henderson", pos: "RB", team: "NE", teamName: "New England Patriots", league: "NFL", school: "ohiostate", years: 2, draft: "2025", status: "Starter", jersey: 32, featured: true, fantasyRelevant: true,
      week1: w("W 20-3 vs PIT", { rush: "16 att, 76 yds, 1 TD", ppr: 13.6 }), fantasy: { week1PPR: 13.6, proj: 11.0 } },
    { id: "egbuka", name: "Emeka Egbuka", pos: "WR", team: "TB", teamName: "Tampa Bay Buccaneers", league: "NFL", school: "ohiostate", years: 2, draft: "2025", status: "Starter", jersey: 9, featured: true, fantasyRelevant: true,
      week1: w("L 19-23 vs CLE", { recLine: "5 tgt, 3 rec, 16 yds, 1 TD", ppr: 10.6 }), fantasy: { week1PPR: 10.6, proj: 9.4 } },
    { id: "stafford", name: "Matthew Stafford", pos: "QB", team: "LAR", teamName: "Los Angeles Rams", league: "NFL", school: "georgia", years: 18, draft: "2009 R1 #1", status: "Starter", jersey: 9, featured: true, fantasyRelevant: true,
      week1: w("W 28-6 vs NYG", { pass: "22/31, 327 yds, 4 TD, 1 INT", ppr: 27.1 }), fantasy: { week1PPR: 27.1, proj: 16.8 } },
    { id: "jcook", name: "James Cook", pos: "RB", team: "BUF", teamName: "Buffalo Bills", league: "NFL", school: "georgia", years: 5, draft: "2022 R2", status: "Starter", jersey: 4, featured: true, fantasyRelevant: true,
      week1: w("W 41-31 vs DET", { rush: "21 att, 135 yds, 1 TD", ppr: 19.5 }), fantasy: { week1PPR: 19.5, proj: 15.4 } },
    { id: "swift", name: "D'Andre Swift", pos: "RB", team: "CHI", teamName: "Chicago Bears", league: "NFL", school: "georgia", years: 7, draft: "2020 R2", status: "Starter", jersey: 4, featured: true, fantasyRelevant: true,
      week1: w("L 3-9 vs MIN", { rush: "16 att, 45 yds", recLine: "5 tgt, 5 rec, 54 yds, 0 TD", ppr: 14.9 }), fantasy: { week1PPR: 14.9, proj: 11.2 } },
    { id: "mcconkey", name: "Ladd McConkey", pos: "WR", team: "LAC", teamName: "Los Angeles Chargers", league: "NFL", school: "georgia", years: 3, draft: "2024 R2", status: "Starter", jersey: 15, featured: true, fantasyRelevant: true,
      week1: w("L 14-26 vs LV", { recLine: "3 tgt, 3 rec, 35 yds, 0 TD", ppr: 6.5 }), fantasy: { week1PPR: 6.5, proj: 12.6 } },
    { id: "bowers", name: "Brock Bowers", pos: "TE", team: "LV", teamName: "Las Vegas Raiders", league: "NFL", school: "georgia", years: 3, draft: "2024 R1 #13", status: "Out", jersey: 89, featured: true, fantasyRelevant: true,
      week1: w("DNP - knee", { snaps: 0, ppr: 0 }), fantasy: { week1PPR: 0, proj: 0 } },
    { id: "zbranch", name: "Zachariah Branch", pos: "WR", team: "ATL", teamName: "Atlanta Falcons", league: "NFL", school: "georgia", years: 1, draft: "2026", status: "Rotation", jersey: 17, featured: false, fantasyRelevant: true,
      week1: w("L 3-34 vs CAR", { recLine: "2 tgt, 2 rec, 14 yds, 0 TD", ppr: 3.4 }), fantasy: { week1PPR: 3.4, proj: 4.1 } },
    { id: "pickens", name: "George Pickens", pos: "WR", team: "DAL", teamName: "Dallas Cowboys", league: "NFL", school: "georgia", years: 5, draft: "2022 R2", status: "Starter", jersey: 3, featured: true, fantasyRelevant: true,
      week1: w("W 37-20 vs WSH", { recLine: "8 tgt, 6 rec, 40 yds, 0 TD", ppr: 10.0 }), fantasy: { week1PPR: 10.0, proj: 13.0 } },
    { id: "roquan", name: "Roquan Smith", pos: "LB", team: "BAL", teamName: "Baltimore Ravens", league: "NFL", school: "georgia", years: 8, draft: "2018 R1", status: "Starter", jersey: 0, featured: true, fantasyRelevant: false,
      week1: w("L 17-24 vs NO", { def: "8 tackles", tackles: 8, snaps: 68 }) },
    { id: "allar", name: "Drew Allar", pos: "QB", team: "PIT", teamName: "Pittsburgh Steelers", league: "NFL", school: "pennstate", years: 1, draft: "2026", status: "Backup", jersey: 16, featured: false, fantasyRelevant: true,
      week1: w("DNP", { snaps: 0, ppr: 0 }), fantasy: { week1PPR: 0, proj: 0 } },
    { id: "kallen", name: "Kaytron Allen", pos: "RB", team: "WAS", teamName: "Washington Commanders", league: "NFL", school: "pennstate", years: 1, draft: "2026 R6", status: "Rotation", jersey: 26, featured: false, fantasyRelevant: true,
      week1: w("L 20-37 at DAL", { rush: "5 att, 24 yds", ppr: 2.4 }), fantasy: { week1PPR: 2.4, proj: 3.6 } },
    { id: "freiermuth", name: "Pat Freiermuth", pos: "TE", team: "PIT", teamName: "Pittsburgh Steelers", league: "NFL", school: "pennstate", years: 6, draft: "2021 R2", status: "Starter", jersey: 88, featured: true, fantasyRelevant: true,
      week1: w("L 3-20 at NE", { recLine: "4 tgt, 4 rec, 32 yds, 0 TD", ppr: 7.2 }), fantasy: { week1PPR: 7.2, proj: 8.8 } },
    { id: "singleton", name: "Nicholas Singleton", pos: "RB", team: "TEN", teamName: "Tennessee Titans", league: "NFL", school: "pennstate", years: 1, draft: "2026", status: "Rotation", jersey: 35, featured: false, fantasyRelevant: true,
      week1: w("L 20-24 vs PHI", { rush: "4 att, 10 yds", ppr: 1.0 }), fantasy: { week1PPR: 1.0, proj: 4.0 } },
    { id: "warren", name: "Tyler Warren", pos: "TE", team: "IND", teamName: "Indianapolis Colts", league: "NFL", school: "pennstate", years: 2, draft: "2025 R1", status: "Starter", jersey: 85, featured: true, fantasyRelevant: true,
      week1: w("L 30-33 OT at KC", { recLine: "6 tgt, 6 rec, 21 yds, 1 TD", ppr: 14.1 }), fantasy: { week1PPR: 14.1, proj: 11.5 } },
    { id: "acarter", name: "Abdul Carter", pos: "OLB", team: "NYG", teamName: "New York Giants", league: "NFL", school: "pennstate", years: 2, draft: "2025 R1 #3", status: "Starter", jersey: 51, featured: true, fantasyRelevant: false,
      week1: w("L 6-28 at LAR", { def: "3 tackles, 1 sack, 1 TFL", tackles: 3, sacks: 1, snaps: 55 }) },
    { id: "jbrisker", name: "Jaquan Brisker", pos: "S", team: "PIT", teamName: "Pittsburgh Steelers", league: "NFL", school: "pennstate", years: 5, draft: "2022 R2", status: "Starter", jersey: 9, featured: true, fantasyRelevant: false,
      week1: w("L 3-20 at NE", { def: "6 tackles", tackles: 6, snaps: 54 }) },
    { id: "barkley", name: "Saquon Barkley", pos: "RB", team: "PHI", teamName: "Philadelphia Eagles", league: "NFL", school: "pennstate", years: 9, draft: "2018 R1", status: "Starter", jersey: 26, featured: true, fantasyRelevant: true,
      week1: w("W 24-20 at TEN", { rush: "4 att, 9 yds", recLine: "2 tgt, 1 rec, 11 yds, 0 TD", ppr: 3.0 }), fantasy: { week1PPR: 3.0, proj: 16.4 } }
  ];
  extra.forEach(function (row) {
    if (!FLOCK.players.some(function (x) { return x.id === row.id; })) p(row);
  });
  if (FLOCK.stampWeeks) FLOCK.stampWeeks();
})();
