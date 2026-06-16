// src/js/index.js
import "../css/mapChooser.css";

import { config } from "../data/config.js";
import { renderInvitacion } from "./render.js";
import { aplicarTema } from "./theme.js";
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
import { initCalendario } from "./calendar.js";
import { initReveal } from "./reveal.js";

// El tema puede aplicarse de inmediato (no depende del DOM construido)
aplicarTema();

window.addEventListener("DOMContentLoaded", () => {
	// 1) Generar el contenido dinámico ANTES de inicializar lo demás,
	//    porque crea los nodos sobre los que trabajan los módulos siguientes.
	renderInvitacion();

	// 2) Inicializadores que dependen del DOM ya construido
	mostrarFechaFormateada();
	updateCountdown();
	initMusicPlayer();
	mostrarFechaMaximaConfirmacion();
	cargarIconos();
	animarDresscode();
	enableCopyButtons();
	enviarMensajeConfirmacion();
	initCalendario();
	initReveal();

	// Botón "Ver en mapa" → selector Google Maps / Waze
	const btnMapa = document.getElementById("btnMapa");
	if (btnMapa) {
		btnMapa.addEventListener("click", () => {
			openMapChooser({
				lat: config.lugar.lat,
				lng: config.lugar.lng,
				label: config.lugar.nombre,
			});
		});
	}

	// Swiper: inicializar sólo al llegar a la sección "Nuestra Historia"
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
			initSwiper();
		}
	}

	// Ocultar el "Desliza hacia abajo" al avanzar el scroll
	const scrollDownText = document.querySelector(".scroll-down");
	const heroHeader = document.querySelector(".hero-header");

	if (scrollDownText && heroHeader) {
		let ocultado = false;

		window.addEventListener("scroll", () => {
			const headerBottom = heroHeader.getBoundingClientRect().bottom;

			if (!ocultado && headerBottom < window.innerHeight * 0.5) {
				scrollDownText.style.transition = "opacity 0.8s ease";
				scrollDownText.style.opacity = "0";
				scrollDownText.style.pointerEvents = "none";
				scrollDownText.style.animation = "none";
				ocultado = true;
			}
		});
	}
});
