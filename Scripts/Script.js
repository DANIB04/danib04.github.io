function toggleTheme() {
    const body = document.body;
    const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    body.dataset.theme = newTheme;
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
    updateCountdown();
});

var countdowns = [
    { id: 1, targetDate: new Date("2024/12/23 00:00:00") },
    { id: 2, targetDate: new Date("2024/10/14 00:00:00") }
];

function updateCountdown() {
    countdowns.forEach(countdown => {
        var currentDate = new Date();
        var diff = (countdown.targetDate - currentDate) / 1000;

        var days = Math.floor(diff / (24 * 60 * 60));
        diff -= days * 24 * 60 * 60;

        var hours = Math.floor(diff / (60 * 60));
        diff -= hours * 60 * 60;

        var minutes = Math.floor(diff / 60);
        var seconds = Math.floor(diff - minutes * 60);

        document.getElementById('days' + countdown.id).querySelector('.number').textContent = days;
        document.getElementById('hours' + countdown.id).querySelector('.number').textContent = hours;
        document.getElementById('minutes' + countdown.id).querySelector('.number').textContent = minutes;
        document.getElementById('seconds' + countdown.id).querySelector('.number').textContent = seconds;
    });
}

setInterval(updateCountdown, 1000);
