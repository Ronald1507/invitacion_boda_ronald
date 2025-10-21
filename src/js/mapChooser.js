// mapChooser.js
export function openMapChooser({ lat, lng, label = "" }) {
	const googleUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=`;
	const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

	let chooser = document.getElementById("map-chooser-overlay");
	if (!chooser) {
		chooser = document.createElement("div");
		chooser.id = "map-chooser-overlay";
		chooser.innerHTML = `
      <div class="map-chooser-backdrop"></div>
      <div class="map-chooser-menu">
        <p>¿Dónde deseas abrir el mapa?</p>
        <button data-target="google">Google Maps</button>
        <button data-target="waze">Waze</button>
        <button class="cancel">Cancelar</button>
      </div>
    `;
		document.body.appendChild(chooser);

		chooser
			.querySelector('button[data-target="google"]')
			.addEventListener("click", () => {
				window.open(googleUrl, "_blank");
				hideChooser();
			});
		chooser
			.querySelector('button[data-target="waze"]')
			.addEventListener("click", () => {
				window.open(wazeUrl, "_blank");
				hideChooser();
			});
		chooser.querySelector(".cancel").addEventListener("click", hideChooser);
		chooser
			.querySelector(".map-chooser-backdrop")
			.addEventListener("click", hideChooser);
	}

	function showChooser() {
		chooser.style.display = "block";
	}

	function hideChooser() {
		chooser.style.display = "none";
	}

	showChooser();
}
