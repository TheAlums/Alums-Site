(function () {
  const IDP = ["DL","DE","DT","EDGE","LB","OLB","ILB","DB","CB","S"];
  const OFF = ["QB","RB","WR","TE"];
  const OL = ["OT","OL","G","C","OG","OC"];
  function $(sel) { return document.querySelector(sel); }
  function players() {
    const sid = (window.FLOCK && FLOCK.meta && FLOCK.meta.schoolId) || "oregon";
    return FLOCK.players.filter(function (p) { return (p.school || "oregon") === sid; });
  }
  function teamScore(p) {
    if (p.week1 && p.week1.teamScore) return p.week1.teamScore;
    const m = String((p.week1 && p.week1.result) || "").match(/[WL]\s+\d+[\u2013\-]\d+/);
    return m ? m[0] : "\u2014";
  }
  function isDefPos(pos) { return IDP.indexOf(pos) >= 0; }
  function statLine(p) {
    const w = p.week1 || {};
    if (OL.indexOf(p.pos) >= 0) return w.olLine || "\u2014";
    if (p.pos === "QB") return (w.pass && w.pass !== "\u2014") ? w.pass : "\u2014";
    if (p.pos === "RB") {
      const rush = (w.rush && w.rush !== "\u2014") ? w.rush : "";
      const rec = (w.recLine && w.recLine !== "\u2014") ? w.recLine : "";
      return [rush, rec].filter(Boolean).join(" \u00b7 ") || "\u2014";
    }
    if (p.pos === "WR" || p.pos === "TE") return (w.recLine && w.recLine !== "\u2014") ? w.recLine : "\u2014";
    if (p.pos === "K") return (w.kick && w.kick !== "\u2014") ? w.kick : "\u2014";
    if (isDefPos(p.pos)) {
      const def = (w.def && w.def !== "\u2014") ? w.def : "";
      const st = w.st ? "ST " + w.st : "";
      return [def, st].filter(Boolean).join(" \u00b7 ") || "\u2014";
    }
    return "\u2014";
  }
  function parseBox(p) {
    const w = p.week1 || {};
    const s = p.season || {};
    const pass = String(w.pass || "");
    const cmpm = pass.match(/(\d+)\s*\/\s*(\d+)/);
    const yds = pass.match(/(\d+)\s*yds/i);
    const td = pass.match(/(\d+)\s*TD/i);
    const ints = pass.match(/(\d+)\s*INT/i);
    const rush = String(w.rush || "");
    const rm = rush.match(/(\d+)\s*[\u2013-]\s*(\d+)/);
    const recLine = String(w.recLine || "");
    const recm = recLine.match(/(\d+)\s*rec/i);
    const passer = p.pos === "QB";
    return {
      cmp: passer && cmpm ? cmpm[1] : "\u2014",
      att: passer && cmpm ? cmpm[2] : "\u2014",
      pyds: passer ? (yds ? yds[1] : (s.passYds || "\u2014")) : "\u2014",
      ptd: passer ? (td ? td[1] : (s.passTD || "\u2014")) : "\u2014",
      pint: passer ? (ints ? ints[1] : (s.int || "\u2014")) : "\u2014",
      ratt: rm ? rm[1] : "\u2014",
      ryds: rm ? rm[2] : (s.rushYds || "\u2014"),
      rtd: s.rushTD || "\u2014",
      rec: recm ? recm[1] : (s.rec || "\u2014"),
      recy: s.recYds || "\u2014",
      rectd: s.recTD || "\u2014"
    };
  }
  function dash(v) { return v === "\u2014" || v == null || v === "" ? "\u2014" : v; }
  function pct(a, b) {
    const x = Number(a), y = Number(b);
    if (!y || isNaN(x) || isNaN(y)) return "\u2014";
    return ((x / y) * 100).toFixed(1);
  }
  function avg(yds, att) {
    const x = Number(yds), y = Number(att);
    if (!y || isNaN(x) || isNaN(y)) return "\u2014";
    return (x / y).toFixed(1);
  }
  function pos() {
    const b = document.querySelector("#pos-filters .filter.active");
    return (b && b.dataset.pos) || "all";
  }
  function posMatch(p, filter) {
    if (filter === "all") return true;
    if (filter === "DEF") return IDP.indexOf(p.pos) >= 0;
    if (filter === "ST") return p.pos === "K" || p.week1 && (p.week1.st || p.week1.prAtt);
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
  function draw() {
    const root = $("#stats-boards");
    if (!root || !window.FLOCK) return;
    const filter = pos();
    const list = players().filter(function (p) { return posMatch(p, filter); });
    const nfl = list.filter(function (p) { return (p.league || "NFL") !== "CFL"; });
    const cfl = list.filter(function (p) { return (p.league || "NFL") === "CFL"; });
    let html = "";
    const weekRows = nfl.slice().sort(function (a, b) {
      const av = isDefPos(a.pos) ? 0 : (a.week1 && a.week1.ppr) || 0;
      const bv = isDefPos(b.pos) ? 0 : (b.week1 && b.week1.ppr) || 0;
      return bv - av;
    });
    html += table("Week board", ["Rank","Player","Pos","Pro team","Result","Line","PPR"],
      weekRows.map(function (p, i) {
        const ppr = isDefPos(p.pos) ? teamScore(p) + "*" : ((p.week1 && p.week1.ppr != null) ? p.week1.ppr : "\u2014");
        return "<tr><td>" + (i + 1) + "</td><td><a href=\"player.html?id=" + p.id + "\">" + p.name + "</a></td><td>" + p.pos + "</td><td>" + p.team + "</td><td>" + ((p.week1 && p.week1.result) || "\u2014") + "</td><td>" + statLine(p) + "</td><td>" + ppr + "</td></tr>";
      }).join(""));
    const passers = nfl.filter(function (p) { return p.pos === "QB"; });
    html += table("Passing", ["Player","Pos","Team","GP","CMP","ATT","CMP%","YDS","AVG","TD","INT","PPR"],
      passers.sort(function (a,b) { return (b.week1.ppr||0)-(a.week1.ppr||0); }).map(function (p) {
        const b = parseBox(p);
        return "<tr>" + nameCell(p) + "<td>1</td><td>" + dash(b.cmp) + "</td><td>" + dash(b.att) + "</td><td>" + pct(b.cmp,b.att) + "</td><td>" + dash(b.pyds) + "</td><td>" + avg(b.pyds,b.att) + "</td><td>" + dash(b.ptd) + "</td><td>" + dash(b.pint) + "</td><td>" + (p.week1.ppr||"\u2014") + "</td></tr>";
      }).join(""));
    const rushers = nfl.filter(function (p) {
      const b = parseBox(p);
      return p.pos === "RB" || (p.pos === "QB" && b.ratt !== "\u2014");
    });
    html += table("Rushing", ["Player","Pos","Team","GP","ATT","YDS","AVG","TD","PPR"],
      rushers.sort(function (a,b) { return (b.week1.ppr||0)-(a.week1.ppr||0); }).map(function (p) {
        const b = parseBox(p);
        return "<tr>" + nameCell(p) + "<td>1</td><td>" + dash(b.ratt) + "</td><td>" + dash(b.ryds) + "</td><td>" + avg(b.ryds,b.ratt) + "</td><td>" + dash(b.rtd) + "</td><td>" + (p.week1.ppr||"\u2014") + "</td></tr>";
      }).join(""));
    const recs = nfl.filter(function (p) { return p.pos === "WR" || p.pos === "TE"; });
    html += table("Receiving", ["Player","Pos","Team","GP","TGT","REC","YDS","TD","PPR"],
      recs.sort(function (a,b) { return (b.week1.ppr||0)-(a.week1.ppr||0); }).map(function (p) {
        return "<tr>" + nameCell(p) + "<td>1</td><td>" + dash((p.week1||{}).tgt) + "</td><td>" + dash((p.week1||{}).rec) + "</td><td>" + dash((p.week1||{}).recYds) + "</td><td>" + dash((p.week1||{}).recTD) + "</td><td>" + (p.week1.ppr||"\u2014") + "</td></tr>";
      }).join(""));
    const fans = nfl.filter(function (p) { return p.fantasyRelevant && OFF.indexOf(p.pos) >= 0; });
    html += table("Fantasy", ["Player","Pos","Team","Wk PPR","Proj","ADP","Grade"],
      fans.sort(function (a,b) { return (b.week1.ppr||0)-(a.week1.ppr||0); }).map(function (p) {
        const f = p.fantasy || {};
        return "<tr>" + nameCell(p) + "<td>" + (f.week1PPR || p.week1.ppr || "\u2014") + "</td><td>" + (f.proj || "\u2014") + "</td><td>" + (f.adp || "\u2014") + "</td><td>" + (f.grade || "\u2014") + "</td></tr>";
      }).join(""));
    const defs = nfl.filter(function (p) { return IDP.indexOf(p.pos) >= 0; });
    html += table("Defense", ["Player","Pos","Team","Result","Tackles","Sacks","Team score*"],
      defs.map(function (p) {
        const s = p.season || {};
        return "<tr>" + nameCell(p) + "<td>" + (p.week1.result||"\u2014") + "</td><td>" + dash(s.tackles) + "</td><td>" + dash(s.sacks) + "</td><td>" + teamScore(p) + "*</td></tr>";
      }).join(""));
    const st = nfl.filter(function (p) { return p.pos === "K" || (p.week1 && (p.week1.st || p.week1.prAtt)); });
    html += table("Special teams", ["Player","Pos","Team","PR att","PR avg","PR long","PR TD","PPR"],
      st.map(function (p) {
        const w = p.week1 || {};
        return "<tr>" + nameCell(p) + "<td>" + dash(w.prAtt) + "</td><td>" + dash(w.prAvg) + "</td><td>" + dash(w.prLong) + "</td><td>" + dash(w.prTD) + "</td><td>" + (w.ppr||"\u2014") + "</td></tr>";
      }).join(""));
    html += table("CFL", ["Player","Pos","Team","League","Result","Note"],
      cfl.map(function (p) {
        return "<tr>" + nameCell(p) + "<td>" + (p.league||"CFL") + "</td><td>" + ((p.week1&&p.week1.result)||"\u2014") + "</td><td>" + ((p.week1&&p.week1.note)||"\u2014") + "</td></tr>";
      }).join(""));
    root.innerHTML = html || "<p class=\"footnote\">No rows for this position.</p>";
  }
  function boot() {
    const el = $("#pos-filters");
    if (!el) return;
    const opts = [["all","All"],["QB","QB"],["RB","RB"],["WR","WR"],["TE","TE"],["DEF","Defense"],["ST","ST"],["CFL","CFL"]];
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
