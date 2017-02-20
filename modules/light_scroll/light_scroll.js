var LightScroll = {};

LightScroll.config = {
  selector: '.j-light-scroll'
};

(function($, exports) {
  var selector = exports.config.selector;

  var init = function() {
    attachEvent();
  };

  var attachEvent = function() {
    $(selector).on('click', function() {
      var link = $(this).attr('href');

      $('html, body').animate({
        scrollTop: $(link).offset().top
      }, 600);
    });
  };

  exports.init = init;
})(jQuery, LightScroll);
