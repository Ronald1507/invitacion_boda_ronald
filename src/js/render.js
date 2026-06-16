// render.js
// Genera todo el contenido dinámico de la invitación a partir de src/data/config.js.
// Se ejecuta ANTES que el resto de inicializadores (swiper, copiar, whatsapp),
// porque crea los elementos sobre los que ellos trabajan.
import { config, nombresNovios } from "../data/config.js";
import { urlImagen, urlAudio } from "./assets.js";

// SVG del botón "copiar" (reutilizado en cada bloque bancario)
const ICONO_COPIAR = `
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor"
		stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
		<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
		<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
	</svg>`;

// Resuelve una ruta tipo "a.b.c" dentro del config
function resolver(path) {
	return path
		.split(".")
		.reduce((obj, key) => (obj == null ? obj : obj[key]), config);
}

// Rellena todos los [data-text] y [data-html] del documento desde el config
function bindTextos(root = document) {
	root.querySelectorAll("[data-text]").forEach((el) => {
		const clave = el.dataset.text;
		const valor = clave === "nombresNovios" ? nombresNovios : resolver(clave);
		if (valor != null) el.textContent = valor;
	});
	root.querySelectorAll("[data-html]").forEach((el) => {
		const valor = resolver(el.dataset.html);
		if (valor != null) el.innerHTML = valor;
	});
}

// Carrusel: genera los slides de la historia
function renderSlides() {
	const wrapper = document.getElementById("swiper-wrapper");
	if (!wrapper) return;
	wrapper.innerHTML = config.historia.fotos
		.map(
			(foto) => `
		<div class="swiper-slide">
			<img src="${urlImagen(foto.src)}" alt="${foto.alt}" loading="lazy" />
		</div>`
		)
		.join("");
}

// Bendición: genera la grilla de padres y padrinos
function renderBendicion() {
	const grid = document.getElementById("bendicion-grid");
	if (!grid) return;
	grid.innerHTML = config.bendicion.bloques
		.map(
			(bloque) => `
		<div class="bloque-bendicion">
			<h4 class="texto-general">${bloque.titulo}</h4>
			${bloque.personas
				.map((p) => `<p class="texto-general">${p}</p>`)
				.join("")}
		</div>`
		)
		.join("");
}

// Regalos: párrafos de texto
function renderRegalos() {
	const cont = document.getElementById("texto-regalos");
	if (!cont) return;
	cont.innerHTML = config.regalos.parrafos
		.map((p) => `<p class="texto-general">${p}</p>`)
		.join("");
}

// Cuentas bancarias: un bloque por cuenta, con botón de copiar
function renderCuentas() {
	const cont = document.getElementById("info-banco");
	if (!cont) return;
	cont.innerHTML = config.regalos.cuentas
		.map(
			(cuenta) => `
		<div class="bloque-banco">
			<button class="copy-btn" aria-label="Copiar datos de la cuenta">${ICONO_COPIAR}</button>
			${Object.entries(cuenta)
				.map(
					([clave, valor]) =>
						`<p class="parrafo-banco"><strong>${clave}:</strong> ${valor}</p>`
				)
				.join("")}
		</div>`
		)
		.join("");
}

// Confirmación: intro con la fecha límite + botones de WhatsApp
function renderConfirmacion() {
	const intro = document.getElementById("confirmacion-intro");
	if (intro) {
		intro.innerHTML = config.confirmacion.intro.replace(
			"{dia}",
			'<strong id="diaMaximoConfirmacion"></strong>'
		);
	}

	const cont = document.getElementById("whatsapp-buttons");
	if (cont) {
		cont.innerHTML = config.confirmacion.contactos
			.map(
				(c) => `
			<a href="#" target="_blank" rel="noopener noreferrer" class="contact-button"
				data-phone="${c.phone}" data-name="${c.nombre}">
				<img src="${urlImagen("whatsapp_dorado.webp")}" alt="WhatsApp ${c.nombre}" loading="lazy" />
				<span>${c.nombre}</span>
			</a>`
			)
			.join("");
	}
}

// Música: fuente de audio + textos del modal de bienvenida.
// Tras cambiar el <source> hay que llamar a audio.load() para que el
// elemento <audio> tome la nueva fuente (si no, no suena).
function renderMusica() {
	const source = document.getElementById("bg-music-source");
	const audio = document.getElementById("bg-music");
	if (source) source.src = urlAudio(config.musica.archivo);
	if (audio) audio.load();
}

// Punto de entrada: ejecuta todo el render
export function renderInvitacion() {
	document.title = config.seo.titulo;
	bindTextos();
	renderSlides();
	renderBendicion();
	renderRegalos();
	renderCuentas();
	renderConfirmacion();
	renderMusica();
}
