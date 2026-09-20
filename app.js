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
      const line = p.week1.pass && p.week1.pass !== "—" ? p.week1.pass : (p.week1.rush || p.week1.note);
      return `
      <tr>
        <td><a href="player.html?id=${p.id}">${p.name}</a></td>
        <td>${p.pos}</td>
        <td>${p.league || "NFL"}</td>
        <td>${p.team}</td>
        <td>${p.week1.result}</td>
        <td>${line}</td>
        <td class="num">${pprCell(p)}</td>
        <td class="num">${isDef(p) ? "—" : (p.fantasy?.proj ?? "—")}</td>
        <td>${isDef(p) ? "—" : `<span class="grade ${p.fantasy?.grade || ""}">${p.fantasy?.grade || "—"}</span>`}</td>
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
      feature.innerHTML = `
        <div class="story-photo">${n.photoLabel || "Week desk"}</div>
        <span class="tag">${n.tag}</span>
        <h3><a href="${href}" target="_blank" rel="noopener">${n.title}</a></h3>
        <p>${n.dek}</p>
        <p style="margin-top:16px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#8a9a91">${n.time} · ${n.source || n.author} · <a href="${href}" target="_blank" rel="noopener">Open article</a></p>`;
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
        <div class="section-head"><h2>2026 weeks</h2></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Wk</th><th>Result</th><th>Line</th><th>PPR / team</th></tr></thead>
            <tbody>
              ${(p.weeks || [{ wk: FLOCK.meta.week, result: p.week1.result, line: boxLine(p), mark: pprCell(p) }]).map((w) => `
                <tr><td>${w.wk}</td><td>${w.result}</td><td>${w.line}</td><td class="num">${w.mark}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
        <div class="section-head" style="margin-top:24px"><h2>Seasons</h2></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Year</th><th>Pass</th><th>Rush</th><th>Rec</th><th>Tackles</th></tr></thead>
            <tbody>
              ${(p.seasons || [{ year: FLOCK.meta.season, pass: p.season.passYds, rush: p.season.rushYds, rec: p.season.rec, tack: p.season.tackles }]).map((s) => `
                <tr><td>${s.year}</td><td>${s.pass}</td><td>${s.rush}</td><td>${s.rec}</td><td>${s.tack}</td></tr>`).join("")}
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
