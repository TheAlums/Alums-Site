/* Week 1 (2026 regular season) stamps.
   Source: ESPN boxes, pulled 2026-11-16 by The Alums Auditor.
   Scoreboard: https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=1&dates=2026
   Boxes: https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=<event> (event id on each row)
   Every number below is copied from those boxes. Replaces the hand seed on p.week1 in data.js/alumni.js, which did not match the ESPN Week 1 boxes. PPR = pass yds/25 + pass TD*4 - INT*2
   + rush yds/10 + rush TD*6 + rec + rec yds/10 + rec TD*6 (same as worker/boxbot.js).
*/
(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 1;
  if (FLOCK.meta) {
    FLOCK.meta.week = 1;
    FLOCK.meta.lastUpdated = "September 14, 2026";
  }
  var w1 = {
    acarter: { result: "W 28-20 vs DAL", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4725996", event: "401872930" },
    armstead: { result: "W 34-10 vs CLE", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "2971275", event: "401872922" },
    barkley: { result: "W 24-22 vs WSH", rush: "15 att, 83 yds", recLine: "2 tgt, 1 rec, -3 yds, 0 TD", snaps: 1, ppr: 9.0, espnId: "3929630", event: "401872929" },
    bassa: { result: "W 31-10 vs DEN", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "4602389", event: "401872931" },
    benson: { result: "W 27-13 vs MIA", rush: "1 att, -8 yds", recLine: "2 tgt, 1 rec, 6 yds, 0 TD", snaps: 1, ppr: 0.8, espnId: "5150247", event: "401872928" },
    boettcher: { result: "L 23-41 vs BAL", def: "7 tackles", tackles: 7, sacks: 0, snaps: 1, espnId: "5088571", event: "401872659" },
    buckner: { result: "L 23-41 vs BAL", def: "2 tackles, 0.5 sack", tackles: 2, sacks: 0.5, snaps: 1, espnId: "2971282", event: "401872659" },
    burch: { result: "W 26-14 at LAC", def: "3 tackles, 1 sack, 1 TFL", tackles: 3, sacks: 1, snaps: 1, espnId: "4428996", event: "401872926" },
    caldwell: { result: "L 14-26 vs ARI", def: "5 tackles", tackles: 5, sacks: 0, snaps: 1, espnId: "5089178", event: "401872926" },
    dorlus: { result: "L 13-20 at PIT", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4427090", event: "401872658" },
    dsmith: { result: "W 24-22 vs WSH", recLine: "6 tgt, 3 rec, 53 yds, 0 TD", snaps: 1, ppr: 8.3, espnId: "4241478", event: "401872929" },
    dye: { result: "L 14-26 vs ARI", def: "5 tackles, 0.5 sack", tackles: 5, sacks: 0.5, snaps: 1, espnId: "4038946", event: "401872926" },
    egbuka: { result: "L 27-33 at CIN", recLine: "6 tgt, 5 rec, 63 yds, 0 TD", snaps: 1, ppr: 11.3, espnId: "4567750", event: "401872925" },
    evanwilliams: { result: "L 22-39 at MIN", def: "7 tackles", tackles: 7, sacks: 0, snaps: 1, espnId: "4428863", event: "401872927" },
    ferguson: { result: "L 7-27 vs SF", recLine: "1 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 0.0, espnId: "4570037", event: "401872657" },
    franklin: { result: "L 10-31 at KC", rush: "1 att, 5 yds", recLine: "1 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 0.5, espnId: "4431280", event: "401872931" },
    freiermuth: { result: "W 20-13 vs ATL", recLine: "5 tgt, 5 rec, 46 yds, 1 TD", snaps: 1, ppr: 15.6, espnId: "4361411", event: "401872658" },
    gibbs: { result: "W 31-30 vs NO", rush: "29 att, 156 yds, 2 TD", recLine: "5 tgt, 5 rec, 30 yds, 0 TD", snaps: 1, ppr: 35.6, espnId: "4429795", event: "401872923" },
    gonzalez: { result: "L 10-13 at SEA", def: "2 tackles, 2 PD", tackles: 2, sacks: 0, snaps: 1, espnId: "4686772", event: "401872656" },
    gwilson: { result: "W 23-10 at TEN", recLine: "7 tgt, 6 rec, 79 yds, 0 TD", snaps: 1, ppr: 13.9, espnId: "4569618", event: "401872924" },
    harmon: { result: "W 20-13 vs ATL", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4682980", event: "401872658" },
    henry: { result: "W 41-23 at IND", rush: "24 att, 144 yds, 3 TD", recLine: "1 tgt, 1 rec, 19 yds, 0 TD", snaps: 1, ppr: 35.3, espnId: "3043078", event: "401872659" },
    herbert: { result: "L 14-26 vs ARI", pass: "17/27, 209 yds, 1 TD, 1 INT", rush: "5 att, 29 yds", snaps: 1, ppr: 13.3, espnId: "4038941", event: "401872926" },
    holland: { result: "W 28-20 vs DAL", def: "2 tackles, 1 INT, 1 PD", tackles: 2, sacks: 0, snaps: 1, espnId: "4373809", event: "401872930" },
    hurts: { result: "W 24-22 vs WSH", pass: "14/25, 203 yds, 3 TD, 0 INT", rush: "7 att, 46 yds", snaps: 1, ppr: 24.7, espnId: "4040715", event: "401872929" },
    irving: { result: "L 27-33 at CIN", rush: "8 att, 45 yds, 1 TD", recLine: "7 tgt, 7 rec, 48 yds, 0 TD", snaps: 1, ppr: 22.3, espnId: "4596448", event: "401872925" },
    jbrisker: { result: "W 20-13 vs ATL", def: "6 tackles, 1 INT, 1 PD", tackles: 6, sacks: 0, snaps: 1, espnId: "4570044", event: "401872658" },
    jcook: { result: "W 36-31 at HOU", rush: "13 att, 57 yds", recLine: "4 tgt, 3 rec, 12 yds, 0 TD", snaps: 1, ppr: 9.9, espnId: "4379399", event: "401872660" },
    jpj: { result: "W 27-13 vs MIA", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "4875295", event: "401872928" },
    jsn: { result: "W 13-10 vs NE", recLine: "11 tgt, 8 rec, 122 yds, 1 TD", snaps: 1, ppr: 26.2, espnId: "4430878", event: "401872656" },
    judkins: { result: "L 10-34 at JAX", rush: "12 att, 33 yds", recLine: "2 tgt, 2 rec, 17 yds, 0 TD", snaps: 1, ppr: 7.0, espnId: "4685702", event: "401872922" },
    juwan: { result: "L 30-31 at DET", recLine: "7 tgt, 3 rec, 54 yds, 1 TD", snaps: 1, ppr: 14.4, espnId: "3929645", event: "401872923" },
    jwilliams: { result: "W 31-30 vs NO", recLine: "9 tgt, 4 rec, 45 yds, 0 TD", snaps: 1, ppr: 8.5, espnId: "4426388", event: "401872923" },
    kallen: { result: "L 22-24 at PHI", rush: "4 att, 16 yds", snaps: 1, ppr: 1.6, espnId: "4685246", event: "401872929" },
    lenoir: { result: "W 27-7 at LAR", def: "6 tackles", tackles: 6, sacks: 0, snaps: 1, espnId: "4242488", event: "401872657" },
    mcconkey: { result: "L 14-26 vs ARI", recLine: "7 tgt, 5 rec, 82 yds, 1 TD", snaps: 1, ppr: 19.2, espnId: "4612826", event: "401872926" },
    mclaurin: { result: "L 22-24 at PHI", recLine: "4 tgt, 2 rec, 14 yds, 0 TD", snaps: 1, ppr: 3.4, espnId: "3121422", event: "401872929" },
    nix: { result: "L 10-31 at KC", pass: "17/28, 131 yds, 1 TD, 1 INT", rush: "3 att, 2 yds", snaps: 1, ppr: 7.4, espnId: "4426338", event: "401872931" },
    olave: { result: "L 30-31 at DET", recLine: "13 tgt, 10 rec, 182 yds, 0 TD", snaps: 1, ppr: 28.2, espnId: "4361370", event: "401872923" },
    pickens: { result: "L 20-28 at NYG", recLine: "6 tgt, 3 rec, 28 yds, 0 TD", snaps: 1, ppr: 5.8, espnId: "4426354", event: "401872930" },
    roquan: { result: "W 41-23 at IND", def: "11 tackles, 1 INT, 2 PD", tackles: 11, sacks: 0, snaps: 1, espnId: "3915189", event: "401872659" },
    sadiq: { result: "W 23-10 at TEN", rush: "1 att, 3 yds, 1 TD", recLine: "3 tgt, 3 rec, 21 yds, 0 TD", snaps: 1, ppr: 11.4, espnId: "5083315", event: "401872924" },
    stafford: { result: "L 7-27 vs SF", pass: "15/25, 155 yds, 0 TD, 1 INT", rush: "2 att, -1 yds", snaps: 1, ppr: 4.1, espnId: "12483", event: "401872657" },
    stroud: { result: "L 31-36 vs BUF", pass: "26/38, 274 yds, 2 TD, 0 INT", rush: "2 att, 15 yds", snaps: 1, ppr: 20.5, espnId: "4432577", event: "401872660" },
    swift: { result: "W 59-37 at CAR", rush: "18 att, 124 yds, 3 TD", recLine: "1 tgt, 1 rec, 10 yds, 0 TD", snaps: 1, ppr: 32.4, espnId: "4259545", event: "401872661" },
    tez: { result: "L 27-33 at CIN", rush: "1 att, -4 yds", recLine: "1 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: -0.4, espnId: "4608810", event: "401872925" },
    thibodeaux: { result: "W 28-20 vs DAL", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4426326", event: "401872930" },
    thieneman: { result: "W 59-37 at CAR", def: "10 tackles, 1 PD", tackles: 10, sacks: 0, snaps: 1, espnId: "4954445", event: "401872661" },
    waddle: { result: "L 10-31 at KC", recLine: "3 tgt, 1 rec, 2 yds, 0 TD", snaps: 1, ppr: 1.2, espnId: "4372016", event: "401872931" },
    warren: { result: "L 23-41 vs BAL", recLine: "5 tgt, 3 rec, 13 yds, 1 TD", snaps: 1, ppr: 10.3, espnId: "4431459", event: "401872659" },
    williams: { result: "L 22-39 at MIN", def: "7 tackles", tackles: 7, sacks: 0, snaps: 1, espnId: "4428863", event: "401872927" },
    young: { result: "L 37-59 vs CHI", pass: "23/37, 361 yds, 3 TD, 1 INT", rush: "2 att, 10 yds, 1 TD", snaps: 1, ppr: 31.4, espnId: "4685720", event: "401872661" },
    zbranch: { result: "L 13-20 at PIT", ret: "1 KR, 30 yds; 3 PR, 33 yds", snaps: 1, ppr: 0.0, espnId: "4870612", event: "401872658" }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = w1[p.id];
      if (!box && /juwan johnson/i.test(p.name || "")) box = w1.juwan;
      if (!box && /kenyon sadiq/i.test(p.name || "")) box = w1.sadiq;
      if (!box && /smith-njigba/i.test(p.name || "")) box = w1.jsn;
      if (!box && /evan williams/i.test(p.name || "")) box = w1.evanwilliams || w1.williams;
      if (!box && /^james cook/i.test(p.name || "")) box = w1.jcook;
      if (box) {
        p.weeks[1] = box; /* overrides the launch seed on p.week1 (data.js / alumni.js) */
      } else if (!p.weeks[1]) {
        p.weeks[1] = { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 1) === 1) {
        p.week1 = p.weeks[1];
        if (p.fantasy && typeof p.weeks[1].ppr === "number") p.fantasy.week1PPR = p.weeks[1].ppr;
      }
    });
  }
  apply();
  /* alumni.js adds players after the week files; stamp them too before the board draws */
  window.addEventListener("load", apply);
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 1;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
