  <!-- # load non-critical scripts -->
  <script>
    function downloadJSAtOnload() {
      // global script
      var globalScript = document.createElement("script");
      globalScript.src = "javascripts/build/global.min.js";
      document.body.appendChild(globalScript);
    };
    if (window.addEventListener)
      window.addEventListener("load", downloadJSAtOnload, false);
    else if (window.attachEvent)
      window.attachEvent("onload", downloadJSAtOnload);
    else window.onload = downloadJSAtOnload;
  </script>
</body>
</html>