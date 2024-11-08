const rangeInput = document.getElementById("rangeInput");

// Tooltip per il valore del range
const rangeLabel = document.querySelector(".custom_range_slider");
rangeLabel.insertAdjacentHTML("beforeend", `<span class="bubble">${rangeInput.value}</span>`);
const rangeBubble = rangeLabel.querySelector(".bubble");

// Variabili di gioco
let playerChoice = null;
let pressioneMcMahon = 100;
let turn = 1;
const maxTurns = 5;
let vinceChoice = "";  // Ruolo selezionato da Vince McMahon

// Aggiorna bubble ad ogni cambiamento del valore del range
rangeInput.addEventListener("input", () => {
    const { min, max, value } = rangeInput;
    const total = Number(max) - Number(min);
    const perc = (Number(value) - Number(min)) / total;

    rangeBubble.style.left = `${perc * 100}%`;
    rangeBubble.style.transform = `translateX(-${perc * 100}%)`;
    rangeBubble.textContent = value;
});

// Funzione per confermare la scelta del giocatore
function confirmChoice() {
    if (turn >= maxTurns) {
        document.getElementById("chiediAvince").style.visibility = 'hidden';
        document.getElementById("response").textContent = "Vince McMahon: La partita è finita. Scegli il ruolo che credi di meritare:";
        return;
    }

    playerChoice = Number(rangeInput.value);
    const { min, max } = rangeInput;

    // Genera una scelta casuale di Vince McMahon nel range corrente
    const vinceMcMahonChoice = Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min);
    const difference = Math.abs(playerChoice - vinceMcMahonChoice);

    // Verifica risultato e aggiorna la pazienza
    if (difference <= 20) {
        pressioneMcMahon -= 20;
        document.getElementById("response").textContent = `Turno ${turn}: Vince McMahon: Ci sai fare, andiamo avanti!`;
    } else {
        document.getElementById("response").textContent = `Turno ${turn}: Vince McMahon: Che credi che regali i soldi?`;
    }

    turn++;
    updateTurn();
    updateRoleButtons(pressioneMcMahon);
}

// Funzione per aggiornare il range e la descrizione a ogni turno
function updateTurn() {
    const turnSettings = [
        { min: 100, max: 10000, description: "Indovina lo stipendio!" },
        { min: 1, max: 5, description: "Anni di contratto!" },
        { min: 1, max: 100, description: "Date all'anno!" },
        { min: 1, max: 5, description: "Cinture promesse!" },
        { min: 10, max: 1000, description: "Bonus!" }
    ];

    if (turn <= maxTurns) {
        const currentTurn = turnSettings[turn - 1];
        rangeInput.min = currentTurn.min;
        rangeInput.max = currentTurn.max;
        rangeInput.value = currentTurn.min;  // Reimposta il valore minimo
        document.getElementById("turnDescription").textContent = currentTurn.description;
        rangeBubble.textContent = rangeInput.value;  // Aggiorna il testo del bubble
        document.getElementById("turnDisplay").textContent = `Turno ${turn}:`;  // Aggiorna il display del turno
    }
}

// Funzione per aggiornare i bottoni dei ruoli in base alla pazienza
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

// Funzione di selezione del ruolo
function selectRole(role) {
    // Vince McMahon sceglie casualmente un ruolo tra quelli rimasti
    const remainingRoles = Array.from(document.querySelectorAll('.propose button:not([disabled])')).map(button => button.textContent);
    const randomIndex = Math.floor(Math.random() * remainingRoles.length);
    vinceChoice = remainingRoles[randomIndex];

    alert(`Hai selezionato il ruolo: ${role}, Vince pensa che tu possa essere al massimo un ${vinceChoice}`);
    dealSong.pause(); // Ferma la canzone
    dealSong.currentTime = 0; // Riporta la canzone all'inizio

    // Controlla se la scelta del giocatore corrisponde alla scelta di Vince McMahon
    if (role.trim().toLowerCase() === vinceChoice.trim().toLowerCase()) {
        document.getElementById("response").textContent = "Vince McMahon: Ti rinnoverò il contratto!";
        playerScore += 10;
    } else {
        document.getElementById("response").textContent = `Vince McMahon: YOU'RE FIRED!`;
        cpuScore += 10;
    }
    salvaDati();

    // Nasconde i bottoni dei ruoli e mostra il pulsante "Continua"
    document.getElementById("roleResult").style.display = 'none';
    continuaButton.style.display = 'block';
    continuaButton.scrollIntoView({ behavior: 'smooth' });
}

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

// Imposta lo stato iniziale dei bottoni e aggiorna il primo turno
updateRoleButtons(pressioneMcMahon);
updateTurn();