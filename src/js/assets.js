// assets.js
// Vite sólo incluye en el build los assets que "ve" mediante import/glob.
// Como las rutas de imágenes y música viven como texto en config.js, aquí las
// registramos con import.meta.glob para que el bundler las procese y copie,
// y resolvemos cada ruta del config a la URL final (hasheada en build).
// Funciona igual en `npm run dev` y en `npm run build`.

const imagenes = import.meta.glob("../assets/img/*", {
	eager: true,
	import: "default",
	query: "?url",
});

const audios = import.meta.glob("../assets/music/*", {
	eager: true,
	import: "default",
	query: "?url",
});

// nombre de archivo → URL final
function construirMapa(glob) {
	const mapa = {};
	for (const [ruta, url] of Object.entries(glob)) {
		mapa[ruta.split("/").pop()] = url;
	}
	return mapa;
}

const mapaImg = construirMapa(imagenes);
const mapaAudio = construirMapa(audios);

// Resuelve una ruta del config (p.ej. "./assets/img/1_animada.webp") a su URL real.
// Si no la encuentra, devuelve la ruta original (no rompe nada).
export function urlImagen(ruta) {
	return mapaImg[String(ruta).split("/").pop()] || ruta;
}

export function urlAudio(ruta) {
	return mapaAudio[String(ruta).split("/").pop()] || ruta;
}
