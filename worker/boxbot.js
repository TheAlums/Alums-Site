/**
 * The Alums box bot
 * GET /api/week/2  — pull ESPN week boxes, match dictionary names
 * GET /api/health
 */
const SEASON = 2026;
const SCOREBOARD =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";
const SUMMARY =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary";

const ROSTER = [
  ["herbert", "Justin Herbert"],
  ["nix", "Bo Nix"],
  ["mariota", "Marcus Mariota"],
  ["irving", "Bucky Irving"],
  ["franklin", "Troy Franklin"],
  ["ferguson", "Terrance Ferguson"],
  ["sewell", "Penei Sewell"],
  ["buckner", "DeForest Buckner"],
  ["holland", "Jevon Holland"],
  ["thieneman", "Dillon Thieneman"],
  ["gonzalez", "Christian Gonzalez"],
  ["thibodeaux", "Kayvon Thibodeaux"],
  ["hurts", "Jalen Hurts"],
  ["young", "Bryce Young"],
  ["gibbs", "Jahmyr Gibbs"],
  ["henry", "Derrick Henry"],
  ["dsmith", "DeVonta Smith"],
  ["waddle", "Jaylen Waddle"],
  ["jwilliams", "Jameson Williams"],
  ["stroud", "C.J. Stroud"],
  ["olave", "Chris Olave"],
  ["gwilson", "Garrett Wilson"],
  ["jsn", "Jaxon Smith-Njigba"],
  ["mclaurin", "Terry McLaurin"],
  ["judkins", "Quinshon Judkins"],
  ["henderson", "TreVeyon Henderson"],
  ["egbuka", "Emeka Egbuka"],
  ["stafford", "Matthew Stafford"],
  ["jcook", "James Cook"],
  ["swift", "D'Andre Swift"],
  ["mcconkey", "Ladd McConkey"],
  ["bowers", "Brock Bowers"],
  ["zbranch", "Zachariah Branch"],
  ["pickens", "George Pickens"],
  ["roquan", "Roquan Smith"],
  ["barkley", "Saquon Barkley"],
  ["freiermuth", "Pat Freiermuth"],
  ["kallen", "Kaytron Allen"],
  ["singleton", "Nicholas Singleton"],
  ["allar", "Drew Allar"],
  ["warren", "Tyler Warren"],
  ["acarter", "Abdul Carter"],
  ["jbrisker", "Jaquan Brisker"],
  ["evanwilliams", "Evan Williams"]
];

const NAME_TO_ID = {};
ROSTER.forEach(function (row) {
  NAME_TO_ID[norm(row[1])] = row[0];
});

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}
function num(v) {
  const n = Number(v);
  return isNaN(n) ? 0 : n;
}
function pprPass(c, a, y, td, ints) {
  return +(y / 25 + td * 4 - ints * 2).toFixed(1);
}
function pprRushRec(ry, rtd, rec, recy, rectd) {
  return +(ry / 10 + rtd * 6 + rec + recy / 10 + rectd * 6).toFixed(1);
}
function cors(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "cache-control": "public, max-age=300"
    }
  });
}

async function weekGames(week) {
  const url = SCOREBOARD + "?week=" + week + "&seasontype=2&dates=" + SEASON;
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error("scoreboard " + res.status);
  const json = await res.json();
  return (json.events || []).map(function (ev) {
    const comp = (ev.competitions && ev.competitions[0]) || {};
    const teams = (comp.competitors || []).map(function (c) {
      return {
        id: c.id,
        home: c.homeAway === "home",
        abbr: c.team && c.team.abbreviation,
        score: num(c.score),
        winner: !!c.winner
      };
    });
    return { id: ev.id, name: ev.name, status: ev.status && ev.status.type && ev.status.type.name, teams: teams };
  });
}

function resultLine(game, teamAbbr) {
  const mine = game.teams.find(function (t) { return t.abbr === teamAbbr; });
  const opp = game.teams.find(function (t) { return t.abbr !== teamAbbr; });
  if (!mine || !opp) return "-";
  const wl = mine.winner ? "W" : (opp.winner ? "L" : "-");
  const vs = mine.home ? "vs " + opp.abbr : "at " + opp.abbr;
  return wl + " " + mine.score + "-" + opp.score + " " + vs;
}

function takeStat(map, keys) {
  for (let i = 0; i < keys.length; i++) {
    if (map[keys[i]] != null && map[keys[i]] !== "") return map[keys[i]];
  }
  return 0;
}

function flattenAthlete(ath) {
  const stats = {};
  (ath.stats || []).forEach(function (s) {
    if (s && s.name) stats[s.name] = s.value;
  });
  (ath.statistics || []).forEach(function (cat) {
    (cat.stats || cat.athletes || []).forEach(function () {});
  });
  return {
    name: ath.athlete && (ath.athlete.displayName || ath.athlete.fullName),
    team: ath.team && ath.team.abbreviation,
    stats: stats,
    raw: ath
  };
}

function parseBoxPlayers(summary) {
  const out = [];
  const box = summary.boxscore || {};
  const players = box.players || [];
  players.forEach(function (side) {
    const teamAbbr = side.team && side.team.abbreviation;
    (side.statistics || []).forEach(function (cat) {
      const keys = cat.keys || cat.labels || [];
      (cat.athletes || []).forEach(function (row) {
        const name = row.athlete && (row.athlete.displayName || row.athlete.fullName);
        if (!name) return;
        const map = {};
        (row.stats || []).forEach(function (val, i) {
          const k = String(keys[i] || "").toLowerCase();
          map[k] = val;
        });
        out.push({ name: name, team: teamAbbr, category: cat.name || cat.abbreviation, map: map });
      });
    });
  });
  return out;
}

function mergePlayer(bucket, row, game) {
  const id = NAME_TO_ID[norm(row.name)];
  if (!id) return;
  bucket[id] = bucket[id] || { id: id, name: row.name, team: row.team, result: resultLine(game, row.team), snaps: 1, source: "espn" };
  const b = bucket[id];
  const m = row.map;
  const cat = String(row.category || "").toLowerCase();
  if (cat.indexOf("pass") >= 0) {
    const cmp = takeStat(m, ["c/att", "completions/passingattempts", "comp/att"]);
    const yds = takeStat(m, ["yds", "passingyards", "pass yards"]);
    const td = takeStat(m, ["td", "passingtouchdowns"]);
    const ints = takeStat(m, ["int", "interceptions"]);
    b.pass = String(cmp || "-") + (yds ? ", " + yds + " yds" : "") + (td ? ", " + td + " TD" : "") + (ints ? ", " + ints + " INT" : "");
    const parts = String(cmp).split("/");
    b.ppr = (b.ppr || 0) + pprPass(num(parts[0]), num(parts[1]), num(yds), num(td), num(ints));
  }
  if (cat.indexOf("rush") >= 0) {
    const att = takeStat(m, ["car", "att", "rushingattempts"]);
    const yds = takeStat(m, ["yds", "rushingyards"]);
    const td = takeStat(m, ["td", "rushingtouchdowns"]);
    b.rush = att + " att, " + yds + " yds" + (num(td) ? ", " + td + " TD" : "");
    b.ppr = (b.ppr || 0) + pprRushRec(num(yds), num(td), 0, 0, 0);
  }
  if (cat.indexOf("receiv") >= 0) {
    const rec = takeStat(m, ["rec", "receptions"]);
    const yds = takeStat(m, ["yds", "receivingyards"]);
    const td = takeStat(m, ["td", "receivingtouchdowns"]);
    const tgt = takeStat(m, ["tgts", "targets"]);
    b.tgt = num(tgt);
    b.rec = num(rec);
    b.recYds = num(yds);
    b.recTD = num(td);
    b.recLine = (tgt || rec) + " tgt, " + rec + " rec, " + yds + " yds, " + td + " TD";
    b.ppr = (b.ppr || 0) + pprRushRec(0, 0, num(rec), num(yds), num(td));
  }
  if (cat.indexOf("defen") >= 0 || cat.indexOf("tackle") >= 0) {
    const tot = takeStat(m, ["tot", "total", "tackles", "total tackles"]);
    const sacks = takeStat(m, ["sack", "sacks"]);
    const ints = takeStat(m, ["int", "interceptions"]);
    const pd = takeStat(m, ["pd", "passes defended", "pdef"]);
    const bits = [];
    if (tot) bits.push(tot + " tackles");
    if (num(sacks)) bits.push(sacks + " sack");
    if (num(ints)) bits.push(ints + " INT");
    if (num(pd)) bits.push(pd + " PD");
    b.def = bits.join(", ") || "played";
    b.tackles = num(tot);
    b.sacks = num(sacks);
  }
}

async function buildWeek(week) {
  const games = await weekGames(week);
  const bucket = {};
  const missed = [];
  for (let i = 0; i < games.length; i++) {
    const g = games[i];
    try {
      const res = await fetch(SUMMARY + "?event=" + g.id, { headers: { accept: "application/json" } });
      if (!res.ok) continue;
      const sum = await res.json();
      parseBoxPlayers(sum).forEach(function (row) {
        if (NAME_TO_ID[norm(row.name)]) mergePlayer(bucket, row, g);
      });
    } catch (e) {
      missed.push(g.id);
    }
  }
  Object.keys(bucket).forEach(function (id) {
    if (typeof bucket[id].ppr === "number") bucket[id].ppr = +bucket[id].ppr.toFixed(1);
  });
  return {
    week: Number(week),
    season: SEASON,
    pulledAt: new Date().toISOString(),
    games: games.length,
    matched: Object.keys(bucket).length,
    missedGames: missed,
    players: bucket
  };
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return cors({ ok: true });
    if (url.pathname === "/api/health" || url.pathname === "/health") {
      return cors({ ok: true, service: "alums-boxbot" });
    }
    const m = url.pathname.match(/\/api\/week\/(\d+)/) || url.pathname.match(/\/week\/(\d+)/);
    if (m) {
      try {
        const data = await buildWeek(m[1]);
        return cors(data);
      } catch (err) {
        return cors({ error: String(err && err.message || err) }, 502);
      }
    }
    return cors({ error: "try GET /api/week/2" }, 404);
  }
};
