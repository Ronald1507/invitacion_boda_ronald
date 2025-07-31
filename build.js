import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

ffmpeg.setFfmpegPath(ffmpegPath);

const __dirname = path.resolve();
const src = path.join(__dirname, "src");
const dist = path.join(__dirname, "dist");

if (fs.existsSync(dist)) fs.rmSync(dist, { recursive: true });
fs.mkdirSync(dist);

// ✅ Calcular tamaño de carpeta
function getFolderSize(folder) {
	let total = 0;
	function calcSize(dir) {
		for (const file of fs.readdirSync(dir)) {
			const filePath = path.join(dir, file);
			if (fs.statSync(filePath).isDirectory()) calcSize(filePath);
			else total += fs.statSync(filePath).size;
		}
	}
	calcSize(folder);
	return (total / (1024 * 1024)).toFixed(2);
}

// ✅ Copiar src → dist (manteniendo estructura)
function copyDir(srcDir, destDir) {
	fs.mkdirSync(destDir, { recursive: true });
	for (const file of fs.readdirSync(srcDir)) {
		const srcFile = path.join(srcDir, file);
		const destFile = path.join(destDir, file);
		if (fs.statSync(srcFile).isDirectory()) {
			copyDir(srcFile, destFile);
		} else {
			fs.copyFileSync(srcFile, destFile);
		}
	}
}

copyDir(src, dist);
console.log("✅ Archivos copiados a /dist");

// ✅ Tamaño original
const sizeBefore = getFolderSize(dist);

// ✅ Optimizar imágenes en /dist/assets/img
const imgFolder = path.join(dist, "assets/img");

(async () => {
	if (fs.existsSync(imgFolder)) {
		// Optimizar JPG y PNG en su carpeta
		await imagemin([`${imgFolder}/*.{jpg,jpeg,png}`], {
			destination: imgFolder,
			plugins: [
				imageminMozjpeg({ quality: 70 }),
				imageminPngquant({ quality: [0.5, 0.7] }),
			],
		});
		console.log("✅ Imágenes JPG/PNG optimizadas");

		// Generar WebP en la misma carpeta
		await imagemin([`${imgFolder}/*.{jpg,jpeg,png}`], {
			destination: imgFolder,
			plugins: [imageminWebp({ quality: 70 })],
		});
		console.log("✅ Imágenes convertidas a WebP");

		// Reemplazar en HTML y CSS
		replaceToWebP(dist);

		// Eliminar JPG/PNG originales
		removeOriginalImages(imgFolder);
		console.log("✅ JPG/PNG eliminados (solo WebP en dist)");
	}
})();

// ✅ Reemplazar rutas en HTML y CSS por WebP
function replaceToWebP(dir) {
	for (const file of fs.readdirSync(dir)) {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			replaceToWebP(filePath);
		} else if (file.endsWith(".html") || file.endsWith(".css")) {
			let content = fs.readFileSync(filePath, "utf8");
			// Reemplazar .jpg/.jpeg/.png por .webp
			content = content.replace(/\.(jpg|jpeg|png)(?=")/g, ".webp");
			fs.writeFileSync(filePath, content);
		}
	}
}

// ✅ Eliminar imágenes originales después de generar WebP
function removeOriginalImages(dir) {
	for (const file of fs.readdirSync(dir)) {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			removeOriginalImages(filePath);
		} else if (/\.(jpg|jpeg|png)$/i.test(file)) {
			fs.unlinkSync(filePath);
		}
	}
}

// ✅ Comprimir MP3 en /assets/music
function compressMP3(dir) {
	for (const file of fs.readdirSync(dir)) {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			compressMP3(filePath);
		} else if (file.endsWith(".mp3")) {
			const outputFile = filePath.replace(".mp3", "-optimized.mp3");
			// Cambia aquí entre "64k", "96k", o "128k" según quieras probar
			ffmpeg(filePath)
				.audioBitrate("128k") // ← Cambia aquí: "64k" o "96k"
				.save(outputFile)
				.on("end", () => {
					fs.unlinkSync(filePath);
					fs.renameSync(outputFile, filePath);
					console.log(`✅ MP3 comprimido: ${file}`);
				})
				.on("error", (err) => {
					console.error(
						`❌ Error al comprimir ${file}:`,
						err.message
					);
				});
		}
	}
}
compressMP3(path.join(dist, "assets", "music"));

// ✅ Minificar HTML, CSS y JS
function minifyFiles(dir) {
	for (const file of fs.readdirSync(dir)) {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			minifyFiles(filePath);
		} else if (file.endsWith(".html")) {
			execSync(
				`npx html-minifier-terser --collapse-whitespace --remove-comments --minify-js true --minify-css true -o "${filePath}" "${filePath}"`
			);
		} else if (file.endsWith(".css")) {
			execSync(`npx cleancss -o "${filePath}" "${filePath}"`);
		} else if (file.endsWith(".js")) {
			execSync(
				`npx terser "${filePath}" -o "${filePath}" --compress --mangle`
			);
		}
	}
}

minifyFiles(dist);
console.log("✅ HTML, CSS y JS minificados");

// ✅ Reporte final
setTimeout(() => {
	const sizeAfter = getFolderSize(dist);
	console.log("📊 Reporte:");
	console.log(`Tamaño original: ${sizeBefore} MB`);
	console.log(`Tamaño optimizado: ${sizeAfter} MB`);
}, 6000);
