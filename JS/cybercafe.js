document.addEventListener('DOMContentLoaded', () => {
    const computers = [
        { id: 1, available: true, name: "PC 1", reason: "", user: "", time: 0 },
        { id: 2, available: true, name: "PC 2", reason: "", user: "", time: 0 },
        { id: 3, available: false, name: "PC 3", reason: "Estudio", user: "Juan", time: 3 },
        { id: 4, available: false, name: "PC 4", reason: "Partido", user: "Ana", time: 2 },
        { id: 5, available: true, name: "PC 5", reason: "", user: "", time: 0 },
        { id: 6, available: false, name: "PC 6", reason: "Trabajo", user: "Luis", time: 5 },
        { id: 7, available: true, name: "PC 7", reason: "", user: "", time: 0 },
        { id: 8, available: true, name: "PC 8", reason: "", user: "", time: 0 },
        { id: 9, available: false, name: "PC 9", reason: "Reunión", user: "Carlos", time: 1 },
        { id: 10, available: false, name: "PC 10", reason: "Estudio", user: "Sara", time: 4 },
        { id: 11, available: true, name: "PC 11", reason: "", user: "", time: 0 },
        { id: 12, available: false, name: "PC 12", reason: "Deporte", user: "Javier", time: 6 },
        { id: 13, available: true, name: "PC 13", reason: "", user: "", time: 0 },
        { id: 14, available: false, name: "PC 14", reason: "Trabajo", user: "Marta", time: 3 },
        { id: 15, available: true, name: "PC 15", reason: "", user: "", time: 0 },
        { id: 16, available: false, name: "PC 16", reason: "Reunión", user: "José", time: 2 },
        { id: 17, available: true, name: "PC 17", reason: "", user: "", time: 0 },
        { id: 18, available: true, name: "PC 18", reason: "", user: "", time: 0 },
        { id: 19, available: false, name: "PC 19", reason: "Estudio", user: "Lina", time: 1 },
        { id: 20, available: true, name: "PC 20", reason: "", user: "", time: 0 },
        { id: 21, available: false, name: "PC 21", reason: "Trabajo", user: "David", time: 4 },
        { id: 22, available: true, name: "PC 22", reason: "", user: "", time: 0 },
        { id: 23, available: false, name: "PC 23", reason: "Deporte", user: "Lucía", time: 5 },
        { id: 24, available: false, name: "PC 24", reason: "Estudio", user: "Marco", time: 3 },
        { id: 25, available: true, name: "PC 25", reason: "", user: "", time: 0 }
    ]
            ;

    const computerList = document.getElementById("computer-list");
    const sortAvailableBtn = document.getElementById("sort-available");
    const sortOccupiedBtn = document.getElementById("sort-occupied");
    const reservationForm = document.getElementById("reservation-form");
    const openReservationFormBtn = document.getElementById("open-reservation-form");
    const cancelReservationBtn = document.getElementById("cancel-reservation");
    const reservationSelect = document.getElementById("pc-id");
    const reservationFormElement = document.getElementById("form-reserva");

    // Function to update computer list display
    const updateComputerList = (computers) => {
        computerList.innerHTML = "";
        computers.forEach((pc) => {
            const pcDiv = document.createElement("div");
            pcDiv.classList.add("computer");

            const pcName = document.createElement("h3");
            pcName.textContent = pc.name;

            const pcStatus = document.createElement("p");
            pcStatus.classList.add("status", pc.available ? "available" : "occupied");
            pcStatus.textContent = pc.available ? "Disponible" : "Ocupado";

            const reservationInfo = document.createElement("div");
            reservationInfo.classList.add("reservation-info");

            if (!pc.available) {
                reservationInfo.innerHTML = `
                    <span><strong>Usuario:</strong> ${pc.user}</span>
                    <span><strong>Motivo:</strong> ${pc.reason}</span>
                    <span><strong>Tiempo de uso:</strong> ${pc.time} horas</span>
                `;
            }

            pcDiv.appendChild(pcName);
            pcDiv.appendChild(pcStatus);
            pcDiv.appendChild(reservationInfo);
            computerList.appendChild(pcDiv);
        });
    };

    // Update the list initially
    updateComputerList(computers);

    // Sorting by available
    sortAvailableBtn.addEventListener('click', () => {
        const availableComputers = computers.filter(pc => pc.available);
        updateComputerList(availableComputers);
    });

    // Sorting by occupied
    sortOccupiedBtn.addEventListener('click', () => {
        const occupiedComputers = computers.filter(pc => !pc.available);
        updateComputerList(occupiedComputers);
    });

    // Open the reservation form
    openReservationFormBtn.addEventListener('click', () => {
        reservationForm.style.display = 'block';

        // Populate the available PCs in the select menu
        reservationSelect.innerHTML = "";
        computers.forEach((pc) => {
            if (pc.available) {
                const option = document.createElement("option");
                option.value = pc.id;
                option.textContent = pc.name;
                reservationSelect.appendChild(option);
            }
        });
    });

    // Cancel reservation
    cancelReservationBtn.addEventListener('click', () => {
        reservationForm.style.display = 'none';
    });

    // Handle reservation form submission
    reservationFormElement.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedPcId = parseInt(reservationSelect.value);
        const userName = document.getElementById("user").value;
        const reason = document.getElementById("motivo").value;
        const time = parseInt(document.getElementById("tiempo").value);

        // Find the selected PC and update its status
        const selectedPc = computers.find(pc => pc.id === selectedPcId);
        selectedPc.available = false;
        selectedPc.reason = reason;
        selectedPc.user = userName;
        selectedPc.time = time;

        alert(`Reserva realizada con éxito para ${userName} en ${selectedPc.name} por ${reason} durante ${time} horas.`);
        
        // Close the form
        reservationForm.style.display = 'none';

        // Update the computer list
        updateComputerList(computers);
    });
});
