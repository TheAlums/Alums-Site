(function () {
  function dec(s) {
    return String(s || "")
      .replace(/\\u([0-9a-fA-F]{4})/g, function (_, h) {
        return String.fromCharCode(parseInt(h, 16));
      })
      .replace(/\/2019u/gi, "\u2019")
      .replace(/u2019/gi, "\u2019");
  }
  function walk(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      var v = node.nodeValue || "";
      if (/\\u|u2019|\/2019u/i.test(v)) node.nodeValue = dec(v);
      return;
    }
    var kids = node.childNodes || [];
    for (var i = 0; i < kids.length; i++) walk(kids[i]);
  }
  function run() {
    document.title = dec(document.title);
    walk(document.body);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
  window.addEventListener("load", run);
  document.addEventListener("flock:week", function () { setTimeout(run, 0); });
})();
