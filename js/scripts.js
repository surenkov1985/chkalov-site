document.addEventListener("DOMContentLoaded", function () {

	aboutSlider();
	finishingsSlider();

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

	$(".fill-range .range-field__line").slider({
		min: 1,
		max: 32,
		values: [1, 32],
		range: true,
		animate: "fast",
		slide: function (event, ui) {
			$(".fill-range .polzunok-input-5-left").val(ui.values[0]);
			$(".fill-range .polzunok-input-5-right").val(ui.values[1]);
		}
	})

	$(".fill-range .polzunok-input-5-left").val($(".fill-range .range-field__line").slider("values", 0));
	$(".fill-range .polzunok-input-5-right").val($(".fill-range .range-field__line").slider("values", 1));
	$(".fill-range input").change(function () {
		var input_left = $(".fill-range .polzunok-input-5-left").val().replace(/[^0-9]/g, ''),
			opt_left = $(".fill-range .range-field__line").slider("option", "min"),
			where_right = $(".fill-range .range-field__line").slider("values", 1),
			input_right = $(".fill-range .polzunok-input-5-right").val().replace(/[^0-9]/g, ''),
			opt_right = $(".fill-range .range-field__line").slider("option", "max"),
			where_left = $(".fill-range .range-field__line").slider("values", 0);
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
		$(".fill-range .polzunok-input-5-left").val(input_left);
		$(".fill-range .polzunok-input-5-right").val(input_right);
		if (input_left != where_left) {
			$(".fill-range .range-field__line").slider("values", 0, input_left);
		}
		if (input_right != where_right) {
			$(".fill-range .range-field__line").slider("values", 1, input_right);
		}
	});

	$(".place-range .range-field__line").slider({
		min: 49,
		max: 150,
		values: [50, 149],
		range: true,
		animate: "fast",
		slide: function (event, ui) {
			$(".place-range .polzunok-input-5-left").val(ui.values[0]);
			$(".place-range .polzunok-input-5-right").val(ui.values[1]);
		}
	});

	$(".place-range .polzunok-input-5-left").val($(".place-range .range-field__line").slider("values", 0));
	$(".place-range .polzunok-input-5-right").val($(".place-range .range-field__line").slider("values", 1));
	$(".place-range .place-range input").change(function () {
		var input_left = $(".place-range .polzunok-input-5-left").val().replace(/[^0-9]/g, ''),
			opt_left = $(".place-range .place-range .range-field__line").slider("option", "min"),
			where_right = $(".place-range .place-range .range-field__line").slider("values", 1),
			input_right = $(".place-range .polzunok-input-5-right").val().replace(/[^0-9]/g, ''),
			opt_right = $(".place-range .place-range .range-field__line").slider("option", "max"),
			where_left = $(".place-range .range-field__line").slider("values", 0);
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
		$(".place-range .polzunok-input-5-left").val(input_left);
		$(".place-range .polzunok-input-5-right").val(input_right);
		if (input_left != where_left) {
			$(".place-range .range-field__line").slider("values", 0, input_left);
		}
		if (input_right != where_right) {
			$(".place-range .range-field__line").slider("values", 1, input_right);
		}
	});

	$(".price-range .range-field__line").slider({
		min: 33.7,
		max: 100.2,
		values: [33.7, 70.2],
		step: 0.1,
		range: true,
		animate: "fast",
		slide: function (event, ui) {
			$(".price-range .polzunok-input-5-left").val(ui.values[0]);
			$(".price-range .polzunok-input-5-right").val(ui.values[1]);
		}
	});

	$(".price-range .polzunok-input-5-left").val($(".price-range .range-field__line").slider("values", 0));
	$(".price-range .polzunok-input-5-right").val($(".price-range .range-field__line").slider("values", 1));
	$(".price-range input").change(function () {
		var input_left = $(".price-range .polzunok-input-5-left").val().replace(/[^0-9]/g, ''),
			opt_left = $(".price-range  .range-field__line").slider("option", "min"),
			where_right = $(".price-range .range-field__line").slider("values", 1),
			input_right = $(".price-range .polzunok-input-5-right").val().replace(/[^0-9]/g, ''),
			opt_right = $(".price-range .range-field__line").slider("option", "max"),
			where_left = $(".price-range .range-field__line").slider("values", 0);
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
		$(".price-range .polzunok-input-5-left").val(input_left);
		$(".price-range .polzunok-input-5-right").val(input_right);
		if (input_left != where_left) {
			$(".price-range .range-field__line").slider("values", 0, input_left);
		}
		if (input_right != where_right) {
			$(".price-range .range-field__line").slider("values", 1, input_right);
		}
	});

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
		const inputs = $(form).find("input").not("hidden");
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
			const input = $(dropdownItem).find("input")

			$(dropdown).find(".dropdown__value>.value").text(value);
			// $(input).checked();
		})

		console.log($(form));

		// $(inputs)
	})
});