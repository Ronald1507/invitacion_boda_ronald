// calendar.js
// "Agregar al calendario": genera un enlace a Google Calendar y un archivo .ics
// descargable (Apple Calendar / Outlook), todo a partir del config.
import { config, nombresNovios } from "../data/config.js";
import { obtenerFechaBoda } from "./fechaUtils.js";

// Da formato a una fecha como AAAAMMDDTHHMMSS (hora local "flotante",
// para que muestre la hora del evento sin importar la zona del invitado)
function formatoCalendario(fecha) {
	const z = (n) => String(n).padStart(2, "0");
	return (
		`${fecha.getFullYear()}${z(fecha.getMonth() + 1)}${z(fecha.getDate())}` +
		`T${z(fecha.getHours())}${z(fecha.getMinutes())}00`
	);
}

function fechasEvento() {
	const inicio = obtenerFechaBoda();
	const fin = new Date(inicio);
	fin.setHours(fin.getHours() + (config.fecha.duracionHoras || 4));
	return { inicio, fin };
}

function tituloEvento() {
	return `Boda ${nombresNovios}`;
}

function ubicacionEvento() {
	return [config.lugar.nombre, config.lugar.descripcion]
		.filter(Boolean)
		.join(" — ");
}

// URL de Google Calendar
function urlGoogle() {
	const { inicio, fin } = fechasEvento();
	const params = new URLSearchParams({
		action: "TEMPLATE",
		text: tituloEvento(),
		dates: `${formatoCalendario(inicio)}/${formatoCalendario(fin)}`,
		details: config.portada.mensaje,
		location: ubicacionEvento(),
		ctz: config.fecha.zonaHoraria,
	});
	return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Contenido de un archivo .ics
function contenidoICS() {
	const { inicio, fin } = fechasEvento();
	const escapar = (t) => String(t).replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
	return [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//invitacion-boda//ES",
		"BEGIN:VEVENT",
		`UID:boda-${formatoCalendario(inicio)}@invitacion`,
		`DTSTART:${formatoCalendario(inicio)}`,
		`DTEND:${formatoCalendario(fin)}`,
		`SUMMARY:${escapar(tituloEvento())}`,
		`DESCRIPTION:${escapar(config.portada.mensaje)}`,
		`LOCATION:${escapar(ubicacionEvento())}`,
		"END:VEVENT",
		"END:VCALENDAR",
	].join("\r\n");
}

function descargarICS() {
	const blob = new Blob([contenidoICS()], {
		type: "text/calendar;charset=utf-8",
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `boda-${config.novios.ella}-${config.novios.el}.ics`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

const ICONO_CALENDARIO = `
	<svg class="animated-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
		<path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11zM5 7V6h14v1H5zm7 4h5v5h-5v-5z"/>
	</svg>`;

export function initCalendario() {
	const cont = document.getElementById("calendar-actions");
	if (!cont) return;

	const btnGoogle = document.createElement("a");
	btnGoogle.className = "btn-calendario";
	btnGoogle.href = urlGoogle();
	btnGoogle.target = "_blank";
	btnGoogle.rel = "noopener noreferrer";
	btnGoogle.innerHTML = `${ICONO_CALENDARIO}<span>Google Calendar</span>`;

	const btnICS = document.createElement("button");
	btnICS.type = "button";
	btnICS.className = "btn-calendario";
	btnICS.innerHTML = `${ICONO_CALENDARIO}<span>Descargar (.ics)</span>`;
	btnICS.addEventListener("click", descargarICS);

	cont.append(btnGoogle, btnICS);
}
