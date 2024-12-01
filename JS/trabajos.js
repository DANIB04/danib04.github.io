window.onload = function() {
    fetchODSFile('/DATOS/Trabajos.ods');
};

function fetchODSFile(filePath) {
    fetch(filePath)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            displayData(jsonData);
        })
        .catch(error => console.error("Error al cargar el archivo .ods:", error));
}

function parseDate(fechaStr) {
    const regexDMY = /(\d{2})-(\d{2})-(\d{4})/;
    const regexYMD = /(\d{4})-(\d{2})-(\d{2})/;
    if (regexDMY.test(fechaStr)) {
        const [_, dia, mes, año] = regexDMY.exec(fechaStr);
        return new Date(`${año}-${mes}-${dia}`);
    } else if (regexYMD.test(fechaStr)) {
        const [_, año, mes, dia] = regexYMD.exec(fechaStr);
        return new Date(`${año}-${mes}-${dia}`);
    } else {
        console.error("Fecha inválida:", fechaStr);
        return null;
    }
}

function formatDateToDMY(date) {
    if (!date) return "Fecha Inválida";
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const año = date.getFullYear();
    return `${dia}-${mes}-${año}`;
}

function displayData(data) {
    const projectsDiv = document.getElementById('projects');
    projectsDiv.innerHTML = '';
    const rows = data.slice(1);

    rows.forEach(row => {
        const [id, nombre, fechaFinal, entregado, descripcion] = row;
        const fechaFinalDate = parseDate(fechaFinal);
        let diasRestantes = null;

        if (fechaFinalDate) {
            diasRestantes = Math.ceil((fechaFinalDate - new Date()) / (1000 * 60 * 60 * 24));
        }

        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-container');

        const imageName = nombre ? nombre.trim().replace(/\s+/g, '_') : "default";
        const imagePath = `/IMAGENES/Portada/${id || 'N/A'}.png`;
        const documentPath = `/DOCUMENTOS/${nombre || 'N/A'}.pdf`;

        let diasRestantesHTML = '';
        if (!entregado || entregado.toLowerCase() !== 'sí') {
            diasRestantesHTML = `<p><strong>Días Restantes:</strong> <span style="color: red; font-weight: bold;">${diasRestantes !== null ? diasRestantes : "No Disponible"}</span></p>`;
        }

        projectDiv.innerHTML = `
            <div class="project-image">
                <img src="${imagePath}" alt="Imagen de ${nombre || "Sin Nombre"}" onerror="this.src='/IMAGENES/default.jpg';">
            </div>
            <div class="project-details">
                <h2>${nombre || "Sin Nombre"}</h2>
                <p><strong>Id:</strong> ${id || "N/A"}</p>
                <p><strong>Entregado:</strong> 
                    <span class="${entregado && entregado.toLowerCase() === 'sí' ? 'completed' : 'not-completed'}">
                        ${entregado && entregado.toLowerCase() === 'sí' ? 'Sí' : 'No'}
                        </span>
                    </p>
                        <p><strong>Fecha Final:</strong> ${formatDateToDMY(fechaFinalDate)}</p>
                        ${diasRestantesHTML}
                        <p><strong>Descripción:</strong> ${descripcion || "Sin Descripción"}</p>
                <div class="links">
                    <a class="view-link" href="${documentPath}" target="_blank">Ver 👀</a>
                    <a class="download-link" href="${documentPath}" download="${nombre || 'Documento'}.pdf">Descargar 📥</a>
                </div>
            </div>
        `;
        projectsDiv.appendChild(projectDiv);
    });
}