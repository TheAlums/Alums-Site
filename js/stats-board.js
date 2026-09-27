(function () {
  const IDP = ["DL","DE","DT","EDGE","LB","OLB","ILB","DB","CB","S"];
  const OL = ["OT","OL","G","C","OG","OC"];
  let selectedWeek = (window.FLOCK && FLOCK.meta && FLOCK.meta.week) || 2;
  function $(sel) { return document.querySelector(sel); }
  function players() {
    const sid = (window.FLOCK && FLOCK.meta && FLOCK.meta.schoolId) || "oregon";
    return FLOCK.players.filter(function (p) { return (p.school || "oregon") === sid; });
  }
  function box(p) {
    if (p.weeks && p.weeks[selectedWeek]) return p.weeks[selectedWeek];
    return p.week1 || {};
  }
  function snapped(p) {
    const w = box(p);
    if (w.snaps != null) return Number(w.snaps) > 0;
    return window.FLOCK && FLOCK.hasSnap ? FLOCK.hasSnap(p) : true;
  }
  function teamScore(p) {
    const w = box(p);
    if (w.teamScore) return w.teamScore;
    const m = String(w.result || "").match(/[WL]\s+\d+[-\u2013]\d+/);
    return m ? m[0] : "-";
  }
  function isDefPos(pos) { return IDP.indexOf(pos) >= 0; }
  function pprCell(p) {
    const w = box(p);
    if (isDefPos(p.pos)) return teamScore(p) + "*";
    if (w.ppr != null && w.ppr !== "") return w.ppr;
    return "-";
  }
  function projCell(p) {
    if (isDefPos(p.pos) || OL.indexOf(p.pos) >= 0) return "-";
    const f = p.fantasy || {};
    if (f.proj != null && f.proj !== "") return f.proj;
    return "-";
  }
  function statLine(p) {
    const w = box(p);
    if (!snapped(p)) return "-";
    if (OL.indexOf(p.pos) >= 0) return w.olLine || "-";
    if (p.pos === "QB") return (w.pass && w.pass !== "-") ? w.pass : "-";
    if (p.pos === "RB") {
      const rush = (w.rush && w.rush !== "-") ? w.rush : "";
      const rec = (w.recLine && w.recLine !== "-") ? w.recLine : "";
      return [rush, rec].filter(Boolean).join(" | ") || "-";
    }
    if (p.pos === "WR" || p.pos === "TE") return (w.recLine && w.recLine !== "-") ? w.recLine : "-";
    if (p.pos === "K") return (w.kick && w.kick !== "-") ? w.kick : "-";
    if (isDefPos(p.pos)) {
      const def = (w.def && w.def !== "-") ? w.def : "";
      const st = w.st ? "ST " + w.st : "";
      return [def, st].filter(Boolean).join(" | ") || "-";
    }
    return "-";
  }
  function parseBox(p) {
    const w = box(p);
    const pass = String(w.pass || "");
    const cmpm = pass.match(/(\d+)\s*\/\s*(\d+)/);
    const yds = pass.match(/(\d+)\s*yds/i);
    const td = pass.match(/(\d+)\s*TD/i);
    const ints = pass.match(/(\d+)\s*INT/i);
    const rush = String(w.rush || "");
    const ratt = rush.match(/(\d+)\s*att/i);
    const ryds = rush.match(/(\d+)\s*yds/i);
    const rtd = rush.match(/(\d+)\s*TD/i);
    const recLine = String(w.recLine || "");
    const recm = recLine.match(/(\d+)\s*rec/i);
    const passer = p.pos === "QB";
    return {
      cmp: passer && cmpm ? cmpm[1] : "-",
      att: passer && cmpm ? cmpm[2] : "-",
      pyds: passer ? (yds ? yds[1] : "-") : "-",
      ptd: passer ? (td ? td[1] : "-") : "-",
      pint: passer ? (ints ? ints[1] : "-") : "-",
      ratt: ratt ? ratt[1] : "-",
      ryds: ryds ? ryds[1] : "-",
      rtd: rtd ? rtd[1] : (w.rushTD != null ? w.rushTD : "-"),
      rec: recm ? recm[1] : (w.rec != null ? w.rec : "-"),
      recy: w.recYds != null ? w.recYds : "-",
      rectd: w.recTD != null ? w.recTD : "-"
    };
  }
  function dash(v) { return v === "-" || v == null || v === "" ? "-" : v; }
  function pct(a, b) {
    const x = Number(a), y = Number(b);
    if (!y || isNaN(x) || isNaN(y)) return "-";
    return ((x / y) * 100).toFixed(1);
  }
  function avg(yds, att) {
    const x = Number(yds), y = Number(att);
    if (!y || isNaN(x) || isNaN(y)) return "-";
    return (x / y).toFixed(1);
  }
  function pos() {
    const b = document.querySelector("#pos-filters .filter.active");
    return (b && b.dataset.pos) || "all";
  }
  function posMatch(p, filter) {
    if (filter === "all") return true;
    if (filter === "DEF") return IDP.indexOf(p.pos) >= 0;
    if (filter === "ST") return p.pos === "K" || box(p).st || box(p).prAtt;
    if (filter === "CFL") return (p.league || "NFL") === "CFL";
    return p.pos === filter;
  }
  function nameCell(p) {
    return "<td><a href=\"player.html?id=" + p.id + "\">" + p.name + "</a></td><td>" + p.pos + "</td><td>" + p.team + "</td>";
  }
  function table(title, heads, rowsHtml) {
    if (!rowsHtml) return "";
    return "<div class=\"stat-block\"><h3>" + title + "</h3><div class=\"table-wrap\"><table class=\"box-grid\"><thead><tr>" +
      heads.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
      "</tr></thead><tbody>" + rowsHtml + "</tbody></table></div></div>";
  }
  function pprVal(p) {
    const n = Number(box(p).ppr);
    return isNaN(n) ? 0 : n;
  }
  function draw() {
    const root = $("#stats-boards");
    if (!root || !window.FLOCK) return;
    const filter = pos();
    const list = players().filter(function (p) { return posMatch(p, filter); });
    const nfl = list.filter(function (p) { return (p.league || "NFL") !== "CFL" && snapped(p); });
    const next = selectedWeek + 1;
    let html = "";
    const weekRows = nfl.slice().sort(function (a, b) {
      const av = isDefPos(a.pos) ? 0 : pprVal(a);
      const bv = isDefPos(b.pos) ? 0 : pprVal(b);
      return bv - av;
    });
    html += table("Week " + selectedWeek + " board", ["Rank","Player","Pos","Pro team","Result","Line","PPR","Wk " + next + " proj"],
      weekRows.map(function (p, i) {
        return "<tr><td>" + (i + 1) + "</td><td><a href=\"player.html?id=" + p.id + "\">" + p.name + "</a></td><td>" + p.pos + "</td><td>" + p.team + "</td><td>" + (box(p).result || "-") + "</td><td>" + statLine(p) + "</td><td>" + pprCell(p) + "</td><td>" + projCell(p) + "</td></tr>";
      }).join(""));
    const passers = nfl.filter(function (p) { return p.pos === "QB"; });
    html += table("Passing", ["Player","Pos","Team","GP","CMP","ATT","CMP%","YDS","AVG","TD","INT","PPR","Wk " + next + " proj"],
      passers.sort(function (a,b) { return pprVal(b)-pprVal(a); }).map(function (p) {
        const b = parseBox(p);
        return "<tr>" + nameCell(p) + "<td>1</td><td>" + dash(b.cmp) + "</td><td>" + dash(b.att) + "</td><td>" + pct(b.cmp,b.att) + "</td><td>" + dash(b.pyds) + "</td><td>" + avg(b.pyds,b.att) + "</td><td>" + dash(b.ptd) + "</td><td>" + dash(b.pint) + "</td><td>" + pprCell(p) + "</td><td>" + projCell(p) + "</td></tr>";
      }).join(""));
    const rushers = nfl.filter(function (p) {
      const b = parseBox(p);
      return p.pos === "RB" || (p.pos === "QB" && b.ratt !== "-");
    });
    html += table("Rushing", ["Player","Pos","Team","GP","ATT","YDS","AVG","TD","PPR","Wk " + next + " proj"],
      rushers.sort(function (a,b) { return pprVal(b)-pprVal(a); }).map(function (p) {
        const b = parseBox(p);
        return "<tr>" + nameCell(p) + "<td>1</td><td>" + dash(b.ratt) + "</td><td>" + dash(b.ryds) + "</td><td>" + avg(b.ryds,b.ratt) + "</td><td>" + dash(b.rtd) + "</td><td>" + pprCell(p) + "</td><td>" + projCell(p) + "</td></tr>";
      }).join(""));
    const recs = nfl.filter(function (p) { return p.pos === "WR" || p.pos === "TE"; });
    html += table("Receiving", ["Player","Pos","Team","GP","TGT","REC","YDS","TD","PPR","Wk " + next + " proj"],
      recs.sort(function (a,b) { return pprVal(b)-pprVal(a); }).map(function (p) {
        const w = box(p);
        return "<tr>" + nameCell(p) + "<td>1</td><td>" + dash(w.tgt) + "</td><td>" + dash(w.rec) + "</td><td>" + dash(w.recYds) + "</td><td>" + dash(w.recTD) + "</td><td>" + pprCell(p) + "</td><td>" + projCell(p) + "</td></tr>";
      }).join(""));
    const defs = nfl.filter(function (p) { return IDP.indexOf(p.pos) >= 0; });
    html += table("Defense", ["Player","Pos","Team","Result","Line","Tackles","Sacks","PPR"],
      defs.map(function (p) {
        const w = box(p);
        return "<tr>" + nameCell(p) + "<td>" + (w.result || "-") + "</td><td>" + statLine(p) + "</td><td>" + dash(w.tackles) + "</td><td>" + dash(w.sacks) + "</td><td>" + pprCell(p) + "</td></tr>";
      }).join(""));
    const footnote = "<p class=\"footnote\">Projected PPR is next week's number (Week " + next + "). * Defense PPR uses the NFL club result, not individual IDP scoring. Blank lines mean no cited box score yet.</p>";
    root.innerHTML = (html || "<p class=\"footnote\">No snapped players for this filter.</p>") + footnote;
  }
  function boot() {
    const el = $("#pos-filters");
    if (!el) return;
    const weeks = [1, 2];
    const weekBar = document.createElement("div");
    weekBar.className = "filters week-filters";
    weekBar.id = "week-filters";
    weekBar.innerHTML = weeks.map(function (n) {
      return "<button class=\"filter" + (n === selectedWeek ? " active" : "") + "\" data-week=\"" + n + "\">Week " + n + "</button>";
    }).join("");
    el.parentNode.insertBefore(weekBar, el);
    weekBar.onclick = function (e) {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      selectedWeek = Number(btn.dataset.week);
      weekBar.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      draw();
    };
    const opts = [["all","All"],["QB","QB"],["RB","RB"],["WR","WR"],["TE","TE"],["DEF","Defense"],["ST","ST"]];
    el.innerHTML = opts.map(function (x, i) {
      return "<button class=\"filter" + (i === 0 ? " active" : "") + "\" data-pos=\"" + x[0] + "\">" + x[1] + "</button>";
    }).join("");
    el.onclick = function (e) {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      el.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      draw();
    };
    draw();
  }
  window.addEventListener("load", boot);
})();
