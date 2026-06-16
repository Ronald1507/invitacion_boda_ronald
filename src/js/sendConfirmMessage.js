import { config } from "../data/config.js";

export function enviarMensajeConfirmacion() {
	const botones = document.querySelectorAll(
		".whatsapp-buttons .contact-button"
	);

	botones.forEach((btn) => {
		const nombre = btn.dataset.name; // Ronald, Darlyn
		const phone = btn.dataset.phone;

		const mensaje = config.confirmacion.plantillaMensaje.replace(
			"{nombre}",
			nombre
		);

		const link = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(
			mensaje
		)}`;

		// Asignamos el link al botón
		btn.href = link;
	});
}
