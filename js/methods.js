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