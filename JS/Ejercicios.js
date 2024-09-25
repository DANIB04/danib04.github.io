
const links = document.querySelectorAll('nav a');
links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
            
        links.forEach(l => l.classList.remove('active'));
            
        event.target.classList.add('active');
            
        const target = event.target.getAttribute('href');
        document.querySelector('iframe').src = target;
    });
});
