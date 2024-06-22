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
}