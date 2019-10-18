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
      Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector
    }
    Element.prototype.closest = function closest(Selector) {
      const el = this
      let ancestor = this
      if (!document.documentElement.contains(el)) return null
      do {
        if (ancestor.matches(Selector)) return ancestor
        ancestor = ancestor.parentElement
      } while (ancestor !== null)
      return null
    }
  }

  // type check
  const isFunction = function isFunction(X) {
    return Object.prototype.toString.call(X) === "[object Function]"
  }

  // # modules
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  // # debounce and throttle
  // https://davidwalsh.name/javascript-debounce-function
  // https://medium.com/@_jh3y/throttling-and-debouncing-in-javascript-b01cad5c8edf
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const debounce = function debounce(Func, Wait, Immediate, ...Args) {
    let inDebounce
    return function timer() {
      const context = this
      const later = function later() {
        inDebounce = null
        if (!Immediate) Func.apply(context, Func, Wait, Immediate, ...Args)
      }
      const callNow = Immediate && !inDebounce
      clearTimeout(inDebounce)
      inDebounce = setTimeout(later, Wait)
      if (callNow) Func.apply(context, Func, Wait, Immediate, ...Args)
    }
  }

  const throttle = function throttle(Func, Limit, ...Args) {
    let inThrottle
    let lastFunc
    let lastRan
    return function timer() {
      const context = this
      if (!inThrottle) {
        Func.apply(context, Func, Limit, ...Args)
        lastRan = Date.now()
        inThrottle = true
      } else {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= Limit) {
            Func.apply(context, Func, Limit, ...Args)
            lastRan = Date.now()
          }
        }, Limit - (Date.now() - lastRan))
      }
    }
  }

  // # promise-based async script loader
  // https://bradb.net/blog/promise-based-js-script-loader/
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const asyncLoadScript = function asyncLoadScript(Url) {
    return new Promise((Resolve, Reject) => {
      let ready = false
      const anchor = document.getElementsByTagName("script")[0]
      const script = document.createElement("script")

      script.type = "text/javascript"
      script.src = Url
      script.async = true
      script.onreadystatechange = function onreadystatechange() {
        if (!ready && (!this.readyState || this.readyState === "complete")) {
          ready = true
          Resolve(this)
        }
      }
      script.onload = script.onreadystatechange
      script.onabort = Reject
      script.onerror = script.onabort
      anchor.parentNode.insertBefore(script, anchor)
    })
  }

  // # page load ready states
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  // document has finished loading and the document has been parsed
  // but sub-resources such as images, stylesheets and frames are still loading
  const pageIsReady = function pageIsReady() {
    return new Promise(Resolve => {
      Resolve(this)
    })
  }

  // document and all sub-resources have finished loading,
  // state indicates that the load event is about to fire
  const pageIsComplete = function pageIsComplete() {
    return new Promise(Resolve => {
      const complete = setInterval(() => {
        if (document.readyState === "complete") {
          Resolve(this)
          clearInterval(complete)
        }
      }, 250)
    })
  }

  // # loader
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const Loader = class {
    constructor(Element) {
      this.domRef = {
        shieldSelector: ".loader",
      }
      this.cache = {
        element: Element,
        shield: null,
      }
    }

    init() {
      this.cacheShield()
    }

    dest() {
      this.uncacheShield()
      this.domRef = null
      this.cache = null
    }

    cacheShield() {
      this.cache.shield = this.cache.element.querySelector(
        this.domRef.shieldSelector
      )
    }

    uncacheShield() {
      this.cache.shield = null
    }

    showShield() {
      return new Promise(Resolve => {
        TweenLite.set(this.cache.shield, {
          display: "table",
          visibility: "visible",
          opacity: 0,
        })
        TweenLite.to(this.cache.shield, 0.25, {
          opacity: 1,
          onCompleteScope: this,
          onComplete() {
            Resolve(this)
          },
        })
      })
    }

    hideShield() {
      return new Promise(Resolve => {
        TweenLite.to(this.cache.shield, 0.35, {
          opacity: 0,
          onCompleteScope: this,
          onComplete() {
            TweenLite.set(this.cache.shield, {
              display: "none",
              visibility: "hidden",
            })
            Resolve(this)
          },
        })
      })
    }
  }

  // # scroll control
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const ScrollControl = {
    enable() {
      document.body.style.overflow = "auto"
    },

    disable() {
      document.body.style.overflow = "hidden"
    },

    isTop() {
      return window.pageYOffset === 0
    },

    toTop() {
      if (!this.isTop()) {
        TweenLite.to(window, 0.2, { scrollTo: 0 })
      }
    },

    toSection(ID) {
      TweenLite.to(window, 1, { scrollTo: ID })
    },
  }

  // # font control
  // https://github.com/typekit/webfontloader
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const FontControl = {
    options: {
      fontConfig: null,
    },
    cache: {
      script: null,
    },

    init(
      Url,
      Options = {
        fontConfig: null,
      }
    ) {
      // script loaded
      if (this.cache.script && document.contains(this.cache.script)) {
        return Promise.resolve()
      }
      // first script load
      this.options = Options
      return asyncLoadScript(Url)
        .then(Response => {
          this.cache.script = Response
          this.initFonts()
        })
        .catch(ErrorMsg => {
          console.error(ErrorMsg)
        })
    },

    dest() {
      if (this.cache.script && document.contains(this.cache.script)) {
        this.cache.script.parentNode.removeChild(this.cache.script)
        this.cache.script = null
      }
    },

    initFonts() {
      WebFont.load(this.options.fontConfig)
    },
  }

  // # view control
  // http://barbajs.org/
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const ViewControl = {
    isFirst() {
      return Barba.HistoryManager.prevStatus() === null
    },

    getCurUrl() {
      return Barba.Pjax.getCurrentUrl()
    },

    getCurUid() {
      return document.getElementsByClassName(Barba.Pjax.Dom.containerClass)[0]
        .dataset.uid
    },

    getCurPathname() {
      return this.getCurUrl()
        .split(window.location.origin)
        .pop()
    },

    init() {
      // !Hotfix: Browser loads new page if a link contains a hash.
      // https://github.com/luruke/barba.js/issues/53
      Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck
      Barba.Pjax.preventCheck = (event, element) => {
        if (element !== null) {
          const href = element.getAttribute("href")
          if (href && href.indexOf("#") > -1) {
            return true
          }
        }
        return Barba.Pjax.originalPreventCheck(event, element)
      }

      // setup DOM parsing variables for Barba.js
      Barba.Pjax.Dom.wrapperId = "mainframe-wp"
      Barba.Pjax.Dom.containerClass = "mainframe"
      Barba.Pjax.Dom.dataNamespace = "template"
      Barba.Pjax.ignoreClassLink = "no-frame-load"

      // initialise internal processes
      return new Promise(Resolve => {
        this.templates.init()
        this.transitions.init()
        Barba.Pjax.start()
        Resolve(this)
      })
    },

    // doesn't fire on initial load
    onRequested(Callback) {
      Barba.Dispatcher.on("linkClicked", () => {
        Callback()
      })
    },

    onChange(Callback) {
      Barba.Dispatcher.on("initStateChange", () => {
        Callback()
      })
    },

    onReady(Callback) {
      Barba.Dispatcher.on("newPageReady", () => {
        Callback()
      })
    },

    onComplete(Callback) {
      Barba.Dispatcher.on("transitionCompleted", () => {
        Callback()
      })
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
          start() {
            // prevent page jump during transition,
            // set wrapper height to oldContainer height initially
            const wrapper = Barba.Pjax.Dom.getWrapper()
            wrapper.style.overflow = "hidden"
            TweenLite.set(wrapper, {
              height: this.oldContainer.offsetHeight,
            })

            // resolve processes
            Promise.all([this.newContainerLoading, this.hideOld()]).then(
              this.showNew.bind(this)
            )
          },

          hideOld() {
            return new Promise(Resolve => {
              TweenLite.to(this.oldContainer, 0.15, {
                opacity: 0,
                onComplete() {
                  Resolve(true)
                },
              })
            })
          },

          showNew() {
            // prevent page jump during transition,
            // animate wrapper height to newContent height
            const wrapper = Barba.Pjax.Dom.getWrapper()
            const wrapperResizeDuration = 0.15
            TweenLite.to(wrapper, wrapperResizeDuration, {
              height: this.newContainer.offsetHeight,
              onComplete() {
                wrapper.style.overflow = "visible"
                wrapper.style.height = null
              },
            })

            // remove old container and
            // transit in new container
            this.oldContainer.style.display = "none"
            TweenLite.set(this.newContainer, {
              visibility: "visible",
              opacity: 0,
            })
            TweenLite.to(this.newContainer, 0.1, {
              opacity: 1,
              delay: wrapperResizeDuration,
              onCompleteScope: this,
              onComplete() {
                this.done()
              },
            })
          },
        }),
      },

      assignments: {},
      assign(Name, TransitionKey) {
        this.assignments[Name] = TransitionKey
      },

      init() {
        Barba.Pjax.getTransition = () => {
          const curViewName = Barba.HistoryManager.prevStatus().namespace
          if (Object.hasOwnProperty.call(this.assignments, curViewName)) {
            const transitionKey = this.assignments[curViewName]
            return this.store[transitionKey]
          }
          return this.store.fade
        }
      },
    },

    //////////////////////////////
    // sub-module:
    // # templates
    //////////////////////////////

    templates: {
      store: {},
      pushModel(Name) {
        this.store[Name] = Barba.BaseView.extend({
          namespace: Name,
          onEnter() {},
          onEnterCompleted() {},
          onLeave() {},
          onLeaveCompleted() {},
        })
      },

      getModel(Name) {
        return this.store[Name]
      },

      getCurModelName() {
        return Barba.HistoryManager.currentStatus().namespace
      },

      init() {
        Object.keys(this.store).forEach(Model => {
          this.store[Model].init()
        })
      },
    },
  }

  // # analytics control
  // https://developers.google.com/analytics/devguides/collection/gtagjs/
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const AnalyticsControl = {
    options: null,
    cache: {
      script: null,
    },

    init(
      Url,
      Options = {
        trackingId: null,
      }
    ) {
      // script loaded
      if (this.cache.script && document.contains(this.cache.script)) {
        return Promise.resolve()
      }
      // first script load
      this.options = Options
      this.initApi()
      return asyncLoadScript(Url)
        .then(Response => {
          this.cache.script = Response
          this.initTracker()
        })
        .catch(ErrorMsg => {
          console.error(ErrorMsg)
        })
    },

    dest() {
      this.destApi()
      if (this.cache.script && document.contains(this.cache.script)) {
        this.cache.script.parentNode.removeChild(this.cache.script)
        this.cache.script = null
      }
    },

    initApi() {
      // deconstructed Google Analytics async script
      // http://code.stephenmorley.org/javascript/understanding-the-google-analytics-tracking-code/
      // store the name of the Analytics object
      window.GoogleAnalyticsObject = "ga"
      // check whether the Analytics object is defined
      if (!("ga" in window)) {
        // define the Analytics object
        window.ga = function ga(...Args) {
          // add the tasks to the queue
          window.ga.q.push(Args)
        }
        // create the queue
        window.ga.q = []
      }
      // store the current timestamp
      window.ga.l = new Date().getTime()
    },

    destApi() {
      window.GoogleAnalyticsObject = null
      window.ga = null
      window.ga.q = null
      window.ga.l = null
    },

    initTracker() {
      window.ga("create", {
        trackingId: this.options.trackingId,
        cookieDomain: "auto",
      })
    },

    setPageView(Url, Pathname, Title) {
      window.ga("set", {
        location: Url,
        page: Pathname,
        title: Title,
      })
    },

    send(...Data) {
      window.ga("send", ...Data)
    },

    sendPageView() {
      this.send("pageview")
    },

    sendEvent(Category, Action, Label = "") {
      this.send("event", {
        eventCategory: Category,
        eventAction: Action,
        eventLabel: Label,
      })
    },
  }

  // # navigation control
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const NavControl = {
    cache: {
      links: null,
    },
    domRef: {
      linkSelector: ".nav__a",
    },

    init() {
      this.cacheLinks()
    },

    dest() {
      this.enableAllLinks()
      this.cache = null
      this.domRef = null
    },

    update(Uid) {
      this.enableAllLinks()
      this.disableLink(Uid)
    },

    cacheLinks() {
      this.cache.links = [
        ...document.querySelectorAll(this.domRef.linkSelector),
      ]
    },

    enableAllLinks() {
      const disabledLinks = this.cache.links.filter(Link => !Link.href.length)
      // swap in stored data-href attribute to href to re-enable default link behavior
      disabledLinks.forEach(Link => {
        if (Link.dataset.href) {
          Link.href = Link.dataset.href
          Link.removeAttribute("data-href")
        }
      })
    },

    disableLink(Uid) {
      const activeLinks = this.cache.links.filter(
        Link => Link.dataset.controlsUid === Uid
      )
      // store href as data-href attribute to disable default link behavior
      activeLinks.forEach(Link => {
        Link.dataset.href = Link.href
        Link.removeAttribute("href")
      })
    },
  }

  // # contexts
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  // # site wide
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const preLoaderElement = document.querySelector("#pre-loader")
  const preLoader = new Loader(preLoaderElement)
  preLoader.domRef.shieldSelector = ".loader"
  preLoader.init()
  let viewLoader

  // doesn't fire on initial load
  ViewControl.onRequested(() => {
    // show loader
    viewLoader.showShield()
  })

  ViewControl.onReady(() => {
    // polyfill picture element
    picturefill()

    // polyfill svg elements
    svg4everybody()

    // track analytics
    const viewUrl = ViewControl.getCurUrl()
    const viewPathname = ViewControl.getCurPathname()
    const viewTitle = document.title
    AnalyticsControl.setPageView(viewUrl, viewPathname, viewTitle)
    AnalyticsControl.sendPageView()
  })

  ViewControl.onComplete(() => {
    // Anchor page to hash section or page top on every load.
    const { hash } = window.location
    if (hash !== "" && document.querySelector(hash) !== null) {
      ScrollControl.toSection(hash)
    } else {
      ScrollControl.toTop()
    }

    // update navigation links
    const uid = ViewControl.getCurUid()
    NavControl.update(uid)

    if (ViewControl.isFirst()) {
      // hide preloader on load
      preLoader.hideShield().then(() => {
        ScrollControl.enable()
      })
    } else {
      // hide loader
      viewLoader.hideShield()
    }
  })

  // # view specific
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  //////////////////////////////
  // # home
  //////////////////////////////

  // !example
  {
    ViewControl.templates.pushModel("home")
    const view = ViewControl.templates.getModel("home")

    view.onEnter = () => {
      console.log("home view enter") // !debug
    }

    view.onEnterCompleted = () => {
      console.log("home view enter complete") // !debug
    }

    view.onLeave = () => {
      console.log("home view leave") // !debug
    }

    view.onLeaveCompleted = () => {
      console.log("home view leave complete") // !debug
    }
  }

  // # processes
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  pageIsReady().then(() => {
    // enable web fonts with loader
    const wfLoaderScriptUrl =
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    const fontConfig = {
      custom: {
        families: [], // !input
      },
      timeout: 2000,
    }
    FontControl.init(wfLoaderScriptUrl, { fontConfig })

    // enable google analytics with loader
    const analyticsSciptUrl = "https://www.google-analytics.com/analytics.js"
    const analyticsTrackingId = "UA-XXXXX-Y" // !input
    AnalyticsControl.init(analyticsSciptUrl, {
      trackingId: analyticsTrackingId,
    })
  })

  pageIsComplete().then(() => {
    // initialise nav control
    NavControl.init()

    // initialise view loader
    const viewLoaderElement = document.querySelector("#view-loader")
    viewLoader = new Loader(viewLoaderElement)
    viewLoader.init()

    // initialise view control
    ViewControl.init()
  })
}
