/* Week 7 (2026 regular season) stamps.
   Source: ESPN boxes, pulled 2026-11-16 by The Alums Auditor.
   Scoreboard: https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=7&dates=2026
   Boxes: https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=<event> (event id on each row)
   Every number below is copied from those boxes. PPR = pass yds/25 + pass TD*4 - INT*2
   + rush yds/10 + rush TD*6 + rec + rec yds/10 + rec TD*6 (same as worker/boxbot.js).
*/
(function () {
  window.FLOCK = window.FLOCK || {};
  FLOCK.viewWeek = 7;
  if (FLOCK.meta) {
    FLOCK.meta.week = 7;
    FLOCK.meta.lastUpdated = "October 26, 2026";
  }
  var w7 = {
    acarter: { result: "W 27-21 at HOU", def: "4 tackles", tackles: 4, sacks: 0, snaps: 1, espnId: "4725996", event: "401873016" },
    barkley: { result: "L 21-38 vs DAL", rush: "7 att, 62 yds, 1 TD", recLine: "2 tgt, 2 rec, 9 yds, 0 TD", snaps: 1, ppr: 15.1, espnId: "3929630", event: "401873009" },
    bassa: { result: "L 3-20 at SEA", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "4602389", event: "401873022" },
    benson: { result: "L 21-35 vs LAR", recLine: "1 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 0.0, espnId: "5150247", event: "401873021" },
    bowers: { result: "L 21-35 vs LAR", recLine: "8 tgt, 6 rec, 73 yds, 0 TD", snaps: 1, ppr: 13.3, espnId: "4432665", event: "401873021" },
    buckner: { result: "L 10-16 at MIN", def: "5 tackles", tackles: 5, sacks: 0, snaps: 1, espnId: "2971282", event: "401873014" },
    burch: { result: "L 16-30 vs DEN", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "4428996", event: "401873019" },
    dorlus: { result: "W 29-20 vs SF", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4427090", event: "401873017" },
    evanwilliams: { result: "L 17-20 at DET", def: "9 tackles, 1 PD", tackles: 9, sacks: 0, snaps: 1, espnId: "4428863", event: "401873020" },
    franklin: { result: "W 30-16 at ARI", recLine: "2 tgt, 0 rec, 0 yds, 0 TD", snaps: 1, ppr: 0.0, espnId: "4431280", event: "401873019" },
    freiermuth: { result: "W 16-10 at NO", recLine: "4 tgt, 2 rec, 20 yds, 0 TD", snaps: 1, ppr: 4.0, espnId: "4361411", event: "401873011" },
    gibbs: { result: "W 20-17 vs GB", rush: "29 att, 116 yds", recLine: "6 tgt, 5 rec, 27 yds, 0 TD", snaps: 1, ppr: 19.3, espnId: "4429795", event: "401873020" },
    gonzalez: { result: "L 24-30 at CHI", def: "4 tackles", tackles: 4, sacks: 0, snaps: 1, espnId: "4686772", event: "401873010" },
    gwilson: { result: "L 25-28 vs MIA", recLine: "3 tgt, 2 rec, 26 yds, 0 TD", snaps: 1, ppr: 4.6, espnId: "4569618", event: "401873015" },
    henderson: { result: "L 24-30 at CHI", rush: "3 att, 9 yds", recLine: "2 tgt, 2 rec, 14 yds, 0 TD", snaps: 1, ppr: 4.3, espnId: "4432710", event: "401873010" },
    henry: { result: "L 13-35 vs CIN", rush: "17 att, 45 yds", recLine: "2 tgt, 1 rec, 4 yds, 0 TD", snaps: 1, ppr: 5.9, espnId: "3043078", event: "401873012" },
    irving: { result: "W 43-13 at CAR", rush: "24 att, 106 yds, 2 TD", recLine: "2 tgt, 1 rec, 4 yds, 0 TD", snaps: 1, ppr: 24.0, espnId: "4596448", event: "401873018" },
    james: { result: "L 20-29 at ATL", rush: "1 att, 6 yds", recLine: "1 tgt, 1 rec, 11 yds, 0 TD", snaps: 1, ppr: 2.7, espnId: "4685397", event: "401873017" },
    jbrisker: { result: "W 16-10 at NO", def: "3 tackles", tackles: 3, sacks: 0, snaps: 1, espnId: "4570044", event: "401873011" },
    jsn: { result: "W 20-3 vs KC", rush: "2 att, 13 yds", recLine: "12 tgt, 9 rec, 150 yds, 1 TD", snaps: 1, ppr: 31.3, espnId: "4430878", event: "401873022" },
    judkins: { result: "W 27-24 at TEN", rush: "17 att, 96 yds, 2 TD", recLine: "1 tgt, 1 rec, 8 yds, 0 TD", snaps: 1, ppr: 23.4, espnId: "4685702", event: "401873013" },
    juwan: { result: "L 10-16 vs PIT", recLine: "3 tgt, 1 rec, 7 yds, 0 TD", snaps: 1, ppr: 1.7, espnId: "3929645", event: "401873011" },
    jwilliams: { result: "W 20-17 vs GB", recLine: "9 tgt, 5 rec, 91 yds, 2 TD", snaps: 1, ppr: 26.1, espnId: "4426388", event: "401873020" },
    lenoir: { result: "L 20-29 at ATL", def: "6 tackles", tackles: 6, sacks: 0, snaps: 1, espnId: "4242488", event: "401873017" },
    nix: { result: "W 30-16 at ARI", pass: "15/29, 222 yds, 1 TD, 0 INT", rush: "7 att, 73 yds, 1 TD", snaps: 1, ppr: 26.2, espnId: "4426338", event: "401873019" },
    noahsewell: { result: "W 30-24 vs NE", def: "2 tackles", tackles: 2, sacks: 0, snaps: 1, espnId: "4430822", event: "401873010" },
    olave: { result: "L 10-16 vs PIT", recLine: "10 tgt, 6 rec, 56 yds, 0 TD", snaps: 1, ppr: 11.6, espnId: "4361370", event: "401873011" },
    pickens: { result: "W 38-21 at PHI", recLine: "6 tgt, 4 rec, 57 yds, 1 TD", snaps: 1, ppr: 15.7, espnId: "4426354", event: "401873009" },
    riley: { result: "L 17-20 at DET", def: "1 tackle", tackles: 1, sacks: 0, snaps: 1, espnId: "4240677", event: "401873020" },
    roquan: { result: "L 13-35 vs CIN", def: "8 tackles", tackles: 8, sacks: 0, snaps: 1, espnId: "3915189", event: "401873012" },
    sadiq: { result: "L 25-28 vs MIA", recLine: "1 tgt, 1 rec, 6 yds, 0 TD", snaps: 1, ppr: 1.6, espnId: "5083315", event: "401873015" },
    stafford: { result: "W 35-21 at LV", pass: "23/29, 195 yds, 3 TD, 1 INT", rush: "3 att, -3 yds", snaps: 1, ppr: 17.5, espnId: "12483", event: "401873021" },
    stroud: { result: "L 21-27 vs NYG", pass: "17/28, 153 yds, 2 TD, 0 INT", rush: "2 att, 4 yds", snaps: 1, ppr: 14.5, espnId: "4432577", event: "401873016" },
    swift: { result: "W 30-24 vs NE", rush: "22 att, 78 yds, 1 TD", recLine: "4 tgt, 4 rec, 12 yds, 0 TD", snaps: 1, ppr: 19.0, espnId: "4259545", event: "401873010" },
    tez: { result: "W 43-13 at CAR", rush: "1 att, 14 yds", recLine: "2 tgt, 2 rec, 33 yds, 1 TD", snaps: 1, ppr: 12.7, espnId: "4608810", event: "401873018" },
    thibodeaux: { result: "W 27-21 at HOU", def: "4 tackles", tackles: 4, sacks: 0, snaps: 1, espnId: "4426326", event: "401873016" },
    thieneman: { result: "W 30-24 vs NE", def: "8 tackles, 0.5 sack", tackles: 8, sacks: 0.5, snaps: 1, espnId: "4954445", event: "401873010" },
    waddle: { result: "W 30-16 at ARI", recLine: "7 tgt, 4 rec, 48 yds, 0 TD", snaps: 1, ppr: 8.8, espnId: "4372016", event: "401873019" },
    young: { result: "L 13-43 vs TB", pass: "14/27, 163 yds, 1 TD, 2 INT", rush: "1 att, 9 yds", snaps: 1, ppr: 7.4, espnId: "4685720", event: "401873018" },
    zbranch: { result: "W 29-20 vs SF", rush: "1 att, 8 yds", recLine: "2 tgt, 1 rec, 9 yds, 0 TD", snaps: 1, ppr: 2.7, espnId: "4870612", event: "401873017" }
  };
  function apply() {
    if (!FLOCK.players) return;
    FLOCK.players.forEach(function (p) {
      p.weeks = p.weeks || {};
      var box = w7[p.id];
      if (!box && /juwan johnson/i.test(p.name || "")) box = w7.juwan;
      if (!box && /kenyon sadiq/i.test(p.name || "")) box = w7.sadiq;
      if (!box && /smith-njigba/i.test(p.name || "")) box = w7.jsn;
      if (!box && /evan williams/i.test(p.name || "")) box = w7.evanwilliams;
      if (!box && /^james cook/i.test(p.name || "")) box = w7.jcook;
      if (box) {
        p.weeks[7] = box;
      } else if (!p.weeks[7]) {
        p.weeks[7] = { result: "-", snaps: 0, ppr: "-" };
      }
      if ((FLOCK.viewWeek || 7) === 7) {
        p.week1 = p.weeks[7];
        if (p.fantasy && typeof p.weeks[7].ppr === "number") p.fantasy.week1PPR = p.weeks[7].ppr;
      }
    });
  }
  apply();
  var prev = FLOCK.setViewWeek;
  FLOCK.setViewWeek = function (n) {
    if (prev) prev(n);
    else {
      FLOCK.viewWeek = Number(n) || 7;
      if (FLOCK.stampWeeks) FLOCK.stampWeeks();
    }
    apply();
    document.dispatchEvent(new CustomEvent("flock:week"));
  };
})();
