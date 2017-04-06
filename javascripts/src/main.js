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


  // # instances
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  //////////////////////////////
  // # web font loader
  //////////////////////////////
  initWebFonts();

})();



// # scope: document complete
//
// Post-CSSOM load – ensures styles are applied first before executing functions
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function DomComplete() {

  // # preloader
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  function Preloader(El) {
    //////////////////////////////
    // # variables
    //////////////////////////////
    this.el     = $(El);
    this.body   = $('body');
    this.option = {
      'transitionDuration': 0.5
    };
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
      TweenLite.set(obj.el, {
        display   : 'table',
        visibility: 'visible',
        opacity   : 0
      });
      TweenLite.to(obj.el, obj.option.transitionDuration, {
        opacity: 1
      });
    };

    //////////////////////////////
    // # close preloader
    //////////////////////////////
    this.close = function() {
      var obj = this;
      // transit out preloader
      TweenLite.to(obj.el, obj.option.transitionDuration, {
        opacity: 0,
        onComplete: function() {
          // update element attributes
          obj.el.css({
            display   : 'none',
            visibility: 'hidden'
          });
          // allow page scrolling
          obj.startScroll();
          // update object state
          obj.state.active = false;
        }
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
  // # preloader
  //////////////////////////////
  var preloader = new Preloader('.preloader');
  preloader.toggle();

  //////////////////////////////
  // # page transitions
  // - using Barba.js
  // http://barbajs.org/
  //////////////////////////////
var FadeTransition = Barba.BaseTransition.extend({
start: function() {
  /**
   * This function is automatically called as soon the Transition starts
   * this.newContainerLoading is a Promise for the loading of the new container
   * (Barba.js also comes with an handy Promise polyfill!)
   */

  // As soon the loading is finished and the old page is faded out, let's fade the new page
  Promise
    .all([this.newContainerLoading, this.fadeOut()])
    .then(this.fadeIn.bind(this));
},

fadeOut: function() {
  /**
   * this.oldContainer is the HTMLElement of the old Container
   */

  return $(this.oldContainer).animate({ opacity: 0 }).promise();
},

fadeIn: function() {
  /**
   * this.newContainer is the HTMLElement of the new Container
   * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
   * Please note, newContainer is available just after newContainerLoading is resolved!
   */

  var _this = this;
  var $el = $(this.newContainer);

  $(this.oldContainer).hide();

  $el.css({
    visibility : 'visible',
    opacity : 0
  });

  $el.animate({ opacity: 1 }, 400, function() {
    /**
     * Do not forget to call .done() as soon your transition is finished!
     * .done() will automatically remove from the DOM the old Container
     */

    _this.done();
  });
}
});

/**
* Next step, you have to tell Barba to use the new Transition
*/

Barba.Pjax.getTransition = function() {
/**
 * Here you can use your own logic!
 * For example you can use different Transition based on the current page or link...
 */

return FadeTransition;
};


  
  console.log('ready');
  Barba.Pjax.start();

}

var interval = setInterval(function() {
  if(document.readyState === 'complete') {
    clearInterval(interval);
    DomComplete();
  }
}, 100);