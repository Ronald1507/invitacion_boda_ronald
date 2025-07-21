// index.js
import {
	mostrarFechaFormateada,
	mostrarFechaMaximaConfirmacion,
	updateCountdown,
} from "./countdown.js";
import { initMusicPlayer } from "./musicPlayer.js";
import { initSwiper } from "./swiperSetup.js";

window.addEventListener("DOMContentLoaded", () => {
	mostrarFechaFormateada();
	updateCountdown();
	initMusicPlayer();
	initSwiper();
	mostrarFechaMaximaConfirmacion();
});
