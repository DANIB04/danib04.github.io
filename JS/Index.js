
function loadPage(page, activeLink) {
    const contentFrame = document.getElementById('contentFrame');
    contentFrame.src = page;

    const links = document.querySelectorAll('.nav-links-custom a');
    links.forEach(link => link.classList.remove('active'));

    const activeElement = Array.from(links).find(link => 
        link.getAttribute('onclick').includes(activeLink)
    );

    if (activeElement) {
        activeElement.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadPage('home.html', 'home.html');
});

document.getElementById('hamburger').addEventListener('click', function() {
	const navLinks = document.getElementById('nav-links');
	navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links-custom a').forEach(link => {
	link.addEventListener('click', function() {
		const navLinks = document.getElementById('nav-links');
		navLinks.classList.remove('active'); 
	});
});
