(function () {
  function dec(s) {
    return String(s || "").replace(/\\u([0-9a-fA-F]{4})/g, function (_, h) {
      return String.fromCharCode(parseInt(h, 16));
    });
  }
  function walk(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      if (node.nodeValue && node.nodeValue.indexOf("\\u") !== -1) node.nodeValue = dec(node.nodeValue);
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
