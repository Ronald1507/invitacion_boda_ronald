// musicPlayer.js
export function initMusicPlayer() {
	const audio = document.getElementById("bg-music");
	const modal = document.getElementById("music-modal");
	const startBtn = document.getElementById("start-music-btn");
	const toggleBtn = document.getElementById("toggle-music-btn");
	const icon = toggleBtn.querySelector("i");

	audio.muted = true;

	startBtn.addEventListener("click", () => {
		audio.muted = false;
		audio.play().catch((e) => console.warn("No se pudo reproducir:", e));
		modal.style.display = "none";
		toggleBtn.style.display = "block";
	});

	toggleBtn.addEventListener("click", () => {
		if (audio.paused) {
			audio.play();
			icon.classList.replace("fa-play", "fa-pause");
		} else {
			audio.pause();
			icon.classList.replace("fa-pause", "fa-play");
		}
	});
}
