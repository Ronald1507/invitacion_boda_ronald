// 🎯 CONFIGURACIÓN GENERAL
const DIA_BODA = "2026-02-07";
const HORA_BODA = "19:00:00";

// 🧩 Utilidades
function obtenerFechaBoda() {
	return new Date(`${DIA_BODA}T${HORA_BODA}`);
}

// Función para formatear la fecha como DD-MM-YYYY
function formatearFecha(fecha) {
	const dia = String(fecha.getDate()).padStart(2, "0");
	const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0
	const anio = fecha.getFullYear();
	const formato = `${dia}.${mes}.${anio}`;
	return formato;
}

// Función para formatear la hora como HH:MM (formato 24h)
function formatearHora(fecha) {
	const horas = String(fecha.getHours()).padStart(2, "0");
	const minutos = String(fecha.getMinutes()).padStart(2, "0");
	return `----- ${horas}:${minutos} hrs. -----`;
}

function esHoy(fecha) {
	const hoy = new Date();
	return (
		hoy.getFullYear() === fecha.getFullYear() &&
		hoy.getMonth() === fecha.getMonth() &&
		hoy.getDate() === fecha.getDate()
	);
}

// 📆 Mostrar fecha formateada una vez
function mostrarFechaFormateada() {
	const fechaBoda = obtenerFechaBoda();
	const fechaElement = document.getElementById("wedding-date");
	const horaElement = document.getElementById("wedding-hour");
	if (fechaElement && horaElement) {
		fechaElement.innerHTML = `<strong>${formatearFecha(
			fechaBoda
		)}</strong>`;
		horaElement.innerHTML = `<strong>${formatearHora(fechaBoda)}</strong>`;
	}
}

// ⏳ Solo cuenta regresiva
// function updateCountdown() {
// 	const countdownElement = document.getElementById("countdown");
// 	const faltan = document.getElementById("faltan");

// 	const ahora = new Date();
// 	const fechaBoda = obtenerFechaBoda();
// 	const diff = fechaBoda.getTime() - ahora.getTime();

// 	if (esHoy(fechaBoda)) {
// 		faltan.textContent = "";
// 		countdownElement.innerHTML = `
// 			<div class='timer-box'>
// 				<span>🎉</span>
// 				<span class='timer-label'>¡Es hoy!</span>
// 			</div>
// 		`;
// 		return;
// 	}

// 	if (diff <= 0) {
// 		faltan.textContent = "";
// 		countdownElement.innerHTML = `
// 			<div class='timer-box'>
// 				<span>💍</span>
// 				<span class='timer-label'>¡Ya ocurrió!</span>
// 			</div>
// 		`;
// 		return;
// 	}

// 	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
// 	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
// 	const minutes = Math.floor((diff / (1000 * 60)) % 60);
// 	const seconds = Math.floor((diff / 1000) % 60);

// 	countdownElement.innerHTML = `
// 		<div class="timer-box"><span>${days}</span><span class="timer-label">Días</span></div>
// 		<div class="timer-box"><span>${hours}</span><span class="timer-label">Horas</span></div>
// 		<div class="timer-box"><span>${minutes}</span><span class="timer-label">Minutos</span></div>
// 		<div class="timer-box"><span>${seconds}</span><span class="timer-label">Segundos</span></div>
// 	`;

// 	setTimeout(updateCountdown, 1000);
// }

function updateCountdown() {
	const faltan = document.getElementById("faltan");

	const ahora = new Date();
	const fechaBoda = obtenerFechaBoda(); // Asegúrate de tener esta función definida
	const diff = fechaBoda.getTime() - ahora.getTime();

	if (esHoy(fechaBoda)) {
		faltan.textContent = "";
		document.getElementById("countdown").innerHTML = `
            <section>
                <span>🎉</span>
                <p class='section-title'>¡Es hoy, prepárate!</p>
            </section>
        `;
		return;
	}

	if (diff <= 0) {
		faltan.textContent = "";
		document.getElementById("countdown").innerHTML = `
            <section>
                <span>💍</span>
                <p class='section-title'>¡La boda ya pasó y estuvo espectacular!</p>
            </section>
        `;
		return;
	}

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const seconds = Math.floor((diff / 1000) % 60);

	// Actualizamos solo los números sin modificar el HTML completo
	document.getElementById("days").textContent = days;
	document.getElementById("hours").textContent = String(hours).padStart(
		2,
		"0"
	);
	document.getElementById("minutes").textContent = String(minutes).padStart(
		2,
		"0"
	);
	document.getElementById("seconds").textContent = String(seconds).padStart(
		2,
		"0"
	);

	setTimeout(updateCountdown, 1000);
}

// 🎵 Música
function initMusicPlayer() {
	const audio = document.getElementById("bg-music");
	const modal = document.getElementById("music-modal");
	const startBtn = document.getElementById("start-music-btn");
	const toggleBtn = document.getElementById("toggle-music-btn");
	const icon = toggleBtn.querySelector("i");

	audio.muted = true;

	startBtn.addEventListener("click", () => {
		audio.muted = false;
		audio.play().catch((e) => console.warn("No se pudo reproducir:", e));
		modal.style.display = "none";
		toggleBtn.style.display = "block";
	});

	toggleBtn.addEventListener("click", () => {
		if (audio.paused) {
			audio.play();
			icon.classList.replace("fa-play", "fa-pause");
		} else {
			audio.pause();
			icon.classList.replace("fa-pause", "fa-play");
		}
	});
}

// 🖼️ Swiper
function initSwiper() {
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

// 🚀 Inicialización
window.addEventListener("DOMContentLoaded", () => {
	mostrarFechaFormateada(); // ✅ Solo una vez
	updateCountdown(); // 🔁 Cada segundo
	initMusicPlayer();
	initSwiper();
});
