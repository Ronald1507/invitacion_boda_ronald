// countdown.js
import {
	obtenerFechaBoda,
	formatearFecha,
	formatearHora,
	esHoy,
} from "./fechaUtils.js";

export function mostrarFechaFormateada() {
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

export function updateCountdown() {
	const faltan = document.getElementById("faltan");
	const countdownElement = document.getElementById("countdown");
	const fechaBoda = obtenerFechaBoda();
	const ahora = new Date();
	const diff = fechaBoda - ahora;

	if (esHoy(fechaBoda)) {
		faltan.textContent = "";
		countdownElement.innerHTML = `
            <section>
                <span>🎉</span>
                <p class='section-title'>¡Es hoy, prepárate!</p>
            </section>`;
		return;
	}

	if (diff <= 0) {
		faltan.textContent = "";
		countdownElement.innerHTML = `
            <section>
                <span>💍</span>
                <p class='section-title'>¡La boda ya pasó y estuvo espectacular!</p>
            </section>`;
		return;
	}

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const seconds = Math.floor((diff / 1000) % 60);

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
