// script.js

// Función para cargar la página en el iframe
function loadPage(page, activeLink) {
    const contentFrame = document.getElementById('contentFrame');
    contentFrame.src = page; // Cambia la fuente del iframe a la página deseada

    // Eliminar la clase 'active' de todos los enlaces
    const links = document.querySelectorAll('.nav-links-custom a');
    links.forEach(link => link.classList.remove('active'));

    // Añadir la clase 'active' al enlace correspondiente
    const activeElement = Array.from(links).find(link => 
        link.getAttribute('onclick').includes(activeLink)
    );

    if (activeElement) {
        activeElement.classList.add('active');
    }
}

// Inicializa la página cargando el contenido por defecto
document.addEventListener('DOMContentLoaded', function () {
    loadPage('home.html', 'home.html'); // Carga la sección por defecto
});

document.getElementById('hamburger').addEventListener('click', function() {
	const navLinks = document.getElementById('nav-links');
	navLinks.classList.toggle('active'); // Alterna la clase 'active' para mostrar/ocultar el menú
});

// Agrega evento a cada enlace para cerrar el menú al seleccionarlo
document.querySelectorAll('.nav-links-custom a').forEach(link => {
	link.addEventListener('click', function() {
		const navLinks = document.getElementById('nav-links');
		navLinks.classList.remove('active'); // Oculta el menú
	});
});
