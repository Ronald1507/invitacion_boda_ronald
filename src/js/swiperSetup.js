// swiperSetup.js
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// Inicializar Swiper con módulos
export function initSwiper() {
	new Swiper(".mySwiper", {
		modules: [Autoplay, Pagination], // 🔥 Módulos obligatorios
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
	});
}
