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
		};
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
			console.log($(this).closest($(drop)))
			if (!$(this).closest($(drop)).length) {
				$(drop).removeClass("active")
			}
		})

		$(dropdown).toggleClass("active");
	});

	$(document).on("click", ".dropdown__item", function () {
		const dropdown = $(this).closest(".dropdown");
		const value = $(this).find(".value").text();

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

		console.log($("input[name=discount]:checked").val())

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
			let move

			$(document).on("mousemove pointermove", function (ev) {
				if (mousedown) {

					if (mouseX < ev.screenX) {
						vector = "right";
						$(rangeLine).css({ "width": $(rangeLine).width() + (startPos - ev.screenX) + "px", "left": $(rangeInput).innerWidth() - $(rangeLine).innerWidth() + "px" })
						move = startPos - ev.screenX;
					} else if (mouseX > ev.screenX) {
						vector = "left";
						$(rangeLine).css({ "width": $(rangeLine).innerWidth() - (startPos - ev.screenX) + "px", "left": $(rangeInput).innerWidth() - $(rangeLine).innerWidth() + "px" });
						move = startPos - ev.screenX;
					}
					console.log(vector, move)
					mouseX = ev.screenX;
				}
			})


			console.log(rangeStep, $(rangeLine).innerWidth())
		}

	})

	$(document).on("mouseup pointerup", function (e) {

		mousedown = false;
	})

	changeRangeSlider(".fill-range", 1, 32, 0.1);
	changeRangeSlider(".place-range", 49, 150, 1);
	changeRangeSlider(".price-range", 33.7, 100.2, 0.1);

	function changeRangeSlider(slider, minVal = 1, maxVal, step = 1) {

		if (!document.querySelector(slider)) return;

		$(slider).find(".range-field__line").slider({
			min: minVal,
			max: maxVal,
			values: [minVal, maxVal],
			step: step,
			range: true,
			animate: "fast",
			slide: function (event, ui) {
				$(slider).find(".polzunok-input-5-left").val(ui.values[0]);
				$(slider).find(".polzunok-input-5-right").val(ui.values[1]);
			}
		});

		$(slider).find(".polzunok-input-5-left").val($(slider).find(".range-field__line").slider("values", 0));
		$(slider).find(".polzunok-input-5-right").val($(slider).find(".range-field__line").slider("values", 1));
		$(slider).find("input").change(function () {
			let input_left = $(slider).find(".polzunok-input-5-left").val().replace(/[^0-9]/g, ''),
				opt_left = $(slider).find(".range-field__line").slider("option", "min"),
				where_right = $(slider).find(".range-field__line").slider("values", 1),
				input_right = $(slider).find(".polzunok-input-5-right").val().replace(/[^0-9]/g, ''),
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

	if (document.querySelector(".aparts__filter")) {
		$(".aparts__filter_form").css({ "max-height": $(".aparts__filter_form").find(".filter__form_fields").innerHeight() + "px" });

		$(window).resize(function () {
			$(".aparts__filter_form").css({ "max-height": $(".aparts__filter_form").find(".filter__form_fields").innerHeight() + "px" });
		})
	}

	$(document).on("click", ".aparts__filter_hidden", function () {

		const form = $(".aparts__filter_form");

		if ($(form).hasClass("hidden")) {
			$(form).removeClass("hidden");
			$(form).css({ "max-height": $(form).find(".filter__form_fields").innerHeight() + "px" });
			$(this).removeClass("active");
		} else {
			$(form).addClass("hidden");
			$(form).css({ "max-height": "0px" });
			$(this).addClass("active");
		}
	});

	$(document).on("click", ".aparts__filter_reset", function () {
		const form = $(".aparts__filter_form");
		const drops = $(form).find(".dropdown");

		$(form).trigger('reset');

		$(".price-range .polzunok-input-5-left").val($(".price-range .range-field__line").slider("option", "min")).change();
		$(".price-range .polzunok-input-5-right").val($(".price-range .range-field__line").slider("option", "max")).change();
		$(".place-range .polzunok-input-5-left").val($(".place-range .range-field__line").slider("option", "min")).change();
		$(".place-range .polzunok-input-5-right").val($(".place-range .range-field__line").slider("option", "max")).change();
		$(".fill-range .polzunok-input-5-left").val($(".fill-range .range-field__line").slider("option", "min")).change();
		$(".fill-range .polzunok-input-5-right").val($(".fill-range .range-field__line").slider("option", "max")).change();

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
		accordionItems[0].querySelector(".accordion-content").style.maxHeight = accordionItems[0].querySelector(".accordion-content").scrollHeight + "px";
		// accordionItems[1].querySelector("svg use").setAttribute("href", "#accordion-close");
	}

	if (document.querySelector(".apart__sheme")) {
		const shemeImages = document.querySelectorAll(".apart__sheme_img");
		const tabs = document.querySelectorAll(".apart__sheme_tab");

		shemeImages[0].classList.add("active");
		tabs[0].classList.add("active")

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
	})
});