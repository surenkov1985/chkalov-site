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



	$(document).on("mousedown", ".range-field__line .before", function (e) {

		// let mousePositionX = e.

		const range = $(this).closest(".range-field");
		const minVal = $(range).find("input[type=range]").attr("min");
		const maxVal = $(range).find("input[type=range]").attr("max");
		const step = $(range).find("input[type=range]").attr("step");

		console.log(e.offsetX)
	})
});