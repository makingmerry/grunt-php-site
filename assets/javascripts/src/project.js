{
  // # configurations
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  // # eslint
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  /* global Barba TweenLite picturefill ga */

  // # modules
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  // # analytics
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  function PushPageView(URL) {
    // https://developers.google.com/analytics/devguides/...
    // ...collection/analyticsjs/single-page-applications
    if (typeof ga === 'function') {
      ga('set', 'page', URL);
      ga('send', 'pageview');
    }
  }

  // # page scroll
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const PageScroll = {
    body: document.body,

    enable() {
      this.body.style.overflow = 'auto';
    },

    disable() {
      this.body.style.overflow = 'hidden';
    },

    isTop() {
      return window.pageYOffset === 0;
    },

    toTop() {
      TweenLite.to(window, 0.2, { scrollTo: 0 });
    },
  };

  // # loader
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  function Loader(elementID) {
    this.element = document.getElementById(elementID);
  }

  Loader.prototype = {
    show() {
      return new Promise((resolve, reject) => {
        TweenLite.set(this.element, {
          display: 'table',
          visibility: 'visible',
          opacity: 0,
        });
        TweenLite.to(this.element, 0.25, {
          opacity: 1,
          onCompleteScope: this,
          onComplete() {
            resolve(this);
          },
        });
      });
    },

    hide() {
      return new Promise((resolve, reject) => {
        TweenLite.to(this.element, 0.35, {
          opacity: 0,
          onCompleteScope: this,
          onComplete() {
            TweenLite.set(this.element, {
              display: 'none',
              visibility: 'hidden',
            });
            resolve(this);
          },
        });
      });
    },
  };

  // # view control
  // http://barbajs.org/
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const ViewControl = {
    init() {
      // setup DOM parsing variables for Barba.js
      Barba.Pjax.Dom.wrapperId = 'mainframe-wp';
      Barba.Pjax.Dom.containerClass = 'mainframe';
      Barba.Pjax.Dom.dataNamespace = 'template';
      Barba.Pjax.ignoreClassLink = 'no-frame-load';
      // initialise internal processes
      return new Promise((resolve, reject) => {
        this.templates.init();
        this.transitions.init();
        Barba.Pjax.start();
        resolve(this);
      });
    },

    isFirst() {
      return Barba.HistoryManager.prevStatus() === null;
    },

    getCurrURL() {
      return Barba.Pjax.getCurrentUrl();
    },

    getCurrUID() {
      return document.getElementsByClassName(Barba.Pjax.Dom.containerClass)[0]
        .dataset.uid;
    },

    onRequested(callback) {
      Barba.Dispatcher.on('linkClicked', () => { callback(); });
    },

    onChange(callback) {
      Barba.Dispatcher.on('initStateChange', () => { callback(); });
    },

    onReady(callback) {
      Barba.Dispatcher.on('newPageReady', () => { callback(); });
    },

    onComplete(callback) {
      Barba.Dispatcher.on('transitionCompleted', () => { callback(); });
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
            const wrapper = Barba.Pjax.Dom.getWrapper();
            wrapper.style.overflow = 'hidden';
            TweenLite.set(wrapper, {
              height: this.oldContainer.offsetHeight,
            });

            // resolve processes
            Promise
              .all([this.newContainerLoading, this.hideOld()])
              .then(this.showNew.bind(this));
          },

          hideOld() {
            return new Promise((resolve) => {
              TweenLite.to(this.oldContainer, 0.15, {
                opacity: 0,
                onComplete() {
                  resolve(true);
                },
              });
            });
          },

          showNew() {
            // prevent page jump during transition,
            // animate wrapper height to newContent height
            const wrapper = Barba.Pjax.Dom.getWrapper();
            const wrapperResizeDuration = 0.15;
            TweenLite.to(wrapper, wrapperResizeDuration, {
              height: this.newContainer.offsetHeight,
              onComplete() {
                wrapper.style.overflow = 'visible';
                wrapper.style.height = null;
              },
            });

            // remove old container and
            // transit in new container
            this.oldContainer.style.display = 'none';
            TweenLite.set(this.newContainer, {
              visibility: 'visible',
              opacity: 0,
            });
            TweenLite.to(this.newContainer, 0.1, {
              opacity: 1,
              delay: wrapperResizeDuration,
              onCompleteScope: this,
              onComplete() {
                this.done();
              },
            });
          },
        }),
      },

      assignments: {},
      assign(name, transitionKey) {
        this.assignments[name] = transitionKey;
      },

      init() {
        Barba.Pjax.getTransition = () => {
          const currViewName = Barba.HistoryManager.prevStatus().namespace;
          if (Object.hasOwnProperty.call(this.assignments, currViewName)) {
            const transitionKey = this.assignments[currViewName];
            return this.store[transitionKey];
          }
          return this.store.fade;
        };
      },
    },

    //////////////////////////////
    // sub-module:
    // # templates
    //////////////////////////////
    templates: {
      store: {},
      pushModel(name) {
        this.store[name] = Barba.BaseView.extend({
          namespace: name,
          onEnter() {},
          onEnterCompleted() {},
          onLeave() {},
          onLeaveCompleted() {},
        });
      },

      getModel(name) {
        return this.store[name];
      },

      getCurrModelName() {
        return Barba.HistoryManager.currentStatus().namespace;
      },

      init() {
        Object.keys(this.store)
          .forEach((model) => {
            this.store[model].init();
          });
      },
    },
  };

  // # navigation control
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const NavControl = {
    links: Array.from(document.getElementsByClassName('nav-a')),

    enable() {
      const list = this.links
        .filter(link => !link.href.length);
      list.forEach((link) => {
        // demote active links to default state
        if (link.dataset.href) {
          link.href = link.dataset.href;
          link.removeAttribute('data-href');
        }
      });
    },

    disable(UID) {
      const list = this.links
        .filter(link => link.dataset.controls === UID);
      list.forEach((link) => {
        // promote matched 'named' links to active state
        link.dataset.href = link.href;
        link.removeAttribute('href');
      });
    },
  };

  // # page ready
  // document has finished loading and the document has been parsed
  // but sub-resources such as images, stylesheets and frames are still loading
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  function PageReady() {
    return new Promise((resolve, reject) => {
      resolve(this);
    });
  }

  // # page complete
  // document and all sub-resources have finished loading,
  // state indicates that the load event is about to fire
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  function PageComplete() {
    return new Promise((resolve, reject) => {
      const complete = setInterval(() => {
        if (document.readyState === 'complete') {
          resolve(this);
          clearInterval(complete);
        }
      }, 100);
    });
  }

  // # contexts
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  // # global
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const preLoader = new Loader('pre-loader');
  const loader = new Loader('loader');

  ViewControl.onRequested(() => {
    console.log('view is requested'); // !DEBUG
  });

  ViewControl.onChange(() => {
    console.log('view is changing'); // !DEBUG
    // subsequent view loads
    if (!ViewControl.isFirst()) {
      // track new page analytics
      PushPageView(ViewControl.getCurrURL());
      // show loader
      loader.show();
    }
  });

  ViewControl.onReady(() => {
    console.log('view is ready'); // !DEBUG
    // polyfill <picture> element
    picturefill();
  });

  ViewControl.onComplete(() => {
    console.log('view is complete'); // !DEBUG
    // start views at top
    if (!PageScroll.isTop()) {
      PageScroll.toTop();
    }

    // toggle navigation links
    NavControl.enable();
    NavControl.disable(ViewControl.getCurrUID());

    // initial view load
    if (ViewControl.isFirst()) {
      // hide pre-loader
      preLoader.hide().then(() => {
        // enable page scroll
        PageScroll.enable();
      });

    // subsequent view loads
    } else {
      // hide loader
      loader.hide();
    }
  });

  // # template
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  //////////////////////////////
  // # index template
  //////////////////////////////
  ViewControl.templates.pushModel('index');
  ViewControl.transitions.assign('index', 'fade');

  const indexView = ViewControl.templates.getModel('index');
  indexView.onEnter = () => {
    console.log('index view is entering'); // !DEBUG
  };

  indexView.onEnterCompleted = () => {
    console.log('index view has entered'); // !DEBUG
  };

  indexView.onLeave = () => {
    console.log('index view is leaving'); // !DEBUG
  };

  indexView.onLeaveCompleted = () => {
    console.log('index view has left'); // !DEBUG
  };


  // # processes
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  PageReady()
    .then(() => {
      console.log('page is interactive'); // !DEBUG
      ViewControl.init();
    });

  PageComplete()
    .then(() => {
      console.log('page is complete'); // !DEBUG
    });
}
