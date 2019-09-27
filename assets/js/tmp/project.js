'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  // # configurations
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  // # eslint
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  /* global Barba TweenLite picturefill svg4everybody WebFont google */

  // # polyfill, helpers
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  // polyfill element selector matching
  // .matches & .closest
  if (!Element.prototype.closest) {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    Element.prototype.closest = function closest(Selector) {
      var el = this;
      var ancestor = this;
      if (!document.documentElement.contains(el)) return null;
      do {
        if (ancestor.matches(Selector)) return ancestor;
        ancestor = ancestor.parentElement;
      } while (ancestor !== null);
      return null;
    };
  }

  // type check
  var isFunction = function isFunction(X) {
    return Object.prototype.toString.call(X) === '[object Function]';
  };

  // # modules
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  // # debounce and throttle
  // https://davidwalsh.name/javascript-debounce-function
  // https://medium.com/@_jh3y/throttling-and-debouncing-in-javascript-b01cad5c8edf
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  var debounce = function debounce(Func, Wait, Immediate) {
    for (var _len = arguments.length, Args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      Args[_key - 3] = arguments[_key];
    }

    var inDebounce = void 0;
    return function timer() {
      var context = this;
      var later = function later() {
        inDebounce = null;
        if (!Immediate) Func.apply.apply(Func, [context, Func, Wait, Immediate].concat(Args));
      };
      var callNow = Immediate && !inDebounce;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(later, Wait);
      if (callNow) Func.apply.apply(Func, [context, Func, Wait, Immediate].concat(Args));
    };
  };

  var throttle = function throttle(Func, Limit) {
    for (var _len2 = arguments.length, Args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      Args[_key2 - 2] = arguments[_key2];
    }

    var inThrottle = void 0;
    var lastFunc = void 0;
    var lastRan = void 0;
    return function timer() {
      var context = this;
      if (!inThrottle) {
        Func.apply.apply(Func, [context, Func, Limit].concat(Args));
        lastRan = Date.now();
        inThrottle = true;
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= Limit) {
            Func.apply.apply(Func, [context, Func, Limit].concat(Args));
            lastRan = Date.now();
          }
        }, Limit - (Date.now() - lastRan));
      }
    };
  };

  // # promise-based async script loader
  // https://bradb.net/blog/promise-based-js-script-loader/
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  var asyncLoadScript = function asyncLoadScript(Url) {
    return new Promise(function (Resolve, Reject) {
      var ready = false;
      var anchor = document.getElementsByTagName('script')[0];
      var script = document.createElement('script');

      script.type = 'text/javascript';
      script.src = Url;
      script.async = true;
      script.onreadystatechange = function onreadystatechange() {
        if (!ready && (!this.readyState || this.readyState === 'complete')) {
          ready = true;
          Resolve(this);
        }
      };
      script.onload = script.onreadystatechange;
      script.onabort = Reject;
      script.onerror = script.onabort;
      anchor.parentNode.insertBefore(script, anchor);
    });
  };

  // # page load ready states
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  // document has finished loading and the document has been parsed
  // but sub-resources such as images, stylesheets and frames are still loading
  var pageIsReady = function pageIsReady() {
    var _this = this;

    return new Promise(function (Resolve) {
      Resolve(_this);
    });
  };

  // document and all sub-resources have finished loading,
  // state indicates that the load event is about to fire
  var pageIsComplete = function pageIsComplete() {
    var _this2 = this;

    return new Promise(function (Resolve) {
      var complete = setInterval(function () {
        if (document.readyState === 'complete') {
          Resolve(_this2);
          clearInterval(complete);
        }
      }, 250);
    });
  };

  // # loader
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  var Loader = function () {
    function Loader(Element) {
      _classCallCheck(this, Loader);

      this.domRef = {
        shieldSelector: '.loader'
      };
      this.cache = {
        element: Element,
        shield: null
      };
    }

    _createClass(Loader, [{
      key: 'init',
      value: function init() {
        this.cacheShield();
      }
    }, {
      key: 'dest',
      value: function dest() {
        this.uncacheShield();
        this.domRef = null;
        this.cache = null;
      }
    }, {
      key: 'cacheShield',
      value: function cacheShield() {
        this.cache.shield = this.cache.element.querySelector(this.domRef.shieldSelector);
      }
    }, {
      key: 'uncacheShield',
      value: function uncacheShield() {
        this.cache.shield = null;
      }
    }, {
      key: 'showShield',
      value: function showShield() {
        var _this3 = this;

        return new Promise(function (Resolve) {
          TweenLite.set(_this3.cache.shield, {
            display: 'table',
            visibility: 'visible',
            opacity: 0
          });
          TweenLite.to(_this3.cache.shield, 0.25, {
            opacity: 1,
            onCompleteScope: _this3,
            onComplete: function onComplete() {
              Resolve(this);
            }
          });
        });
      }
    }, {
      key: 'hideShield',
      value: function hideShield() {
        var _this4 = this;

        return new Promise(function (Resolve) {
          TweenLite.to(_this4.cache.shield, 0.35, {
            opacity: 0,
            onCompleteScope: _this4,
            onComplete: function onComplete() {
              TweenLite.set(this.cache.shield, {
                display: 'none',
                visibility: 'hidden'
              });
              Resolve(this);
            }
          });
        });
      }
    }]);

    return Loader;
  }();

  // # scroll control
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  var ScrollControl = {
    enable: function enable() {
      document.body.style.overflow = 'auto';
    },
    disable: function disable() {
      document.body.style.overflow = 'hidden';
    },
    isTop: function isTop() {
      return window.pageYOffset === 0;
    },
    toTop: function toTop() {
      if (!this.isTop()) {
        TweenLite.to(window, 0.2, { scrollTo: 0 });
      }
    },
    toSection: function toSection(ID) {
      TweenLite.to(window, 1, { scrollTo: ID });
    }
  };

  // # font control
  // https://github.com/typekit/webfontloader
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  var FontControl = {
    options: {
      fontConfig: null
    },
    cache: {
      script: null
    },

    init: function init(Url) {
      var _this5 = this;

      var Options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        fontConfig: null
      };

      // script loaded
      if (this.cache.script && document.contains(this.cache.script)) {
        return Promise.resolve();
      }
      // first script load
      this.options = Options;
      return asyncLoadScript(Url).then(function (Response) {
        _this5.cache.script = Response;
        _this5.initFonts();
      }).catch(function (ErrorMsg) {
        console.error(ErrorMsg);
      });
    },
    dest: function dest() {
      if (this.cache.script && document.contains(this.cache.script)) {
        this.cache.script.parentNode.removeChild(this.cache.script);
        this.cache.script = null;
      }
    },
    initFonts: function initFonts() {
      WebFont.load(this.options.fontConfig);
    }
  };

  // # view control
  // http://barbajs.org/
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  var ViewControl = {
    isFirst: function isFirst() {
      return Barba.HistoryManager.prevStatus() === null;
    },
    getCurUrl: function getCurUrl() {
      return Barba.Pjax.getCurrentUrl();
    },
    getCurUid: function getCurUid() {
      return document.getElementsByClassName(Barba.Pjax.Dom.containerClass)[0].dataset.uid;
    },
    getCurPathname: function getCurPathname() {
      return this.getCurUrl().split(window.location.origin).pop();
    },
    init: function init() {
      var _this6 = this;

      // !Hotfix: Browser loads new page if a link contains a hash.
      // https://github.com/luruke/barba.js/issues/53
      Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
      Barba.Pjax.preventCheck = function (event, element) {
        if (element !== null) {
          var href = element.getAttribute('href');
          if (href && href.indexOf('#') > -1) {
            return true;
          }
        }
        return Barba.Pjax.originalPreventCheck(event, element);
      };

      // setup DOM parsing variables for Barba.js
      Barba.Pjax.Dom.wrapperId = 'mainframe-wp';
      Barba.Pjax.Dom.containerClass = 'mainframe';
      Barba.Pjax.Dom.dataNamespace = 'template';
      Barba.Pjax.ignoreClassLink = 'no-frame-load';

      // initialise internal processes
      return new Promise(function (Resolve) {
        _this6.templates.init();
        _this6.transitions.init();
        Barba.Pjax.start();
        Resolve(_this6);
      });
    },


    // doesn't fire on initial load
    onRequested: function onRequested(Callback) {
      Barba.Dispatcher.on('linkClicked', function () {
        Callback();
      });
    },
    onChange: function onChange(Callback) {
      Barba.Dispatcher.on('initStateChange', function () {
        Callback();
      });
    },
    onReady: function onReady(Callback) {
      Barba.Dispatcher.on('newPageReady', function () {
        Callback();
      });
    },
    onComplete: function onComplete(Callback) {
      Barba.Dispatcher.on('transitionCompleted', function () {
        Callback();
      });
    },


    //////////////////////////////
    // sub-module:
    // # transitions
    //////////////////////////////

    transitions: {
      store: {
        // fades out current view container,
        // fades in new view container
        fade: Barba.BaseTransition.extend({
          start: function start() {
            // prevent page jump during transition,
            // set wrapper height to oldContainer height initially
            var wrapper = Barba.Pjax.Dom.getWrapper();
            wrapper.style.overflow = 'hidden';
            TweenLite.set(wrapper, {
              height: this.oldContainer.offsetHeight
            });

            // resolve processes
            Promise.all([this.newContainerLoading, this.hideOld()]).then(this.showNew.bind(this));
          },
          hideOld: function hideOld() {
            var _this7 = this;

            return new Promise(function (Resolve) {
              TweenLite.to(_this7.oldContainer, 0.15, {
                opacity: 0,
                onComplete: function onComplete() {
                  Resolve(true);
                }
              });
            });
          },
          showNew: function showNew() {
            // prevent page jump during transition,
            // animate wrapper height to newContent height
            var wrapper = Barba.Pjax.Dom.getWrapper();
            var wrapperResizeDuration = 0.15;
            TweenLite.to(wrapper, wrapperResizeDuration, {
              height: this.newContainer.offsetHeight,
              onComplete: function onComplete() {
                wrapper.style.overflow = 'visible';
                wrapper.style.height = null;
              }
            });

            // remove old container and
            // transit in new container
            this.oldContainer.style.display = 'none';
            TweenLite.set(this.newContainer, {
              visibility: 'visible',
              opacity: 0
            });
            TweenLite.to(this.newContainer, 0.1, {
              opacity: 1,
              delay: wrapperResizeDuration,
              onCompleteScope: this,
              onComplete: function onComplete() {
                this.done();
              }
            });
          }
        })
      },

      assignments: {},
      assign: function assign(Name, TransitionKey) {
        this.assignments[Name] = TransitionKey;
      },
      init: function init() {
        var _this8 = this;

        Barba.Pjax.getTransition = function () {
          var curViewName = Barba.HistoryManager.prevStatus().namespace;
          if (Object.hasOwnProperty.call(_this8.assignments, curViewName)) {
            var transitionKey = _this8.assignments[curViewName];
            return _this8.store[transitionKey];
          }
          return _this8.store.fade;
        };
      }
    },

    //////////////////////////////
    // sub-module:
    // # templates
    //////////////////////////////

    templates: {
      store: {},
      pushModel: function pushModel(Name) {
        this.store[Name] = Barba.BaseView.extend({
          namespace: Name,
          onEnter: function onEnter() {},
          onEnterCompleted: function onEnterCompleted() {},
          onLeave: function onLeave() {},
          onLeaveCompleted: function onLeaveCompleted() {}
        });
      },
      getModel: function getModel(Name) {
        return this.store[Name];
      },
      getCurModelName: function getCurModelName() {
        return Barba.HistoryManager.currentStatus().namespace;
      },
      init: function init() {
        var _this9 = this;

        Object.keys(this.store).forEach(function (Model) {
          _this9.store[Model].init();
        });
      }
    }
  };

  // # analytics control
  // https://developers.google.com/analytics/devguides/collection/gtagjs/
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  var AnalyticsControl = {
    options: null,
    cache: {
      script: null
    },

    init: function init(Url) {
      var _this10 = this;

      var Options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        trackingId: null
      };

      // script loaded
      if (this.cache.script && document.contains(this.cache.script)) {
        return Promise.resolve();
      }
      // first script load
      this.options = Options;
      this.initApi();
      return asyncLoadScript(Url).then(function (Response) {
        _this10.cache.script = Response;
        _this10.initTracker();
      }).catch(function (ErrorMsg) {
        console.error(ErrorMsg);
      });
    },
    dest: function dest() {
      this.destApi();
      if (this.cache.script && document.contains(this.cache.script)) {
        this.cache.script.parentNode.removeChild(this.cache.script);
        this.cache.script = null;
      }
    },
    initApi: function initApi() {
      // deconstructed Google Analytics async script
      // http://code.stephenmorley.org/javascript/understanding-the-google-analytics-tracking-code/
      // store the name of the Analytics object
      window.GoogleAnalyticsObject = 'ga';
      // check whether the Analytics object is defined
      if (!('ga' in window)) {
        // define the Analytics object
        window.ga = function ga() {
          for (var _len3 = arguments.length, Args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            Args[_key3] = arguments[_key3];
          }

          // add the tasks to the queue
          window.ga.q.push(Args);
        };
        // create the queue
        window.ga.q = [];
      }
      // store the current timestamp
      window.ga.l = new Date().getTime();
    },
    destApi: function destApi() {
      window.GoogleAnalyticsObject = null;
      window.ga = null;
      window.ga.q = null;
      window.ga.l = null;
    },
    initTracker: function initTracker() {
      window.ga('create', {
        trackingId: this.options.trackingId,
        cookieDomain: 'auto'
      });
    },
    setPageView: function setPageView(Url, Pathname, Title) {
      window.ga('set', {
        location: Url,
        page: Pathname,
        title: Title
      });
    },
    send: function send() {
      var _window;

      for (var _len4 = arguments.length, Data = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        Data[_key4] = arguments[_key4];
      }

      (_window = window).ga.apply(_window, ['send'].concat(Data));
    },
    sendPageView: function sendPageView() {
      this.send('pageview');
    },
    sendEvent: function sendEvent(Category, Action) {
      var Label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      this.send('event', {
        eventCategory: Category,
        eventAction: Action,
        eventLabel: Label
      });
    }
  };

  // # navigation control
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  var NavControl = {
    cache: {
      links: null
    },
    domRef: {
      linkSelector: '.nav__a'
    },

    init: function init() {
      this.cacheLinks();
    },
    dest: function dest() {
      this.enableAllLinks();
      this.cache = null;
      this.domRef = null;
    },
    update: function update(Uid) {
      this.enableAllLinks();
      this.disableLink(Uid);
    },
    cacheLinks: function cacheLinks() {
      this.cache.links = [].concat(_toConsumableArray(document.querySelectorAll(this.domRef.linkSelector)));
    },
    enableAllLinks: function enableAllLinks() {
      var disabledLinks = this.cache.links.filter(function (Link) {
        return !Link.href.length;
      });
      // swap in stored data-href attribute to href to re-enable default link behavior
      disabledLinks.forEach(function (Link) {
        if (Link.dataset.href) {
          Link.href = Link.dataset.href;
          Link.removeAttribute('data-href');
        }
      });
    },
    disableLink: function disableLink(Uid) {
      var activeLinks = this.cache.links.filter(function (Link) {
        return Link.dataset.controlsUid === Uid;
      });
      // store href as data-href attribute to disable default link behavior
      activeLinks.forEach(function (Link) {
        Link.dataset.href = Link.href;
        Link.removeAttribute('href');
      });
    }
  };

  // # contexts
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  // # site wide
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  var preLoaderElement = document.querySelector('#pre-loader');
  var preLoader = new Loader(preLoaderElement);
  preLoader.domRef.shieldSelector = '.loader';
  preLoader.init();
  var viewLoader = void 0;

  // doesn't fire on initial load
  ViewControl.onRequested(function () {
    // show loader
    viewLoader.showShield();
  });

  ViewControl.onReady(function () {
    // polyfill picture element
    picturefill();

    // polyfill svg elements
    svg4everybody();

    // track analytics
    var viewUrl = ViewControl.getCurUrl();
    var viewPathname = ViewControl.getCurPathname();
    var viewTitle = document.title;
    AnalyticsControl.setPageView(viewUrl, viewPathname, viewTitle);
    AnalyticsControl.sendPageView();
  });

  ViewControl.onComplete(function () {
    // Anchor page to hash section or page top on every load.
    var hash = window.location.hash;

    if (hash !== '' && document.querySelector(hash) !== null) {
      ScrollControl.toSection(hash);
    } else {
      ScrollControl.toTop();
    }

    // update navigation links
    var uid = ViewControl.getCurUid();
    NavControl.update(uid);

    if (ViewControl.isFirst()) {
      // hide preloader on load
      preLoader.hideShield().then(function () {
        ScrollControl.enable();
      });
    } else {
      // hide loader
      viewLoader.hideShield();
    }
  });

  // # view specific
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  //////////////////////////////
  // # home
  //////////////////////////////

  // !example
  {
    ViewControl.templates.pushModel('home');
    var view = ViewControl.templates.getModel('home');

    view.onEnter = function () {
      console.log('home view enter'); // !debug
    };

    view.onEnterCompleted = function () {
      console.log('home view enter complete'); // !debug
    };

    view.onLeave = function () {
      console.log('home view leave'); // !debug
    };

    view.onLeaveCompleted = function () {
      console.log('home view leave complete'); // !debug
    };
  }

  // # processes
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  pageIsReady().then(function () {
    // enable web fonts with loader
    var wfLoaderScriptUrl = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    var fontConfig = {
      custom: {
        families: [] // !input
      },
      timeout: 2000
    };
    FontControl.init(wfLoaderScriptUrl, { fontConfig: fontConfig });

    // enable google analytics with loader
    var analyticsSciptUrl = 'https://www.google-analytics.com/analytics.js';
    var analyticsTrackingId = 'UA-XXXXX-Y'; // !input
    AnalyticsControl.init(analyticsSciptUrl, { trackingId: analyticsTrackingId });
  });

  pageIsComplete().then(function () {
    // initialise nav control
    NavControl.init();

    // initialise view loader
    var viewLoaderElement = document.querySelector('#view-loader');
    viewLoader = new Loader(viewLoaderElement);
    viewLoader.init();

    // initialise view control
    ViewControl.init();
  });
}
