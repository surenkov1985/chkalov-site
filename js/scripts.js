document.addEventListener("DOMContentLoaded", function () {

	aboutSlider();

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
	})
})