// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
	// Define la carpeta raíz del proyecto (donde está index.html)
	root: "src",

	// Configuración del build
	build: {
		// Salida: carpeta dist en la raíz
		outDir: "../dist",
		// Carpeta para assets dentro de dist/
		assetsDir: "assets",
		// Minificar
		minify: true,
		// ← Esto borra dist/ antes de cada build
		emptyOutDir: true,
	},

	// Opcional: servidor de desarrollo
	server: {
		port: 3000,
		open: true,
	},
});
