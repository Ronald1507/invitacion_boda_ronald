// musicPlayer.js
export function initMusicPlayer() {
	const audio = document.getElementById("bg-music");
	const modal = document.getElementById("music-modal");
	const startBtn = document.getElementById("start-music-btn");
	const toggleBtn = document.getElementById("toggle-music-btn");
	const icon = toggleBtn.querySelector("i");

	// SVG para play y pause
	const playIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  `;
	const pauseIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
  `;

	toggleBtn.innerHTML = pauseIcon;

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
			// icon.classList.replace("fa-play", "fa-pause");
			toggleBtn.innerHTML = pauseIcon;
		} else {
			audio.pause();
			// icon.classList.replace("fa-pause", "fa-play");
			toggleBtn.innerHTML = playIcon;
		}
	});
}
