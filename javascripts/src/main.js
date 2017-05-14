(function () {
  'use strict';

  // # on load
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // # web font loader
  //
  // Load linked fonts using @font-face with added control – Web Font Loader, Typekit & Google
  // https://github.com/typekit/webfontloader
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  const WebFontConfig = {
    custom: {
      families: [
        // '',
      ]
    }
  };

  function initWebFonts() {
    const wf = document.createElement('script');
    const s  = document.scripts[0];

    // link to CDN for for script source,
    // documentation recommends using explicit version numbers for performance reason
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
    s.parentNode.insertBefore(wf, s);
  }


  // # preloader
  //
  // Ease in initial page content
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  function Preloader(El) {
    //////////////////////////////
    // # variables
    //////////////////////////////
    this.el     = document.getElementsByClassName(El)[0];
    this.body   = document.getElementsByTagName('body')[0];
    this.state  = {
      active: true
    };

    //////////////////////////////
    // # stop page scrolling
    //////////////////////////////
    this.stopScroll = function() {
      const obj = this;
      obj.body.style.overflow = 'hidden';
    };

    //////////////////////////////
    // # start page scrolling
    //////////////////////////////
    this.startScroll = function() {
      const obj = this;
      obj.body.style.overflow = 'auto';
    };

    //////////////////////////////
    // # open preloader
    //////////////////////////////
    this.open = function() {
      const obj = this;
      const el  = obj.el;
      // restrict page content viewing
      obj.stopScroll();
      obj.state.active = true;
      // transit in preloader
      TweenLite.set(el, {
        display   : 'table',
        visibility: 'visible',
        opacity   : 0
      });
      TweenLite.to(el, 0.35, {
        opacity: 1
      });
    };

    //////////////////////////////
    // # close preloader
    //////////////////////////////
    this.close = function() {
      const obj = this;
      const el  = obj.el;
      // transit out preloader
      TweenLite.to(el, 0.5, {
        opacity   : 0,
        onComplete: function() {
          TweenLite.set(el, {
            display   : 'none',
            visibility: 'hidden'
          });
          // allow page content viewing
          obj.startScroll();
          obj.state.active = false;
        }
      });
    };

    //////////////////////////////
    // # toggle preloader based on state
    //////////////////////////////
    this.toggle = function() {
      const obj = this;
      if (obj.state.active) {
        obj.close();
      } else {
        obj.open();
      }
    };
  }


  // # instances
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  //////////////////////////////
  // # web font loader
  //////////////////////////////
  initWebFonts();

  //////////////////////////////
  // # preloader
  //////////////////////////////
  const preloader = new Preloader('preloader');
  preloader.toggle();



  // # on complete
  //
  // Post-CSSOM load – ensures styles are applied first before executing functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  function DomComplete() {

    // # page transitions
    // - Barba.js utility
    // - http://barbajs.org/
    //
    // Utilising Pushstate AJAX (or PJAX) to simuluate a SPA-type navigation
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    //////////////////////////////
    // # update DOM parsing variables
    //////////////////////////////
    Barba.Pjax.Dom.wrapperId      = 'mainframe-wrap';
    Barba.Pjax.Dom.containerClass = 'mainframe';
    Barba.Pjax.ignoreClassLink    = 'no-frame-load';

    //////////////////////////////
    // # set up analytics tracking
    //
    // track new pages loaded in timeline
    //////////////////////////////
    Barba.Dispatcher.on('initStateChange', function() {
      if (Barba.HistoryManager.prevStatus() === null) {
        // google analytics SPA tracking
        // - https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
        // ga('set', 'page', Barba.Pjax.getCurrentUrl());
        // ga('send', 'pageview');
      }
    });

    //////////////////////////////
    // # define transitions
    // - http://barbajs.org/transition.html
    //////////////////////////////
    const pgFrameTransitions = {
      // fade out-in
      fade: Barba.BaseTransition.extend({
        //////////////////////////////
        // # initialise
        //
        // required, controller for managing content from
        // fetching, rendering and adding new content
        //////////////////////////////
        start: function() {
          const obj = this;
          Promise
            .all([obj.newContainerLoading, obj.hideOld()])
            .then(obj.showNew.bind(this));
        },

        //////////////////////////////
        // # fade in transition panel to hide current content
        //////////////////////////////
        hideOld: function() {
          // animate out current content and fulfill promise
          const obj = this;
          return new Promise((resolve, reject) => {
            TweenLite.to(obj.oldContainer, 0.15, {
              opacity   : 0,
              onComplete: function() {
                resolve(true);
              }
            });
          });
        },

        //////////////////////////////
        // # fade out transition panel to show new content
        //////////////////////////////
        showNew: function() {
          const obj = this;
          // hide old content
          obj.oldContainer.style.display = 'none';
          // animate in new content and fulfill promise
          TweenLite.set(obj.newContainer, {
            visibility: 'visible',
            opacity   : 0
          });
          TweenLite.to(this.newContainer, 0.15, {
            opacity: 1,
            onComplete: function() {
              obj.done();
            }
          });
        }
      })
    };

    //////////////////////////////
    // # hook up custom transitions
    //////////////////////////////
    Barba.Pjax.getTransition = function() {
      // get transition based on current namespace
      switch(Barba.HistoryManager.prevStatus().namespace) {
        case 'index': return pgFrameTransitions.fade;
        default:      return pgFrameTransitions.fade;
      }
    };

    //////////////////////////////
    // # Initialise frame views
    // - http://barbajs.org/views.html
    //////////////////////////////
    // list views
    const pgFrameViews = {
      // index
      index: Barba.BaseView.extend({
        namespace: 'index',
        onEnter: function() {
          // new container is ready and attached to DOM
        },
        onEnterCompleted: function() {
          // transition is complete
        },
        onLeave: function() {
          // new transition to a new page has started
        },
        onLeaveCompleted: function() {
          // current container removed from DOM
        }
      })
    };
    // loop and initialise listed views
    const initPgFrameViews = function() {
      for (let key in pgFrameViews) {
        pgFrameViews[key].init();
      }
    };


    // # instances
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    //////////////////////////////
    // # page transitions
    //////////////////////////////
    initPgFrameViews();
    Barba.Pjax.start();
  }

  const completeInterval = setInterval(function() {
    if(document.readyState === 'complete') {
      clearInterval(completeInterval);
      DomComplete();
    }
  }, 100);
})();