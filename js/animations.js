// js/animations.js

export function animarDresscode() {
	// Movimiento lateral + rotación
	gsap.to(".dresscode-img", {
		x: 15,
		rotation: 3,
		duration: 2,
		yoyo: true,
		repeat: -1,
		ease: "sine.inOut",
	});

	// Movimiento vertical (flotando)
	gsap.to(".dresscode-img", {
		y: -10,
		duration: 2,
		yoyo: true,
		repeat: -1,
		ease: "sine.inOut",
	});
}

export function animarIconoRegalo() {
	gsap.to(".regalo-img", {
		x: 15,
		rotation: 3,
		duration: 2,
		yoyo: true,
		repeat: -1,
		ease: "sine.inOut",
	});

	// Movimiento vertical (flotando)
	gsap.to(".regalo-img", {
		y: -10,
		duration: 2,
		yoyo: true,
		repeat: -1,
		ease: "sine.inOut",
	});
}
