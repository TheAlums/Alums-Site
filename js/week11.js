/* Week 11 (2026 regular season) stamps.
   Source: ESPN boxes, pulled 2026-11-22 by The Alums Auditor.
   Scoreboard: https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=11&dates=2026
   Boxes: https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=<event> (event id on each row)
   Every number below is copied from those boxes. PPR = pass yds/25 + pass TD*4 - INT*2
   + rush yds/10 + rush TD*6 + rec + rec yds/10 + rec TD*6 (same as worker/boxbot.js).
   PENDING (not final at pull, not stamped): Cincinnati Bengals at Washington Commanders event 401873078 (STATUS_SCHEDULED)
*/
(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 11;
  if (FLOCK.meta) {
    FLOCK.meta.week = 11;
    FLOCK.meta.lastUpdated = "November 22, 2026";
  }
  /* Provisional until every game is stamped; delete this flag when the pending games are added. */
  FLOCK.weekStatus = FLOCK.weekStatus || {};
  FLOCK.weekStatus[11] = { provisional: true, pending: ["401873078"], note: "CIN @ WSH (401873078) not yet stamped" };
  var w11 = {
    acarter: { result: "W 23-18 vs JAX", def: "4 tackles, 2 sack, 2 TFL", tackles: 4, sacks: 2, snaps: 1, espnId: "4725996", event: "401873069" },
    armstead: { result: "L 18-23 at NYG", def: "2 tackles, 1 PD", tackles: 2, sacks: 0, snaps: 1, espnId: "2971275", event: "401873069" },
    barkley: { result: "W 19-16 vs PIT", rush: "17 att, 75 yds, 1 TD", snaps: 1, ppr: 13.5, espnId: "3929630", event: "401873076" },
    bassa: { result: "W 34-7 vs ARI", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4602389", event: "401873067" },
    boettcher: { result: "L 3-26 at HOU", def: "6 tackles, 1 TFL", tackles: 6, sacks: 0, snaps: 1, espnId: "5088571", event: "401873066" },
    buckner: { result: "W 35-10 vs MIN", def: "3 tackles, 0.5 sack, 1 TFL", tackles: 3, sacks: 0.5, snaps: 1, espnId: "2971282", event: "401873077" },
    caldwell: { result: "L 24-27 vs NYJ", def: "6 tackles", tackles: 6, sacks: 0, snaps: 1, espnId: "5089178", event: "401873074" },
    canady: { result: "W 34-7 vs ARI", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4710706", event: "401873067" },
    dsmith: { result: "W 19-16 vs PIT", recLine: "12 tgt, 5 rec, 41 yds, 0 TD", snaps: 1, ppr: 9.1, espnId: "4241478", event: "401873076" },
    dye: { result: "L 24-27 vs NYJ", def: "4 tackles, 1 sack", tackles: 4, sacks: 1, snaps: 1, espnId: "4038946", event: "401873074" },
    egbuka: { result: "L 21-31 at DET", recLine: "5 tgt, 2 rec, 18 yds, 0 TD", snaps: 1, ppr: 3.8, espnId: "4567750", event: "401873072" },
    franklin: { result: "W 38-24 vs LV", recLine: "2 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 0.0, espnId: "4431280", event: "401873075" },
    freiermuth: { result: "L 16-19 at PHI", rush: "1 att, 1 yds", recLine: "5 tgt, 5 rec, 39 yds, 0 TD", snaps: 1, ppr: 9.0, espnId: "4361411", event: "401873076" },
    gibbs: { result: "W 31-21 vs TB", rush: "23 att, 98 yds, 2 TD", recLine: "5 tgt, 4 rec, 20 yds, 0 TD", snaps: 1, ppr: 27.8, espnId: "4429795", event: "401873072" },
    gwilson: { result: "W 27-24 at LAC", recLine: "5 tgt, 3 rec, 39 yds, 0 TD", snaps: 1, ppr: 6.9, espnId: "4569618", event: "401873074" },
    henry: { result: "L 33-35 at CAR", rush: "13 att, 94 yds, 1 TD", recLine: "5 tgt, 4 rec, 17 yds, 0 TD", snaps: 1, ppr: 21.1, espnId: "3043078", event: "401873068" },
    herbert: { result: "L 24-27 vs NYJ", pass: "15/21, 131 yds, 2 TD, 0 INT", rush: "8 att, 32 yds, 1 TD", snaps: 1, ppr: 22.4, espnId: "4038941", event: "401873074" },
    holland: { result: "W 23-18 vs JAX", def: "9 tackles, 1 PD", tackles: 9, sacks: 0, snaps: 1, espnId: "4373809", event: "401873069" },
    irving: { result: "L 21-31 at DET", rush: "18 att, 68 yds, 1 TD", recLine: "4 tgt, 3 rec, 32 yds, 0 TD", snaps: 1, ppr: 19.0, espnId: "4596448", event: "401873072" },
    james: { result: "W 35-10 vs MIN", rush: "2 att, 7 yds", snaps: 1, ppr: 0.7, espnId: "4685397", event: "401873077" },
    jbrisker: { result: "L 16-19 at PHI", def: "4 tackles", tackles: 4, sacks: 0, snaps: 1, espnId: "4570044", event: "401873076" },
    jcook: { result: "W 26-9 vs MIA", rush: "22 att, 89 yds, 1 TD", recLine: "2 tgt, 2 rec, 3 yds, 0 TD", snaps: 1, ppr: 17.2, espnId: "4379399", event: "401873070" },
    juwan: { result: "L 13-21 at CHI", recLine: "1 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 0.0, espnId: "3929645", event: "401873071" },
    jwilliams: { result: "W 31-21 vs TB", recLine: "4 tgt, 4 rec, 93 yds, 1 TD", snaps: 1, ppr: 19.3, espnId: "4426388", event: "401873072" },
    kallen: { result: "L 9-26 at BUF", ret: "3 KR, 80 yds", snaps: 1, ppr: 0.0, espnId: "4685246", event: "401873070" },
    lenoir: { result: "W 35-10 vs MIN", def: "3 tackles, 2 PD", tackles: 3, sacks: 0, snaps: 1, espnId: "4242488", event: "401873077" },
    mcconkey: { result: "L 24-27 vs NYJ", recLine: "8 tgt, 5 rec, 37 yds, 2 TD", snaps: 1, ppr: 20.7, espnId: "4612826", event: "401873074" },
    nix: { result: "W 38-24 vs LV", pass: "19/35, 225 yds, 1 TD, 1 INT", rush: "6 att, 5 yds", snaps: 1, ppr: 11.5, espnId: "4426338", event: "401873075" },
    noahsewell: { result: "W 21-13 vs NO", def: "5 tackles", tackles: 5, sacks: 0, snaps: 1, espnId: "4430822", event: "401873071" },
    olave: { result: "L 13-21 at CHI", recLine: "15 tgt, 9 rec, 102 yds, 0 TD", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, ppr: 19.2, espnId: "4361370", event: "401873071" },
    pickens: { result: "W 51-30 vs TEN", rush: "1 att, 6 yds", recLine: "10 tgt, 7 rec, 102 yds, 1 TD", snaps: 1, ppr: 23.8, espnId: "4426354", event: "401873073" },
    roquan: { result: "L 33-35 at CAR", def: "9 tackles", tackles: 9, sacks: 0, snaps: 1, espnId: "3915189", event: "401873068" },
    sadiq: { result: "W 27-24 at LAC", recLine: "3 tgt, 3 rec, 30 yds, 0 TD", snaps: 1, ppr: 6.0, espnId: "5083315", event: "401873074" },
    stroud: { result: "W 26-3 vs IND", pass: "21/27, 194 yds, 3 TD, 1 INT", rush: "6 att, 27 yds", snaps: 1, ppr: 20.5, espnId: "4432577", event: "401873066" },
    swift: { result: "W 21-13 vs NO", rush: "13 att, 51 yds", recLine: "2 tgt, 2 rec, 8 yds, 1 TD", snaps: 1, ppr: 13.9, espnId: "4259545", event: "401873071" },
    tez: { result: "L 21-31 at DET", recLine: "3 tgt, 2 rec, 17 yds, 0 TD", snaps: 1, ppr: 3.7, espnId: "4608810", event: "401873072" },
    thibodeaux: { result: "W 23-18 vs JAX", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4426326", event: "401873069" },
    thieneman: { result: "W 21-13 vs NO", def: "7 tackles, 1 TFL, 1 INT, 1 PD", tackles: 7, sacks: 0, snaps: 1, espnId: "4954445", event: "401873071" },
    waddle: { result: "W 38-24 vs LV", recLine: "6 tgt, 3 rec, 61 yds, 0 TD", snaps: 1, ppr: 9.1, espnId: "4372016", event: "401873075" },
    warren: { result: "L 3-26 at HOU", recLine: "5 tgt, 1 rec, 22 yds, 0 TD", snaps: 1, ppr: 3.2, espnId: "4431459", event: "401873066" },
    young: { result: "W 35-33 vs BAL", pass: "22/30, 254 yds, 2 TD, 1 INT", rush: "2 att, -2 yds", snaps: 1, ppr: 16.0, espnId: "4685720", event: "401873068" }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = w11[p.id];
      if (!box && /juwan johnson/i.test(p.name || "")) box = w11.juwan;
      if (!box && /kenyon sadiq/i.test(p.name || "")) box = w11.sadiq;
      if (!box && /smith-njigba/i.test(p.name || "")) box = w11.jsn;
      if (!box && /evan williams/i.test(p.name || "")) box = w11.evanwilliams;
      if (!box && /^james cook/i.test(p.name || "")) box = w11.jcook;
      if (box) {
        p.weeks[11] = box;
      } else if (!p.weeks[11]) {
        p.weeks[11] = { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 11) === 11) {
        p.week1 = p.weeks[11];
        if (p.fantasy && typeof p.weeks[11].ppr === "number") p.fantasy.week1PPR = p.weeks[11].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 11;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
