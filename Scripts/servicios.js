document.addEventListener("DOMContentLoaded", () => {
    fetch('https://raw.githubusercontent.com/DANIB04/danib04.github.io/main/Datos/data.json')
        .then(response => response.json())
        .then(data => {
            displaySchedule(data.schedule);
            displayExams(data.exams);
            setCountdowns(data.schedule, data.exams);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    function displaySchedule(schedule) {
        const table = document.getElementById('schedule-table');
        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

        days.forEach(day => {
            let row = document.createElement('tr');
            let dayCell = document.createElement('th');
            dayCell.textContent = day;
            row.appendChild(dayCell);

            let daySchedule = schedule.filter(item => item.day === day);
            if (daySchedule.length === 0) {
                let cell = document.createElement('td');
                cell.textContent = "No hay clases";
                row.appendChild(cell);
            } else {
                daySchedule.forEach(item => {
                    let cell = document.createElement('td');
                    cell.textContent = `${item.subject} (${item.start} - ${item.end})`;
                    row.appendChild(cell);
                });
            }

            table.appendChild(row);
        });
    }

    function displayExams(exams) {
        const examList = document.getElementById('exam-list');
        exams.forEach((exam, index) => {
            let li = document.createElement('li');
            li.innerHTML = `<strong>${exam.name}</strong><br>${exam.description}<br>Fecha: ${new Date(exam.date).toLocaleString()}<br><span id="exam-countdown-${index}"></span>`;
            examList.appendChild(li);
        });
    }

    function setCountdowns(schedule, exams) {
        const countdown = document.getElementById('countdown');
        const now = new Date();
        const today = now.toLocaleDateString('es-ES', { weekday: 'long' });

        let nextClass = schedule
            .filter(item => item.day === today)
            .map(item => {
                const [hours, minutes] = item.start.split(':');
                const classTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
                return classTime > now ? classTime : null;
            })
            .find(classTime => classTime !== null);

        if (nextClass) {
            updateClassCountdown(nextClass);
            setInterval(() => updateClassCountdown(nextClass), 1000);
        } else {
            countdown.textContent = "No hay más clases hoy.";
        }

        exams.forEach((exam, index) => {
            let examTime = new Date(exam.date);
            updateExamCountdown(examTime, index);
            setInterval(() => updateExamCountdown(examTime, index), 1000);
        });
    }

    function updateClassCountdown(nextClassTime) {
        const now = new Date();
        let timeDifference = nextClassTime - now;
        if (timeDifference > 0) {
            let hours = Math.floor(timeDifference / (1000 * 60 * 60));
            let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            document.getElementById('countdown').textContent = `Próxima clase en: ${hours}h ${minutes}m ${seconds}s`;
        } else {
            document.getElementById('countdown').textContent = "La clase ha comenzado.";
        }
    }

    function updateExamCountdown(examTime, index) {
        const now = new Date();
        let timeDifference = examTime - now;
        if (timeDifference > 0) {
            let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            document.getElementById(`exam-countdown-${index}`).textContent = `Tiempo restante: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            document.getElementById(`exam-countdown-${index}`).textContent = "El examen/proyecto ha comenzado o ha finalizado.";
        }
    }
});
