// --- 1. Importar Swiper ---
import { Swiper } from "swiper";
import "swiper/css"; // Estilos base de Swiper
import "swiper/css/navigation"; // Estilos de navegación
import "swiper/css/pagination"; // Estilos de paginación

export function initSwiper() {
	new Swiper(".mySwiper", {
		loop: true,
		spaceBetween: 16,
		centeredSlides: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});
}
