function enableDeferredCss() {
  var links = document.querySelectorAll('link[data-deferred-css]')
  for (var i = 0; i < links.length; i++) links[i].media = 'all'
}

if (typeof requestAnimationFrame === 'function') requestAnimationFrame(enableDeferredCss)
else enableDeferredCss()
