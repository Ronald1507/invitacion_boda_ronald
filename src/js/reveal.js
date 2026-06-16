// reveal.js
// Aparición suave de las secciones al entrar en el viewport.
// El estado oculto inicial sólo se aplica cuando hay JS (clase .js en <html>),
// así que sin JS o sin soporte todo se ve igual que siempre.
export function initReveal() {
	const animar =
		window.matchMedia &&
		!window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const secciones = document.querySelectorAll(".section, .section-countdown");

	if (!animar || !("IntersectionObserver" in window)) {
		secciones.forEach((s) => s.classList.add("reveal-visible"));
		return;
	}

	document.documentElement.classList.add("js-reveal");
	secciones.forEach((s) => s.classList.add("reveal"));

	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("reveal-visible");
					obs.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12 }
	);

	secciones.forEach((s) => observer.observe(s));
}
