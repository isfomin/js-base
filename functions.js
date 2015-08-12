// ========================================================
//	$.exist
// ========================================================
if (window.jQuery) {
	jQuery.fn.exist = function() {
		return $(this).length != 0;
	}
}

// ========================================================
//	LoadMap
// 	Координаты Тюмени: [57.153033, 65.534328]
// 	Библиотека: <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
//	Пример: example.js
// ========================================================
if (window.jQuery) {
	function loadMap(id, options, callback) {
		var map,
				promise;

		if ( !$('#' + id).exist() ) return;

		promise = (function() {		
			var dfd = new $.Deferred();

			ymaps.ready(function() {
				map = new ymaps.Map(id, options);
				return dfd.resolve();
			});

			return dfd.promise();
		})();

		$.when( promise ).done(function() {
			if (callback !== undefined)
				callback(map); 
		});
	}
}