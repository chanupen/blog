// Theme switch (shared "theme" key with chanupen.github.io), code copy buttons,
// and keeping Giscus and Mermaid in step with the theme.
(function () {
  var root = document.documentElement;

  function isLight() { return root.getAttribute("data-theme") === "light"; }

  function syncGiscus() {
    var frame = document.querySelector("iframe.giscus-frame");
    if (!frame) return;
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: isLight() ? "light" : "dark_dimmed" } } },
      "https://giscus.app"
    );
  }

  var btn = document.getElementById("themeBtn");
  if (btn) {
    btn.addEventListener("click", function () {
      var light = isLight();
      if (light) root.removeAttribute("data-theme"); else root.setAttribute("data-theme", "light");
      try { localStorage.setItem("theme", light ? "dark" : "light"); } catch (e) {}
      syncGiscus();
      document.dispatchEvent(new Event("themechange"));
    });
  }

  // Giscus picks its theme on load; match the current one once it is ready.
  window.addEventListener("message", function (e) {
    if (e.origin === "https://giscus.app") syncGiscus();
  }, { once: true });

  // Copy buttons on code blocks.
  document.querySelectorAll(".codeblock .copy-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var code = b.parentElement.querySelector("pre code");
      if (!code || !navigator.clipboard) return;
      navigator.clipboard.writeText(code.innerText.replace(/\n$/, "")).then(function () {
        var old = b.innerHTML;
        b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>';
        b.setAttribute("aria-label", "Copied");
        setTimeout(function () { b.innerHTML = old; b.setAttribute("aria-label", "Copy code"); }, 1600);
      });
    });
  });
})();
