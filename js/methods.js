function openMobile() {
	const mobile = $(".mobile");

	$("body").addClass("hidden");
	$(mobile).addClass("show");
	setTimeout(() => {
		$(".mobile__content").css({ transform: "translate(0)" });
	}, 200);
}

function closeModal() {
	$("body").removeClass("hidden");

	$(".mobile__content").css({ transform: "translate(100%)" });

	setTimeout(() => {
		$(".mobile").removeClass("show");
	}, 300);
}

function scrollToElement(elem) {
	$([document.documentElement, document.body]).animate(
		{
			scrollTop: $(elem).offset().top,
		},
		2000
	);
}

async function loadScript(src, func = false) {
	const script = document.createElement("script");
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
		var myMap = new ymaps.Map("main_map", {
			center: [56.246695, 43.828487],
			zoom: 16,
			controls: ["geolocationControl", "zoomControl"],
		});

		var myCircle = new ymaps.GeoObject(
			{
				geometry: {
					type: "Circle",
					coordinates: [56.246695, 43.828487],
					radius: 250,
				},
			},
			{
				fillColor: "#779DFD33",
				stroke: false,
				draggable: false,
			}
		);

		myCircle.events.add("dragend", function (e) {
			// Получение ссылки на объект, который был передвинут.
			var thisPlacemark = e.get("target");
			// Определение координат метки
			var coords = thisPlacemark.geometry.getCoordinates();
			// и вывод их при щелчке на метке
			thisPlacemark.properties.set("balloonContent", coords);
		});

		// Создание меток
		var objects = [
			new ymaps.Placemark(
				[56.246695, 43.828487],
				{
					hintContent: "",
					balloonContent: "ЖК Чкалов",
				},
				{
					// iconLayout: 'default#imageWithContent',
					// iconImageHref: '../img/map/main.png',
					iconImageSize: [37, 49],
					iconImageOffset: [-17, -43],
				}
			),

			// Спорт
			new ymaps.Placemark(
				[56.24839037026667, 43.85144765257722],
				{
					hintContent: "",
					balloonContent: 'Дом физкультуры с бассейном, ОАО "ГАЗ"',
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/sport.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
					width: 30,
				}
			),

			// Продукты
			new ymaps.Placemark(
				[56.244140, 43.832854],
				{
					hintContent: "",
					balloonContent: "Рыба",
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/sales.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),
			new ymaps.Placemark(
				[56.2424755990248, 43.847350850415914],
				{
					hintContent: "",
					balloonContent: "Перекресток",
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/sales.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),
			new ymaps.Placemark(
				[56.24652148331625, 43.8241501469595],
				{
					hintContent: "",
					balloonContent: "Красное&Белое",
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/sales.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),
			new ymaps.Placemark(
				[56.24808923719568, 43.82519084405034],
				{
					hintContent: "",
					balloonContent: 'Продукты"',
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/sales.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),
			new ymaps.Placemark(
				[56.247809072962234, 43.83111316140888],
				{
					hintContent: "",
					balloonContent: 'Продукты"',
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/sales.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),
			new ymaps.Placemark(
				[56.24333136123018, 43.848443296702314],
				{
					hintContent: "",
					balloonContent: "Пряжа",
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/sales.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),
			new ymaps.Placemark(
				[56.24608035468262, 43.82453638504809],
				{
					hintContent: "",
					balloonContent: 'Супермаркет "Пятёрочка"',
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/sales.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),

			// ТЦ
			// new ymaps.Placemark(
			// 	[59.616375, 30.387379],
			// 	{
			// 		hintContent: "",
			// 		balloonContent: 'Торговый центр "Западный"',
			// 	},
			// 	{
			// 		iconLayout: "default#imageWithContent",
			// 		iconImageHref: "/images/icons/sales.svg",
			// 		iconImageSize: [40, 40],
			// 		iconImageOffset: [-20, -20],
			// 	}
			// ),
			// new ymaps.Placemark(
			// 	[59.621759, 30.388369],
			// 	{
			// 		hintContent: "",
			// 		balloonContent: 'Торговый центр "Элиен"',
			// 	},
			// 	{
			// 		iconLayout: "default#imageWithContent",
			// 		iconImageHref: "/images/icons/sales.svg",
			// 		iconImageSize: [40, 40],
			// 		iconImageOffset: [-20, -20],
			// 	}
			// ),
			// new ymaps.Placemark(
			// 	[59.622317, 30.39457],
			// 	{
			// 		hintContent: "",
			// 		balloonContent: "",
			// 	},
			// 	{
			// 		iconLayout: "default#imageWithContent",
			// 		iconImageHref: "/images/icons/sales.svg",
			// 		iconImageSize: [40, 40],
			// 		iconImageOffset: [-20, -20],
			// 	}
			// ),

			// Школа
			new ymaps.Placemark(
				[56.24620146462475, 43.83145731709626],
				{
					hintContent: "",
					balloonContent: "Детский Сад № 98",
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/stud.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),
			new ymaps.Placemark(
				[56.2467177757162, 43.83797108525813],
				{
					hintContent: "",
					balloonContent: "Школа №144",
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/stud.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),
			new ymaps.Placemark(
				[56.24398074628285, 43.83478637589344],
				{
					hintContent: "",
					balloonContent: 'Детский сад № 23 "ТЕРЕМОК"',
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/stud.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),

			// Медицина
			new ymaps.Placemark(
				[56.2458734695484, 43.83705411495491],
				{
					hintContent: "",
					balloonContent: 'ГБУ НО "Врачебно-физкультурный диспансер"',
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/medic.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),
			new ymaps.Placemark(
				[56.249789819956405, 43.834929805451175],
				{
					hintContent: "",
					balloonContent: "Второе городское отделение ГБУЗ НО НОБСМЭ",
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/medic.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),
			new ymaps.Placemark(
				[56.24764988514956, 43.84224687154225],
				{
					hintContent: "",
					balloonContent: "МЕЧТА, медицинский центр",
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/medic.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),
			new ymaps.Placemark(
				[56.24945300051977, 43.83372875958672],
				{
					hintContent: "",
					balloonContent: "ГБУЗ НО «Инфекционная больница №23»",
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/medic.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),

			// Храм
			new ymaps.Placemark(
				[56.2467024789105, 43.84043923018181],
				{
					hintContent: "",
					balloonContent: "Храм святого великомученика и целителя Пантелеимона",
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/kult.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),

			// Культура и отдых
			new ymaps.Placemark(
				[56.24637021286868, 43.835969460901794],
				{
					hintContent: "",
					balloonContent: "Баня общая на дровах",
				},
				{
					iconLayout: "default#imageWithContent",
					iconImageHref: "/images/icons/kult.svg",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				}
			),
		];

		//Отключаем зум скроллом
		myMap.behaviors.disable("scrollZoom");

		// Добавление метки на карту
		ymaps.geoQuery(objects).addToMap(myMap);

		// ymaps.geoQuery(objects).addToMap(myMap);
		myMap.geoObjects.add(myCircle);
	});
}

function changeRangeSlider(slider, minVal = 1, maxVal, step = 1) {
	if (!document.querySelector(slider)) return;

	$(slider)
		.find(".range-field__line")
		.slider({
			min: minVal,
			max: maxVal,
			values: [minVal, maxVal],
			step: step,
			range: true,
			animate: "fast",
			slide: function (event, ui) {
				$(slider).find(".polzunok-input-5-left").val(ui.values[0]);
				$(slider).find(".polzunok-input-5-right").val(ui.values[1]);
			},
		});

	$(slider).find(".polzunok-input-5-left").val($(slider).find(".range-field__line").slider("values", 0));
	$(slider).find(".polzunok-input-5-right").val($(slider).find(".range-field__line").slider("values", 1));
	$(slider)
		.find("input")
		.on("focusout", function () {
			let input_left = $(slider)
				.find(".polzunok-input-5-left")
				.val()
				.replace(/[^0-9]/g, ""),
				opt_left = $(slider).find(".range-field__line").slider("option", "min"),
				where_right = $(slider).find(".range-field__line").slider("values", 1),
				input_right = $(slider)
					.find(".polzunok-input-5-right")
					.val()
					.replace(/[^0-9]/g, ""),
				opt_right = $(slider).find(".range-field__line").slider("option", "max"),
				where_left = $(slider).find(".range-field__line").slider("values", 0);
			if (input_left > where_right) {
				input_left = where_right;
			}
			if (input_left < opt_left) {
				input_left = opt_left;
			}
			if (input_left == "") {
				input_left = 0;
			}
			if (input_right < where_left) {
				input_right = where_left;
			}
			if (input_right > opt_right) {
				input_right = opt_right;
			}
			if (input_right == "") {
				input_right = 0;
			}
			$(slider).find(".polzunok-input-5-left").val(input_left);
			$(slider).find(".polzunok-input-5-right").val(input_right);
			if (input_left != where_left) {
				$(slider).find(".range-field__line").slider("values", 0, input_left);
			}
			if (input_right != where_right) {
				$(slider).find(".range-field__line").slider("values", 1, input_right);
			}
		});
}

function calcRangeSliderMin(slider, val, minVal = 1, maxVal, step = 1, price = null, isListener = false) {
	if (!document.querySelector(slider)) return;

	$(slider)
		.find(".range-field__line")
		.slider({
			min: minVal,
			max: maxVal,
			value: val,
			step: step,
			range: "min",
			animate: "fast",
			price: price,
			slide: function (event, ui) {
				if (price) {
					// console.log(Math.round(ui.value * 100))
					$(slider)
						.find(".polzunok-input-5-right")
						.val(Math.round(ui.value * 100));
					$(slider)
						.find(".polzunok-input-5-left")
						.val(Math.round(+price * +ui.value));
				} else {
					$(slider).find(".polzunok-input-5-left").val(ui.value);
				}
				$(slider).find("input").change();
			},
		});

	if (price) {
		$(slider)
			.find(".polzunok-input-5-right")
			.val(Math.round($(slider).find(".range-field__line").slider("value") * 100));
		$(slider)
			.find(".polzunok-input-5-left")
			.val(Math.round($(slider).find(".range-field__line").slider("value") * parseFloat(price)));
		// if (isListener) return;
		$(slider)
			.find("input")
			.on("focusout", function (e) {
				let input_left = $(slider)
					.find(".polzunok-input-5-left")
					.val()
					.replace(/[^0-9]/g, ""),
					opt_left = Math.round(
						$(slider).find(".range-field__line").slider("value") * $(slider).find(".range-field__line").slider("option", "min")
					),
					where_right = $(slider).find(".range-field__line").slider("value"),
					input_right =
						$(slider)
							.find(".polzunok-input-5-right")
							.val()
							.replace(/[^0-9]/g, "") / 100,
					opt_right = $(slider).find(".range-field__line").slider("option", "max"),
					where_left = $(slider).find(".range-field__line").slider("option", "min");

				if ($(e.target).hasClass("polzunok-input-5-left")) {
					if (+input_left > +price) {
						input_left = price;
					}
					if (+input_left < +opt_left) {
						input_left = opt_left;
					}
					if (input_left == "") {
						input_left = 0;
					}
					let percent = Math.ceil((input_left / price) * 100 * 100) / 100;

					$(slider).find(".polzunok-input-5-right").val(percent);
					$(slider).find(".polzunok-input-5-left").val(input_left);
					// if (input_right != +where_right) {
					$(slider)
						.find(".range-field__line")
						.slider("value", percent / 100);
					// }
				} else {
					if (input_right < where_left) {
						input_right = where_left;
					}
					if (input_right > opt_right) {
						input_right = opt_right;
					}
					if (input_right == "") {
						input_right = 0;
					}
					$(slider)
						.find(".polzunok-input-5-left")
						.val(Math.round(price * input_right));
					$(slider)
						.find(".polzunok-input-5-right")
						.val(Math.round(input_right * 100));

					if (input_right != +where_right) {
						$(slider).find(".range-field__line").slider("value", input_right);
					}
				}
			});
	} else {
		// if (isListener) return;
		$(slider).find(".polzunok-input-5-left").val($(slider).find(".range-field__line").slider("value"));
		$(slider)
			.find("input")
			.on("focusout", function () {
				let input_left = $(slider)
					.find(".polzunok-input-5-left")
					.val()
					.replace(/[^0-9]/g, ""),
					opt_left = $(slider).find(".range-field__line").slider("option", "min"),
					where_right = $(slider).find(".range-field__line").slider("value"),
					opt_right = $(slider).find(".range-field__line").slider("option", "max");
				where_left = $(slider).find(".range-field__line").slider("value");
				if (input_left > opt_right) {
					input_left = opt_right;
				}
				if (input_left < opt_left) {
					input_left = opt_left;
				}
				if (input_left == "") {
					input_left = 0;
				}

				$(slider).find(".polzunok-input-5-left").val(input_left);

				if (input_left != where_left) {
					$(slider).find(".range-field__line").slider("value", input_left);
				}
			});
	}
	isListener = true;
}
