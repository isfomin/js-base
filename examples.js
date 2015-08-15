// ==================================================
//  loadMap
// ==================================================
loadMap('ymap', {
  center: [57.153033, 65.534328],
  zoom: 14,
  controls: ['zoomControl']
}, function(map) {
  // Отключение скрола колесиком
  map.behaviors.disable('scrollZoom');

  // Шаблон метки
  var objectContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div class="card card-label shadow shadow-card">' +
      '<div class="card-view">' +
        '<img src="{{ properties.imgPath }}" alt="" class="card-img">' +
      '</div>' +
      '<div class="card-title">' +
        '<div class="card-button button button-thin button-quail button-rounded button-block">{{ properties.name }}</div>' +
      '</div>' +
    '</div>');

  // Создание коллекции с новым шаблоном
  var objectCollection = new ymaps.GeoObjectCollection({}, {
    iconLayout: objectContentLayout,
    // Активная область
    iconShape: {
      type: 'Rectangle',
      coordinates: [
          [-68, -105], [69, 1]
      ]
    }
  });

  // Создание метки с новым шаблоном 
  var placemark = new ymaps.Placemark([57.09833796, 65.60341243], 
    {
      imgPath: 'images/temp/pic-object4.jpg',
      name: 'ЖК Соло'
    },
    {
      iconLayout: objectContentLayout
    }
  );

  $('.set-center').on('click', function() {
    map.setCenter([12.433, 15.242]);
  });
});


// ==================================================
//  Front carousel
// ==================================================
var countSlide=$('.carousel li').length;
  
$('.typepage-text-about').find(".jcarousel").each(function() {
  var jcarouselContent = $(this);
        jcarouselContent        
          .jcarousel({
              wrap: 'circular',
          animation: {
              duration: 800,
              easing:   'easeInOutExpo'
      }})
      .jcarouselAutoscroll({
            interval: 3000,
            target: '+=1',
            autostart: true
        });
});

if (countSlide>1) {
  
  var paginationContainer=$('.jcarousel-pagination');
  var paginationHTML='';
  var i=1;
  while(i<=countSlide) {
    paginationHTML+='<a href="#'+i+'"></a>';
    i++;
  }
  paginationContainer.html(paginationHTML);
  var width=document.body.offsetWidth;
  if (width<1000)
    width=1000;
  $('.front-slider .jcarousel-front').css("width", width);
  $('.front-slider .jcarousel-front li').css("width", width); 

  var jcarousel = $('.front-slider .jcarousel-front');
      
  jcarousel
    .on('jcarousel:reload jcarousel:create', function () {
      width = document.body.offsetWidth;
      if (width>=1000) {
            width = document.body.offsetWidth;
        } else {
          width=1000;
        }
        jcarousel.jcarousel('items').css('width', width + 'px');
          $('.front-slider .jcarousel-front').css("width", width);
          $('.front-slider .jcarousel-front span').css("width", width);
          
      })        
    .jcarousel({
        wrap: 'circular',
        animation: {
          duration: 800,
          easing:   'easeInOutExpo'
      }})
    .jcarouselAutoscroll({
      interval: 7000,
      target: '+=1',
      autostart: true
    });

  $('.jcarousel-control-prev')
    .on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
    })
    .jcarouselControl({
        target: '-=1'
    });

  $('.jcarousel-control-next')
    .on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
    })
    .jcarouselControl({
        target: '+=1'
    });

  $('.jcarousel-pagination')
    .on('jcarouselpagination:active', 'a', function() {
        $(this).addClass('active');
    })
    .on('jcarouselpagination:inactive', 'a', function() {
        $(this).removeClass('active');
    })
    .jcarouselPagination();
}

// ==================================================
//  jCarousel module
// ==================================================
(function($) {

  $(function() {
    $(".js-jcarousel").each(function() {
      var config = initConfiguration( $(this) );

      $(this).children('.carousel-scene').jcarousel( config );

      controlConfiguration( $(this) );
    });
  });

  /* Используя классы или айди, идентифицируем элементы и их конфигурируем. */
  function initConfiguration( node ) {
    var config = {};

    if ( node.hasClass('js-jcarousel-front') ) {
      
    }
    if ( node.hasClass('js-jcarousel-basic') ) {
    } 
    // инициализация для других слайдров

    return config;
  }

  /* Используя классы или айди, идентифицируем элементы и их конфигурируем. */
  function controlConfiguration( node ) {
    if ( node.hasClass('js-jcarousel-front') ) {
      attachButtons( node );
      attachNavigation( node );
    }
    if ( node.hasClass('js-jcarousel-basic') ) {
      attachButtons( node );
    }
    
    // контролы для других слайдеров
  }

  function connectSliders( navigationCarousel, controlingCarousel ) {

    var connector = function(itemNavigation, controlingCarousel) {
      return controlingCarousel.jcarousel('items').eq(itemNavigation.index());
    };

    navigationCarousel.jcarousel('items').each(function() {
      var item = $(this);

      // This is where we actually connect to items.
      var target = connector(item, controlingCarousel);

      item
        .on('jcarouselcontrol:active', function() {
          navigationCarousel.jcarousel('scrollIntoView', this);
          item.addClass('active');
        })
        .on('jcarouselcontrol:inactive', function() {
          item.removeClass('active');
        })
        .jcarouselControl({
          target: target,
          carousel: controlingCarousel
        });
    });
  }

  function attachButtons( node ) {
    node.find('.js-carousel-control-prev')
      .on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
      })
      .jcarouselControl({
        target: '-=1'
      });

    node.find('.js-carousel-control-next')
      .on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
      })
      .jcarouselControl({
        target: '+=1'
      });
  }

  function attachNavigation( node ) {
    node.find('.js-carousel-nav')
      .on('jcarouselpagination:active', 'div', function() {
          $(this).addClass('active');
      })
      .on('jcarouselpagination:inactive', 'div', function() {
          $(this).removeClass('active');
      })
      .jcarouselPagination({
        item: function(page, carouselItems) {
          return '<div class="control-i"></div>';
        }
      });
  }

  function updateCarouselWidth( node ) {
    var itemWidth = document.body.offsetWidth;
    node.find('.carousel-item').css('width', itemWidth);
    node.find('.carousel-scene').css('width', itemWidth);
  }

})(jQuery);

// ==================================================
//  ui-slider module
// ==================================================
(function($) {

  $(function() {
    $('.js-ui-slider').each(function() {
      var config = getConfig( $(this) );
      $(this).slider( config );
      syncValues( $(this) );
    });
  });

  function getConfig( slider ) {
    var config = {};

    /* Используя классы или айди, идентифицируем элементы и их конфигурируем. */
    if ( slider.hasClass('js-ui-slider-range') ) {

      var minValue = parseInt(slider.attr('data-min-value')) || 0,
          maxValue = parseInt(slider.attr('data-max-value')) || 100,
          leftValue = parseInt(slider.attr('data-left-value')) || minValue,
          rightValue = parseInt(slider.attr('data-right-value')) || maxValue;

      config = {
        range: true,
        min: minValue,
        max: maxValue,
        values: [leftValue, rightValue],
        animate: 1,
        create: function( event, ui ) {
          drawValues(slider, leftValue, rightValue);
        },
        slide: function( event, ui ) {
          drawValues(slider, ui.values[0], ui.values[1]);
        }
      };

    } else if ( slider.attr('id') == 'slider-range-price' ) {

      config = {
        range: true,
        min: 1,
        max: 10,
        values: [2, 9],
        animate: 1,
        create: function( event, ui ) {
          drawValues(slider, 2, 9);
        },
        slide: function( event, ui ) {
          drawValues(slider, ui.values[0], ui.values[1]);
        }
      };

    }

    return config;
  }

  function drawValues( slider, v1, v2 ) {
    slider.closest('.js-ui-slider-item').find('.js-ui-slider-min-value').val( v1 );
    slider.closest('.js-ui-slider-item').find('.js-ui-slider-max-value').val( v2 );
  }

  function syncValues( slider ) {
    var minValueInput = slider.closest('.js-ui-slider-item').find('.js-ui-slider-min-value'),
        maxValueInput = slider.closest('.js-ui-slider-item').find('.js-ui-slider-max-value');
    
    minValueInput.change( updateSlider );
    maxValueInput.change( updateSlider );

    function updateSlider() {
      var v1 = minValueInput.val(),
          v2 = maxValueInput.val();

      slider.slider('option', 'values', [v1, v2]);
    }
  }

})(jQuery);

// ==================================================
//  Fancybox image
// ==================================================
$(".fancybox").fancybox({
  openEffect : 'elastic',
  openSpeed  : 150,
  closeEffect : 'elastic',
  closeSpeed  : 150,
  closeClick : true,
  helpers : {
  }
});

// ==================================================
//  Fancybox html
// ==================================================
$('.fancybox_html').each(function() {
  var className = $(this).data("class");
  var title = $(this).data("title");
  var description = $(this).data("description");
  
  if (title!=undefined)
    title='<div class="popup-title">'+title+'</div>';
  else
    title='';

  if (description!=undefined)
    description='<div class="popup-description">'+description+'</div>';
  else
    description='';

  $(this).fancybox({tpl: {
      live:true,
      wrap     : '<div class="fancybox-wrap '+className+'" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner">'+title+description+'</div></div></div></div>'
    }
  });
});

// ==================================================
//  ui-tooltip
// ==================================================
(function($) {

  $( document ).tooltip({
    position: {
      my: "center bottom-10",
      at: "right+20 top"
    }
  });

})(jQuery);

// ==================================================
//  ...
// ==================================================