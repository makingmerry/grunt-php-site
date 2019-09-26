"use strict";var _createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}();function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Element.prototype.closest||(Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest=function(e){var t=this;if(!document.documentElement.contains(this))return null;do{if(t.matches(e))return t;t=t.parentElement}while(null!==t);return null});var isFunction=function(e){return"[object Function]"===Object.prototype.toString.call(e)},debounce=function(n,o,i){for(var e=arguments.length,a=Array(3<e?e-3:0),t=3;t<e;t++)a[t-3]=arguments[t];var r=void 0;return function(){var e=this,t=i&&!r;clearTimeout(r),r=setTimeout(function(){r=null,i||n.apply.apply(n,[e,n,o,i].concat(a))},o),t&&n.apply.apply(n,[e,n,o,i].concat(a))}},throttle=function(t,n){for(var e=arguments.length,o=Array(2<e?e-2:0),i=2;i<e;i++)o[i-2]=arguments[i];var a=void 0,r=void 0,c=void 0;return function(){var e=this;a?(clearTimeout(r),r=setTimeout(function(){Date.now()-c>=n&&(t.apply.apply(t,[e,t,n].concat(o)),c=Date.now())},n-(Date.now()-c))):(t.apply.apply(t,[e,t,n].concat(o)),c=Date.now(),a=!0)}},asyncLoadScript=function(a){return new Promise(function(e,t){var n=!1,o=document.getElementsByTagName("script")[0],i=document.createElement("script");i.type="text/javascript",i.src=a,i.async=!0,i.onreadystatechange=function(){n||this.readyState&&"complete"!==this.readyState||(n=!0,e(this))},i.onload=i.onreadystatechange,i.onabort=t,i.onerror=i.onabort,o.parentNode.insertBefore(i,o)})},pageIsReady=function(){var t=this;return new Promise(function(e){e(t)})},pageIsComplete=function(){var n=this;return new Promise(function(e){var t=setInterval(function(){"complete"===document.readyState&&(e(n),clearInterval(t))},250)})},Loader=function(){function t(e){_classCallCheck(this,t),this.domRef={shieldSelector:".loader"},this.cache={element:e,shield:null}}return _createClass(t,[{key:"init",value:function(){this.cacheShield()}},{key:"dest",value:function(){this.uncacheShield(),this.domRef=null,this.cache=null}},{key:"cacheShield",value:function(){this.cache.shield=this.cache.element.querySelector(this.domRef.shieldSelector)}},{key:"uncacheShield",value:function(){this.cache.shield=null}},{key:"showShield",value:function(){var t=this;return new Promise(function(e){TweenLite.set(t.cache.shield,{display:"table",visibility:"visible",opacity:0}),TweenLite.to(t.cache.shield,.25,{opacity:1,onCompleteScope:t,onComplete:function(){e(this)}})})}},{key:"hideShield",value:function(){var t=this;return new Promise(function(e){TweenLite.to(t.cache.shield,.35,{opacity:0,onCompleteScope:t,onComplete:function(){TweenLite.set(this.cache.shield,{display:"none",visibility:"hidden"}),e(this)}})})}}]),t}(),ScrollControl={enable:function(){document.body.style.overflow="auto"},disable:function(){document.body.style.overflow="hidden"},isTop:function(){return 0===window.pageYOffset},toTop:function(){this.isTop()||TweenLite.to(window,.2,{scrollTo:0})},toSection:function(e){TweenLite.to(window,1,{scrollTo:e})}},FontControl={options:{fontConfig:null},cache:{script:null},init:function(e){var t=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{fontConfig:null};return this.cache.script&&document.contains(this.cache.script)?Promise.resolve():(this.options=n,asyncLoadScript(e).then(function(e){t.cache.script=e,t.initFonts()}).catch(function(e){console.error(e)}))},dest:function(){this.cache.script&&document.contains(this.cache.script)&&(this.cache.script.parentNode.removeChild(this.cache.script),this.cache.script=null)},initFonts:function(){WebFont.load(this.options.fontConfig)}},ViewControl={isFirst:function(){return null===Barba.HistoryManager.prevStatus()},getCurUrl:function(){return Barba.Pjax.getCurrentUrl()},getCurUid:function(){return document.getElementsByClassName(Barba.Pjax.Dom.containerClass)[0].dataset.uid},getCurPathname:function(){return this.getCurUrl().split(window.location.origin).pop()},init:function(){var t=this;return Barba.Pjax.originalPreventCheck=Barba.Pjax.preventCheck,Barba.Pjax.preventCheck=function(e,t){if(null!==t){var n=t.getAttribute("href");if(n&&-1<n.indexOf("#"))return!0}return Barba.Pjax.originalPreventCheck(e,t)},Barba.Pjax.Dom.wrapperId="mainframe-wp",Barba.Pjax.Dom.containerClass="mainframe",Barba.Pjax.Dom.dataNamespace="template",Barba.Pjax.ignoreClassLink="no-frame-load",new Promise(function(e){t.templates.init(),t.transitions.init(),Barba.Pjax.start(),e(t)})},onRequested:function(e){Barba.Dispatcher.on("linkClicked",function(){e()})},onChange:function(e){Barba.Dispatcher.on("initStateChange",function(){e()})},onReady:function(e){Barba.Dispatcher.on("newPageReady",function(){e()})},onComplete:function(e){Barba.Dispatcher.on("transitionCompleted",function(){e()})},transitions:{store:{fade:Barba.BaseTransition.extend({start:function(){var e=Barba.Pjax.Dom.getWrapper();e.style.overflow="hidden",TweenLite.set(e,{height:this.oldContainer.offsetHeight}),Promise.all([this.newContainerLoading,this.hideOld()]).then(this.showNew.bind(this))},hideOld:function(){var t=this;return new Promise(function(e){TweenLite.to(t.oldContainer,.15,{opacity:0,onComplete:function(){e(!0)}})})},showNew:function(){var e=Barba.Pjax.Dom.getWrapper();TweenLite.to(e,.15,{height:this.newContainer.offsetHeight,onComplete:function(){e.style.overflow="visible",e.style.height=null}}),this.oldContainer.style.display="none",TweenLite.set(this.newContainer,{visibility:"visible",opacity:0}),TweenLite.to(this.newContainer,.1,{opacity:1,delay:.15,onCompleteScope:this,onComplete:function(){this.done()}})}})},assignments:{},assign:function(e,t){this.assignments[e]=t},init:function(){var n=this;Barba.Pjax.getTransition=function(){var e=Barba.HistoryManager.prevStatus().namespace;if(Object.hasOwnProperty.call(n.assignments,e)){var t=n.assignments[e];return n.store[t]}return n.store.fade}}},templates:{store:{},pushModel:function(e){this.store[e]=Barba.BaseView.extend({namespace:e,onEnter:function(){},onEnterCompleted:function(){},onLeave:function(){},onLeaveCompleted:function(){}})},getModel:function(e){return this.store[e]},getCurModelName:function(){return Barba.HistoryManager.currentStatus().namespace},init:function(){var t=this;Object.keys(this.store).forEach(function(e){t.store[e].init()})}}},AnalyticsControl={options:null,cache:{script:null},init:function(e){var t=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{trackingId:null};return this.cache.script&&document.contains(this.cache.script)?Promise.resolve():(this.options=n,this.initApi(),asyncLoadScript(e).then(function(e){t.cache.script=e,t.initTracker()}).catch(function(e){console.error(e)}))},dest:function(){this.destApi(),this.cache.script&&document.contains(this.cache.script)&&(this.cache.script.parentNode.removeChild(this.cache.script),this.cache.script=null)},initApi:function(){(window.GoogleAnalyticsObject="ga")in window||(window.ga=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];window.ga.q.push(t)},window.ga.q=[]),window.ga.l=(new Date).getTime()},destApi:function(){window.GoogleAnalyticsObject=null,window.ga=null,window.ga.q=null,window.ga.l=null},initTracker:function(){window.ga("create",{trackingId:this.options.trackingId,cookieDomain:"auto"})},setPageView:function(e,t,n){window.ga("set",{location:e,page:t,title:n})},send:function(){for(var e,t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];(e=window).ga.apply(e,["send"].concat(n))},sendPageView:function(){this.send("pageview")},sendEvent:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"";this.send("event",{eventCategory:e,eventAction:t,eventLabel:n})}},NavControl={cache:{links:null},domRef:{linkSelector:".nav__a"},init:function(){this.cacheLinks()},dest:function(){this.enableAllLinks(),this.cache=null,this.domRef=null},update:function(e){this.enableAllLinks(),this.disableLink(e)},cacheLinks:function(){this.cache.links=[].concat(_toConsumableArray(document.querySelectorAll(this.domRef.linkSelector)))},enableAllLinks:function(){this.cache.links.filter(function(e){return!e.href.length}).forEach(function(e){e.dataset.href&&(e.href=e.dataset.href,e.removeAttribute("data-href"))})},disableLink:function(t){this.cache.links.filter(function(e){return e.dataset.controlsUid===t}).forEach(function(e){e.dataset.href=e.href,e.removeAttribute("href")})}},preLoaderElement=document.querySelector("#pre-loader"),preLoader=new Loader(preLoaderElement);preLoader.domRef.shieldSelector=".loader",preLoader.init();var viewLoader=void 0;ViewControl.onRequested(function(){viewLoader.showShield()}),ViewControl.onReady(function(){picturefill(),svg4everybody();var e=ViewControl.getCurUrl(),t=ViewControl.getCurPathname(),n=document.title;AnalyticsControl.setPageView(e,t,n),AnalyticsControl.sendPageView()}),ViewControl.onComplete(function(){var e=window.location.hash;""!==e&&null!==document.querySelector(e)?ScrollControl.toSection(e):ScrollControl.toTop();var t=ViewControl.getCurUid();NavControl.update(t),ViewControl.isFirst()?preLoader.hideShield().then(function(){ScrollControl.enable()}):viewLoader.hideShield()}),ViewControl.templates.pushModel("home");var view=ViewControl.templates.getModel("home");view.onEnter=function(){console.log("home view enter")},view.onEnterCompleted=function(){console.log("home view enter complete")},view.onLeave=function(){console.log("home view leave")},view.onLeaveCompleted=function(){console.log("home view leave complete")},pageIsReady().then(function(){FontControl.init("https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",{fontConfig:{custom:{families:[]},timeout:2e3}});AnalyticsControl.init("https://www.google-analytics.com/analytics.js",{trackingId:"UA-XXXXX-Y"})}),pageIsComplete().then(function(){NavControl.init();var e=document.querySelector("#view-loader");(viewLoader=new Loader(e)).init(),ViewControl.init()});