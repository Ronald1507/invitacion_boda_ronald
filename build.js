// build.js
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

// Carpetas
const files = path.join(__dirname, "files");
const assets = path.join(__dirname, "assets");

const filesImg = path.join(files, "img");
const filesMusic = path.join(files, "music");
const assetsImg = path.join(assets, "img");
const assetsMusic = path.join(assets, "music");

// ✅ Asegurar que carpetas existan
function ensureDir(dir) {
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir(assetsImg);
ensureDir(assetsMusic);

// ✅ Calcular tamaño
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

// ✅ Tamaño original de files
const sizeBefore = getFolderSize(files);

// ✅ Copiar todas las imágenes (SVG, etc.) a assets/img, evitando duplicados con WebP
function copyNonWebpImages() {
	if (fs.existsSync(filesImg)) {
		console.log("📁 Copiando imágenes no JPG/PNG a /assets/img...");

		for (const file of fs.readdirSync(filesImg)) {
			const srcFile = path.join(filesImg, file);
			const destFile = path.join(assetsImg, file);
			if (fs.statSync(srcFile).isDirectory()) continue;

			const ext = path.extname(file).toLowerCase();
			const nameWithoutExt = path.basename(file, ext);

			// Verificar si ya existe un .webp con el mismo nombre base
			const webpExists = fs.existsSync(
				path.join(assetsImg, `${nameWithoutExt}.webp`)
			);

			if ([".jpg", ".jpeg", ".png"].includes(ext)) {
				// Si es JPG/PNG, no se copia aquí (se convertirá a WebP después)
				continue;
			}

			if (webpExists) {
				console.warn(
					`⚠️  Ignorado: ${file} (ya existe ${nameWithoutExt}.webp)`
				);
				continue;
			}

			fs.copyFileSync(srcFile, destFile);
		}
		console.log(
			"✅ Imágenes no JPG/PNG copiadas (sin duplicados con WebP)"
		);
	}
}

// ✅ Optimizar imágenes: convertir JPG/PNG → WebP (y evitar duplicados)
async function optimizeImages() {
	if (fs.existsSync(filesImg)) {
		console.log("🚀 Convirtiendo JPG/PNG → WebP...");

		// Convertir y guardar como WebP
		await imagemin([`${filesImg}/*.{jpg,jpeg,png}`], {
			destination: assetsImg,
			plugins: [
				imageminMozjpeg({ quality: 70 }),
				imageminPngquant({ quality: [0.5, 0.7] }),
				imageminWebp({ quality: 70 }),
			],
		});

		console.log("✅ JPG/PNG convertidos a WebP");

		// Reemplazar rutas en HTML y CSS
		updateImagePathsInFiles();
	}
}

// ✅ Reemplazar .jpg/.jpeg/.png por .webp en HTML y CSS
function updateImagePathsInFiles() {
	const filesToCheck = [
		path.join(__dirname, "index.html"),
		path.join(__dirname, "css", "styles.css"),
	];

	// Expresión regular para detectar rutas con .jpg, .jpeg, .png
	const regex = /(\.\/assets\/img\/[^"' ]*)\.(jpg|jpeg|png)(?=["' ])/g;

	filesToCheck.forEach((filePath) => {
		if (!fs.existsSync(filePath)) {
			console.warn(`⚠️  Archivo no encontrado: ${filePath}`);
			return;
		}

		let content = fs.readFileSync(filePath, "utf8");

		// Reemplazar todas las coincidencias: cambia .jpg → .webp, .png → .webp, etc.
		content = content.replace(regex, "$1.webp");

		fs.writeFileSync(filePath, content);
		console.log(`✅ Extensiones actualizadas a .webp en: ${filePath}`);
	});
}

// ✅ Comprimir MP3: files/music → assets/music
function compressMusic() {
	if (fs.existsSync(filesMusic)) {
		console.log("🎵 Comprimiendo música...");
		for (const file of fs.readdirSync(filesMusic)) {
			const filePath = path.join(filesMusic, file);
			if (fs.statSync(filePath).isDirectory()) continue;
			if (!file.endsWith(".mp3")) continue;

			const outputFile = path.join(assetsMusic, file);
			const outputOptimized = outputFile.replace(".mp3", "-temp.mp3");

			ffmpeg(filePath)
				.audioBitrate("64k")
				.outputFormat("mp3")
				.save(outputOptimized)
				.on("end", () => {
					if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
					fs.renameSync(outputOptimized, outputFile);
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

// ✅ Ejecutar todo
async function build() {
	try {
		console.log("🧹 Limpiando carpetas anteriores...");
		if (fs.existsSync(assets)) fs.rmSync(assets, { recursive: true });
		ensureDir(assetsImg);
		ensureDir(assetsMusic);

		copyNonWebpImages(); // Copia SVG, etc. (sin duplicar con WebP)
		await optimizeImages(); // Convierte JPG/PNG → WebP
		compressMusic(); // Comprime MP3

		// Reporte final
		setTimeout(() => {
			const sizeAfter = getFolderSize(assets);
			console.log("📊 Reporte de optimización:");
			console.log(`Tamaño original (files): ${sizeBefore} MB`);
			console.log(`Tamaño optimizado (assets): ${sizeAfter} MB`);
		}, 2000);
	} catch (err) {
		console.error("❌ Error durante el build:", err);
	}
}

build();
