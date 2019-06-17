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

		newPswrd();

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

function newPswrd() {
	var type = localStorage.getItem("type");
	var service = localStorage.getItem("service");

	switch (type) {
		case 'handicap':
			type = "2"
			break;
			
		case 'common':
			type = "1"
			break;
	}

	switch (service) {
		case 'revenue':
			service = "1"
			break;
			
		case 'sports':
			service = "2"
			break;
	
		case 'psychology':
			service = "3"
			break;
				
		case 'law':
			service = "4"
			break;
		
		case 'speech':
			service = "5"
			break;
		
	}

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "http://localhost:3000/password",
		"method": "POST",
		"headers": {
		  "Content-Type": "application/json",
		  "cache-control": "no-cache",
		  "Postman-Token": "a0861cdb-ed42-43d3-a8c4-9541878a6e26"
		},
		"processData": false,
		"data": "{\n    \"type\": \"" + type + "\",\n    \"service\": \"" + service + "\"\n}"
	  }
	  
	$.ajax(settings).done(function (response) {

		var paddedNumber = response.pswrd.padStart(3, "0");
		localStorage.setItem("number", paddedNumber);

		setInterval(function(){
			window.open('password.html', '_blank');
			location.reload();

		}, 3000);
	});
}

function getPswrds() {
	var interval = setInterval(function(){

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "http://localhost:3000/password/serve",
			"method": "GET",
			"headers": {
			  "Content-Type": "application/json",
			  "cache-control": "no-cache",
			  "Postman-Token": "02ba5752-6492-4021-a288-5b335b519063"
			},
			"processData": false,
			"data": ""
		  }
		  
		  $.ajax(settings).done(function (response) {

			if (response) {
				
				var audio = new Audio('/mp3/attention.mp3');
				var element = "<li>" + $("#currentPassword").text() + "</li>";

				var playPromise = audio.play();
				
				$(".older__password li").last().remove();
				$(".older__password").prepend(element);

				$("#currentPassword").text(response.type + response.service + response.number.padStart(3, "0"));
				animateCSS(document.querySelector("#currentPassword"), "flash");
				
			}
		  });
	}, 10000)
}