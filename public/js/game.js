let turno = 1;
let currentTurn = turno;
let sceltaCorrente = ''; 

let playerScore = 0; // Punti del giocatore
let cpuScore = 0; // Punti della CPU
let totalMatches = 0; // Numero totale di match vinti
let turnHistory = []; // Storico dei turni+

let playerGamePoints = 0;
let cpuGamePoints = 0;

function game() {
    console.log("La partita è iniziata");
    loadScores();
    console.log("Ho caricato i punti");
    randomizzaTurno();
    console.log("Reinderizzamento");
    eseguiScelta(choice);
}

// Carica i punteggi dal localStorage
function loadScores() {
    selectedPlayerCharacter = localStorage.getItem('selectedPlayerCharacter');
    selectedCpuCharacter = localStorage.getItem('selectedCpuCharacter');

    playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
    cpuScore = parseInt(localStorage.getItem('cpuScore')) || 0;
    totalMatches = parseInt(localStorage.getItem('totalMatches')) || 0;
    turnHistory = JSON.parse(localStorage.getItem('turnHistory')) || [];

    playerGamePoints = parseInt(localStorage.getItem('playerGamePoints')) || 0;
    cpuGamePoints = parseInt(localStorage.getItem('cpuGamePoints')) || 0;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    console.log("Sto calcolando i punti..");
    // Aggiorna l'interfaccia utente con i punteggi attuali
    document.getElementById('whatTurnItIs').innerText = `Turno: ${turno}`;
    document.getElementById('turnMessage').innerText = `Punteggio: ${selectedPlayerCharacter} ${playerScore} - ${selectedCpuCharacter} ${cpuScore}`;
    document.getElementById('storicoMatch').innerText = `Match vinti: ${selectedPlayerCharacter}: 0 - ${selectedCpuCharacter}: 0`;
}

function randomizzaTurno() {
    console.log("Sto lanciando la moneta..");
    // 50% di probabilità per il giocatore di iniziare
    if (Math.random() < 0.5) {
        mostraScelteGiocatore();
    } else {
        eseguiSceltaCpu();
    }
}

function mostraScelteGiocatore() {
    const azioniDiv = document.getElementById('azioniDiv');
    azioniDiv.innerHTML = `
            <h2>Scelte:</h2>
            <button onclick="eseguiScelta('match')">Match</button>
            <button onclick="eseguiScelta('promo')">Promo</button>
            <button onclick="eseguiScelta('memory')">Memory</button>
            <button onclick="eseguiScelta('rock-paper-scissor')">Rock-Paper-Scissor</button>
        `;
}

function eseguiSceltaCpu() {
    const scelteCpu = ['match', 'promo', 'memory', 'rock-paper-scissor'];
    const sceltaRandom = scelteCpu[Math.floor(Math.random() * scelteCpu.length)];
    sceltaCorrente = sceltaRandom; // Salva la scelta nella variabile globale

    // Salva la scelta della CPU
    turnHistory.push({ turno, scelta: sceltaRandom });
    document.getElementById('turnChoice').innerText = `La Cpu ha scelto il ${sceltaRandom}`;

    mostraVaiButton();
}

function eseguiScelta(choice) {
    sceltaCorrente = choice; 

    // Salva la scelta del turno corrente
    turnHistory.push({ turno, scelta: choice });
    document.getElementById('turnChoice').innerText = `Hai scelto il ${choice}`;

    mostraVaiButton();
}

function mostraVaiButton() {
    const vaiButton = document.getElementById('vaiButton');
    vaiButton.style.display = 'block'; // Mostra il bottone "Vai"
}

function vaiAllaScelta() {
    // Transizione alla pagina scelta dalla CPU
    if (sceltaCorrente  === 'match') {
        window.location.href = 'match.html';
    } else if (sceltaCorrente  === 'promo') {
        window.location.href = 'promo.html';
    } else if (sceltaCorrente  === 'memory') {
        window.location.href = 'memory.html';
    } else if (sceltaCorrente  === 'rock-paper-scissor') {
        window.location.href = 'rock-paper-scissor.html';
    }
}

function resetGame() {
    // Resetta i punteggi e torna alla schermata principale
    playerScore = 0;
    cpuScore = 0;

    turno = 1;
    totalMatches = 0;
    turnHistory = [];

    playerGamePoints = 0;
    cpuGamePoints = 0;
}