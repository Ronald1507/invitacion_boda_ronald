// theme.js
// Aplica el tema (colores y tipografías) definido en config.tema a las
// variables CSS de :root, para que todo el CSS quede controlado desde el config.
import { config } from "../data/config.js";

export function aplicarTema() {
	const raiz = document.documentElement;
	const { colores, fuentes } = config.tema;

	// Colores → variables que ya usa styles.css
	raiz.style.setProperty("--dorado", colores.dorado);
	raiz.style.setProperty("--azulOscuro", colores.azulOscuro);
	raiz.style.setProperty("--blancoCrema", colores.blancoCrema);
	raiz.style.setProperty("--blanco", colores.blanco);

	// Tipografías
	raiz.style.setProperty("--fuenteTitulo", fuentes.titulo);
	raiz.style.setProperty("--fuenteTextos", fuentes.textos);
	raiz.style.setProperty("--fuenteBotonesEspeciales", fuentes.botones);
}
