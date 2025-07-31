import lottie from "lottie-web";

// ✅ Importa los JSON directamente
import calendarioData from "../assets/animations/calendario.json" assert { type: "json" };
import regaloData from "../assets/animations/regalo_dos.json" assert { type: "json" };
import gpsData from "../assets/animations/icono-gps.json" assert { type: "json" };

const iconos = [
	{ id: "icono-calendar", data: calendarioData },
	{ id: "icono-regalo", data: regaloData },
	{ id: "icono-gps", data: gpsData },
];

export function cargarIconos() {
	iconos.forEach(({ id, data }) => {
		const container = document.getElementById(id);
		if (container) {
			lottie.loadAnimation({
				container,
				renderer: "svg",
				loop: true,
				autoplay: true,
				animationData: data, // ✅ Usa animationData
			});
		}
	});
}
