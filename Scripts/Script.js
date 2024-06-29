function toggleTheme() {
    const body = document.body;
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
}

function showContent(section) {
    const sections = ['home', 'projects', 'about', 'contact', 'services', 'blog'];
    sections.forEach(s => {
        document.getElementById(s).classList.remove('active');
        document.getElementById(s + 'Content').style.display = 'none';
    });
    document.getElementById(section).classList.add('active');
    document.getElementById(section + 'Content').style.display = 'block';

    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    menuBtn.classList.remove('is-active');
    menu.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');

    menuBtn.addEventListener('click', function() {
        this.classList.toggle('is-active');
        menu.classList.toggle('active');
    });

    document.body.dataset.theme = 'dark';
    showContent('home');
});
