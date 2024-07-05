function toggleTheme() {
    const body = document.body;
    const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    body.dataset.theme = newTheme;
}

function loadPage(section) {
    const sections = ['home', 'projects', 'contact', 'services', 'blog', 'priv'];
    sections.forEach(s => {
        document.getElementById(s).classList.remove('active');
    });
    document.getElementById(section).classList.add('active');

    if (section === 'priv') {
        requestPassword();
    } else {
        fetchPage(section);
    }

    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    menuBtn.classList.remove('is-active');
    menu.classList.remove('active');
}

function fetchPage(section) {
    const url = `https://danib04.github.io/Pages/${section}.html`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching page:', error);
            document.getElementById('content').innerHTML = '<p>Error fetching content. Please try again later.</p>';
        });
}

function requestPassword() {
    const password = prompt("Ingrese la contraseña:");
    if (password) {
        decryptContent(password);
    }
}

function decryptContent(password) {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedContent, password);
        const decryptedContent = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedContent) {
            document.getElementById('content').innerHTML = decryptedContent;
            document.getElementById('priv').classList.add('active');
        } else {
            alert('Contraseña incorrecta');
        }
    } catch (e) {
        alert('Error en la desencriptación. Asegúrese de que la contraseña sea correcta.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');

    menuBtn.addEventListener('click', function() {
        this.classList.toggle('is-active');
        menu.classList.toggle('active');
    });

    document.body.dataset.theme = 'dark';
    loadPage('home');
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
