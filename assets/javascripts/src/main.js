{
  // # configurations
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  // # eslint
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  /* global TweenLite Barba ga */

  // # modules
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  // # analytics
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  function PushPageView(Url) {
    // https://developers.google.com/analytics/devguides/...
    // ...collection/analyticsjs/single-page-applications
    if (typeof ga === 'function') {
      ga('set', 'page', Url);
      ga('send', 'pageview');
    }
  }

  // # page scroll
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const PageScroll = {
    body: document.getElementsByTagName('body')[0],

    enable() {
      this.body.style.overflow = 'auto';
    },

    disable() {
      this.body.style.overflow = 'hidden';
    },
  };

  // # pre-loader
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const Loader = {
    element: document.getElementsByClassName('loader')[0],

    show() {
      return new Promise((resolve, reject) => {
        TweenLite.set(this.element, {
          display: 'table',
          visibility: 'visible',
          opacity: 0,
        });
        TweenLite.to(this.element, 0.35, {
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
        TweenLite.to(this.element, 0.5, {
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
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const ViewControl = {
    init() {
      // setup DOM parsing variables for Barba.js
      Barba.Pjax.Dom.wrapperId = 'mainframe-wp';
      Barba.Pjax.Dom.containerClass = 'mainframe';
      Barba.Pjax.ignoreClassLink = 'no-frame-load';
      // initialise internal processes
      return new Promise((resolve, reject) => {
        this.namespaces.init();
        this.transitions.init();
        Barba.Pjax.start();
        resolve(this);
      });
    },

    isFirst() {
      return Barba.HistoryManager.prevStatus() === null;
    },

    getCurrUrl() {
      return Barba.Pjax.getCurrentUrl();
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
            this.oldContainer.style.display = 'none';
            TweenLite.set(this.newContainer, {
              visibility: 'visible',
              opacity: 0,
            });
            TweenLite.to(this.newContainer, 0.15, {
              opacity: 1,
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
    // # namespaces
    //////////////////////////////
    namespaces: {
      store: {},
      pushSpace(name) {
        this.store[name] = Barba.BaseView.extend({
          namespace: name,
          onEnter() {},
          onEnterCompleted() {},
          onLeave() {},
          onLeaveCompleted() {},
        });
      },

      getSpace(name) {
        return this.store[name];
      },

      getCurrName() {
        return Barba.HistoryManager.currentStatus().namespace;
      },

      init() {
        Object.keys(this.store)
          .forEach((space) => {
            this.store[space].init();
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

    disable(name) {
      const list = this.links
        .filter(link => link.dataset.controls === name);
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

  // # general
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  ViewControl.onRequested(() => {
    console.log('view is requested'); // !DEBUG
  });

  ViewControl.onChange(() => {
    console.log('view is changing'); // !DEBUG
    if (ViewControl.isFirst()) {
      // hide loader
      Loader.hide().then(() => {
        // enable page scroll
        PageScroll.enable();
      });
    } else {
      // track new page analytics
      PushPageView(ViewControl.getCurrUrl());
    }
  });

  ViewControl.onReady(() => {
    console.log('view is ready'); // !DEBUG
    // toggle navigation links
    NavControl.enable();
    NavControl.disable(ViewControl.namespaces.getCurrName());
  });

  ViewControl.onComplete(() => {
    console.log('view is complete'); // !DEBUG
  });

  // # view-specific
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  //////////////////////////////
  // # index view
  //////////////////////////////
  ViewControl.namespaces.pushSpace('index');
  ViewControl.transitions.assign('index', 'fade');
  const indexView = ViewControl.namespaces.getSpace('index');
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
