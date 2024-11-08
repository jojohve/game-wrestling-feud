const rangeInput = document.getElementById("rangeInput");
const rangeLabel = document.querySelector(".custom_range_slider");
rangeLabel.insertAdjacentHTML("beforeend", `<span class="bubble">${rangeInput.value}</span>`);
const rangeBubble = rangeLabel.querySelector(".bubble");

let playerChoice = null;
let pressioneMcMahon = 100;
let turn = 1;
const maxTurns = 5;
let vinceChoice = "";

// Event listener per aggiornare la posizione del bubble
rangeInput.addEventListener("input", () => {
    const { min, max, value } = rangeInput;
    const total = Number(max) - Number(min);
    const perc = (Number(value) - Number(min)) / total;

    rangeBubble.style.left = `${perc * 100}%`;
    rangeBubble.style.transform = `translateX(-${perc * 100}%)`;
    rangeBubble.textContent = value;
});

function confirmChoice() {
    playerChoice = Number(rangeInput.value);
    const { min, max, step } = rangeInput;

    // Calcolo della scelta casuale di Vince McMahon
    const vinceMcMahonChoice = Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min);

    // Differenza basata sullo step corrente
    const allowedDifference = step > 1 ? 50 : 1;
    const difference = Math.abs(playerChoice - vinceMcMahonChoice);

    if (difference <= allowedDifference) {
        pressioneMcMahon -= 20;
        console.log("Differenza: " + difference + ", scelta di Vince: " + vinceMcMahonChoice + ", scelta tua: " + playerChoice);
        document.getElementById("response").textContent = `Turno ${turn}: Vince McMahon: Ci sai fare, andiamo avanti!`;
    } else {
        console.log("Differenza: " + difference + ", scelta di Vince: " + vinceMcMahonChoice + ", scelta tua: " + playerChoice);
        document.getElementById("response").textContent = `Turno ${turn}: Vince McMahon: Che credi che regali i soldi?`;
    }

    turn++;
    updateTurn();
    updateRoleButtons(pressioneMcMahon);

    if (turn > maxTurns) {
        document.getElementById("gameContainer").style.visibility = 'hidden';
        document.getElementById("response").textContent = "Vince McMahon: La partita è finita. Scegli il ruolo che credi di meritare:";
        document.getElementById("chiediAvince").style.visibility = 'hidden';
        return;
    }
}

function updateTurn() {
    const turnSettings = [
        { min: 100, max: 10000, step: 100, description: "Indovina lo stipendio!" },
        { min: 1, max: 5, step: 1, description: "Anni di contratto!" },
        { min: 1, max: 100, step: 10, description: "Date all'anno!" },
        { min: 1, max: 5, step: 1, description: "Cinture promesse!" },
        { min: 10, max: 1000, step: 100, description: "Bonus!" }
    ];

    if (turn <= maxTurns) {
        const currentTurn = turnSettings[turn - 1];
        rangeInput.min = currentTurn.min;
        rangeInput.max = currentTurn.max;
        rangeInput.step = currentTurn.step;
        rangeInput.value = currentTurn.min;

        // Aggiorna il testo del bubble e posizione
        rangeBubble.textContent = rangeInput.value;
        rangeBubble.style.left = "0%";

        document.getElementById("turnDescription").textContent = currentTurn.description;
        document.getElementById("turnDisplay").textContent = `Turno ${turn}:`;
    }
}

function updateRoleButtons(pressione) {
    const roleThresholds = {
        jobber: 100,
        midCarder: 80,
        upperCarder: 60,
        mainEventer: 40,
        legend: 20
    };

    for (const [role, threshold] of Object.entries(roleThresholds)) {
        const button = document.getElementById(role);
        button.disabled = pressione < threshold;
    }
}

function selectRole(role) {
    const remainingRoles = Array.from(document.querySelectorAll('.propose button:not([disabled])')).map(button => button.textContent);
    const randomIndex = Math.floor(Math.random() * remainingRoles.length);
    vinceChoice = remainingRoles[randomIndex];

    alert(`Hai selezionato il ruolo: ${role}, Vince pensa che tu possa essere al massimo un ${vinceChoice}`);
    dealSong.pause();
    dealSong.currentTime = 0;

    if (role.trim().toLowerCase() === vinceChoice.trim().toLowerCase()) {
        document.getElementById("response").textContent = "Vince McMahon: Ti rinnoverò il contratto!";
        playerScore += 10;
    } else {
        document.getElementById("response").textContent = `Vince McMahon: YOU'RE FIRED!`;
        cpuScore += 10;
    }
    salvaDati();

    document.getElementById("roleResult").style.display = 'none';
    continuaButton.style.display = 'block';
    continuaButton.scrollIntoView({ behavior: 'smooth' });
}

// Audio di sottofondo
const dealSong = new Audio('../assets/audio/upbeat-quirky-background-jazz-164955.mp3');

function play() {
    dealSong.volume = 0.4;
    dealSong.play().catch(error => console.error("Impossibile riprodurre il suono:", error));
}

function showCustomAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    const alertOkButton = document.getElementById('alertOkButton');

    alertMessage.textContent = message;
    customAlert.style.visibility = 'visible';

    alertOkButton.onclick = () => {
        customAlert.style.visibility = 'hidden';
        play();
    };
}

// Inizializzazione
updateRoleButtons(pressioneMcMahon);
updateTurn();