function aboutSlider() {
	const aboutSlider = document.querySelector(".about__slider");

	if (!aboutSlider) return;

	let slider = new Swiper(aboutSlider, {
		// centeredSlides: true,
		// slidesPerView: 2.8,
		initialSlide: 1,
		slidesPerGroup: 1,
		spaceBetween: 54,
		speed: 700,
		// loop: true,
		navigation: {
			nextEl: ".about__slide_next",
			prevEl: ".about__slide_prev"
		},
		pagination: {
			el: ".about__slider_pagination",
			type: "bullets",
			clickable: true
		}
	})
}