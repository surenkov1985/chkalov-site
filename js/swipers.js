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
		rewind: true,
		navigation: {
			nextEl: ".about__slide_next",
			prevEl: ".about__slide_prev"
		},
		pagination: {
			el: ".about__slider_pagination",
			type: "bullets",
			clickable: true
		}
	});

	if (slider.slides.length) {

		$(".about__slider_nums .slider-length").text(slider.slides.length.toString().padStart(2, "0"));

		const activeSlide = slider.activeIndex + 1;

		$(".about__slider_nums .slide-num").text(activeSlide.toString().padStart(2, "0"));

		// console.log(slider.activeIndex)
		slider.on('slideChange', function () {
			const activeSlide = slider.activeIndex + 1;

			$(".about__slider_nums .slide-num").text(activeSlide.toString().padStart(2, "0"));
		});
	}
}

function finishingsSlider() {
	const finishings = document.querySelector(".finishings__slider");

	if (!finishings) return;

	let slider = new Swiper(finishings, {
		initialSlide: 1,
		spaceBetween: 120,
		speed: 1000
	})
}