// ============================================================================
//  CONFIGURACIÓN DE LA INVITACIÓN  ·  Fuente única de verdad
// ----------------------------------------------------------------------------
//  Para reutilizar esta plantilla en OTRA boda, edita SOLO este archivo.
//  Todo lo demás (HTML, render, SEO, tema) se genera a partir de aquí.
//  Las imágenes van en src/files/img/ (se optimizan a /assets/img/ con
//  `npm run optimize`). La música en src/files/music/.
// ============================================================================

export const config = {
	// --- Pareja ----------------------------------------------------------------
	novios: {
		ella: "Darlyn",
		el: "Ronald",
		// Cómo se muestran juntos en títulos y portada
		separador: "&",
	},

	// --- Fechas (formato ISO: AAAA-MM-DD / HH:MM:SS) ---------------------------
	fecha: {
		dia: "2026-02-07",
		hora: "19:00:00",
		// Fecha límite para confirmar asistencia
		maxConfirmacion: "2026-01-03",
		// Zona horaria IANA (para el archivo de calendario)
		zonaHoraria: "America/Santiago",
		// Duración estimada del evento en horas (para el calendario)
		duracionHoras: 6,
	},

	// --- Portada (hero) --------------------------------------------------------
	portada: {
		titulo: "¡Nos casamos!",
		mensaje:
			"Con mucha felicidad, te invitamos a ser parte de este gran día...",
		textoScroll: "Desliza hacia abajo",
	},

	// --- Sección "Fecha" -------------------------------------------------------
	seccionFecha: {
		titulo: "Te esperamos el día",
	},

	// --- Nuestra historia ------------------------------------------------------
	historia: {
		titulo: "Nuestra Historia",
		texto: `"Han pasado ya 13 años desde que comenzó nuestra historia, una que nadie imaginó que se volvería eterna. En este viaje, lleno de subidas y bajadas, hemos aprendido a caminar tomados de la mano, sin soltarnos. Cada paso, cada prueba y cada alegría nos ha hecho más fuertes, porque no estamos solos: Dios ha sido siempre el centro de nuestro amor y de esta hermosa familia que juntos hemos construido."`,
		// El orden aquí es el orden del carrusel
		fotos: [
			{ src: "./assets/img/1_animada.webp", alt: "Darlyn y Ronald 1" },
			{ src: "./assets/img/2_animada.webp", alt: "Darlyn y Ronald 2" },
			{ src: "./assets/img/4_animada.webp", alt: "Darlyn y Ronald 3" },
			{ src: "./assets/img/3_animada.webp", alt: "Darlyn y Ronald 4" },
			{ src: "./assets/img/5_animada.webp", alt: "Darlyn y Ronald 5" },
		],
	},

	// --- Bendición (padres y padrinos) ----------------------------------------
	bendicion: {
		tituloSuperior: "Con la bendición de nuestros padres y padrinos",
		tituloInferior:
			"Pero por sobre todo con la bendición de <strong>Dios</strong>",
		bloques: [
			{
				titulo: "Padres Novio",
				personas: ["Pedro Fuentes Sanhueza", "Johanna Urra Fontalba"],
			},
			{
				titulo: "Padres Novia",
				personas: ["Luis García Alarcón", "Ruth Inzunza Toloza"],
			},
			{
				titulo: "Padrinos Novio",
				personas: [
					"Rodrigo Ruiz Ceballos",
					"Francisca Hernández Inzunza",
				],
			},
			{
				titulo: "Padrinos Novia",
				personas: ["Pedro Ortega Muñoz", "Gemmita Peñailillo Jara"],
			},
		],
	},

	// --- Lugar / Ubicación -----------------------------------------------------
	lugar: {
		titulo: "Lugar",
		nombre: "Casa Lucía",
		descripcion:
			'La ceremonia se celebrará en el Centro de Eventos "Casa Lucia", ubicado en Pichiarauco S/N, Curanilahue',
		// Coordenadas para Google Maps / Waze y para el botón "Ver en mapa"
		lat: -37.51495475752657,
		lng: -73.40882242191483,
	},

	// --- Cuenta regresiva ------------------------------------------------------
	countdown: {
		titulo: "Cuenta regresiva",
		esHoy: "¡Es hoy, prepárate!",
		yaPaso: "¡La boda ya pasó y estuvo espectacular!",
	},

	// --- Cita bíblica ----------------------------------------------------------
	citaBiblica: {
		texto:
			"Por esto dejará el hombre a su padre y a su madre, y se unirá a su mujer, y los dos serán una sola carne.",
		referencia: "Efesios 5:31",
	},

	// --- Dresscode -------------------------------------------------------------
	dresscode: {
		titulo: "Dresscode",
		texto: "Ellos traje formal deberán usar, ellas de vestido largo estarán... y juntos puntualmente tendrán que estar. En colores, lo que quieran menos color blanco o similar. Eso se lo dejamos a la novia. ¡Solo prepárate para pasarlo bien!",
	},

	// --- Regalos ---------------------------------------------------------------
	regalos: {
		titulo: "Regalos",
		parrafos: [
			"El mayor regalo para nosotros es que nos acompañes en este día especial, que marca el inicio de un nuevo capítulo en nuestra historia.",
			"Sin embargo, si deseas tener un detalle con nosotros, puedes hacerlo a través de sobres o transferencias, lo que nos ayudará a darle forma a esta nueva etapa de nuestras vidas.",
			"¡Gracias por ser parte de este sueño que estamos construyendo!",
		],
		// Cada cuenta genera un bloque con botón "copiar"
		cuentas: [
			{
				Banco: "Banco de Chile",
				Cuenta: "Corriente",
				Nombre: "Ronald Fuentes",
				"N° Cuenta": "00-146-02743-04",
				RUT: "20.088.089-7",
				Correo: "rpfu1999@gmail.com",
			},
			{
				Banco: "Banco Estado",
				Cuenta: "RUT",
				Nombre: "Darlyn García",
				"N° Cuenta": "00019849439",
				RUT: "19.849.439-9",
				Correo: "ddgarciainzunza1998@gmail.com",
			},
		],
	},

	// --- Confirmación de asistencia (RSVP por WhatsApp) ------------------------
	confirmacion: {
		titulo: "Confirma tu asistencia",
		// Usa {dia} para insertar la fecha límite formateada
		intro: "Tu presencia es muy importante para nosotros. Te pedimos por favor nos puedas confirmar tu asistencia hasta el día {dia}",
		llamado: "Presiona aquí para confirmar tu asistencia",
		// {nombre} se reemplaza por el nombre del contacto
		plantillaMensaje:
			"Hola {nombre} 😊 Me encantaría confirmar mi asistencia en este día tan importante para ustedes. ¡Nos vemos! 🎉💍",
		contactos: [
			{ nombre: "Ronald", phone: "56988393234" },
			{ nombre: "Darlyn", phone: "56974363255" },
		],
	},

	// --- Música de fondo -------------------------------------------------------
	musica: {
		archivo: "assets/music/contigo_siempre.mp3",
		tituloModal: "Darlyn & Ronald",
		textoBoton: "Abrir",
	},

	// --- Tema (colores y tipografías) -----------------------------------------
	//  Se aplican como variables CSS en :root al cargar (theme.js).
	tema: {
		colores: {
			dorado: "#bd9c5e",
			azulOscuro: "#153157",
			blancoCrema: "#fff5ee",
			blanco: "#ffffff",
		},
		fuentes: {
			titulo: '"Great Vibes", cursive',
			textos: '"Arapey", serif',
			botones: '"Cormorant Garamond", serif',
		},
	},

	// --- SEO / Compartir (Open Graph para WhatsApp, etc.) ----------------------
	//  Inyectado en el <head> en build y dev (ver vite.config.js).
	seo: {
		titulo: "Darlyn & Ronald · ¡Nos casamos!",
		descripcion:
			"Con mucha felicidad, te invitamos a ser parte de nuestra boda. 07.02.2026 · Casa Lucía, Curanilahue.",
		// URL pública del sitio (necesaria para que WhatsApp muestre la imagen).
		// Déjala vacía si aún no tienes dominio; complétala al desplegar.
		url: "",
		// Imagen de previsualización (ruta relativa dentro del sitio).
		imagen: "./assets/img/foto_manos.webp",
		// Color de la barra del navegador en móviles
		themeColor: "#153157",
	},
};

// Nombre combinado de los novios, reutilizable en varios lugares
export const nombresNovios = `${config.novios.ella} ${config.novios.separador} ${config.novios.el}`;
