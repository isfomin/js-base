var Tabs = {};

(function($, exports) {
    var activeClass = 'active',
        element = '.js-tab',
        elementContent = '.js-content';

    function init() {
        $(element).on('click', function() {
            var target = $(this).attr('href');

            $(element).each(function() {
                var activeClass = getActiveClass(this);
                $(this).parent().removeClass(activeClass);
            });
            $(elementContent).each(removeActiveClass);

            $(this).parent().addClass( getActiveClass(this) );
            $(target).addClass( getActiveClass(target) );
            return false;
        });
    }

    function getActiveClass(item) {
        var prefix = $(item).data('prefix');
        return prefix ? prefix + '-' + activeClass : activeClass;
    }

    function removeActiveClass() {
        var activeClass = getActiveClass($(this));
        $(this).removeClass(activeClass);
    }

    exports.activeClass = activeClass;
    exports.element = element;
    exports.elementContent = elementContent;
    exports.init = init;

})(jQuery, Tabs);