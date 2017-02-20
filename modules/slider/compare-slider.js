var CompareSlider = {};

CompareSlider.config = {
  selector: {
    slider: ".j-compare-slider",
    left: ".j-compare-slider .compare-window-left",
    right: '.j-compare-slider .compare-window-right',
    items: '.j-compare-slider .compare-item',
    container: '.j-compare-slider .compare-window-div'
  }
};

(function($, exports) {
  var config = exports.config,
      selector = exports.config.selector,
      widthItem = 0,
      position = 0,
      count = 0,
      visible = 3;

  function attachEvents() {
    count = $(selector.items).length;
    widthItem = $(selector.items).eq(0).width();

    if (count > visible) $(selector.right).addClass('_active');

    $(selector.right).on('click', function() {
      var right_side = position + visible;
      if (right_side < count) {
        position++;
        right_side++;
        updateSlider(position);
      }
      if (right_side == count) $(selector.right).removeClass('_active');
      $(selector.left).addClass('_active');
      return false;
    });

    $(selector.left).on('click', function() {
      if (position > 0) {
        position--;
        updateSlider(position);
      }
      if (position == 0) $(selector.left).removeClass('_active');
      $(selector.right).addClass('_active');
      return false;
    });
  }

  function updateSlider(position) {
    var px = position*widthItem;
    console.log($(selector.container));
    $(selector.container).css({
      'transform': 'translate(-'+px+'px, 0)'
    })
  }

  exports.init = function() {
    attachEvents();
  }
})(jQuery, CompareSlider);
