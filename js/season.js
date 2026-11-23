/* The Alums — season-long cup tracking.
   Computed live from the stamped week sheets (p.weeks[N] set by js/week1.js..js/weekN.js), so it
   updates whenever a week file is re-stamped. Cup logic is the same as js/rivalry.js:
   per school, the best QB + best RB + best WR + best TE by that week's PPR (skill positions only,
   CFL excluded, a missing or "-" PPR counts as 0), total rounded to 0.1.

   Weeks won: the school with the highest cup total that week wins it.
   Ties: every school tied for the top total (compared at 0.1) is credited with a shared win.
   Shared wins count in weeksWon and are also listed separately in sharedWins. A week where every
   school scores 0 is not awarded.
   Provisional weeks: FLOCK.weekStatus[N].provisional (set by a week file while games are still
   unstamped, e.g. Week 10 until Chargers at Ravens is stamped). Provisional weeks are included in
   totals and weeks won but flagged, and any total that includes one is flagged provisional. */
(function () {
  window.FLOCK = window.FLOCK || {};
  var SKILL = ["QB", "RB", "WR", "TE"];
  var BRAND = { oregon: "ProDucks", alabama: "ProTide", ohiostate: "ProBucks", georgia: "ProDawgs", pennstate: "ProLions" };
  function weeks() { return FLOCK.seasonWeeks || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; }
  function r1(n) { return Math.round(n * 10) / 10; }
  function pprFor(p, w) {
    var box = (p && p.weeks && p.weeks[w]) || {};
    var n = Number(box.ppr);
    return isNaN(n) ? 0 : n;
  }
  function skillPool() {
    return (FLOCK.players || []).filter(function (p) {
      return (p.league || "NFL") !== "CFL" && SKILL.indexOf(p.pos) >= 0;
    });
  }
  function cupFor(sid, w) {
    var pool = skillPool().filter(function (p) { return (p.school || "oregon") === sid; });
    var slots = {};
    SKILL.forEach(function (pos) {
      var best = pool.filter(function (p) { return p.pos === pos; })
        .sort(function (a, b) { return pprFor(b, w) - pprFor(a, w); })[0];
      var box = best && best.weeks && best.weeks[w];
      var real = !!(box && typeof box.ppr === "number");
      slots[pos] = best && real ? { id: best.id, name: best.name, ppr: pprFor(best, w) } : null;
    });
    var total = r1(SKILL.reduce(function (s, pos) { return s + (slots[pos] ? slots[pos].ppr : 0); }, 0));
    return { total: total, slots: slots };
  }
  FLOCK.computeSeason = function () {
    var status = FLOCK.weekStatus || {};
    var schools = (FLOCK.schools || []).map(function (s) { return s.id; });
    var out = { weeks: [], schools: {}, rule: "highest cup total wins the week; ties = shared win for each tied school; all-zero weeks not awarded" };
    schools.forEach(function (sid) {
      out.schools[sid] = { id: sid, brand: BRAND[sid] || sid, total: 0, weeksWon: 0, outrightWins: 0, sharedWins: [], wonWeeks: [], byWeek: {}, provisional: false };
    });
    weeks().forEach(function (w) {
      var prov = !!(status[w] && status[w].provisional);
      var row = { week: w, provisional: prov, scores: {}, winners: [], top: 0 };
      schools.forEach(function (sid) {
        var c = cupFor(sid, w);
        out.schools[sid].byWeek[w] = { total: c.total, slots: c.slots, provisional: prov };
        out.schools[sid].total = r1(out.schools[sid].total + c.total);
        if (prov) out.schools[sid].provisional = true;
        row.scores[sid] = c.total;
      });
      var top = Math.max.apply(null, schools.map(function (sid) { return row.scores[sid]; }));
      row.top = top;
      if (top > 0) {
        row.winners = schools.filter(function (sid) { return row.scores[sid] === top; });
        row.winners.forEach(function (sid) {
          var s = out.schools[sid];
          s.weeksWon += 1;
          s.wonWeeks.push(w);
          if (row.winners.length > 1) s.sharedWins.push(w); else s.outrightWins += 1;
        });
      }
      out.weeks.push(row);
    });
    FLOCK.season = out;
    return out;
  };
  function el(id) { return document.getElementById(id); }
  function star(p) { return p ? " *" : ""; }
  function spark(sid, S) {
    var vals = weeks().map(function (w) { return S.schools[sid].byWeek[w].total; });
    var max = Math.max.apply(null, S.weeks.map(function (r) { return r.top; }).concat([1]));
    var W = 120, H = 28, step = vals.length > 1 ? W / (vals.length - 1) : W;
    var pts = vals.map(function (v, i) { return (i * step).toFixed(1) + "," + (H - (v / max) * (H - 2) - 1).toFixed(1); }).join(" ");
    return '<svg class="spark" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + " " + H + '" aria-label="' + S.schools[sid].brand + ' weekly cup scores"><polyline fill="none" stroke="currentColor" stroke-width="1.5" points="' + pts + '"/></svg>';
  }
  FLOCK.renderSeason = function () {
    if (!el("season-points") && !el("season-wins") && !el("season-weekly")) return;
    var S = FLOCK.computeSeason();
    var ids = Object.keys(S.schools);
    var name = function (sid) {
      var s = (FLOCK.schools || []).find(function (x) { return x.id === sid; });
      return s ? s.name : sid;
    };
    var byPts = ids.slice().sort(function (a, b) { return S.schools[b].total - S.schools[a].total; });
    var byWins = ids.slice().sort(function (a, b) {
      return (S.schools[b].weeksWon - S.schools[a].weeksWon) || (S.schools[b].outrightWins - S.schools[a].outrightWins) || (S.schools[b].total - S.schools[a].total);
    });
    if (el("season-points")) el("season-points").innerHTML = byPts.map(function (sid, i) {
      var s = S.schools[sid];
      return "<tr><td>" + (i + 1) + "</td><td>" + s.brand + "</td><td>" + name(sid) + "</td><td>" + s.total.toFixed(1) + star(s.provisional) + "</td></tr>";
    }).join("");
    if (el("season-wins")) el("season-wins").innerHTML = byWins.map(function (sid, i) {
      var s = S.schools[sid];
      var weeksTxt = s.wonWeeks.map(function (w) {
        return "W" + w + (s.sharedWins.indexOf(w) >= 0 ? " (tie)" : "") + ((FLOCK.weekStatus || {})[w] && FLOCK.weekStatus[w].provisional ? " *" : "");
      }).join(", ") || "-";
      return "<tr><td>" + (i + 1) + "</td><td>" + s.brand + "</td><td>" + name(sid) + "</td><td>" + s.weeksWon + "</td><td>" + weeksTxt + "</td></tr>";
    }).join("");
    if (el("season-weekly")) {
      var head = "<tr><th>School</th>" + S.weeks.map(function (r) { return "<th>W" + r.week + star(r.provisional) + "</th>"; }).join("") + "<th>Total</th><th>Trend</th></tr>";
      var body = byPts.map(function (sid) {
        var s = S.schools[sid];
        return "<tr><td>" + s.brand + "</td>" + S.weeks.map(function (r) {
          var won = r.winners.indexOf(sid) >= 0;
          return "<td" + (won ? ' class="season-win" title="Won Week ' + r.week + (r.winners.length > 1 ? " (shared)" : "") + '"' : "") + ">" + s.byWeek[r.week].total.toFixed(1) + "</td>";
        }).join("") + "<td>" + s.total.toFixed(1) + star(s.provisional) + "</td><td>" + spark(sid, S) + "</td></tr>";
      }).join("");
      el("season-weekly").innerHTML = "<thead>" + head + "</thead><tbody>" + body + "</tbody>";
    }
    var notes = S.weeks.filter(function (r) { return r.provisional; }).map(function (r) {
      var st = FLOCK.weekStatus[r.week];
      return "Week " + r.week + " is provisional" + (st && st.note ? ": " + st.note : "") + ".";
    });
    if (el("season-note")) el("season-note").textContent = (notes.length ? "* " + notes.join(" ") + " " : "") +
      "Weeks won: highest cup total that week; a tie gives each tied school a shared win.";
  };
  document.addEventListener("flock:week", function () { if (FLOCK.viewMode === "season") FLOCK.renderSeason(); });
})();
