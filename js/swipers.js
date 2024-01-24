function aboutSlider() {
	const aboutSlider = document.querySelector(".about__slider");

	if (!aboutSlider) return;

	let slider = new Swiper(aboutSlider, {
		// centeredSlides: true,
		slidesPerView: 1.2,
		initialSlide: 1,
		slidesPerGroup: 1,
		spaceBetween: 15,
		speed: 700,
		// loop: true,
		rewind: true,
		navigation: {
			nextEl: ".about__slider_container .about__slide_next",
			prevEl: ".about__slider_container .about__slide_prev"
		},
		pagination: {
			el: ".about__slider_container .about__slider_pagination",
			type: "bullets",
			clickable: true
		},
		breakpoints: {
			550: {
				spaceBetween: 20,
				slidesPerView: 1.5
			},
			768: {
				spaceBetween: 30,
				slidesPerView: 1

			},
			991: {
				spaceBetween: 40,
				slidesPerView: 1

			},
			1200: {
				spaceBetween: 54,
				slidesPerView: 1
			}
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

function finishingsSliders() {
	const finishings = document.querySelector(".finishings__slider");
	const finishingsText = document.querySelector(".finishings__text_slider");
	const finishingsFalse = document.querySelector(".finishings__slider_false");

	if (!finishings) return;

	let slider = new Swiper(finishings, {
		initialSlide: 1,
		spaceBetween: 50,
		speed: 1000,
		navigation: {
			nextEl: ".finishings__text_slider .about__slide_next",
			prevEl: ".finishings__text_slider .about__slide_prev"
		},
		pagination: {
			el: ".finishings__text_slider .about__slider_pagination",
			type: "bullets",
			clickable: true
		}
	});

	let textSlider = new Swiper(finishingsText, {
		initialSlide: 1,
		spaceBetween: 50,
		speed: 1000,
		allowTouchMove: false,
		// navigation: {
		// 	nextEl: ".finishings__text_slider .about__slide_next",
		// 	prevEl: ".finishings__text_slider .about__slide_prev"
		// },
		// pagination: {
		// 	el: ".finishings__text_slider .about__slider_pagination",
		// 	type: "bullets",
		// 	clickable: true
		// }
	});

	let falseSlider = new Swiper(finishingsFalse, {
		initialSlide: 1,
		spaceBetween: 20,
		speed: 1000,
		allowTouchMove: false,
		// navigation: {
		// 	nextEl: ".finishings__text_slider .about__slide_next",
		// 	prevEl: ".finishings__text_slider .about__slide_prev"
		// },
		// pagination: {
		// 	el: ".finishings__text_slider .about__slider_pagination",
		// 	type: "bullets",
		// 	clickable: true
		// },
		breakpoints: {
			768: {
				spaceBetween: 30,
			},
			991: {
				spaceBetween: 40,
			},
			1200: {
				spaceBetween: 30,
			},
			1400: {
				spaceBetween: 60,
			},
			1600: {
				spaceBetween: 100,
			},
			1800: {
				spaceBetween: 120,
			}
		}
	});

	// textSlider.on("slideNextTransitionStart", function () {
	// 	falseSlider.slideNext();
	// 	slider.slideNext();
	// });
	// textSlider.on("slidePrevTransitionStart", function () {
	// 	falseSlider.slidePrev();
	// 	slider.slidePrev();
	// });
	slider.on("slideNextTransitionStart", function () {
		falseSlider.slideNext();
		textSlider.slideNext();
	});
	slider.on("slidePrevTransitionStart", function () {
		falseSlider.slidePrev();
		textSlider.slidePrev();
	});
}

function developerSliders() {
	const developer = document.querySelector(".developer__slider");
	const developerText = document.querySelector(".developer__slider_text");

	let slider = new Swiper(developer, {
		effect: 'fade',
		loop: true,
		speed: 700,
		rewind: true,
		navigation: {
			nextEl: ".developer__slider_text .about__slide_next",
			prevEl: ".developer__slider_text .about__slide_prev"
		},
		pagination: {
			el: ".developer__slider_text .about__slider_pagination",
			type: "bullets",
			clickable: true
		}
	});

	let textSlider = new Swiper(developerText, {
		effect: 'fade',
		rewind: true,
		speed: 700,
		rewind: true,
		navigation: {
			nextEl: ".developer__slider_text .about__slide_next",
			prevEl: ".developer__slider_text .about__slide_prev"
		},
		pagination: {
			el: ".developer__slider_text .about__slider_pagination",
			type: "bullets",
			clickable: true
		}
	})

	if (slider.slides.length) {

		$(".developer__slider_text .about__slider_nums .slider-length").text(slider.slides.length.toString().padStart(2, "0"));

		const activeSlide = slider.activeIndex + 1;

		$(".developer__slider_text .about__slider_nums .slide-num").text(activeSlide.toString().padStart(2, "0"));

		// console.log(slider.activeIndex)
		textSlider.on('slideChange', function () {
			const activeSlide = slider.realIndex + 1;

			$(".developer__slider_text .about__slider_nums .slide-num").text(activeSlide.toString().padStart(2, "0"));
		});
	}
}