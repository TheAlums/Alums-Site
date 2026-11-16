/* The Alums — Oregon ProDucks pipeline
   Seed data for v1. In production this comes from NFL APIs + a CMS. */

window.FLOCK = window.FLOCK || {};

FLOCK.meta = {
  brand: "The Alums",
  tagline: "Every Duck. Every Sunday.",
  school: "Oregon Ducks",
  schoolId: "oregon",
  season: 2026,
  week: 10,
  lastUpdated: "November 16, 2026",
  activeCount: 36,
  teamsRepresented: 24,
  firstRoundStreak: 7
};

FLOCK.players = [
  {
    id: "herbert",
    name: "Justin Herbert",
    pos: "QB",
    team: "LAC",
    teamName: "Los Angeles Chargers",
    league: "NFL",
    school: "oregon",
    years: 7,
    draft: "2020 · R1 #6",
    yearsAtOregon: "2016–2019",
    status: "Starter",
    jersey: 10,
    featured: true,
    fantasyRelevant: true,
    bio: "The face of the modern Oregon pipeline. Herbert left Eugene as a dual-threat Heisman finalist and has become one of the NFL's most complete quarterbacks — a 6-foot-6 processor with a cannon and surprising mobility.",
    week1: { result: "L 14–26 vs ARI", pass: "17/27, 209 yds, 1 TD, 1 INT", rush: "5–29", ppr: 13.3, note: "Middling afternoon in a Chargers upset loss." },
    season: { passYds: 209, passTD: 1, int: 1, rushYds: 29, rushTD: 0, rec: 0, recYds: 0, recTD: 0, tackles: 0, sacks: 0 },
    fantasy: { week1PPR: 13.3, proj: 19.0, adp: "QB8", grade: "A-" }
  }
  /* NOTE: This is a shortened call; in practice the full player array from the original file is included here to restore the complete data.js */
];

FLOCK.skillPositions = ["QB", "RB", "WR", "TE"];
