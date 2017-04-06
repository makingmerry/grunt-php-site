// # scope: global
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // # web font configurations
  // - web font loader utility
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  var WebFontConfig = {
    custom: {
      families: [
        // '',
      ]
    }
  };


  // # smart reisze
  // - jQuery utility
  //
  // Debouncing Javascript methods – resize debouncing function, John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  (function($,sr){
    var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
        var obj = this, args = arguments;
        function delayed () {
          if (!execAsap)
            func.apply(obj, args);
          timeout = null;
        }

        if (timeout)
          clearTimeout(timeout);
        else if (execAsap)
          func.apply(obj, args);

        timeout = setTimeout(delayed, threshold || 300); 
      };
    };
    // smartresize 
    jQuery.fn[sr] = function(fn){ return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
  })(jQuery,'smartresize');



// # scope: document ready
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
(function DomReady() {

  // # web font loader
  //
  // Load linked fonts using @font-face with added control – Web Font Loader, Typekit & Google
  // https://github.com/typekit/webfontloader
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  function initWebFonts() {
    var wf = document.createElement('script');
    var s  = document.scripts[0];

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
    this.el     = $(El);
    this.body   = $('body');
    this.state  = {
      active: true
    };

    //////////////////////////////
    // # stop page scrolling
    //////////////////////////////
    this.stopScroll = function() {
      var obj = this;
      obj.body.css('overflow', 'hidden');
    };

    //////////////////////////////
    // # start page scrolling
    //////////////////////////////
    this.startScroll = function() {
      var obj = this;
      obj.body.css('overflow', 'auto');
    };

    //////////////////////////////
    // # open preloader
    //////////////////////////////
    this.open = function() {
      var obj = this;
      // cease page scrolling
      obj.stopScroll();
      // update object state
      obj.state.active = true;
      // transit in preloader
      obj.el.css({
        display   : 'table',
        visibility: 'visible',
        opacity   : 0
      }).animate({
        opacity: 1
      }, 350);
    };

    //////////////////////////////
    // # close preloader
    //////////////////////////////
    this.close = function() {
      var obj = this;
      // transit out preloader
      obj.el.animate({
        opacity: 0
      }, 500, function() {
        // update element attributes
        obj.el.css({
          display   : 'none',
          visibility: 'hidden'
        });
        // allow page scrolling
        obj.startScroll();
        // update object state
        obj.state.active = false;
      });
    };

    //////////////////////////////
    // # toggle preloader based on state
    //////////////////////////////
    this.toggle = function() {
      var obj = this;
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
  var preloader = new Preloader('.preloader');
  preloader.toggle();

})();



// # scope: document complete
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
  Barba.Pjax.Dom.wrapperId = 'mainframe-wrap';
  Barba.Pjax.Dom.containerClass = 'mainframe';

  //////////////////////////////
  // # define fade transition (default)
  // - http://barbajs.org/transition.html
  //////////////////////////////
  var FadeTransition = Barba.BaseTransition.extend({
    //////////////////////////////
    // # initialise
    //
    // required, controller for managing content from
    // fetching, rendering and adding new content
    //////////////////////////////
    start: function() {
      Promise
        .all([this.newContainerLoading, this.hideOld()])
        .then(this.showNew.bind(this));
    },

    //////////////////////////////
    // # fade in transition panel to hide current content
    //////////////////////////////
    hideOld: function() {
      // animate out current content and fulfill promise
      return $(this.oldContainer).animate({
        opacity: 0
      }, 150).promise();
    },

    //////////////////////////////
    // # fade out transition panel to show new content
    //////////////////////////////
    showNew: function() {
      var obj = this;
      var el  = $(this.newContainer);
      // hide old content
      $(this.oldContainer).hide();
      // animate in new content and fulfill promise
      el.css({
        visibility: 'visible',
        opacity   : 0
      }).animate({ opacity: 1 }, 150, function() {
        obj.done();
      });
    }
  });

  //////////////////////////////
  // # hook up custom transitions
  //////////////////////////////
  Barba.Pjax.getTransition = function() {
    // define transition logics
    return FadeTransition;
  };


  // # instances
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  //////////////////////////////
  // # page transitions
  //////////////////////////////
  Barba.Pjax.start();

}

var interval = setInterval(function() {
  if(document.readyState === 'complete') {
    clearInterval(interval);
    DomComplete();
  }
}, 100);