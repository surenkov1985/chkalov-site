document.addEventListener("DOMContentLoaded", function () {
	aboutSlider();
	finishingsSliders();
	developerSliders();

	$(document).on("click", ".head__burger_btn", function () {
		openMobile();
	});

	$(document).on("click", ".mobile__close_btn", function () {
		closeModal();
	});

	$(document).on("click", ".mobile", function (e) {
		if (!e.target.closest(".mobile__content")) {
			closeModal();
		}
	});

	$(document).on("click", ".mobile__nav_link", function (e) {
		e.preventDefault();
		const elem = e.target.hash;

		closeModal();
		scrollToElement(elem);
	});

	$(document).on("click", ".dropdown__value", function () {
		const dropdown = $(this).closest(".dropdown");

		$(".dropdown").each((ind, drop) => {


			if (!$(this).closest($(drop)).length) {
				$(drop).removeClass("active");
			}
		});

		$(dropdown).toggleClass("active");
	});

	$(document).on("click", ".dropdown__item", function () {
		const dropdown = $(this).closest(".dropdown");
		const value = $(this).find(".value").text();
		const inputVal = $(this).find("input").val();
		const form = $(".aparts__filter_form");
		const formContainer = $(form).closest(".aparts__filter");

		if ($(dropdown).closest(".aparts__filter_control").length) {

			$(form).find("input[name=sortby]").val(inputVal);
			$(form).trigger("submit");
		}
		$(dropdown).find(".dropdown__value>.value").text(value);
		$(dropdown).removeClass("active");
	});

	$(document).on("click", function (e) {
		if (!e.target.closest(".dropdown")) {
			$(".dropdown").removeClass("active");
		}
	});

	$(document).on("change", "input[name=discount]", function () {
		const input = $(this).closest(".slide-field__input");

		console.log($("input[name=discount]:checked").val());

		if ($("input[name=discount]:checked").val()) {
			$(input).addClass("active");
		}
	});

	let mousedown = false;
	let startPos;

	$(document).on("mousedown pointerdown", function (e) {
		// let mousePositionX = e.

		mousedown = true;

		if (e.target.classList.contains("before")) {
			const range = $(e.target).closest(".range-field");
			const rangeInput = $(range).find(".range-field__input");
			const rangeLine = $(range).find(".range-field__line");
			const minVal = $(range).find("input[type=range]").attr("min");
			const maxVal = $(range).find("input[type=range]").attr("max");
			const step = $(range).find("input[type=range]").attr("step");

			let rangeStep = 100 / ((maxVal - minVal) / step);

			let mouseX = e.screenX;
			startPos = e.screenX;

			let vector;
			let move;

			$(document).on("mousemove pointermove", function (ev) {
				if (mousedown) {
					if (mouseX < ev.screenX) {
						vector = "right";
						$(rangeLine).css({
							width: $(rangeLine).width() + (startPos - ev.screenX) + "px",
							left: $(rangeInput).innerWidth() - $(rangeLine).innerWidth() + "px",
						});
						move = startPos - ev.screenX;
					} else if (mouseX > ev.screenX) {
						vector = "left";
						$(rangeLine).css({
							width: $(rangeLine).innerWidth() - (startPos - ev.screenX) + "px",
							left: $(rangeInput).innerWidth() - $(rangeLine).innerWidth() + "px",
						});
						move = startPos - ev.screenX;
					}
					console.log(vector, move);
					mouseX = ev.screenX;
				}
			});

			console.log(rangeStep, $(rangeLine).innerWidth());
		}
	});

	$(document).on("mouseup pointerup", function (e) {
		mousedown = false;
	});

	changeRangeSlider(".fill-range", 1, 32, 0.1);
	changeRangeSlider(".place-range", 49, 150, 1);
	changeRangeSlider(".price-range", 33.7, 100.2, 0.1);

	if (document.querySelector(".calc__form")) {
		const form = document.querySelector(".calc__form");

		let price = parseFloat(form.dataset.price),
			minPrice = parseFloat(form.dataset.minPrice),
			maxPrice = parseFloat(form.dataset.maxPrice),
			pay = parseFloat(form.dataset.pay / 100),
			minPay = parseFloat(form.dataset.minPay / 100),
			minTerm = parseFloat(form.dataset.minTerm),
			maxTerm = parseFloat(form.dataset.maxTerm),
			term = parseFloat(form.dataset.term),
			percent = parseFloat(form.dataset.percent);

		calcRangeSliderMin(".calc-price-range", price, minPrice, maxPrice, 1);
		calcRangeSliderMin(".first-pay-range", pay, minPay, 1, 0.01, price);
		calcRangeSliderMin(".calc-term-range", term, minTerm, maxTerm, 1);

		setCalcResult();
	}

	function setCalcResult() {
		const calcResult = $(".calc__res");
		const calcPrice = $(calcResult).find(".price");
		const calcTerm = $(calcResult).find(".term .value span");
		const calcPay = $(calcResult).find(".pay .value span");
		const calcOverPay = $(calcResult).find(".overpay .value span");
		const percent = 0.08;
		const form = $(".calc__form");
		const price = $(form).find("input[name=calc-price]").val();
		const term = $(form).find("input[name=calc-term]").val();
		const firstpray = $(form).find("input[name=first-pay]").val();

		$(calcPrice).html(new Intl.NumberFormat("ru").format(price));
		$(calcTerm).text(term);

		const [pay, overpay] = ipoteka(price, firstpray, percent, term);

		$(calcPay).text(new Intl.NumberFormat("ru").format(pay));
		$(calcOverPay).text(new Intl.NumberFormat("ru").format(overpay));
	}

	$(document).on("change", "input[name=calc-price]", function () { });

	$(document).on("change", ".calc__form", function (e) {
		if (e.target.name === "calc-price") {
			const form = document.querySelector(".calc__form");

			let price = parseInt($(form).find("input[name=calc-price]").val()),
				minPrice = parseFloat(form.dataset.minPrice),
				maxPrice = parseFloat(form.dataset.maxPrice),
				pay = parseFloat($(form).find("input[name=place-max]").val() / 100),
				minPay = parseFloat(form.dataset.minPay / 100),
				minTerm = parseFloat(form.dataset.minTerm),
				maxTerm = parseFloat(form.dataset.maxTerm),
				term = parseFloat(form.dataset.term),
				percent = parseFloat(form.dataset.percent);

			$(".first-pay-range").find(".range-field__line").slider("destroy");
			calcRangeSliderMin(".first-pay-range", pay, minPay, 1, 0.01, price, true);
		}

		setCalcResult();
	});

	function ipoteka(price, pay, percent, years) {
		let i = parseFloat(percent / 1200);
		let n = parseFloat(+years * 12);
		let res = Math.round((+price - +pay) * (i / (Math.pow(1 + i, n) - 1)));
		let sum = res * n;
		return [res, sum];
	}

	console.log($(".term .value span").text());
	if (document.querySelector(".aparts__filter")) {

		const form = $(".aparts__filter_form");
		const filter = $(".aparts__filter").not(".aparts__filter_mobile");
		const filterMobile = $(".aparts__filter_mobile");
		const filterControl = $(".aparts__filter_control");

		if ($(window).width() < 550) {
			$(filter).css({ "display": "none" });
			$(filterControl).css({ "display": "flex" });
			$(filterMobile).css({ "display": "block" });
			$(filterMobile).find(".aparts__filter_form").css({ "max-height": "100%" });
		} else {
			$(filter).find(".aparts__filter_form").css({ "max-height": $(filter).find(".filter__form_fields").innerHeight() + "px" });
			// $(form).css({ "max-height": $(form).find(".filter__form_fields").innerHeight() + "px" });
			$(filterControl).css({ "display": "none" });
			// $(".aparts__filter_hidden").removeClass("active");
		}

		$(window).resize(function () {

			if ($(window).innerWidth() < 550) {
				$(filter).css({ "display": "none" });
				$(filterMobile).css({ "display": "block" });
				$(filterControl).css({ "display": "flex" });
				$(filterMobile).find(".aparts__filter_form").css({ "max-height": "100%" });
			} else {
				$(filter).css({ "display": "block" });
				$(filterMobile).css({ "display": "none" });
				$(filterControl).css({ "display": "none" });
				$(filter).find(".aparts__filter_form").css({ "max-height": $(filter).find(".filter__form_fields").innerHeight() + "px" });

			}
		});
	}

	$(document).on("click", ".show-mobile-filter", function () {

		$(".aparts__filter_mobile").addClass("show");
		$("body").addClass("hidden")
	});

	$(document).on("click", ".aparts__filter_mobile .close_btn", function (e) {
		e.preventDefault();

		$(".aparts__filter_mobile").removeClass("show");
		$("body").removeClass("hidden")
	});

	$(document).on("click", ".aparts__filter_hidden", function (e) {

		const form = $(".aparts__filter_form");
		const filter = $(".aparts__filter").not(".aparts__filter_mobile");
		const filterMobile = $(".aparts__filter_mobile");
		const filterControl = $(".aparts__filter_control");


		if (!e.target.closest(".aparts__filter_mobile")) {
			if ($(filter).find(".aparts__filter_form").hasClass("hidden")) {
				$(filter).find(".aparts__filter_form").removeClass("hidden");
				$(filter).find(".aparts__filter_form").css({ "max-height": $(filter).find(".filter__form_fields").innerHeight() + "px" });
				$(this).removeClass("active");
			} else {
				$(filter).find(".aparts__filter_form").addClass("hidden");
				$(filter).find(".aparts__filter_form").css({ "max-height": "0px" });
				$(this).addClass("active");
			}
		} else {
			if ($(filterMobile).find(".aparts__filter_form").hasClass("hidden")) {
				$(filterMobile).find(".aparts__filter_form").removeClass("hidden");
				$(filterMobile).find(".aparts__filter_form").css({ "max-height": "100%" });
				$(this).removeClass("active");
			} else {
				$(filterMobile).find(".aparts__filter_form").addClass("hidden");
				$(filterMobile).find(".aparts__filter_form").css({ "max-height": "0" });
				$(this).addClass("active");
			}
		}

		// if ($(form).hasClass("hidden")) {
		// 	$(form).removeClass("hidden");
		// 	$(form).css({ "max-height": $(form).find(".filter__form_fields").innerHeight() + "px" });
		// 	$(this).removeClass("active");
		// } else {
		// 	$(form).addClass("hidden");
		// 	$(form).css({ "max-height": "0px" });
		// 	$(this).addClass("active");
		// }
	});

	$(document).on("click", ".aparts__filter_reset", function () {
		const form = $(".aparts__filter_form");
		const drops = $(form).find(".dropdown");

		$(form).trigger("reset");


		// $(".price-range .polzunok-input-5-left").val($(".price-range .range-field__line").slider("option", "min")).change();
		// $(".price-range .polzunok-input-5-right").val($(".price-range .range-field__line").slider("option", "max")).change();
		// $(".place-range .polzunok-input-5-left").val($(".place-range .range-field__line").slider("option", "min")).change();
		// $(".place-range .polzunok-input-5-right").val($(".place-range .range-field__line").slider("option", "max")).change();
		// $(".fill-range .polzunok-input-5-left").val($(".fill-range .range-field__line").slider("option", "min")).change();
		// $(".fill-range .polzunok-input-5-right").val($(".fill-range .range-field__line").slider("option", "max")).change();

		$(".price-range").find(".range-field__line").slider("destroy");
		$(".place-range").find(".range-field__line").slider("destroy");
		$(".fill-range").find(".range-field__line").slider("destroy");

		changeRangeSlider(".fill-range", 1, 32, 0.1);
		changeRangeSlider(".place-range", 49, 150, 1);
		changeRangeSlider(".price-range", 33.7, 100.2, 0.1);

		$(drops).each(function (_, dropdown) {
			const dropdownItem = $(dropdown).find(".dropdown__item")[0];
			const value = $(dropdownItem).find(".value").text();
			const input = $(dropdownItem).find("input");

			$(dropdown).find(".dropdown__value>.value").text(value);
		});
	});

	const accordionItems = document.querySelectorAll(".accordion-item");

	accordionItems.forEach((item, index) => {
		const AccHeader = item.querySelector(".accordion-header");
		const AccContent = item.querySelector(".accordion-content");
		// const AccIcon = item.querySelector("svg use");

		AccHeader.addEventListener("click", () => {
			const isOpen = item.classList.contains("active");

			accordionItems.forEach((item, i) => {
				item.classList.remove("active");
				item.querySelector(".accordion-content").style.maxHeight = "0";
				// item.querySelector("svg use").setAttribute("href", "#accordion-open");
			});

			if (!isOpen) {
				item.classList.add("active");
				AccContent.style.maxHeight = AccContent.scrollHeight + "px";
				// AccIcon.setAttribute("href", "#accordion-close");
			} else {
				// AccIcon.setAttribute("href", "#accordion-open");
			}
		});
	});

	if (accordionItems && accordionItems[1]) {
		accordionItems[0].classList.add("active");
		accordionItems[0].querySelector(".accordion-content").style.maxHeight =
			accordionItems[0].querySelector(".accordion-content").scrollHeight + "px";
		// accordionItems[1].querySelector("svg use").setAttribute("href", "#accordion-close");
	}

	if (document.querySelector(".apart__sheme")) {
		const shemeImages = document.querySelectorAll(".apart__sheme_img");
		const tabs = document.querySelectorAll(".apart__sheme_tab");

		shemeImages[0].classList.add("active");
		tabs[0].classList.add("active");

		$(document).on("click", ".apart__sheme_tab", function () {
			$(".apart__sheme_tab").removeClass("active");
			$(".apart__sheme_img").removeClass("active");

			$(this).addClass("active");
			$($(this).data("target")).addClass("active");

			if ($(this).data("target") !== "#tab1") {
				$(this).closest(".apart__sheme").addClass("w100");
				$(".apart__desc").addClass("w0");
			} else {
				$(this).closest(".apart__sheme").removeClass("w100");
				$(".apart__desc").removeClass("w0");
			}
		});
	}

	$(document).on("click", ".page__back_link", function () {
		history.back();
	});
});
