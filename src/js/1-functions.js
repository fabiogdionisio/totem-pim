console.log('Carreguei o Functions');

function selectOptionStart() {
	optionsOne.unbind('click');
	let id = $(this).attr("id");
	let icon = $(".step-two .icon");
	let options = document.querySelectorAll(".step-two .option");

	localStorage.setItem("type", id);
	icon.attr("src", "img/" + id + ".png");

	animateCSS(this, "bounceOut", function(){ 
		$("#" + id).addClass('d-none');
		$(".step-one").fadeOut("slow");
	});

	setTimeout(function(){
		$(".step-two").removeClass('d-none')
		animateCSS(document.querySelector(".step-two .icon"), "bounceIn");

		setTimeout(function(){
			let i = 0;
			let interval = setInterval(function(){
				options[i].classList.remove("d-none");
				animateCSS(options[i], "fadeIn");
				console.log(options[i]);
				i++;
				if (i === options.length) {
					clearInterval(interval); 
					optionsTwo.bind('click', selectOptionService);
				}

			}, 200);
		}, 1000);
	}, 2200);
}

function selectOptionService() {
	optionsTwo.unbind('click');
	let id = $(this).attr("id");
	localStorage.setItem("service", id);

	animateCSS(this, "bounceOut", function(){ 
		$("#" + id).addClass('d-none');
		$(".step-two").fadeOut("slow");
	});

	setTimeout(function(){
		$(".step-three").removeClass('d-none')
		animateCSS(document.querySelector(".step-three .icon"), "bounceIn");

	}, 2200);

}

function animateCSS(element, animationName, callback) {
		const node = element
		node.classList.add('animated', animationName)

		function handleAnimationEnd() {
			node.classList.remove('animated', animationName)
			node.removeEventListener('animationend', handleAnimationEnd)

			if (typeof callback === 'function') callback()
		}

	node.addEventListener('animationend', handleAnimationEnd)
}