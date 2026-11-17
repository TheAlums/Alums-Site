/* Week 4 (2026 regular season) stamps.
   Source: ESPN boxes, pulled 2026-11-16 by The Alums Auditor.
   Scoreboard: https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=4&dates=2026
   Boxes: https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=<event> (event id on each row)
   Every number below is copied from those boxes. PPR = pass yds/25 + pass TD*4 - INT*2
   + rush yds/10 + rush TD*6 + rec + rec yds/10 + rec TD*6 (same as worker/boxbot.js).
*/
(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 4;
  if (FLOCK.meta) {
    FLOCK.meta.week = 4;
    FLOCK.meta.lastUpdated = "October 5, 2026";
  }
  var w4 = {
    acarter: { result: "W 36-24 vs ARI", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4725996", event: "401872966" },
    armstead: { result: "W 22-17 at CIN", def: "2 tackles, 1 sack, 1 TFL", tackles: 2, sacks: 1, snaps: 1, espnId: "2971275", event: "401872969" },
    barkley: { result: "L 20-24 vs LAR", rush: "2 att, 8 yds", recLine: "1 tgt, 1 rec, 2 yds, 0 TD", snaps: 1, ppr: 2.0, espnId: "3929630", event: "401872970" },
    bassa: { result: "W 30-27 at LV", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4602389", event: "401872976" },
    benson: { result: "L 27-30 vs KC", ret: "1 PR, 4 yds", snaps: 1, ppr: 0.0, espnId: "5150247", event: "401872976" },
    boettcher: { result: "W 30-13 at WSH", def: "5 tackles", tackles: 5, sacks: 0, snaps: 1, espnId: "5088571", event: "401872965" },
    bowers: { result: "L 27-30 vs KC", recLine: "11 tgt, 6 rec, 86 yds, 1 TD", snaps: 1, ppr: 20.6, espnId: "4432665", event: "401872976" },
    buckner: { result: "W 30-13 at WSH", def: "4 tackles, 1 TFL, 1 PD", tackles: 4, sacks: 0, snaps: 1, espnId: "2971282", event: "401872965" },
    burch: { result: "L 24-36 at NYG", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "4428996", event: "401872966" },
    caldwell: { result: "L 23-30 at SEA", def: "2 tackles, 1 TFL", tackles: 2, sacks: 0, snaps: 1, espnId: "5089178", event: "401872977" },
    conerly: { result: "L 13-30 vs IND", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "4685326", event: "401872965" },
    dorlus: { result: "W 45-24 at NO", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4427090", event: "401872979" },
    dye: { result: "L 23-30 at SEA", def: "3 tackles, 1 sack, 1 TFL", tackles: 3, sacks: 1, snaps: 1, espnId: "4038946", event: "401872977" },
    egbuka: { result: "L 14-17 vs GB", recLine: "4 tgt, 2 rec, 13 yds, 0 TD", snaps: 1, ppr: 3.3, espnId: "4567750", event: "401872968" },
    evanwilliams: { result: "W 17-14 at TB", def: "7 tackles, 1 sack, 1 TFL, 1 INT, 2 PD", tackles: 7, sacks: 1, snaps: 1, espnId: "4428863", event: "401872968" },
    freiermuth: { result: "L 24-27 at CLE", recLine: "5 tgt, 3 rec, 17 yds, 1 TD", snaps: 1, ppr: 10.7, espnId: "4361411", event: "401872964" },
    gibbs: { result: "L 26-32 at CAR", rush: "15 att, 46 yds, 1 TD", recLine: "7 tgt, 4 rec, 31 yds, 0 TD", snaps: 1, ppr: 17.7, espnId: "4429795", event: "401872978" },
    gwilson: { result: "L 12-23 at CHI", recLine: "4 tgt, 3 rec, 27 yds, 0 TD", snaps: 1, ppr: 5.7, espnId: "4569618", event: "401872972" },
    henderson: { result: "W 29-26 at BUF", rush: "14 att, 42 yds", recLine: "2 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 4.2, espnId: "4432710", event: "401872971" },
    henry: { result: "W 24-18 vs TEN", rush: "23 att, 73 yds, 1 TD", recLine: "2 tgt, 2 rec, 6 yds, 0 TD", snaps: 1, ppr: 15.9, espnId: "3043078", event: "401872973" },
    herbert: { result: "L 23-30 at SEA", pass: "19/31, 189 yds, 1 TD, 2 INT", rush: "6 att, 40 yds", recLine: "1 tgt, 0 rec, 0 yds, 0 TD", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, ppr: 11.6, espnId: "4038941", event: "401872977" },
    holland: { result: "W 36-24 vs ARI", def: "7 tackles", tackles: 7, sacks: 0, snaps: 1, espnId: "4373809", event: "401872966" },
    hurts: { result: "L 20-24 vs LAR", pass: "12/27, 93 yds, 2 TD, 0 INT", rush: "5 att, 18 yds", snaps: 1, ppr: 13.5, espnId: "4040715", event: "401872970" },
    irving: { result: "L 14-17 vs GB", rush: "16 att, 61 yds", snaps: 1, ppr: 6.1, espnId: "4596448", event: "401872968" },
    jamalhill: { result: "L 30-34 vs DAL", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4427479", event: "401872967" },
    jbrisker: { result: "L 24-27 at CLE", def: "7 tackles", tackles: 7, sacks: 0, snaps: 1, espnId: "4570044", event: "401872964" },
    jcook: { result: "L 26-29 vs NE", rush: "12 att, 75 yds, 1 TD", recLine: "2 tgt, 2 rec, 8 yds, 0 TD", snaps: 1, ppr: 16.3, espnId: "4379399", event: "401872971" },
    jsn: { result: "W 30-23 vs LAC", recLine: "6 tgt, 5 rec, 76 yds, 0 TD", snaps: 1, ppr: 12.6, espnId: "4430878", event: "401872977" },
    judkins: { result: "W 27-24 vs PIT", rush: "17 att, 53 yds, 1 TD", recLine: "7 tgt, 6 rec, 43 yds, 0 TD", snaps: 1, ppr: 21.6, espnId: "4685702", event: "401872964" },
    juwan: { result: "L 24-45 vs ATL", recLine: "8 tgt, 6 rec, 59 yds, 0 TD", snaps: 1, ppr: 11.9, espnId: "3929645", event: "401872979" },
    jwilliams: { result: "L 26-32 at CAR", recLine: "8 tgt, 6 rec, 102 yds, 0 TD", snaps: 1, ppr: 16.2, espnId: "4426388", event: "401872978" },
    kallen: { result: "L 13-30 vs IND", rush: "3 att, 1 yds", snaps: 1, ppr: 0.1, espnId: "4685246", event: "401872965" },
    lenoir: { result: "W 24-14 vs DEN", def: "4 tackles", tackles: 4, sacks: 0, snaps: 1, espnId: "4242488", event: "401872975" },
    mariota: { result: "L 13-30 vs IND", pass: "3/4, 46 yds, 0 TD, 0 INT", rush: "1 att, 35 yds", snaps: 1, ppr: 5.3, espnId: "2576980", event: "401872965" },
    mcconkey: { result: "L 23-30 at SEA", recLine: "2 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 0.0, espnId: "4612826", event: "401872977" },
    nix: { result: "L 14-24 at SF", pass: "25/42, 214 yds, 1 TD, 0 INT", rush: "2 att, 10 yds", snaps: 1, ppr: 13.6, espnId: "4426338", event: "401872975" },
    olave: { result: "L 24-45 vs ATL", recLine: "12 tgt, 8 rec, 116 yds, 0 TD", snaps: 1, ppr: 19.6, espnId: "4361370", event: "401872979" },
    pickens: { result: "W 34-30 at HOU", recLine: "3 tgt, 2 rec, 75 yds, 0 TD", snaps: 1, ppr: 9.5, espnId: "4426354", event: "401872967" },
    roquan: { result: "W 24-18 vs TEN", def: "6 tackles", tackles: 6, sacks: 0, snaps: 1, espnId: "3915189", event: "401872973" },
    sadiq: { result: "L 12-23 at CHI", recLine: "4 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 0.0, espnId: "5083315", event: "401872972" },
    singleton: { result: "L 18-24 at BAL", rush: "3 att, 2 yds", snaps: 1, ppr: 0.2, espnId: "4685555", event: "401872973" },
    stafford: { result: "W 24-20 at PHI", pass: "32/51, 317 yds, 0 TD, 2 INT", rush: "3 att, 10 yds", snaps: 1, ppr: 9.7, espnId: "12483", event: "401872970" },
    stroud: { result: "L 30-34 vs DAL", pass: "21/31, 347 yds, 2 TD, 0 INT", rush: "2 att, 12 yds", snaps: 1, ppr: 23.1, espnId: "4432577", event: "401872967" },
    swift: { result: "W 23-12 vs NYJ", rush: "15 att, 58 yds", recLine: "2 tgt, 2 rec, 16 yds, 0 TD", snaps: 1, ppr: 9.4, espnId: "4259545", event: "401872972" },
    tez: { result: "L 14-17 vs GB", rush: "1 att, 10 yds", recLine: "2 tgt, 2 rec, 17 yds, 0 TD", snaps: 1, ppr: 4.7, espnId: "4608810", event: "401872968" },
    thibodeaux: { result: "W 36-24 vs ARI", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4426326", event: "401872966" },
    thieneman: { result: "W 23-12 vs NYJ", def: "7 tackles", tackles: 7, sacks: 0, snaps: 1, espnId: "4954445", event: "401872972" },
    waddle: { result: "L 14-24 at SF", recLine: "6 tgt, 5 rec, 35 yds, 1 TD", snaps: 1, ppr: 14.5, espnId: "4372016", event: "401872975" },
    warren: { result: "W 30-13 at WSH", recLine: "5 tgt, 5 rec, 41 yds, 0 TD", snaps: 1, ppr: 9.1, espnId: "4431459", event: "401872965" },
    williams: { result: "W 17-14 at TB", def: "7 tackles, 1 sack, 1 TFL, 1 INT, 2 PD", tackles: 7, sacks: 1, snaps: 1, espnId: "4428863", event: "401872968" },
    young: { result: "W 32-26 vs DET", pass: "29/41, 329 yds, 2 TD, 0 INT", rush: "3 att, 3 yds", snaps: 1, ppr: 21.5, espnId: "4685720", event: "401872978" },
    zbranch: { result: "W 45-24 at NO", recLine: "2 tgt, 2 rec, 10 yds, 0 TD", snaps: 1, ppr: 3.0, espnId: "4870612", event: "401872979" }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = w4[p.id];
      if (!box && /juwan johnson/i.test(p.name || "")) box = w4.juwan;
      if (!box && /kenyon sadiq/i.test(p.name || "")) box = w4.sadiq;
      if (!box && /smith-njigba/i.test(p.name || "")) box = w4.jsn;
      if (!box && /evan williams/i.test(p.name || "")) box = w4.evanwilliams || w4.williams;
      if (!box && /^james cook/i.test(p.name || "")) box = w4.jcook;
      if (box) {
        p.weeks[4] = box;
      } else if (!p.weeks[4]) {
        p.weeks[4] = { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 4) === 4) {
        p.week1 = p.weeks[4];
        if (p.fantasy && typeof p.weeks[4].ppr === "number") p.fantasy.week1PPR = p.weeks[4].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 4;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
