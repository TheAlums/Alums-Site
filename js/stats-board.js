(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  function channelPlayers() {
    const sid = FLOCK.meta.schoolId || "oregon";
    return FLOCK.players.filter((p) => (p.school || "oregon") === sid);
  }
  function teamScore(p) {
    if (p.week1 && p.week1.teamScore) return p.week1.teamScore;
    const m = String((p.week1 && p.week1.result) || "").match(/[WL]\s+\d+[\u2013\-]\d+/);
    return m ? m[0] : "—";
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
    return {
      cmp: cmpm ? cmpm[1] : "—", att: cmpm ? cmpm[2] : "—",
      pyds: yds ? yds[1] : (s.passYds || "—"), ptd: td ? td[1] : (s.passTD || "—"),
      pint: ints ? ints[1] : (s.int || "—"), ratt: rm ? rm[1] : "—",
      ryds: rm ? rm[2] : (s.rushYds || "—"), rtd: s.rushTD || "—",
      rec: s.rec || "—", recy: s.recYds || "—", rectd: s.recTD || "—",
      tack: s.tackles || "—", sack: s.sacks || "—"
    };
  }
  function dash(v) { return v === "—" || v === "" || v == null ? "—" : v; }
  function pct(a, b) {
    const x = Number(a), y = Number(b);
    if (!y || Number.isNaN(x) || Number.isNaN(y)) return "—";
    return ((x / y) * 100).toFixed(1);
  }
  function avg(yds, att) {
    const x = Number(yds), y = Number(att);
    if (!y || Number.isNaN(x) || Number.isNaN(y)) return "—";
    return (x / y).toFixed(1);
  }
  function view() { return document.querySelector("#stats-filters .filter.active") && document.querySelector("#stats-filters .filter.active").dataset.view || "pass"; }
  function headers(v) {
    if (v === "pass") return ["Player","Pos","Team","GP","CMP","ATT","CMP%","YDS","AVG","TD","INT","PPR"];
    if (v === "rush") return ["Player","Pos","Team","GP","ATT","YDS","AVG","TD","PPR"];
    if (v === "rec") return ["Player","Pos","Team","GP","REC","YDS","AVG","TD","PPR"];
    if (v === "def") return ["Player","Pos","Team","Result","Tackles","Sacks","Team score*"];
    if (v === "st") return ["Player","Pos","Team","PR att","PR avg","PR long","PR TD","PPR"];
    if (v === "fan") return ["Player","Pos","Team","Wk PPR","Proj","ADP","Grade"];
    return ["Player","Pos","Team","League","Result","Note"];
  }
  function row(p, v) {
    const b = parseBox(p);
    const n = "<td><a href=\"player.html?id=" + p.id + "\">" + p.name + "</a></td><td>" + p.pos + "</td><td>" + p.team + "</td>";
    if (v === "pass") return "<tr>" + n + "<td class=\"num\">1</td><td class=\"num\">" + dash(b.cmp) + "</td><td class=\"num\">" + dash(b.att) + "</td><td class=\"num\">" + pct(b.cmp,b.att) + "</td><td class=\"num\">" + dash(b.pyds) + "</td><td class=\"num\">" + avg(b.pyds,b.att) + "</td><td class=\"num\">" + dash(b.ptd) + "</td><td class=\"num\">" + dash(b.pint) + "</td><td class=\"num\">" + (p.week1.ppr || "—") + "</td></tr>";
    if (v === "rush") return "<tr>" + n + "<td class=\"num\">1</td><td class=\"num\">" + dash(b.ratt) + "</td><td class=\"num\">" + dash(b.ryds) + "</td><td class=\"num\">" + avg(b.ryds,b.ratt) + "</td><td class=\"num\">" + dash(b.rtd) + "</td><td class=\"num\">" + (p.week1.ppr || "—") + "</td></tr>";
    if (v === "rec") return "<tr>" + n + "<td class=\"num\">1</td><td class=\"num\">" + dash(b.rec) + "</td><td class=\"num\">" + dash(b.recy) + "</td><td class=\"num\">" + avg(b.recy,b.rec) + "</td><td class=\"num\">" + dash(b.rectd) + "</td><td class=\"num\">" + (p.week1.ppr || "—") + "</td></tr>";
    if (v === "def") return "<tr>" + n + "<td>" + (p.week1.result || "—") + "</td><td class=\"num\">" + dash(b.tack) + "</td><td class=\"num\">" + dash(b.sack) + "</td><td class=\"num\">" + teamScore(p) + "*</td></tr>";
    if (v === "fan") return "<tr>" + n + "<td class=\"num\">" + ((p.fantasy && p.fantasy.week1PPR) || p.week1.ppr || "—") + "</td><td class=\"num\">" + ((p.fantasy && p.fantasy.proj) || "—") + "</td><td>" + ((p.fantasy && p.fantasy.adp) || "—") + "</td><td>" + ((p.fantasy && p.fantasy.grade) || "—") + "</td></tr>";
    return "<tr>" + n + "<td>" + (p.league || "CFL") + "</td><td>" + (p.week1.result || "—") + "</td><td>" + (p.week1.note || "—") + "</td></tr>";
  }
  function draw() {
    const el = document.getElementById("stats-body");
    const head = document.getElementById("stats-head");
    if (!el) return;
    const v = view();
    if (head) head.innerHTML = "<tr>" + headers(v).map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>";
    const off = ["QB","RB","WR","TE"];
    const idp = ["DL","DE","DT","EDGE","LB","OLB","ILB","DB","CB","S"];
    var rows = channelPlayers().filter(function(p) {
      var lg = p.league || "NFL";
      if (v === "cfl") return lg === "CFL";
      if (lg === "CFL") return false;
      if (v === "pass") return p.pos === "QB";
      if (v === "rush") return p.pos === "RB" || p.pos === "QB";
      if (v === "rec") return p.pos === "WR" || p.pos === "TE" || p.pos === "RB";
      if (v === "def" || v === "st") return idp.indexOf(p.pos) >= 0;
      if (v === "fan") return p.fantasyRelevant || off.indexOf(p.pos) >= 0;
      return true;
    });
    rows.sort(function(a,b){ return (b.week1.ppr || 0) - (a.week1.ppr || 0); });
    el.innerHTML = rows.map(function(p){ return row(p, v); }).join("") || "<tr><td colspan=\"12\">No rows in this tab yet.</td></tr>";
  }
  function tabs() {
    const el = document.getElementById("stats-filters");
    if (!el) return;
    const views = [["pass","Passing"],["rush","Rushing"],["rec","Receiving"],["fan","Fantasy"],["def","Defense"],["st","Special teams"],["cfl","CFL"]];
    el.innerHTML = views.map(function(x,i){ return "<button class=\"filter" + (i===0?" active":"") + "\" data-view=\"" + x[0] + "\">" + x[1] + "</button>"; }).join("");
    el.onclick = function(e) {
      var btn = e.target.closest(".filter");
      if (!btn) return;
      el.querySelectorAll(".filter").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      draw();
    };
    draw();
  }
  document.addEventListener("DOMContentLoaded", tabs);
})();
