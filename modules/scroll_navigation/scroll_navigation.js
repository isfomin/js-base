var ScrollNavigation = {};

ScrollNavigation.config = {
  selector: {
    container: '.j-scroll-navigation',
    items: '.j-scroll-navigation a'
  },
  offset: 5,
  useTop: true
};

(function($, exports) {
  var selector = exports.config.selector,
      config = exports.config;

  var init = function() {
    attachOnScroll();
    updateDashes( $(document).scrollTop() );
  };

  var getSections = function() {
    var sections = [];

    $(selector.items).each(function() {
      sections.push( $(this).attr('href') );
    });
    return sections;
  };

  var getSectionsAndPx = function() {
    var sections = getSections(),
        data = [];

    $.each(sections, function(i, section) {
      var top = $(section).offset().top,
          bottom = $(section).offset().top + $(section).height();
      data.push({
        id: section,
        top: top,
        bottom: bottom
      });
    });

    return data;
  };

  var attachOnScroll = function() {
    $(document).on('scroll', function() {
      var windowPosition = $(this).scrollTop();
      updateDashes(windowPosition);
    });
  };

  var updateDashes = function(windowPosition) {
    var sections = getSectionsAndPx();
    var activeSection = getActiveSection(windowPosition + config.offset, sections);
    $(selector.items).removeClass('_active');
    $(selector.items + '[href="' + activeSection.id + '"]').addClass('_active');
  };

  var getActiveSection = function(windowPosition, sections) {
    var previewSectionPx = 0,
        activeSectionNumber = -1;

    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      if (previewSectionPx <= windowPosition && windowPosition < section.top) {
        if (previewSectionPx == 0 && !config.useTop) {
          activeSectionNumber = -1;
        } else {
          activeSectionNumber = i - 1;
        }
        break;
      } else if (i == (sections.length - 1) && windowPosition < section.bottom) {
        activeSectionNumber = i;
        break;
      }
      previewSectionPx = section.top;
    }
    if (activeSectionNumber == -1) {
      return false;
    } else {
      return sections[activeSectionNumber];
    }
  };

  exports.init = init;
})(jQuery, ScrollNavigation);
