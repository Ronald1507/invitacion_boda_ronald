export function enableCopyButtons() {
	const buttons = document.querySelectorAll(".copy-btn");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const bloque = button.parentElement;
			const parrafos = bloque.querySelectorAll("p");
			const texto = Array.from(parrafos)
				.map((p) => p.innerText.trim())
				.join("\n");

			navigator.clipboard
				.writeText(texto)
				.then(() => {
					// Guardamos el contenido original (el ícono SVG)
					const originalContent = button.innerHTML;

					// Cambiamos a texto '¡Copiado!'
					button.textContent = "¡Copiado!";
					button.style.color = "#153157";

					// Después de 2 segundos, restauramos el ícono
					setTimeout(() => {
						button.innerHTML = originalContent;
						button.style.color = "#bd9c5e";
					}, 3000);
				})
				.catch((err) => {
					console.error("Error al copiar:", err);
				});
		});
	});
}
