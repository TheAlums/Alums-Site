(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function initials(name) {
    return name.split(" ").map((p) => p[0]).join("").slice(0, 2);
  }

  function playerById(id) {
    return FLOCK.players.find((p) => p.id === id);
  }

  function channelPlayers() {
    const sid = FLOCK.meta.schoolId || "oregon";
    return FLOCK.players.filter((p) => (p.school || "oregon") === sid);
  }

  const SKILL = (FLOCK.skillPositions || ["QB", "RB", "WR", "TE"]);

  function schoolSkillScore(schoolId, n) {
    const rows = FLOCK.players.filter((p) =>
      (p.school || "oregon") === schoolId &&
      (p.league || "NFL") !== "CFL" &&
      SKILL.includes(p.pos)
    );
    const top = [...rows].sort((a, b) => (b.week1.ppr || 0) - (a.week1.ppr || 0)).slice(0, n || 5);
    const total = top.reduce((s, p) => s + (p.week1.ppr || 0), 0);
    return { total: Math.round(total * 10) / 10, top };
  }

  function renderSchoolRank() {
    const el = $("#school-rank");
    if (!el || !FLOCK.schools) return;
    const ranked = FLOCK.schools
      .map((s) => ({ ...s, ...schoolSkillScore(s.id, s.topN || 5) }))
      .sort((a, b) => b.total - a.total);
    el.innerHTML = ranked.map((s, i) => {
      const names = s.top.map((p) => `${p.name} ${p.week1.ppr}`).join(" · ") || "—";
      const link = s.href
        ? `<a href="${s.href}">${s.channel}</a>`
        : s.channel;
      const flag = s.live ? "" : `<span class="chip">Preview</span>`;
      return `<tr>
        <td class="num">${i + 1}</td>
        <td>${link} ${flag}</td>
        <td>${s.name}</td>
        <td class="num">${s.total.toFixed(1)}</td>
        <td>${names}</td>
      </tr>`;
    }).join("");
  }

  const DEF = ["DL", "DE", "DT", "EDGE", "LB", "OLB", "ILB", "DB", "CB", "S", "FS", "SS"];

  function teamScore(p) {
    if (p.week1?.teamScore) return p.week1.teamScore;
    const m = String(p.week1?.result || "").match(/[WL]\s+\d+[–\-]\d+/);
    return m ? m[0] : "—";
  }

  function isDef(p) {
    return DEF.includes(p.pos);
  }

  function tickerLine(p) {
    const w = p.week1 || {};
    const tag = `${p.name} · ${p.pos} ${p.team}`;
    if ((p.league || "NFL") === "CFL") return `${tag} · CFL · ${w.result || w.note || "—"}`;
    if (p.pos === "QB") return `${tag} · ${w.pass || "—"} · ${w.ppr || 0} PPR`;
    if (p.pos === "RB") return `${tag} · ${w.rush && w.rush !== "—" ? w.rush : w.note || "—"} · ${w.ppr || 0} PPR`;
    if (p.pos === "WR" || p.pos === "TE") {
      const rec = w.recLine || w.pass || w.note || "—";
      return `${tag} · ${rec} · ${w.ppr || 0} PPR`;
    }
    if (p.pos === "K") return `${tag} · ${w.kick || w.note || "—"} · ${w.ppr || 0} PPR`;
    if (isDef(p)) {
      const def = w.def || `${w.note || "—"}`;
      const st = w.st ? ` · ST ${w.st}` : "";
      return `${tag} · ${def}${st} · team ${teamScore(p)}*`;
    }
    return `${tag} · ${w.note || w.result || "—"}`;
  }

  function boxLine(p) {
    const w = p.week1 || {};
    if (p.pos === "QB") return w.pass || "—";
    if (p.pos === "RB") return w.rush && w.rush !== "—" ? w.rush : (w.note || "—");
    if (p.pos === "WR" || p.pos === "TE") return w.recLine || w.note || "—";
    if (p.pos === "K") return w.kick || w.note || "—";
    if (isDef(p)) return (w.def || w.note || "—") + (w.st ? ` · ST ${w.st}` : "");
    return w.note || "—";
  }

  function pprCell(p) {
    if (isDef(p) || !p.fantasyRelevant) {
      return `${teamScore(p)}*`;
    }
    return p.week1?.ppr || "—";
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
    const rm = rush.match(/(\d+)\s*[–-]\s*(\d+)/);
    const recLine = String(w.recLine || w.note || "");
    const recm = recLine.match(/(\d+)\s*rec/i);
    return {
      cmp: cmpm ? cmpm[1] : "—",
      att: cmpm ? cmpm[2] : "—",
      pyds: yds ? yds[1] : (s.passYds || "—"),
      ptd: td ? td[1] : (s.passTD || "—"),
      pint: ints ? ints[1] : (s.int || "—"),
      ratt: rm ? rm[1] : "—",
      ryds: rm ? rm[2] : (s.rushYds || "—"),
      rtd: s.rushTD || "—",
      rec: recm ? recm[1] : (s.rec || "—"),
      recy: s.recYds || "—",
      rectd: s.recTD || "—",
      tack: s.tackles || "—",
      sack: s.sacks || "—"
    };
  }

  function renderTicker() {
    const el = $("#ticker-track");
    if (!el) return;
    const bits = channelPlayers()
      .filter((p) => p.featured || p.week1)
      .map((p) => `<span class="ticker-item">${tickerLine(p)}</span>`);
    el.innerHTML = bits.concat(bits).join("");
  }

  function playerCard(p) {
    return `
      <a class="player-card" href="player.html?id=${p.id}">
        <div class="pc-top">
          <div class="avatar">${initials(p.name)}</div>
          <div style="flex:1">
            <div class="pc-name">${p.name}</div>
            <div class="pc-meta">${p.pos} · ${p.teamName} · ${p.years} yr${p.years === 1 ? "" : "s"}</div>
          </div>
          ${p.fantasyRelevant ? `<div class="ppr">${p.week1.ppr || "—"}</div>` : ""}
        </div>
        <div class="chips">
          <span class="chip gold">${p.league === "CFL" ? "CFL" : p.status}</span>
          <span class="chip">${p.draft}</span>
          <span class="chip">Oregon ${p.yearsAtOregon}</span>
        </div>
        <div class="pc-week"><b>Week ${FLOCK.meta.week}:</b> ${p.week1.note}</div>
      </a>`;
  }

  function renderFeatured() {
    const el = $("#featured-players");
    if (!el) return;
    el.innerHTML = channelPlayers().filter((p) => p.featured).slice(0, 8).map(playerCard).join("");
  }

  function renderHomePerformers() {
    const el = $("#home-performers");
    if (!el) return;
    const rows = [...channelPlayers()]
      .filter((p) => (p.league || "NFL") !== "CFL" && (p.featured || (p.week1.ppr || 0) > 0 || isDef(p)))
      .sort((a, b) => {
        const av = isDef(a) ? 0 : (a.week1.ppr || 0);
        const bv = isDef(b) ? 0 : (b.week1.ppr || 0);
        return bv - av;
      })
      .slice(0, 10);
    el.innerHTML = rows.map((p, i) => `
      <tr>
        <td class="num">${i + 1}</td>
        <td><a href="player.html?id=${p.id}">${p.name}</a></td>
        <td>${p.pos}</td>
        <td>${p.team}</td>
        <td>${p.week1.result || "—"}</td>
        <td>${boxLine(p)}</td>
        <td class="num">${pprCell(p)}</td>
      </tr>`).join("");
  }

  function renderHomeShop() {
    const el = $("#home-shop");
    if (!el || !FLOCK.shopItems) return;
    el.innerHTML = FLOCK.shopItems.slice(0, 4).map((s) => `
      <article class="product">
        <div class="product-art"><span class="jersey-ph">#${s.art}</span><small>Official team shop</small></div>
        <span class="chip gold">${s.team}</span>
        <h3>${s.name}</h3>
        <div class="price">${s.price}</div>
        <a class="buy" href="${s.href}" rel="nofollow sponsored" target="_blank">Shop</a>
      </article>`).join("");
  }

  function statsView() {
    return $("#stats-filters .filter.active")?.dataset.view || "nfl";
  }

  function renderStatsBoard() {
    const el = $("#stats-body");
    if (!el) return;
    const view = statsView();
    const off = ["QB", "RB", "WR", "TE"];
    const idp = ["DL", "LB", "DB", "CB", "S", "OLB"];
    let rows = channelPlayers().filter((p) => {
      const lg = p.league || "NFL";
      if (view === "cfl") return lg === "CFL";
      if (lg === "CFL") return false;
      if (view === "off") return off.includes(p.pos);
      if (view === "idp") return idp.includes(p.pos);
      return true;
    });
    rows = [...rows].sort((a, b) => (b.week1.ppr || 0) - (a.week1.ppr || 0));
    el.innerHTML = rows.map((p) => {
      const b = parseBox(p);
      return `
      <tr>
        <td><a href="player.html?id=${p.id}">${p.name}</a></td>
        <td>${p.pos}</td>
        <td>${p.team}</td>
        <td>${p.week1.result || "—"}</td>
        <td class="num">${b.cmp}/${b.att}</td>
        <td class="num">${b.pyds}</td>
        <td class="num">${b.ptd}</td>
        <td class="num">${b.pint}</td>
        <td class="num">${b.ratt}</td>
        <td class="num">${b.ryds}</td>
        <td class="num">${b.rtd}</td>
        <td class="num">${b.rec}</td>
        <td class="num">${b.recy}</td>
        <td class="num">${b.rectd}</td>
        <td class="num">${b.tack}</td>
        <td class="num">${b.sack}</td>
        <td class="num">${pprCell(p)}</td>
      </tr>`;
    }).join("");
  }

  function renderStatsFilters() {
    const el = $("#stats-filters");
    if (!el) return;
    const views = [
      ["nfl", "NFL"],
      ["off", "Offense"],
      ["idp", "IDP"],
      ["cfl", "CFL"]
    ];
    el.innerHTML = views.map((v, i) =>
      `<button class="filter${i === 0 ? " active" : ""}" data-view="${v[0]}">${v[1]}</button>`
    ).join("");
    el.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      el.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderStatsBoard();
    });
  }

  function renderDraft() {
    const tbody = $("#draft-prospects");
    if (tbody && FLOCK.prospects) {
      tbody.innerHTML = FLOCK.prospects.map((d) => `
        <tr>
          <td>${d.name}</td>
          <td>${d.pos}</td>
          <td>${d.class}</td>
          <td>${d.ht}</td>
          <td>${d.wt}</td>
          <td>${d.forty}</td>
          <td>${d.vert}</td>
          <td>${d.broad}</td>
          <td>${d.note}</td>
        </tr>`).join("");
    }
    const grid = $("#draft-class");
    if (grid) {
      const rookies = channelPlayers().filter((p) => String(p.draft).includes("2026"));
      grid.innerHTML = rookies.map(playerCard).join("");
    }
  }

  function renderNews() {
    const feature = $("#featured-story");
    const list = $("#news-list");
    if (feature) {
      const n = FLOCK.news.find((x) => x.featured) || FLOCK.news[0];
      const href = n.href || `https://www.espn.com/search/_/q/${encodeURIComponent(n.title)}`;
      const img = n.photo
        ? `<a href="${href}" target="_blank" rel="noopener"><img class="story-photo-img" src="${n.photo}" alt=""></a>`
        : `<a href="${href}" target="_blank" rel="noopener"><div class="story-photo">${n.source || "Read story"}</div></a>`;
      feature.innerHTML = `
        ${img}
        <span class="tag">${n.tag}</span>
        <h3><a href="${href}" target="_blank" rel="noopener">${n.title}</a></h3>
        <p>${n.dek}</p>
        <p style="margin-top:16px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#8a9a91">${n.time} · ${n.source || n.author} · <a href="${href}" target="_blank" rel="noopener">Read on ${n.source || "the web"}</a></p>`;
    }
    if (list) {
      const rest = FLOCK.news.filter((x) => !x.featured).slice(0, 4);
      list.innerHTML = rest.map((n) => {
        const href = n.href || `https://www.espn.com/search/_/q/${encodeURIComponent(n.title)}`;
        return `
        <a class="news-item" href="${href}" target="_blank" rel="noopener">
          <small>${n.tag} · ${n.time}</small>
          <h4>${n.title}</h4>
        </a>`;
      }).join("");
    }
  }

  function renderNewsPage() {
    const el = $("#news-feed");
    if (!el) return;
    el.innerHTML = FLOCK.news.map((n) => {
      const names = n.playerIds.map((id) => playerById(id)?.name).filter(Boolean);
      const href = n.href || `https://www.espn.com/search/_/q/${encodeURIComponent(n.title)}`;
      return `
        <article class="card pad" id="${n.id}" style="margin-bottom:16px">
          <span class="tag">${n.tag}</span>
          <h3 style="font-size:28px;margin:8px 0"><a href="${href}" target="_blank" rel="noopener">${n.title}</a></h3>
          <p style="color:#c5d1ca">${n.dek}</p>
          <p style="margin-top:12px;font-size:12px;color:#8a9a91">${n.time} · ${n.source || n.author}${names.length ? " · " + names.join(", ") : ""} · <a href="${href}" target="_blank" rel="noopener">Open article</a></p>
        </article>`;
    }).join("");
  }

  function applyRosterFilters() {
    const q = ($("#search")?.value || "").toLowerCase();
    const pos = $("#filters .filter.active")?.dataset.pos || "All";
    const el = $("#roster-grid");
    if (!el) return;
    const rows = channelPlayers().filter((p) => {
      const lg = p.league || "NFL";
      const hitQ = !q || `${p.name} ${p.team} ${p.teamName} ${p.pos} ${lg}`.toLowerCase().includes(q);
      if (pos === "CFL") return lg === "CFL" && hitQ;
      if (lg === "CFL") return false;
      const hitP = pos === "All" || p.pos === pos || (pos === "OL" && ["OL", "OT"].includes(p.pos)) || (pos === "DB" && ["DB", "CB", "S"].includes(p.pos));
      return hitQ && hitP;
    });
    el.innerHTML = rows.length ? rows.map(playerCard).join("") : `<p class="empty">No Ducks match that filter.</p>`;
    const count = $("#roster-count");
    if (count) count.textContent = `${rows.length} players`;
  }

  function renderRoster() {
    const filters = $("#filters");
    if (filters) {
      const groups = ["All", "QB", "RB", "WR", "TE", "OL", "DL", "LB", "DB", "CFL"];
      filters.innerHTML = groups.map((g, i) =>
        `<button class="filter${i === 0 ? " active" : ""}" data-pos="${g}">${g}</button>`
      ).join("");
      filters.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter");
        if (!btn) return;
        $$(".filter").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        applyRosterFilters();
      });
    }
    $("#search")?.addEventListener("input", applyRosterFilters);
    applyRosterFilters();
  }

  function renderFantasy() {
    const tbody = $("#fantasy-body");
    if (!tbody) return;
    const rows = channelPlayers()
      .filter((p) => p.fantasyRelevant)
      .sort((a, b) => (b.week1.ppr || 0) - (a.week1.ppr || 0));
    tbody.innerHTML = rows.map((p, i) => `
      <tr>
        <td class="num">${i + 1}</td>
        <td><a href="player.html?id=${p.id}">${p.name}</a></td>
        <td>${p.pos}</td>
        <td>${p.team}</td>
        <td class="num">${p.fantasy.week1PPR}</td>
        <td class="num">${p.fantasy.proj}</td>
        <td>${p.fantasy.adp}</td>
        <td><span class="grade ${p.fantasy.grade}">${p.fantasy.grade}</span></td>
      </tr>`).join("");
  }

  function renderPlayer() {
    const root = $("#player-root");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("id") || "herbert";
    const p = playerById(id) || FLOCK.players[0];
    document.title = `${p.name} · FLOCK`;
    const related = FLOCK.news.filter((n) => n.playerIds.includes(p.id));
    root.innerHTML = `
      <div class="profile-hero">
        <div class="avatar lg">${initials(p.name)}</div>
        <div>
          <div class="kicker">${p.teamName} · #${p.jersey}</div>
          <h1>${p.name}</h1>
          <div class="chips" style="margin-top:12px">
            <span class="chip gold">${p.pos}</span>
            <span class="chip">${p.status}</span>
            <span class="chip">${p.draft}</span>
            <span class="chip">Oregon ${p.yearsAtOregon}</span>
            <span class="chip">${p.years} NFL seasons</span>
          </div>
        </div>
        <div style="text-align:right">
          <div class="stat"><b>${p.week1.ppr || "—"}</b><span>Week ${FLOCK.meta.week} PPR</span></div>
        </div>
      </div>
      <p style="margin:22px 0;max-width:70ch;color:#c5d1ca">${p.bio}</p>
      <div class="stat-grid">
        <div class="stat-box"><b>${p.season.passYds}</b><span>Pass yds</span></div>
        <div class="stat-box"><b>${p.season.passTD}</b><span>Pass TD</span></div>
        <div class="stat-box"><b>${p.season.rushYds}</b><span>Rush yds</span></div>
        <div class="stat-box"><b>${p.season.rushTD}</b><span>Rush TD</span></div>
        <div class="stat-box"><b>${p.season.rec}</b><span>Receptions</span></div>
        <div class="stat-box"><b>${p.season.recYds}</b><span>Rec yds</span></div>
        <div class="stat-box"><b>${p.season.tackles}</b><span>Tackles</span></div>
        <div class="stat-box"><b>${p.season.sacks}</b><span>Sacks</span></div>
      </div>
      <div class="grid-2" style="margin-top:22px">
        <div class="card pad">
          <h3 style="margin-bottom:10px;text-transform:uppercase">Week ${FLOCK.meta.week} line</h3>
          <p><b>Result:</b> ${p.week1.result}</p>
          <p><b>Passing:</b> ${p.week1.pass}</p>
          <p><b>Rushing:</b> ${p.week1.rush}</p>
          <p style="margin-top:10px;color:#c5d1ca">${p.week1.note}</p>
        </div>
        <div class="card pad">
          <h3 style="margin-bottom:10px;text-transform:uppercase">Fantasy</h3>
          <p><b>Week PPR:</b> ${p.fantasy.week1PPR}</p>
          <p><b>Projection going in:</b> ${p.fantasy.proj}</p>
          <p><b>ADP / role:</b> ${p.fantasy.adp}</p>
          <p><b>Grade:</b> <span class="grade ${p.fantasy.grade}">${p.fantasy.grade}</span></p>
        </div>
      </div>
      <div class="section" style="padding-left:0;padding-right:0">
        <div class="section-head"><h2>2026 week box</h2></div>
        <div class="table-wrap">
          <table class="box-grid">
            <thead><tr><th>Wk</th><th>Result</th><th>C/A</th><th>Pass</th><th>pTD</th><th>INT</th><th>RuAtt</th><th>RuYds</th><th>RuTD</th><th>Rec</th><th>ReYds</th><th>ReTD</th><th>Tkl</th><th>Sk</th><th>PPR*</th></tr></thead>
            <tbody>
              <tr>
                <td>${FLOCK.meta.week}</td>
                <td>${p.week1.result}</td>
                <td class="num">${parseBox(p).cmp}/${parseBox(p).att}</td>
                <td class="num">${parseBox(p).pyds}</td>
                <td class="num">${parseBox(p).ptd}</td>
                <td class="num">${parseBox(p).pint}</td>
                <td class="num">${parseBox(p).ratt}</td>
                <td class="num">${parseBox(p).ryds}</td>
                <td class="num">${parseBox(p).rtd}</td>
                <td class="num">${parseBox(p).rec}</td>
                <td class="num">${parseBox(p).recy}</td>
                <td class="num">${parseBox(p).rectd}</td>
                <td class="num">${parseBox(p).tack}</td>
                <td class="num">${parseBox(p).sack}</td>
                <td class="num">${pprCell(p)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="section-head" style="margin-top:24px"><h2>Season box</h2></div>
        <div class="table-wrap">
          <table class="box-grid">
            <thead><tr><th>Year</th><th>Pass yds</th><th>pTD</th><th>INT</th><th>Rush yds</th><th>RuTD</th><th>Rec</th><th>ReYds</th><th>ReTD</th><th>Tkl</th><th>Sk</th></tr></thead>
            <tbody>
              <tr>
                <td>${FLOCK.meta.season}</td>
                <td class="num">${p.season.passYds}</td>
                <td class="num">${p.season.passTD}</td>
                <td class="num">${p.season.int}</td>
                <td class="num">${p.season.rushYds}</td>
                <td class="num">${p.season.rushTD}</td>
                <td class="num">${p.season.rec}</td>
                <td class="num">${p.season.recYds}</td>
                <td class="num">${p.season.recTD}</td>
                <td class="num">${p.season.tackles}</td>
                <td class="num">${p.season.sacks}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="section-head" style="margin-top:24px"><h2>News</h2></div>
        ${related.length ? related.map((n) => {
          const href = n.href || `https://www.espn.com/search/_/q/${encodeURIComponent(n.title)}`;
          return `
          <a class="news-item card" href="${href}" target="_blank" rel="noopener" style="margin-bottom:8px">
            <small>${n.tag} · ${n.time}</small>
            <h4>${n.title}</h4>
          </a>`;
        }).join("") : `<p class="empty">No tagged stories yet.</p>`}
      </div>
    `;
  }

  function setActiveNav() {
    const file = location.pathname.split("/").pop() || "index.html";
    $$(".nav-links a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href === file || (file === "" && href === "index.html")) a.classList.add("active");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();
    renderSchoolRank();
    renderTicker();
    renderFeatured();
    renderHomePerformers();
    renderHomeShop();
    renderNews();
    renderNewsPage();
    renderRoster();
    renderFantasy();
    renderStatsFilters();
    renderStatsBoard();
    renderDraft();
    renderPlayer();
  });
})();
