// iconos.js
export function cargarIconos() {
	const iconos = [
		{ id: "icono-corazon", path: "/assets/animations/corazon.json" },
		{ id: "icono-gps", path: "/assets/animations/gps.json" },
		{ id: "icono-regalo", path: "/assets/animations/regalo.json" },
		{ id: "icono-reloj", path: "/assets/animations/reloj-arena.json" },
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
