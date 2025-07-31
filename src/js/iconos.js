// --- 3. Importar Lottie ---
import lottie from "lottie-web";

export function cargarIconos() {
	const iconos = [
		{ id: "icono-calendar", path: "/assets/animations/calendario.json" },
		{ id: "icono-regalo", path: "/assets/animations/regalo_dos.json" },
		{ id: "icono-gps", path: "/assets/animations/icono-gps.json" },

		// agrega más iconos aquí si quieres
	];

	iconos.forEach(({ id, path }) => {
		const container = document.getElementById(id);
		if (container) {
			lottie.loadAnimation({
				container,
				renderer: "svg",
				loop: true,
				autoplay: true,
				path,
			});
		}
	});
}
