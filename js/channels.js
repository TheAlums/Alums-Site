(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.schools = [
    { id: "oregon", name: "Oregon", channel: "ProDucks", href: "producks/index.html", live: true, topN: 5 },
    { id: "alabama", name: "Alabama", channel: "ProTide", href: "protide/index.html", live: true, topN: 5 },
    { id: "ohiostate", name: "Ohio State", channel: "ProBucks", href: "probucks/index.html", live: true, topN: 5 },
    { id: "georgia", name: "Georgia", channel: "ProDawgs", href: "prodawgs/index.html", live: true, topN: 5 },
    { id: "pennstate", name: "Penn State", channel: "ProLions", href: "prolions/index.html", live: true, topN: 5 }
  ];
  const p = (location.pathname || "").toLowerCase();
  if (p.includes("/protide")) FLOCK.meta.schoolId = "alabama";
  else if (p.includes("/probucks")) FLOCK.meta.schoolId = "ohiostate";
  else if (p.includes("/prodawgs")) FLOCK.meta.schoolId = "georgia";
  else if (p.includes("/prolions")) FLOCK.meta.schoolId = "pennstate";
  else if (p.includes("/producks")) FLOCK.meta.schoolId = "oregon";
  const extra = [
    { id: "mhj", name: "Marvin Harrison Jr.", pos: "WR", team: "ARI", teamName: "Arizona Cardinals", league: "NFL", school: "ohiostate", years: 3, draft: "2024 \u00b7 R1", yearsAtOregon: "\u2014", status: "Starter", jersey: 18, featured: true, fantasyRelevant: true, bio: "Buckeye pipeline.", week1: { result: "Week 1", pass: "\u2014", rush: "\u2014", recLine: "6 rec, 81 yds", ppr: 14.1, note: "Desk sample." }, season: { passYds: 0, passTD: 0, int: 0, rushYds: 0, rushTD: 0, rec: 6, recYds: 81, recTD: 0, tackles: 0, sacks: 0 }, fantasy: { week1PPR: 14.1, proj: 15, adp: "WR", grade: "B+" } },
    { id: "egbuka", name: "Emeka Egbuka", pos: "WR", team: "TB", teamName: "Tampa Bay Buccaneers", league: "NFL", school: "ohiostate", years: 2, draft: "2025 \u00b7 R1", yearsAtOregon: "\u2014", status: "Starter", jersey: 2, featured: true, fantasyRelevant: true, bio: "Buckeye pipeline.", week1: { result: "Week 1", pass: "\u2014", rush: "\u2014", recLine: "5 rec, 62 yds", ppr: 11.2, note: "Desk sample." }, season: { passYds: 0, passTD: 0, int: 0, rushYds: 0, rushTD: 0, rec: 5, recYds: 62, recTD: 0, tackles: 0, sacks: 0 }, fantasy: { week1PPR: 11.2, proj: 12, adp: "WR", grade: "B" } },
    { id: "parsons", name: "Micah Parsons", pos: "LB", team: "GB", teamName: "Green Bay Packers", league: "NFL", school: "pennstate", years: 6, draft: "2021 \u00b7 R1", yearsAtOregon: "\u2014", status: "Starter", jersey: 1, featured: true, fantasyRelevant: false, bio: "Lion pipeline.", week1: { result: "Week 1", pass: "\u2014", rush: "\u2014", ppr: 0, teamScore: "W 27\u201320", note: "Desk sample." }, season: { passYds: 0, passTD: 0, int: 0, rushYds: 0, rushTD: 0, rec: 0, recYds: 0, recTD: 0, tackles: 8, sacks: 1 }, fantasy: { week1PPR: 0, proj: 0, adp: "\u2014", grade: "\u2014" } },
    { id: "barkley", name: "Saquon Barkley", pos: "RB", team: "PHI", teamName: "Philadelphia Eagles", league: "NFL", school: "pennstate", years: 8, draft: "2018 \u00b7 R1", yearsAtOregon: "\u2014", status: "Starter", jersey: 26, featured: true, fantasyRelevant: true, bio: "Lion pipeline.", week1: { result: "Week 1", pass: "\u2014", rush: "18-92", ppr: 18.4, note: "Desk sample." }, season: { passYds: 0, passTD: 0, int: 0, rushYds: 92, rushTD: 1, rec: 2, recYds: 12, recTD: 0, tackles: 0, sacks: 0 }, fantasy: { week1PPR: 18.4, proj: 17, adp: "RB", grade: "A" } }
  ];
  if (FLOCK.players) {
    extra.forEach(function (row) {
      if (!FLOCK.players.some(function (x) { return x.id === row.id; })) FLOCK.players.push(row);
    });
  }
})();
