var Tabs = {};

Tabs.config = {
  selector: {
    tabs: '.j-tabs',
    button: '.j-tabs .sf-tabs__button',
    section: '.j-tabs .sf-tabs__section'
  }
};

(function($, exports) {

  var selector = exports.config.selector;

  function attachEvent() {
    $(selector.button).on('click', function() {
      console.log(this);
      changeTab($(this));
      return false;
    });
  }

  function changeTab($button) {
    var $section = $( $button.attr('href') );
    $(selector.button).removeClass('_active');
    $(selector.section).removeClass('_show');

    $button.addClass('_active');
    $section.addClass('_show');
  }

  exports.init = function() {
    attachEvent();

  }

})(jQuery, Tabs);
