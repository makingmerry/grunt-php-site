// architecture
// |- configurations
//   |- eslint /
//   |- webfont /
// |- modules
//   |- font loader (ref to google documentation) /
//   |- analytics (ref to google doucmentation)
//   |- page scroll (TBC)
//   |- preloader
//   |- view control /
//   |- page ready
//   |- page complete
// |- contexts
//   |- view
//     |- transitions
//       |- [namespace]
//     |- processes
//       |- general
//         |- view requested
//         |- view pre-change
//         |- view ready
//         |- view complete
//       |- [namespace]
//         |- view ready
//         |- view complete
//         |- view leave
//         |- view remove
//   |- page ready
//   |- page complete
// |- processes
//   |- page ready
//   |- page complete

// # configurations
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// # eslint
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/* global TweenLite Barba */
/* eslint no-unused-vars: [1, {
  "args": "after-used",
  "varsIgnorePattern": "WebFontConfig",
  "argsIgnorePattern": "reject",
 }] */

// # webfont
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
const WebFontConfig = {
  custom: {
    families: [
      // '',
    ],
  },
  timeout: 2000,
};

// # modules
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// # webfont loader
// https://github.com/typekit/webfontloader
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
function WebFontLoader() {
  const wf = document.createElement('script');
  const s = document.scripts[0];
  // link to CDN for for script source,
  // documentation recommends using explicit version numbers for performance reason
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
  s.parentNode.insertBefore(wf, s);
}

// # analytics
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
const Analytics = {
  init() {

  },

  push() {

  },
};

// # page scroll
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// # preloader
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

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

  //////////////////////////////
  // # utility
  //////////////////////////////
  first() {
    return Barba.HistoryManager.prevStatus() === null;
  },

  //////////////////////////////
  // # event listeners
  //////////////////////////////
  viewRequested(callback) {
    Barba.Dispatcher.on('linkClicked', () => { callback(); });
  },

  viewPreChange(callback) {
    Barba.Dispatcher.on('initStateChange', () => { callback(); });
  },

  viewReady(callback) {
    Barba.Dispatcher.on('newPageReady', () => { callback(); });
  },

  viewComplete(callback) {
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
    push(name) {
      this.store[name] = Barba.BaseView.extend({
        namespace: name,
        onEnter() {},
        onEnterCompleted() {},
        onLeave() {},
        onLeaveCompleted() {},
      });
    },

    get(name) {
      return this.store[name];
    },

    init() {
      Object.keys(this.store).forEach((space) => {
        this.store[space].init();
      });
    },
  },
};

// # page ready
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// # page complete
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// # contexts
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// # views
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

//////////////////////////////
// # general
//////////////////////////////
ViewControl.viewRequested(() => {
  console.log('view is requested');
});

ViewControl.viewPreChange(() => {
  console.log('view is changing');
});

ViewControl.viewReady(() => {
  console.log('view is ready');
});

ViewControl.viewComplete(() => {
  console.log('view is complete');
});

//////////////////////////////
// view-specific:
// # index view
//////////////////////////////
ViewControl.namespaces.push('index');
ViewControl.transitions.assign('index', 'fade');
const indexView = ViewControl.namespaces.get('index');
indexView.onEnter = () => {
  console.log('index view on enter');
};
indexView.onEnterCompleted = () => {
  console.log('index view fully entered');
};
indexView.onLeave = () => {
  console.log('index view leaving');
};
indexView.onLeaveCompleted = () => {
  console.log('index view left');
};

// # page ready
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// # page complete
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


// # processes
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
WebFontLoader();
ViewControl.init()
  .then((data) => {
    console.log('view control initialised');
  });


// # global configurations
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// // # Web Font Loader configurations
// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////
// const WebFontConfig = {
//   custom: {
//     families: [
//       // '',
//     ],
//   },
//   timeout: 2000,
// };

// (() => {
//   // 'use strict'; // 'use strict' is unnecessary inside of modules — ESLint

//   // # modules
//   //////////////////////////////////////////////////////////////////////////////////////////
//   //////////////////////////////////////////////////////////////////////////////////////////
//   //////////////////////////////////////////////////////////////////////////////////////////

//   // # Web Font Loader
//   // Load linked fonts using @font-face with added control – Web Font Loader, Typekit & Google
//   // https://github.com/typekit/webfontloader
//   ////////////////////////////////////////////////////////////
//   ////////////////////////////////////////////////////////////
//   function initWebFonts() {
//     const wf = document.createElement('script');
//     const s = document.scripts[0];

//     // Link to CDN for for script source,
//     // documentation recommends using explicit version numbers for performance reason
//     wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
//     s.parentNode.insertBefore(wf, s);
//   }

//   // # Preloader
//   //
//   // Ease in initial page content
//   ////////////////////////////////////////////////////////////
//   ////////////////////////////////////////////////////////////
//   const Preloader = {
//     el: document.getElementsByClassName('preloader')[0],
//     body: document.getElementsByTagName('body')[0],
//     state: {
//       active: true,
//     },

//     //////////////////////////////
//     // # Stop page scrolling
//     //////////////////////////////
//     stopScroll() {
//       const obj = this;
//       obj.body.style.overflow = 'hidden';
//     },

//     //////////////////////////////
//     // # Start (allow) page scrolling
//     //////////////////////////////
//     startScroll() {
//       const obj = this;
//       obj.body.style.overflow = 'auto';
//     },

//     //////////////////////////////
//     // # Open
//     //////////////////////////////
//     open() {
//       const obj = this;
//       // Restrict page content viewing
//       obj.stopScroll();
//       obj.state.active = true;
//       // Transit in preloader
//       TweenLite.set(obj.el, {
//         display: 'table',
//         visibility: 'visible',
//         opacity: 0,
//       });
//       TweenLite.to(obj.el, 0.35, {
//         opacity: 1,
//       });
//     },

//     //////////////////////////////
//     // # Close
//     //////////////////////////////
//     close() {
//       const obj = this;
//       // Transit out preloader
//       TweenLite.to(obj.el, 0.5, {
//         opacity: 0,
//         onComplete() {
//           TweenLite.set(obj.el, {
//             display: 'none',
//             visibility: 'hidden',
//           });
//           // Allow page content viewing
//           obj.startScroll();
//           obj.state.active = false;
//         },
//       });
//     },

//     //////////////////////////////
//     // # Toggle
//     //////////////////////////////
//     toggle() {
//       const obj = this;
//       if (obj.state.active) {
//         obj.close();
//       } else {
//         obj.open();
//       }
//     },
//   };

//   // # View Controller
//   // - Barba.js utility
//   // - http://barbajs.org/
//   //
//   // Utilising Pushstate AJAX (or PJAX) to simuluate a SPA-type navigation
//   ////////////////////////////////////////////////////////////
//   ////////////////////////////////////////////////////////////
//   const ViewController = {
//     //////////////////////////////
//     // # Initialise
//     //////////////////////////////
//     init() {
//       // Update DOM parsing variables
//       Barba.Pjax.Dom.wrapperId = 'mainframe-wp';
//       Barba.Pjax.Dom.containerClass = 'mainframe';
//       Barba.Pjax.ignoreClassLink = 'no-frame-load';
//       // Processes
//       const obj = this;
//       obj.initAnalytics();
//       obj.initTransitions();
//       obj.initActions();
//     },

//     //////////////////////////////
//     // # Initialise analytics
//     // Track new pages loaded in timeline
//     //////////////////////////////
//     initAnalytics() {
//       Barba.Dispatcher.on('initStateChange', () => {
//         if (Barba.HistoryManager.prevStatus() !== null) {
//           // Google analytics SPA tracking
//           // - https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
//           // ga('set', 'page', Barba.Pjax.getCurrentUrl());
//           // ga('send', 'pageview');
//         }
//       });
//     },

//     //////////////////////////////
//     // # Transitions
//     // Custom transitions
//     //////////////////////////////
//     transitions: {
//       //////////////////////////////
//       // # Fade in-out
//       //////////////////////////////
//       fade: Barba.BaseTransition.extend({
//         //////////////////////////////
//         // # Start
//         //////////////////////////////
//         start() {
//           const obj = this;
//           Promise
//             .all([obj.newContainerLoading, obj.hideOld()])
//             .then(obj.showNew.bind(this));
//         },

//         //////////////////////////////
//         // # Hide old content
//         //////////////////////////////
//         hideOld() {
//           // Animate out current content and fulfill promise
//           const obj = this;
//           return new Promise((resolve) => {
//             TweenLite.to(obj.oldContainer, 0.15, {
//               opacity: 0,
//               onComplete() {
//                 resolve(true);
//               },
//             });
//           });
//         },

//         //////////////////////////////
//         // # Show new content
//         //////////////////////////////
//         showNew() {
//           const obj = this;
//           // Hide old content
//           obj.oldContainer.style.display = 'none';
//           // Animate in new content and fulfill promise
//           TweenLite.set(obj.newContainer, {
//             visibility: 'visible',
//             opacity: 0,
//           });
//           TweenLite.to(this.newContainer, 0.15, {
//             opacity: 1,
//             onComplete() {
//               obj.done();
//             },
//           });
//         },
//       }),
//     },

//     //////////////////////////////
//     // # Initialise transitions
//     // Process view-specific transitions if required,
//     // defaults to fade in-out
//     //////////////////////////////
//     initTransitions() {
//       const obj = this;
//       Barba.Pjax.getTransition = () => {
//         // Get transition based on current namespace
//         switch (Barba.HistoryManager.prevStatus().namespace) {
//           case 'index': return obj.transitions.fade;
//           default: return obj.transitions.fade;
//         }
//       };
//     },

//     //////////////////////////////
//     // # Initialise actions
//     // Process view-specific and step-specific actions
//     // - http://barbajs.org/views.html
//     //////////////////////////////
//     initActions() {
//       const list = {
//         // Index view
//         index: Barba.BaseView.extend({
//           namespace: 'index',
//           onEnter() {
//             // New container is ready and attached to DOM
//           },
//           onEnterCompleted() {
//             // Transition is complete
//           },
//           onLeave() {
//             // New transition to a new page has started
//           },
//           onLeaveCompleted() {
//             // Current container removed from DOM
//           },
//         }),
//       };

//       Object.keys(list).forEach((view) => {
//         list[view].init();
//       });
//     },
//   };


//   // # PROCESS: on load
//   //////////////////////////////////////////////////////////////////////////////////////////
//   //////////////////////////////////////////////////////////////////////////////////////////
//   //////////////////////////////////////////////////////////////////////////////////////////

//   // Web Font Loader
//   initWebFonts();
//   // Preloader
//   Preloader.toggle();


//   // # PROCESS: on complete
//   //
//   // Post-CSSOM load – ensures styles are applied first before executing functions
//   //////////////////////////////////////////////////////////////////////////////////////////
//   //////////////////////////////////////////////////////////////////////////////////////////
//   //////////////////////////////////////////////////////////////////////////////////////////

//   const complete = setInterval(() => {
//     if (document.readyState === 'complete') {
//       // View Controller
//       ViewController.init();
//       Barba.Pjax.start();

//       clearInterval(complete);
//     }
//   }, 100);
// })();
