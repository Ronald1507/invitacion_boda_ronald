export function enableCopyButtons() {
	const buttons = document.querySelectorAll(".bloque-banco");

	buttons.forEach((button) => {
		const copyBtn = button.querySelector(".copy-btn");
		const originalIcon = copyBtn.innerHTML; // Guardamos el SVG original

		button.addEventListener("click", () => {
			const parrafos = button.querySelectorAll("p");
			const texto = Array.from(parrafos)
				.map((p) => p.innerText.trim())
				.join("\n");

			navigator.clipboard
				.writeText(texto)
				.then(() => {
					// Restaurar todos los botones antes de actualizar el clickeado
					buttons.forEach((btn) => {
						const btnIcon = btn.querySelector(".copy-btn");
						btnIcon.innerHTML = originalIcon; // Restaurar el SVG
						btnIcon.style.color = "#bd9c5e"; // Color original
					});

					// Cambiamos el botón actual a "¡Copiado!"
					copyBtn.textContent = "¡Copiado!";
					// copyBtn.style.color = "#153157";

					// Después de 3 segundos, restauramos el SVG original
					setTimeout(() => {
						copyBtn.innerHTML = originalIcon;
						copyBtn.style.color = "#bd9c5e";
					}, 3000);
				})
				.catch((err) => {
					console.error("Error al copiar:", err);
				});
		});
	});
}
