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
	initSwiper();
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
});
