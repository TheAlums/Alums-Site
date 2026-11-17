/* Week 5 (2026 regular season) stamps.
   Source: ESPN boxes, pulled 2026-11-16 by The Alums Auditor.
   Scoreboard: https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=5&dates=2026
   Boxes: https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=<event> (event id on each row)
   Every number below is copied from those boxes. PPR = pass yds/25 + pass TD*4 - INT*2
   + rush yds/10 + rush TD*6 + rec + rec yds/10 + rec TD*6 (same as worker/boxbot.js).
*/
(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 5;
  if (FLOCK.meta) {
    FLOCK.meta.week = 5;
    FLOCK.meta.lastUpdated = "October 12, 2026";
  }
  var w5 = {
    acarter: { result: "T 27-27 at WSH", def: "5 tackles, 1 sack, 1 TFL", tackles: 5, sacks: 1, snaps: 1, espnId: "4725996", event: "401872988" },
    benson: { result: "L 17-45 at NE", recLine: "4 tgt, 1 rec, 6 yds, 0 TD", snaps: 1, ppr: 1.6, espnId: "5150247", event: "401872986" },
    boettcher: { result: "L 22-34 at PIT", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "5088571", event: "401872985" },
    bowers: { result: "L 17-45 at NE", recLine: "10 tgt, 8 rec, 110 yds, 1 TD", snaps: 1, ppr: 25.0, espnId: "4432665", event: "401872986" },
    buckner: { result: "L 22-34 at PIT", def: "6 tackles, 1 sack, 1 TFL", tackles: 6, sacks: 1, snaps: 1, espnId: "2971282", event: "401872985" },
    burch: { result: "L 21-45 vs DET", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4428996", event: "401872991" },
    caldwell: { result: "L 17-23 vs DEN", def: "2 tackles, 1 TFL", tackles: 2, sacks: 0, snaps: 1, espnId: "5089178", event: "401872989" },
    dorlus: { result: "L 23-30 vs BAL", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "4427090", event: "401872993" },
    egbuka: { result: "W 24-16 at DAL", rush: "1 att, 14 yds, 1 TD", recLine: "9 tgt, 6 rec, 38 yds, 0 TD", snaps: 1, ppr: 17.2, espnId: "4567750", event: "401872980" },
    evanwilliams: { result: "W 31-7 vs CHI", def: "12 tackles", tackles: 12, sacks: 0, snaps: 1, espnId: "4428863", event: "401872990" },
    franklin: { result: "W 23-17 at LAC", recLine: "2 tgt, 2 rec, 16 yds, 0 TD", snaps: 1, ppr: 3.6, espnId: "4431280", event: "401872989" },
    freiermuth: { result: "W 34-22 vs IND", rush: "1 att, 1 yds", recLine: "7 tgt, 5 rec, 44 yds, 2 TD", snaps: 1, ppr: 21.5, espnId: "4361411", event: "401872985" },
    gibbs: { result: "W 45-21 at ARI", rush: "25 att, 151 yds, 2 TD", recLine: "6 tgt, 5 rec, 56 yds, 0 TD", snaps: 1, ppr: 37.7, espnId: "4429795", event: "401872991" },
    gwilson: { result: "W 17-12 vs CLE", recLine: "11 tgt, 7 rec, 104 yds, 1 TD", snaps: 1, ppr: 23.4, espnId: "4569618", event: "401872983" },
    henderson: { result: "W 45-17 vs LV", rush: "4 att, 22 yds", recLine: "1 tgt, 1 rec, 16 yds, 0 TD", snaps: 1, ppr: 4.8, espnId: "4432710", event: "401872986" },
    henry: { result: "W 30-23 at ATL", rush: "24 att, 102 yds", recLine: "2 tgt, 1 rec, 18 yds, 1 TD", snaps: 1, ppr: 19.0, espnId: "3043078", event: "401872993" },
    herbert: { result: "L 17-23 vs DEN", pass: "14/24, 121 yds, 1 TD, 1 INT", rush: "6 att, 54 yds", snaps: 1, ppr: 12.2, espnId: "4038941", event: "401872989" },
    holland: { result: "T 27-27 at WSH", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4373809", event: "401872988" },
    hurts: { result: "L 17-19 at JAX", pass: "21/40, 220 yds, 1 TD, 0 INT", rush: "2 att, 2 yds", snaps: 1, ppr: 13.0, espnId: "4040715", event: "401872981" },
    irving: { result: "W 24-16 at DAL", rush: "21 att, 165 yds, 1 TD", recLine: "3 tgt, 2 rec, 10 yds, 1 TD", snaps: 1, ppr: 31.5, espnId: "4596448", event: "401872980" },
    james: { result: "W 32-29 at SEA", ret: "4 KR, 123 yds", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, ppr: 0.0, espnId: "4685397", event: "401872992" },
    jbrisker: { result: "W 34-22 vs IND", def: "7 tackles, 2 PD", tackles: 7, sacks: 0, snaps: 1, espnId: "4570044", event: "401872985" },
    jcook: { result: "W 37-34 at LAR", rush: "25 att, 111 yds, 2 TD", recLine: "1 tgt, 1 rec, 7 yds, 0 TD", snaps: 1, ppr: 24.8, espnId: "4379399", event: "401872994" },
    jsn: { result: "L 29-32 vs SF", rush: "1 att, 16 yds", recLine: "8 tgt, 5 rec, 102 yds, 1 TD", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, ppr: 22.8, espnId: "4430878", event: "401872992" },
    judkins: { result: "L 12-17 at NYJ", rush: "14 att, 44 yds", recLine: "4 tgt, 3 rec, 6 yds, 0 TD", snaps: 1, ppr: 8.0, espnId: "4685702", event: "401872983" },
    juwan: { result: "L 13-23 vs MIN", recLine: "5 tgt, 4 rec, 16 yds, 0 TD", snaps: 1, ppr: 5.6, espnId: "3929645", event: "401872987" },
    jwilliams: { result: "W 45-21 at ARI", recLine: "4 tgt, 2 rec, 47 yds, 2 TD", snaps: 1, ppr: 18.7, espnId: "4426388", event: "401872991" },
    lenoir: { result: "W 32-29 at SEA", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4242488", event: "401872992" },
    mclaurin: { result: "T 27-27 vs NYG", recLine: "4 tgt, 4 rec, 62 yds, 0 TD", snaps: 1, ppr: 10.2, espnId: "3121422", event: "401872988" },
    mundt: { result: "L 17-19 at JAX", recLine: "1 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 0.0, espnId: "3052096", event: "401872981" },
    nix: { result: "W 23-17 at LAC", pass: "16/27, 123 yds, 1 TD, 0 INT", rush: "4 att, 10 yds", snaps: 1, ppr: 9.9, espnId: "4426338", event: "401872989" },
    noahsewell: { result: "L 7-31 at GB", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "4430822", event: "401872990" },
    olave: { result: "L 13-23 vs MIN", recLine: "6 tgt, 4 rec, 46 yds, 0 TD", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, ppr: 8.6, espnId: "4361370", event: "401872987" },
    pickens: { result: "L 16-24 vs TB", recLine: "13 tgt, 9 rec, 130 yds, 1 TD", snaps: 1, ppr: 28.0, espnId: "4426354", event: "401872980" },
    roquan: { result: "W 30-23 at ATL", def: "8 tackles", tackles: 8, sacks: 0, snaps: 1, espnId: "3915189", event: "401872993" },
    sadiq: { result: "W 17-12 vs CLE", recLine: "3 tgt, 2 rec, 3 yds, 0 TD", snaps: 1, ppr: 2.3, espnId: "5083315", event: "401872983" },
    stafford: { result: "L 34-37 vs BUF", pass: "40/54, 383 yds, 3 TD, 0 INT", snaps: 1, ppr: 27.3, espnId: "12483", event: "401872994" },
    stroud: { result: "W 26-3 at TEN", pass: "26/34, 261 yds, 1 TD, 0 INT", rush: "6 att, 5 yds, 1 TD", snaps: 1, ppr: 20.9, espnId: "4432577", event: "401872984" },
    swift: { result: "L 7-31 at GB", rush: "9 att, 43 yds, 1 TD", recLine: "5 tgt, 4 rec, 30 yds, 0 TD", snaps: 1, ppr: 17.3, espnId: "4259545", event: "401872990" },
    tez: { result: "W 24-16 at DAL", recLine: "1 tgt, 1 rec, 64 yds, 0 TD", snaps: 1, ppr: 7.4, espnId: "4608810", event: "401872980" },
    thibodeaux: { result: "T 27-27 at WSH", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "4426326", event: "401872988" },
    thieneman: { result: "L 7-31 at GB", def: "7 tackles, 1 TFL, 1 PD", tackles: 7, sacks: 0, snaps: 1, espnId: "4954445", event: "401872990" },
    waddle: { result: "W 23-17 at LAC", rush: "1 att, 9 yds", recLine: "5 tgt, 2 rec, 19 yds, 0 TD", snaps: 1, ppr: 4.8, espnId: "4372016", event: "401872989" },
    warren: { result: "L 22-34 at PIT", rush: "1 att, 1 yds, 1 TD", recLine: "9 tgt, 7 rec, 83 yds, 0 TD", snaps: 1, ppr: 21.4, espnId: "4431459", event: "401872985" },
    zbranch: { result: "L 23-30 vs BAL", recLine: "2 tgt, 2 rec, 15 yds, 0 TD", snaps: 1, ppr: 3.5, espnId: "4870612", event: "401872993" }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = w5[p.id];
      if (!box && /juwan johnson/i.test(p.name || "")) box = w5.juwan;
      if (!box && /kenyon sadiq/i.test(p.name || "")) box = w5.sadiq;
      if (!box && /smith-njigba/i.test(p.name || "")) box = w5.jsn;
      if (!box && /evan williams/i.test(p.name || "")) box = w5.evanwilliams;
      if (!box && /^james cook/i.test(p.name || "")) box = w5.jcook;
      if (box) {
        p.weeks[5] = box;
      } else if (!p.weeks[5]) {
        p.weeks[5] = { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 5) === 5) {
        p.week1 = p.weeks[5];
        if (p.fantasy && typeof p.weeks[5].ppr === "number") p.fantasy.week1PPR = p.weeks[5].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 5;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
