function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.classList.remove('visible');
        section.classList.add('hidden');});

    var selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');
    selectedSection.classList.add('visible');

    var menuToggle = document.getElementById('menu-toggle');
        if (menuToggle.checked) {menuToggle.checked = false;}
}