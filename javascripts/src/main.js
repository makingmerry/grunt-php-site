// $(window).on('scroll', function() {
//   console.log($(window).scrollTop());

//   if ($(window).scrollTop() > 1000) {
//     $('html, body').css('overflow', 'hidden');

//     $(window).on('touchstart', function(e) {
//       // e.preventDefault();
//       return false;
//     });

//     $(window).on('touchmove', function(e) {
//       // e.preventDefault();
//       return false;
//     });
//   }
// });

var disable = true;

$('.test-btn').on('click', function() {
  if (disable) {
    $(this).css('background', 'brown');
    $('html, body')
      .css('overflow', 'hidden')
      .on('touchmove', false);
    disable = false;

  } else {
    $(this).css('background', 'lavender');
    $('html, body')
      .css('overflow', 'auto')
      .off('touchmove', false);
    disable = true;
  }
});