/* Week 10 (2026 regular season) stamps.
   Source: ESPN boxes, pulled 2026-11-22 by The Alums Auditor.
   Scoreboard: https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=10&dates=2026
   Boxes: https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=<event> (event id on each row)
   Every number below is copied from those boxes. PPR = pass yds/25 + pass TD*4 - INT*2
   + rush yds/10 + rush TD*6 + rec + rec yds/10 + rec TD*6 (same as worker/boxbot.js).
*/
(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 10;
  if (FLOCK.meta) {
    FLOCK.meta.week = 10;
    FLOCK.meta.lastUpdated = "November 16, 2026";
  }
  var w10 = {
    acarter: { result: "L 21-24 vs WSH", def: "3 tackles, 1 TFL", tackles: 3, sacks: 0, snaps: 1, espnId: "4725996", event: "401873052" },
    bassa: { result: "W 35-13 at ATL", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4602389", event: "401873058" },
    boettcher: { result: "W 24-22 vs MIA", def: "7 tackles", tackles: 7, sacks: 0, snaps: 1, espnId: "5088571", event: "401873059" },
    bowers: { result: "L 13-21 vs SEA", recLine: "2 tgt, 2 rec, 18 yds, 0 TD", snaps: 1, ppr: 3.8, espnId: "4432665", event: "401873062" },
    buckner: { result: "W 46-40 at DAL", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "2971282", event: "401873063" },
    caldwell: { result: "W 23-20 at BAL", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "5089178", event: "401873065" },
    canady: { result: "W 35-13 at ATL", def: "3 tackles, 1 PD", tackles: 3, sacks: 0, snaps: 1, espnId: "4710706", event: "401873058" },
    dorlus: { result: "L 13-35 vs KC", def: "2 tackles, 0.5 sack", tackles: 2, sacks: 0.5, snaps: 1, espnId: "4427090", event: "401873058" },
    evanwilliams: { result: "L 10-30 vs MIN", def: "8 tackles, 1 PD", tackles: 8, sacks: 0, snaps: 1, espnId: "4428863", event: "401873060" },
    freiermuth: { result: "L 18-38 at CIN", recLine: "3 tgt, 2 rec, 35 yds, 1 TD", snaps: 1, ppr: 11.5, espnId: "4361411", event: "401873064" },
    gibbs: { result: "W 35-10 vs NE", rush: "22 att, 153 yds, 2 TD", recLine: "8 tgt, 7 rec, 99 yds, 0 TD", snaps: 1, ppr: 44.2, espnId: "4429795", event: "401873053" },
    gonzalez: { result: "L 10-35 at DET", def: "3 tackles, 1 INT, 1 PD", tackles: 3, sacks: 0, snaps: 1, espnId: "4686772", event: "401873053" },
    gwilson: { result: "L 12-31 vs BUF", recLine: "14 tgt, 7 rec, 106 yds, 0 TD", snaps: 1, ppr: 17.6, espnId: "4569618", event: "401873054" },
    harmon: { result: "L 18-38 at CIN", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "4682980", event: "401873064" },
    henry: { result: "L 20-23 vs LAC", rush: "10 att, 10 yds, 2 TD", recLine: "5 tgt, 5 rec, 10 yds, 0 TD", snaps: 1, ppr: 19.0, espnId: "3043078", event: "401873065" },
    herbert: { result: "W 23-20 at BAL", pass: "12/18, 129 yds, 0 TD, 0 INT", rush: "7 att, 51 yds, 1 TD", snaps: 1, ppr: 16.3, espnId: "4038941", event: "401873065" },
    holland: { result: "L 21-24 vs WSH", def: "3 tackles, 1 INT, 1 PD", tackles: 3, sacks: 0, snaps: 1, espnId: "4373809", event: "401873052" },
    james: { result: "W 46-40 at DAL", ret: "5 KR, 101 yds", snaps: 1, ppr: 0.0, espnId: "4685397", event: "401873063" },
    jbrisker: { result: "L 18-38 at CIN", def: "10 tackles", tackles: 10, sacks: 0, snaps: 1, espnId: "4570044", event: "401873064" },
    jcook: { result: "W 31-12 at NYJ", rush: "18 att, 157 yds, 1 TD", recLine: "1 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 21.7, espnId: "4379399", event: "401873054" },
    jsn: { result: "W 21-13 at LV", recLine: "10 tgt, 8 rec, 171 yds, 1 TD", snaps: 1, ppr: 31.1, espnId: "4430878", event: "401873062" },
    judkins: { result: "W 27-24 vs HOU", rush: "10 att, 38 yds, 1 TD", recLine: "5 tgt, 3 rec, 33 yds, 0 TD", snaps: 1, ppr: 16.1, espnId: "4685702", event: "401873056" },
    juwan: { result: "L 17-20 vs CAR", recLine: "3 tgt, 2 rec, 28 yds, 0 TD", snaps: 1, ppr: 4.8, espnId: "3929645", event: "401873055" },
    jwilliams: { result: "W 35-10 vs NE", recLine: "7 tgt, 4 rec, 50 yds, 0 TD", snaps: 1, ppr: 9.0, espnId: "4426388", event: "401873053" },
    kallen: { result: "L 22-24 at IND", rush: "1 att, 0 yds", recLine: "1 tgt, 1 rec, -4 yds, 0 TD", snaps: 1, ppr: 0.6, espnId: "4685246", event: "401873059" },
    lenoir: { result: "W 46-40 at DAL", def: "5 tackles, 4 PD", tackles: 5, sacks: 0, snaps: 1, espnId: "4242488", event: "401873063" },
    olave: { result: "L 17-20 vs CAR", recLine: "4 tgt, 3 rec, 30 yds, 0 TD", snaps: 1, ppr: 6.0, espnId: "4361370", event: "401873055" },
    pickens: { result: "L 40-46 vs SF", recLine: "18 tgt, 11 rec, 145 yds, 3 TD", snaps: 1, ppr: 43.5, espnId: "4426354", event: "401873063" },
    riley: { result: "L 10-30 vs MIN", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "4240677", event: "401873060" },
    roquan: { result: "L 20-23 vs LAC", def: "8 tackles, 1 TFL", tackles: 8, sacks: 0, snaps: 1, espnId: "3915189", event: "401873065" },
    sadiq: { result: "L 12-31 vs BUF", recLine: "2 tgt, 1 rec, 3 yds, 0 TD", snaps: 1, ppr: 1.3, espnId: "5083315", event: "401873054" },
    stafford: { result: "W 34-6 at ARI", pass: "18/26, 249 yds, 3 TD, 1 INT", rush: "2 att, -2 yds", snaps: 1, ppr: 19.8, espnId: "12483", event: "401873061" },
    stroud: { result: "L 24-27 at CLE", pass: "20/38, 211 yds, 3 TD, 1 INT", rush: "3 att, 20 yds", snaps: 1, ppr: 20.4, espnId: "4432577", event: "401873056" },
    thibodeaux: { result: "L 21-24 vs WSH", def: "8 tackles", tackles: 8, sacks: 0, snaps: 1, espnId: "4426326", event: "401873052" },
    warren: { result: "W 24-22 vs MIA", rush: "1 att, 3 yds", recLine: "3 tgt, 2 rec, 1 yds, 0 TD", snaps: 1, ppr: 2.4, espnId: "4431459", event: "401873059" },
    young: { result: "W 20-17 at NO", pass: "17/30, 200 yds, 0 TD, 0 INT", rush: "1 att, 1 yds", snaps: 1, ppr: 8.1, espnId: "4685720", event: "401873055" }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = w10[p.id];
      if (!box && /juwan johnson/i.test(p.name || "")) box = w10.juwan;
      if (!box && /kenyon sadiq/i.test(p.name || "")) box = w10.sadiq;
      if (!box && /smith-njigba/i.test(p.name || "")) box = w10.jsn;
      if (!box && /evan williams/i.test(p.name || "")) box = w10.evanwilliams;
      if (!box && /^james cook/i.test(p.name || "")) box = w10.jcook;
      if (box) {
        p.weeks[10] = box;
      } else if (!p.weeks[10]) {
        p.weeks[10] = { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 10) === 10) {
        p.week1 = p.weeks[10];
        if (p.fantasy && typeof p.weeks[10].ppr === "number") p.fantasy.week1PPR = p.weeks[10].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 10;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
