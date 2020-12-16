$(function() {
	'use strict';

	var window_width = $(window).width(),
		window_height = window.innerHeight,
		header_height = $('.default-header').height(),
		header_height_static = $('.site-header.static').outerHeight(),
		fitscreen = window_height - header_height;

	$('.fullscreen').css('height', window_height);
	$('.fitscreen').css('height', fitscreen);

	//------- Header Scroll Class  js --------//

	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('.default-header').addClass('header-scrolled');
		} else {
			$('.default-header').removeClass('header-scrolled');
		}
	});

	if ($('select')) {
		$('select').niceSelect();
	}

	$('.img-pop-up').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	// Search Toggle
	$('#search-input-box').hide();
	$('#search').on('click', function() {
		$('#search-input-box').slideToggle();
		$('#search-input').focus();
	});
	$('#close-search').on('click', function() {
		$('#search-input-box').slideUp(500);
	});

	// $('.navbar-nav>li>a').on('click', function(){
	//     $('.navbar-collapse').collapse('hide');
	// });

	//  Counter Js

	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});

	$('.play-btn').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	$('.popuar-course-carusel').owlCarousel({
		items: 4,
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		stagePadding: 60,
		navText: [ "<img src='img/prev.png'>", "<img src='img/next.png'>" ],
		responsive: {
			0: {
				items: 1,
				stagePadding: 0
			},
			575: {
				items: 2,
				stagePadding: 0
			},
			768: {
				items: 2,
				stagePadding: 0
			},
			992: {
				items: 3,
				stagePadding: 0
			},
			1200: {
				items: 3,
				stagePadding: 60
			},
			1440: {
				items: 4,
				stagePadding: 60
			}
		}
	});

	$('.video-carousel').owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: [ "<img src='img/prev.png'>", "<img src='img/next.png'>" ]
	});

	$('.testi-slider').owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		navText: [ "<img src='img/prev.png'>", "<img src='img/next.png'>" ]
	});

	// Select all links with hashes
	$('.navbar-nav a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.on('click', function(event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
				location.hostname == this.hostname
			) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate(
						{
							scrollTop: target.offset().top - 50
						},
						1000,
						function() {
							// Callback after animation
							// Must change focus!
							var $target = $(target);
							$target.focus();
							if ($target.is(':focus')) {
								// Checking if the target was focused
								return false;
							} else {
								$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
								$target.focus(); // Set focus again
							}
						}
					);
				}
			}
		});

	// Google Map
	if (document.getElementById('map')) {
		google.maps.event.addDomListener(window, 'load', init);

		function init() {
			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
				// How zoomed in you want the map to start at (always required)
				zoom: 16,

				// The latitude and longitude to center the map (always required)
				center: new google.maps.LatLng(36.83952195128185, 127.18298200073882), //백석대

				// How you would like to style the map.
				// This is where you would paste any style found on Snazzy Maps.
				styles: [
					{
						featureType: 'water',
						elementType: 'geometry',
						stylers: [ { color: '#e9e9e9' }, { lightness: 17 } ]
					},
					{
						featureType: 'landscape',
						elementType: 'geometry',
						stylers: [ { color: '#f5f5f5' }, { lightness: 20 } ]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.fill',
						stylers: [ { color: '#ffffff' }, { lightness: 17 } ]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.stroke',
						stylers: [ { color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 } ]
					},
					{
						featureType: 'road.arterial',
						elementType: 'geometry',
						stylers: [ { color: '#ffffff' }, { lightness: 18 } ]
					},
					{
						featureType: 'road.local',
						elementType: 'geometry',
						stylers: [ { color: '#ffffff' }, { lightness: 16 } ]
					},
					{
						featureType: 'poi',
						elementType: 'geometry',
						stylers: [ { color: '#f5f5f5' }, { lightness: 21 } ]
					},
					{
						featureType: 'poi.park',
						elementType: 'geometry',
						stylers: [ { color: '#dedede' }, { lightness: 21 } ]
					},
					{
						elementType: 'labels.text.stroke',
						stylers: [ { visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 } ]
					},
					{
						elementType: 'labels.text.fill',
						stylers: [ { saturation: 36 }, { color: '#333333' }, { lightness: 40 } ]
					},
					{ elementType: 'labels.icon', stylers: [ { visibility: 'off' } ] },
					{
						featureType: 'transit',
						elementType: 'geometry',
						stylers: [ { color: '#f2f2f2' }, { lightness: 19 } ]
					},
					{
						featureType: 'administrative',
						elementType: 'geometry.fill',
						stylers: [ { color: '#fefefe' }, { lightness: 20 } ]
					},
					{
						featureType: 'administrative',
						elementType: 'geometry.stroke',
						stylers: [ { color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 } ]
					}
				]
			};

			// Get the HTML DOM element that will contain your map
			// We are using a div with id="map" seen below in the <body>
			var mapElement = document.getElementById('map');

			// Create the Google Map using our element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);

			// Let's also add a marker while we're at it
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(36.83952195128185, 127.18298200073882),
				map: map,
				title: 'Snazzy!'
			});
		}
	}

	$(document).ready(function() {
		$('#mc_embed_signup').find('form').ajaxChimp();
	});
});

function isSame() {
	var pw = document.twin.wUserPW.value;
	var confirmPW = document.twin.wUserPWConfirm.value;
	if (pw.length < 6 || pw.length > 16) {
			window.alert('비밀번호는 6글자 이상, 16글자 이하만 이용 가능합니다.');
			document.getElementById('password').value=document.getElementById('pwCheck').value='';
			document.getElementById('same').innerHTML='';
	}
	if(document.getElementById('password').value!='' && document.getElementById('pwCheck').value!='') {
			if(document.getElementById('password').value==document.getElementById('pwCheck').value) {
					document.getElementById('same').innerHTML='비밀번호가 일치합니다.';
					document.getElementById('same').style.color='blue';
			}
			else {
					document.getElementById('same').innerHTML='비밀번호가 일치하지 않습니다.';
					document.getElementById('same').style.color='red';
			}
	}
};



/*function sample4_execDaumPostcode(){
	daum.postcode.load(function(){
		new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
				var extraRoadAddr = ''; // 참고 항목 변수
				
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample4_postcode').value = data.zonecode;
                document.getElementById("sample4_roadAddress").value = roadAddr;
                document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
                
                // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                /*if(roadAddr !== ''){
                    document.getElementById("sample4_extraAddress").value = extraRoadAddr;
                } else {
                    document.getElementById("sample4_extraAddress").value = '';
                }*/

                /*var guideTextBox = document.getElementById("guide");
                // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                if(data.autoRoadAddress) {
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                    guideTextBox.style.display = 'block';

                } else if(data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                    guideTextBox.style.display = 'block';
                } else {
                    guideTextBox.innerHTML = '';
                    guideTextBox.style.display = 'none';
				}
				var themeObj = {
				bgColor: "#FFDBDB", //바탕 배경색
				//searchBgColor: "", //검색창 배경색
				//contentBgColor: "", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
				//pageBgColor: "", //페이지 배경색
				//textColor: "", //기본 글자색
				queryTextColor: "#FF8081" //검색창 글자색
				//postcodeTextColor: "", //우편번호 글자색
				//emphTextColor: "", //강조 글자색
				//outlineColor: "", //테두리
			 };
			},
			theme: {
				bgColor: "#FFDBDB", //바탕 배경색
				queryTextColor: "#FF6869", //검색창 글자색
				postcodeTextColor: "#7642FA" //우편번호 글자색
			 }
        }).open();
	});
};*/





