(function () {
  function slot(kind) {
    var path = (location.pathname || "").toLowerCase();
    var house;
    if (kind === "leader") {
      house = path.indexOf("/producks") >= 0
        ? { kicker: "House ad", line: "Week 2 is posted \u2014 Nix 288, Irving 89, Herbert two picks.", href: "stats.html", cta: "Open the board" }
        : { kicker: "House ad", line: "Five school desks. Oregon is the deep board.", href: "producks/index.html", cta: "Open ProDucks" };
    } else {
      house = { kicker: "Desk", line: "Tips and corrections: info@thealums.com", href: "mailto:info@thealums.com", cta: "Email the desk" };
    }
    return '<aside class="ad house"><small>' + house.kicker + '</small><b>' + house.line + '</b><a class="ad-cta" href="' + house.href + '">' + house.cta + ' \u2192</a></aside>';
  }
  function wrap(html) {
    var d = document.createElement("div");
    d.className = "wrap ad-wrap";
    d.innerHTML = html;
    return d;
  }
  var hero = document.querySelector(".hero");
  if (hero && hero.parentNode) hero.parentNode.insertBefore(wrap(slot("leader")), hero.nextSibling);
  var foot = document.querySelector("footer");
  if (foot && foot.parentNode) foot.parentNode.insertBefore(wrap(slot("footer")), foot);
})();
