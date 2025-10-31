// src/js/index.js
import "../css/mapChooser.css";
import { openMapChooser } from "./mapChooser.js";

import {
	mostrarFechaFormateada,
	mostrarFechaMaximaConfirmacion,
	updateCountdown,
} from "./countdown.js";
import { cargarIconos } from "./iconos.js";
import { initMusicPlayer } from "./musicPlayer.js";
import { initSwiper } from "./swiperSetup.js";
import { animarDresscode } from "./animations.js";
import { enableCopyButtons } from "./helpers.js";
import { enviarMensajeConfirmacion } from "./sendConfirmMessage.js";

window.addEventListener("DOMContentLoaded", () => {
	mostrarFechaFormateada();
	updateCountdown();
	initMusicPlayer();
	mostrarFechaMaximaConfirmacion();
	cargarIconos();
	animarDresscode();
	enableCopyButtons();
	enviarMensajeConfirmacion();

	const btnMapa = document.getElementById("btnMapa");
	if (btnMapa) {
		btnMapa.addEventListener("click", () => {
			openMapChooser({
				lat: -37.51495475752657,
				lng: -73.40882242191483,
				label: "Casa Lucía",
			});
		});
	}
	// --- 💞 Swiper: inicializar solo al llegar a la sección "Nuestra Historia" ---
	const historiaSection = document.querySelector(".historia");
	if (historiaSection) {
		if ("IntersectionObserver" in window) {
			const observer = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							initSwiper();
							observer.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.3 }
			);
			observer.observe(historiaSection);
		} else {
			// 🔙 Si el navegador no soporta IntersectionObserver
			initSwiper();
		}
	}
});
