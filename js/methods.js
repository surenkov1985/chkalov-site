function openMobile() {

	const mobile = $(".mobile");

	$("body").addClass("hidden");
	$(mobile).addClass("show");
	setTimeout(() => {
		$(".mobile__content").css({ "transform": "translate(0)" })
	}, 200);
}

function closeModal() {

	$("body").removeClass("hidden");

	$(".mobile__content").css({ "transform": "translate(100%)" })

	setTimeout(() => {
		$(".mobile").removeClass("show");
	}, 300);
}

function scrollToElement(elem) {

	$([document.documentElement, document.body]).animate({
		scrollTop: $(elem).offset().top
	}, 2000);
}

async function loadScript(src, func = false) {
	const script = document.createElement('script');
	script.src = src;
	document.body.append(script);
	if (func) script.onload = () => func();
}

$(document).ready(function () {
	// if ($('#main_map').length > 0) {
	// 	setTimeout(initMap, 500);
	// }

	loadScript(window.location.protocol + "//api-maps.yandex.ru/2.1/?lang=ru_RU", initMap.bind(this));
});
function initMap() {
	if (!document.querySelector("#main_map")) return;
	ymaps.ready(function () {
		// Карта
		var myMap = new ymaps.Map('main_map', {
			center: [59.617322, 30.383570],
			zoom: 16,
			controls: ['geolocationControl']
		});

		var myCircle = new ymaps.GeoObject({
			geometry: {
				type: "Circle",
				coordinates: [59.617322, 30.383570],
				radius: 208,

			}
		},
			{
				fillColor: '#779DFD33',
				stroke: false,
				draggable: true
			});

		myCircle.events.add('dragend', function (e) {
			// Получение ссылки на объект, который был передвинут.
			var thisPlacemark = e.get('target');
			// Определение координат метки
			var coords = thisPlacemark.geometry.getCoordinates();
			// и вывод их при щелчке на метке
			thisPlacemark.properties.set('balloonContent', coords);
		});

		// Создание меток
		var objects = [
			new ymaps.Placemark(
				[59.617322, 30.383570], {
				hintContent: '',
				balloonContent: 'ЖК Уютный'
			}, {
				// iconLayout: 'default#imageWithContent',
				// iconImageHref: '../img/map/main.png',
				iconImageSize: [37, 49],
				iconImageOffset: [-17, -43]
			}),

			// Спорт
			new ymaps.Placemark(
				[59.618969, 30.395319], {
				hintContent: '',
				balloonContent: 'Sport'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/sport.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20],
				width: 30
			}),

			// Продукты
			new ymaps.Placemark(
				[59.618180, 30.387655], {
				hintContent: '',
				balloonContent: 'Магазины'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/sales.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),
			new ymaps.Placemark(
				[59.616208, 30.375930], {
				hintContent: '',
				balloonContent: 'Мини Лента'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/sales.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),
			new ymaps.Placemark(
				[59.620055, 30.386415], {
				hintContent: '',
				balloonContent: 'Красное&Белое'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/sales.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),
			new ymaps.Placemark(
				[59.619588, 30.392435], {
				hintContent: '',
				balloonContent: 'Супермаркет "Магнит"'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/sales.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),
			new ymaps.Placemark(
				[59.620013, 30.390195], {
				hintContent: '',
				balloonContent: 'Семишагофф'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/sales.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),
			new ymaps.Placemark(
				[59.616822, 30.374272], {
				hintContent: '',
				balloonContent: 'Супермаркет "Пятёрочка"'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/sales.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),

			// ТЦ 
			new ymaps.Placemark(
				[59.616375, 30.387379], {
				hintContent: '',
				balloonContent: 'Торговый центр "Западный"'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/sales.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),
			new ymaps.Placemark(
				[59.621759, 30.388369], {
				hintContent: '',
				balloonContent: 'Торговый центр "Элиен"'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/sales.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),
			new ymaps.Placemark(
				[59.622317, 30.394570], {
				hintContent: '',
				balloonContent: ''
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/sales.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),

			// Школа
			new ymaps.Placemark(
				[59.620275, 30.381810], {
				hintContent: '',
				balloonContent: 'Коммунарская средняя общеобразовательная школа № 3'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/stud.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),
			new ymaps.Placemark(
				[59.622448, 30.389784], {
				hintContent: '',
				balloonContent: 'Коммунароская детская школа искусств'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/stud.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),


			// Медицина
			new ymaps.Placemark(
				[59.615627, 30.381152], {
				hintContent: '',
				balloonContent: 'Поликлиника'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/medic.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),
			new ymaps.Placemark(
				[59.622444, 30.388961], {
				hintContent: '',
				balloonContent: 'Стома Люкс - медцентр, клиникастоматологическая клиника'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/medic.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),

			// Храм
			new ymaps.Placemark(
				[59.616797, 30.383478], {
				hintContent: '',
				balloonContent: 'Церковь Владимира Равноапостольного'
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '/images/icons/kult.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-20, -20]
			}),
		]

		//Отключаем зум скроллом
		myMap.behaviors.disable('scrollZoom');

		// Добавление метки на карту
		ymaps.geoQuery(objects).addToMap(myMap);

		// ymaps.geoQuery(objects).addToMap(myMap);
		myMap.geoObjects.add(myCircle);


	});
}