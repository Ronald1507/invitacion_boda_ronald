// fechaUtils.js
export const DIA_BODA = "2026-02-07";
export const HORA_BODA = "19:00:00";
export const FECHA_MAX_CONFIRMACION = "2026-01-03";

export function obtenerFechaBoda() {
	return new Date(`${DIA_BODA}T${HORA_BODA}`);
}

export function fechaMaximaConfirmacion() {
	return new Date(FECHA_MAX_CONFIRMACION);
}

export function formatearFecha(fecha) {
	const dia = String(fecha.getDate()).padStart(2, "0");
	const mes = String(fecha.getMonth() + 1).padStart(2, "0");
	const anio = fecha.getFullYear();
	return `${dia}.${mes}.${anio}`;
}

export function formatearHora(fecha) {
	const horas = String(fecha.getHours()).padStart(2, "0");
	const minutos = String(fecha.getMinutes()).padStart(2, "0");
	return `----- ${horas}:${minutos} hrs. -----`;
}

export function esHoy(fecha) {
	const hoy = new Date();
	return (
		hoy.getFullYear() === fecha.getFullYear() &&
		hoy.getMonth() === fecha.getMonth() &&
		hoy.getDate() === fecha.getDate()
	);
}

export function formatearFechaMaximaConfirmacion(fecha) {
	return fecha.toLocaleDateString("es-CL", {
		weekday: "long", // ⬅️ agrega el día de la semana
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}
