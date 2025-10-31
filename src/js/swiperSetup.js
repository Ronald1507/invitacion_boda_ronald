// swiperSetup.js
import Swiper from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

let swiperInstance = null; // evita inicializarlo más de una vez

export function initSwiper() {
	// Si ya existe, no volver a crearlo
	if (swiperInstance) return;

	swiperInstance = new Swiper(".mySwiper", {
		modules: [Autoplay, Pagination, Navigation],
		loop: true,
		spaceBetween: 16,
		centeredSlides: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	// console.log("✅ Swiper inicializado");
}
