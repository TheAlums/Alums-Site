/* Week 8 (2026 regular season) stamps.
   Source: ESPN boxes, pulled 2026-11-16 by The Alums Auditor.
   Scoreboard: https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=8&dates=2026
   Boxes: https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=<event> (event id on each row)
   Every number below is copied from those boxes. PPR = pass yds/25 + pass TD*4 - INT*2
   + rush yds/10 + rush TD*6 + rec + rec yds/10 + rec TD*6 (same as worker/boxbot.js).
*/
(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 8;
  if (FLOCK.meta) {
    FLOCK.meta.week = 8;
    FLOCK.meta.lastUpdated = "November 2, 2026";
  }
  var w8 = {
    armstead: { result: "W 42-7 vs IND", def: "3 tackles, 0.5 sack", tackles: 3, sacks: 0.5, snaps: 1, espnId: "2971275", event: "401873028" },
    barkley: { result: "L 10-27 at WSH", rush: "13 att, 30 yds, 1 TD", recLine: "1 tgt, 1 rec, 24 yds, 0 TD", snaps: 1, ppr: 12.4, espnId: "3929630", event: "401873035" },
    bassa: { result: "L 24-28 at DEN", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4602389", event: "401873033" },
    bowers: { result: "W 38-33 at NYJ", recLine: "10 tgt, 7 rec, 92 yds, 2 TD", snaps: 1, ppr: 28.2, espnId: "4432665", event: "401873029" },
    burch: { result: "W 33-30 at DAL", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4428996", event: "401873024" },
    caldwell: { result: "L 9-24 at LAR", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "5089178", event: "401873032" },
    canady: { result: "L 24-28 at DEN", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4710706", event: "401873033" },
    dorlus: { result: "L 0-16 at TB", def: "2 tackles, 1 TFL", tackles: 2, sacks: 0, snaps: 1, espnId: "4427090", event: "401873025" },
    dye: { result: "L 9-24 at LAR", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4038946", event: "401873032" },
    evanwilliams: { result: "W 27-19 vs CAR", def: "10 tackles", tackles: 10, sacks: 0, snaps: 1, espnId: "4428863", event: "401873023" },
    franklin: { result: "W 28-24 vs KC", recLine: "2 tgt, 1 rec, 3 yds, 0 TD", snaps: 1, ppr: 1.3, espnId: "4431280", event: "401873033" },
    freiermuth: { result: "W 27-6 vs CLE", rush: "1 att, 1 yds, 1 TD", recLine: "2 tgt, 2 rec, 35 yds, 0 TD", snaps: 1, ppr: 11.6, espnId: "4361411", event: "401873027" },
    gibbs: { result: "W 19-15 vs MIN", rush: "23 att, 153 yds, 1 TD", recLine: "4 tgt, 2 rec, 15 yds, 0 TD", snaps: 1, ppr: 24.8, espnId: "4429795", event: "401873030" },
    gonzalez: { result: "W 24-19 at MIA", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4686772", event: "401873034" },
    gwilson: { result: "L 33-38 vs LV", recLine: "12 tgt, 6 rec, 83 yds, 0 TD", snaps: 1, ppr: 14.3, espnId: "4569618", event: "401873029" },
    henry: { result: "L 10-36 at BUF", rush: "11 att, 53 yds, 1 TD", recLine: "2 tgt, 2 rec, 7 yds, 0 TD", snaps: 1, ppr: 14.0, espnId: "3043078", event: "401873026" },
    herbert: { result: "L 9-24 at LAR", pass: "24/32, 257 yds, 0 TD, 2 INT", rush: "4 att, 15 yds", snaps: 1, ppr: 7.8, espnId: "4038941", event: "401873032" },
    irving: { result: "W 16-0 vs ATL", rush: "27 att, 170 yds, 1 TD", snaps: 1, ppr: 23.0, espnId: "4596448", event: "401873025" },
    jbrisker: { result: "W 27-6 vs CLE", def: "7 tackles", tackles: 7, sacks: 0, snaps: 1, espnId: "4570044", event: "401873027" },
    jcook: { result: "W 36-10 vs BAL", rush: "21 att, 80 yds, 1 TD", recLine: "3 tgt, 2 rec, 21 yds, 0 TD", snaps: 1, ppr: 18.1, espnId: "4379399", event: "401873026" },
    jsn: { result: "L 17-34 vs CHI", recLine: "11 tgt, 6 rec, 118 yds, 1 TD", snaps: 1, ppr: 23.8, espnId: "4430878", event: "401873036" },
    judkins: { result: "L 6-27 at PIT", rush: "11 att, 25 yds", recLine: "2 tgt, 2 rec, 24 yds, 0 TD", snaps: 1, ppr: 6.9, espnId: "4685702", event: "401873027" },
    jwilliams: { result: "W 19-15 vs MIN", recLine: "6 tgt, 4 rec, 70 yds, 1 TD", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, ppr: 17.0, espnId: "4426388", event: "401873030" },
    kallen: { result: "L 19-24 vs NE", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4685246", event: "401873034" },
    mcconkey: { result: "L 9-24 at LAR", recLine: "6 tgt, 4 rec, 86 yds, 0 TD", snaps: 1, ppr: 12.6, espnId: "4612826", event: "401873032" },
    nix: { result: "W 28-24 vs KC", pass: "20/32, 222 yds, 2 TD, 0 INT", rush: "3 att, 4 yds", snaps: 1, ppr: 17.3, espnId: "4426338", event: "401873033" },
    noahsewell: { result: "W 34-17 at SEA", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4430822", event: "401873036" },
    pickens: { result: "L 30-33 vs ARI", recLine: "4 tgt, 2 rec, 48 yds, 0 TD", snaps: 1, ppr: 6.8, espnId: "4426354", event: "401873024" },
    roquan: { result: "L 10-36 at BUF", def: "11 tackles, 2 PD", tackles: 11, sacks: 0, snaps: 1, espnId: "3915189", event: "401873026" },
    sadiq: { result: "L 33-38 vs LV", recLine: "2 tgt, 1 rec, 22 yds, 0 TD", snaps: 1, ppr: 3.2, espnId: "5083315", event: "401873029" },
    stafford: { result: "W 24-9 vs LAC", pass: "17/25, 157 yds, 1 TD, 1 INT", snaps: 1, ppr: 8.3, espnId: "12483", event: "401873032" },
    swift: { result: "W 34-17 at SEA", rush: "27 att, 69 yds, 3 TD", recLine: "3 tgt, 2 rec, 10 yds, 0 TD", snaps: 1, ppr: 27.9, espnId: "4259545", event: "401873036" },
    tez: { result: "W 16-0 vs ATL", ret: "2 PR, 8 yds", snaps: 1, ppr: 0.0, espnId: "4608810", event: "401873025" },
    thieneman: { result: "W 34-17 at SEA", def: "5 tackles", tackles: 5, sacks: 0, snaps: 1, espnId: "4954445", event: "401873036" },
    waddle: { result: "W 28-24 vs KC", recLine: "6 tgt, 3 rec, 39 yds, 1 TD", snaps: 1, ppr: 12.9, espnId: "4372016", event: "401873033" },
    warren: { result: "L 7-42 at JAX", recLine: "10 tgt, 4 rec, 18 yds, 0 TD", snaps: 1, ppr: 5.8, espnId: "4431459", event: "401873028" },
    young: { result: "L 19-27 at GB", pass: "23/41, 209 yds, 1 TD, 1 INT", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, ppr: 10.4, espnId: "4685720", event: "401873023" },
    zbranch: { result: "L 0-16 at TB", ret: "3 KR, 69 yds", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, ppr: 0.0, espnId: "4870612", event: "401873025" }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = w8[p.id];
      if (!box && /juwan johnson/i.test(p.name || "")) box = w8.juwan;
      if (!box && /kenyon sadiq/i.test(p.name || "")) box = w8.sadiq;
      if (!box && /smith-njigba/i.test(p.name || "")) box = w8.jsn;
      if (!box && /evan williams/i.test(p.name || "")) box = w8.evanwilliams;
      if (!box && /^james cook/i.test(p.name || "")) box = w8.jcook;
      if (box) {
        p.weeks[8] = box;
      } else if (!p.weeks[8]) {
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
