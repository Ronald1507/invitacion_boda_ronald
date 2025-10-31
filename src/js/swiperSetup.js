// swiperSetup.js
import Swiper from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // 👈 Agregado Navigation

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // 👈 Importa también el CSS del módulo Navigation

// Inicializar Swiper con módulos
export function initSwiper() {
	new Swiper(".mySwiper", {
		modules: [Autoplay, Pagination], // 👈 Incluye Navigation
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
