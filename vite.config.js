// vite.config.js
import { defineConfig } from "vite";
import { config } from "./src/data/config.js";

// Une la URL del sitio con una ruta relativa para obtener una URL absoluta
// (Open Graph necesita URL absoluta para mostrar la imagen al compartir).
function urlAbsoluta(base, ruta) {
	if (!base) return ruta;
	const limpiaBase = base.replace(/\/$/, "");
	const limpiaRuta = ruta.replace(/^\.?\//, "");
	return `${limpiaBase}/${limpiaRuta}`;
}

// Plugin: reemplaza los placeholders %SEO_*% del index.html con datos del config
function inyectarSeo() {
	const { seo } = config;
	const reemplazos = {
		"%SEO_TITLE%": seo.titulo,
		"%SEO_DESCRIPTION%": seo.descripcion,
		"%THEME_COLOR%": seo.themeColor,
		"%SEO_URL%": seo.url,
		"%SEO_IMAGE%": urlAbsoluta(seo.url, seo.imagen),
	};

	return {
		name: "inyectar-seo",
		transformIndexHtml(html) {
			return html.replace(
				/%SEO_TITLE%|%SEO_DESCRIPTION%|%THEME_COLOR%|%SEO_URL%|%SEO_IMAGE%/g,
				(token) => reemplazos[token] ?? ""
			);
		},
	};
}

export default defineConfig({
	// Carpeta raíz del proyecto (donde está index.html)
	root: "src",

	plugins: [inyectarSeo()],

	// Configuración del build
	build: {
		outDir: "../dist",
		assetsDir: "assets",
		minify: true,
		emptyOutDir: true,
	},

	// Servidor de desarrollo
	server: {
		port: 3000,
		host: "0.0.0.0",
		open: true,
	},
});
