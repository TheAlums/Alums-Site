/* Week 6 (2026 regular season) stamps.
   Source: ESPN boxes, pulled 2026-11-16 by The Alums Auditor.
   Scoreboard: https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=6&dates=2026
   Boxes: https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=<event> (event id on each row)
   Every number below is copied from those boxes. PPR = pass yds/25 + pass TD*4 - INT*2
   + rush yds/10 + rush TD*6 + rec + rec yds/10 + rec TD*6 (same as worker/boxbot.js).
*/
(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 6;
  if (FLOCK.meta) {
    FLOCK.meta.week = 6;
    FLOCK.meta.lastUpdated = "October 19, 2026";
  }
  var w6 = {
    acarter: { result: "L 27-34 vs NO", def: "0 tackles", tackles: 0, sacks: 0, snaps: 1, espnId: "4725996", event: "401873000" },
    armstead: { result: "L 31-34 vs HOU", def: "2 tackles, 1 PD", tackles: 2, sacks: 0, snaps: 1, espnId: "2971275", event: "401872996" },
    bassa: { result: "W 22-6 vs LAC", def: "4 tackles", tackles: 4, sacks: 0, snaps: 1, espnId: "4602389", event: "401873006" },
    boettcher: { result: "L 20-26 vs TEN", def: "4 tackles", tackles: 4, sacks: 0, snaps: 1, espnId: "5088571", event: "401873003" },
    bowers: { result: "L 30-33 vs BUF", recLine: "9 tgt, 4 rec, 70 yds, 0 TD", snaps: 1, ppr: 11.0, espnId: "4432665", event: "401873005" },
    brown: { result: "L 20-26 vs TEN", recLine: "1 tgt, 1 rec, 7 yds, 0 TD", snaps: 1, ppr: 1.7, espnId: "2971281", event: "401873003" },
    buckner: { result: "L 20-26 vs TEN", def: "2 tackles, 1 PD", tackles: 2, sacks: 0, snaps: 1, espnId: "2971282", event: "401873003" },
    burch: { result: "W 18-16 at LAR", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4428996", event: "401873004" },
    dorlus: { result: "L 23-31 vs CHI", def: "2 tackles, 1 sack, 2 TFL, 1 PD", tackles: 2, sacks: 1, snaps: 1, espnId: "4427090", event: "401872999" },
    dsmith: { result: "L 14-25 vs CAR", recLine: "14 tgt, 7 rec, 75 yds, 1 TD", snaps: 1, ppr: 20.5, espnId: "4241478", event: "401872998" },
    dye: { result: "L 6-22 at KC", def: "4 tackles", tackles: 4, sacks: 0, snaps: 1, espnId: "4038946", event: "401873006" },
    egbuka: { result: "L 19-26 vs PIT", recLine: "16 tgt, 7 rec, 48 yds, 1 TD", snaps: 1, ppr: 17.8, espnId: "4567750", event: "401873002" },
    evanwilliams: { result: "W 23-13 vs DAL", def: "6 tackles, 1 INT, 1 PD", tackles: 6, sacks: 0, snaps: 1, espnId: "4428863", event: "401873007" },
    franklin: { result: "W 17-14 vs SEA", recLine: "1 tgt, 1 rec, 2 yds, 0 TD", snaps: 1, ppr: 1.2, espnId: "4431280", event: "401872995" },
    freiermuth: { result: "W 26-19 at TB", recLine: "3 tgt, 2 rec, 11 yds, 0 TD", snaps: 1, ppr: 3.1, espnId: "4361411", event: "401873002" },
    gonzalez: { result: "W 26-19 vs NYJ", def: "6 tackles", tackles: 6, sacks: 0, snaps: 1, espnId: "4686772", event: "401873001" },
    gwilson: { result: "L 19-26 at NE", recLine: "6 tgt, 4 rec, 44 yds, 0 TD", snaps: 1, ppr: 8.4, espnId: "4569618", event: "401873001" },
    henderson: { result: "W 26-19 vs NYJ", rush: "7 att, 31 yds", recLine: "1 tgt, 1 rec, 9 yds, 0 TD", snaps: 1, ppr: 5.0, espnId: "4432710", event: "401873001" },
    henry: { result: "L 10-13 at CLE", rush: "17 att, 58 yds", recLine: "1 tgt, 1 rec, 2 yds, 0 TD", snaps: 1, ppr: 7.0, espnId: "3043078", event: "401872997" },
    herbert: { result: "L 6-22 at KC", pass: "22/37, 204 yds, 0 TD, 1 INT", rush: "5 att, 26 yds", snaps: 1, ppr: 8.8, espnId: "4038941", event: "401873006" },
    holland: { result: "L 27-34 vs NO", def: "9 tackles, 1 TFL, 1 PD", tackles: 9, sacks: 0, snaps: 1, espnId: "4373809", event: "401873000" },
    irving: { result: "L 19-26 vs PIT", rush: "19 att, 46 yds", recLine: "3 tgt, 2 rec, 3 yds, 0 TD", snaps: 1, ppr: 6.9, espnId: "4596448", event: "401873002" },
    james: { result: "W 23-17 vs WSH", ret: "2 KR, 58 yds", snaps: 1, ppr: 0.0, espnId: "4685397", event: "401873008" },
    jbrisker: { result: "W 26-19 at TB", def: "7 tackles", tackles: 7, sacks: 0, snaps: 1, espnId: "4570044", event: "401873002" },
    jcook: { result: "W 33-30 at LV", rush: "22 att, 95 yds, 1 TD", recLine: "3 tgt, 3 rec, 58 yds, 0 TD", snaps: 1, ppr: 24.3, espnId: "4379399", event: "401873005" },
    jsn: { result: "L 14-17 at DEN", recLine: "16 tgt, 12 rec, 134 yds, 0 TD", snaps: 1, ppr: 25.4, espnId: "4430878", event: "401872995" },
    juwan: { result: "W 34-27 at NYG", recLine: "2 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 0.0, espnId: "3929645", event: "401873000" },
    lenoir: { result: "W 23-17 vs WSH", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4242488", event: "401873008" },
    mcconkey: { result: "L 6-22 at KC", recLine: "1 tgt, 1 rec, 17 yds, 0 TD", snaps: 1, ppr: 2.7, espnId: "4612826", event: "401873006" },
    mclaurin: { result: "L 17-23 at SF", recLine: "1 tgt, 1 rec, 27 yds, 0 TD", snaps: 1, ppr: 3.7, espnId: "3121422", event: "401873008" },
    mundt: { result: "L 14-25 vs CAR", recLine: "1 tgt, 1 rec, 4 yds, 0 TD", snaps: 1, ppr: 1.4, espnId: "3052096", event: "401872998" },
    nix: { result: "W 17-14 vs SEA", pass: "17/27, 107 yds, 0 TD, 0 INT", rush: "4 att, 2 yds", snaps: 1, ppr: 4.5, espnId: "4426338", event: "401872995" },
    noahsewell: { result: "W 31-23 at ATL", def: "6 tackles, 1 TFL", tackles: 6, sacks: 0, snaps: 1, espnId: "4430822", event: "401872999" },
    olave: { result: "W 34-27 at NYG", recLine: "7 tgt, 4 rec, 43 yds, 1 TD", snaps: 1, ppr: 14.3, espnId: "4361370", event: "401873000" },
    pickens: { result: "L 13-23 at GB", recLine: "11 tgt, 6 rec, 73 yds, 0 TD", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, ppr: 13.3, espnId: "4426354", event: "401873007" },
    roquan: { result: "L 10-13 at CLE", def: "5 tackles, 1 sack", tackles: 5, sacks: 1, snaps: 1, espnId: "3915189", event: "401872997" },
    sadiq: { result: "L 19-26 at NE", recLine: "3 tgt, 1 rec, 12 yds, 0 TD", snaps: 1, ppr: 2.2, espnId: "5083315", event: "401873001" },
    stafford: { result: "L 16-18 vs ARI", pass: "25/33, 222 yds, 2 TD, 0 INT", snaps: 1, ppr: 16.9, espnId: "12483", event: "401873004" },
    stroud: { result: "W 34-31 at JAX", pass: "24/34, 312 yds, 3 TD, 1 INT", rush: "1 att, 5 yds", snaps: 1, ppr: 23.0, espnId: "4432577", event: "401872996" },
    swift: { result: "W 31-23 at ATL", rush: "16 att, 44 yds, 2 TD", recLine: "5 tgt, 4 rec, 26 yds, 0 TD", snaps: 1, ppr: 23.0, espnId: "4259545", event: "401872999" },
    tez: { result: "L 19-26 vs PIT", recLine: "3 tgt, 2 rec, 7 yds, 0 TD", snaps: 1, ppr: 2.7, espnId: "4608810", event: "401873002" },
    thibodeaux: { result: "L 27-34 vs NO", def: "5 tackles", tackles: 5, sacks: 0, snaps: 1, espnId: "4426326", event: "401873000" },
    thieneman: { result: "W 31-23 at ATL", def: "2 tackles, 1 sack, 1 TFL, 1 PD", tackles: 2, sacks: 1, snaps: 1, espnId: "4954445", event: "401872999" },
    waddle: { result: "W 17-14 vs SEA", recLine: "7 tgt, 4 rec, 24 yds, 0 TD", snaps: 1, ppr: 6.4, espnId: "4372016", event: "401872995" },
    williams: { result: "W 23-13 vs DAL", def: "6 tackles, 1 INT, 1 PD", tackles: 6, sacks: 0, snaps: 1, espnId: "4428863", event: "401873007" },
    young: { result: "W 25-14 at PHI", pass: "20/39, 281 yds, 2 TD, 0 INT", rush: "3 att, 6 yds", snaps: 1, ppr: 19.8, espnId: "4685720", event: "401872998" },
    zbranch: { result: "L 23-31 vs CHI", recLine: "2 tgt, 2 rec, 9 yds, 0 TD", snaps: 1, ppr: 2.9, espnId: "4870612", event: "401872999" }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = w6[p.id];
      if (!box && /juwan johnson/i.test(p.name || "")) box = w6.juwan;
      if (!box && /kenyon sadiq/i.test(p.name || "")) box = w6.sadiq;
      if (!box && /smith-njigba/i.test(p.name || "")) box = w6.jsn;
      if (!box && /evan williams/i.test(p.name || "")) box = w6.evanwilliams || w6.williams;
      if (!box && /^james cook/i.test(p.name || "")) box = w6.jcook;
      if (box) {
        p.weeks[6] = box;
      } else if (!p.weeks[6]) {
        p.weeks[6] = { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 6) === 6) {
        p.week1 = p.weeks[6];
        if (p.fantasy && typeof p.weeks[6].ppr === "number") p.fantasy.week1PPR = p.weeks[6].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 6;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
