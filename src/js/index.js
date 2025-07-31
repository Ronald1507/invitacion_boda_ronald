// src/js/index.js

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

window.addEventListener("DOMContentLoaded", () => {
	mostrarFechaFormateada();
	updateCountdown();
	initMusicPlayer();
	initSwiper();
	mostrarFechaMaximaConfirmacion();
	cargarIconos();
	animarDresscode();
	enableCopyButtons();
});
