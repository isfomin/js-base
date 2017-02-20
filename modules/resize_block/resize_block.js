var ResizeBlock = {};

ResizeBlock.config = {
  selector: {
    block: '.j-resize'
  }
};

(function($, exports) {
  var selector = exports.config.selector;

  function attachEvent() {
    $(window).on('resize', function() {
      updateBlocks();
    });
  }

  function updateBlocks() {
    $(selector.block).each(function() {
      var original_width = $(this).data('original-width'),
          original_height = $(this).data('original-height'),
          width = $(this).width();

      var height = width * original_height / original_width;
      $(this).height(height);
    });
  }

  exports.init = function() {
    attachEvent();
    updateBlocks();
  }
})(jQuery, ResizeBlock);
