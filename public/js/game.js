let currentTurn = 0;
let sceltaCorrente = '';

let playerScore = 0; // Punti del giocatore
let cpuScore = 0; // Punti della CPU
let totalMatches = 0; // Numero totale di match
let turnHistory = []; // Storico dei turni+

let playerGamePoints = 0;
let cpuGamePoints = 0;
let result = "";

startMessageGame();
console.log("La partita è iniziata");

function iniziaTurno() {
    currentTurn++; // Aggiorna il turno
    // Controlla se la rivalità è già finita
    if (playerGamePoints >= 2 || cpuGamePoints >= 2) {
        terminaRivalità(); // Se la rivalità è finita, gestisci la fine
        return; // Esci dalla funzione
    }
    console.log("Nuovo turno avviato");

    // Determina chi inizia il turno
    if (Math.random() < 0.5) {
        mostraScelteGiocatore();
    } else {
        eseguiSceltaCpu();
    }
}

function salvaDati() {
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('cpuScore', cpuScore);
    localStorage.setItem('totalMatches', totalMatches);
    localStorage.setItem('turnHistory', JSON.stringify(turnHistory));
    localStorage.setItem('playerGamePoints', playerGamePoints);
    localStorage.setItem('cpuGamePoints', cpuGamePoints);
}

// Carica i punteggi dal localStorage
function caricaDati() {
    playerCharacter = localStorage.getItem('selectedPlayerCharacter');
    cpuCharacter = localStorage.getItem('selectedCpuCharacter');
    playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
    cpuScore = parseInt(localStorage.getItem('cpuScore')) || 0;
    totalMatches = parseInt(localStorage.getItem('totalMatches')) || 0;
    playerGamePoints = parseInt(localStorage.getItem('playerGamePoints')) || 0;
    cpuGamePoints = parseInt(localStorage.getItem('cpuGamePoints')) || 0;
    currentTurn = parseInt(localStorage.getItem('currentTurn')) || 0;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    console.log("Sto calcolando i punti..");
    // Aggiorna l'interfaccia utente con i punteggi attuali
    document.getElementById('whatTurnItIs').innerText = `Turno: ${currentTurn}`;
    document.getElementById('turnMessage').innerText = `Punteggio: ${playerCharacter} ${playerScore} - ${cpuCharacter} ${cpuScore}`;
    document.getElementById('storicoMatch').innerText = `Match vinti: ${playerCharacter}: ${playerGamePoints} - ${cpuCharacter}: ${cpuGamePoints}`;
}

function randomizzaTurno() {
    console.log("Sto lanciando la moneta..");
    // 50% di probabilità per il giocatore di iniziare
    if (Math.random() < 0.5) {
        eseguiScelta();
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
    document.getElementById('azioniDiv').innerHTML = ''; 
    
    const scelteCpu = ['match', 'promo', 'memory', 'rock-paper-scissor'];
    const sceltaRandom = scelteCpu[Math.floor(Math.random() * scelteCpu.length)];
    sceltaCorrente = sceltaRandom; // Salva la scelta nella variabile globale

    // Salva la scelta della CPU
    turnHistory.push({ currentTurn, scelta: sceltaRandom });
    document.getElementById('turnChoice').innerText = `La Cpu ha scelto il ${sceltaRandom}`;

    mostraVaiButton();
}

function eseguiScelta(choice) {
    sceltaCorrente = choice;
    document.getElementById('azioniDiv').innerHTML = ''; // Nascondi le scelte del giocatore

    // Salva la scelta del turno corrente
    turnHistory.push({ currentTurn, scelta: choice });
    document.getElementById('turnChoice').innerText = `Hai scelto il ${choice}`;

    mostraVaiButton();
}

function mostraVaiButton() {
    const vaiButton = document.getElementById('vaiButton');
    vaiButton.style.display = 'block'; // Mostra il bottone "Vai"
}

function vaiAllaScelta() {
    // Transizione alla pagina scelta dalla CPU
    if (sceltaCorrente === 'match') {
        window.location.href = 'match.html';
    } else if (sceltaCorrente === 'promo') {
        window.location.href = 'promo.html';
    } else if (sceltaCorrente === 'memory') {
        window.location.href = 'memory.html';
    } else if (sceltaCorrente === 'rock-paper-scissor') {
        window.location.href = 'rock-paper-scissor.html';
    }
    if (playerGamePoints < 2 && cpuGamePoints < 2) { // Esempio di condizione
        nextTurn(); // Chiama la funzione nextTurn()
    }
}

function fineGioco() {
    updateScoreDisplay();
    salvaDati();

    currentTurn++;  // Aggiorna il turno

    // Controlla se il gioco è finito
    if (playerGamePoints < 2 && cpuGamePoints < 2) {
        iniziaTurno(); // Avvia il nuovo turno solo se il gioco non è finito
    } else {
        terminaRivalità(); // Controlla se la rivalità è terminata
    }
}

function terminaRivalità() {
    if (playerGamePoints >= 2) {
        alert("Congratulazioni! Hai vinto la rivalità!");
    } else if (cpuGamePoints >= 2) {
        alert("La CPU ha vinto la rivalità!");
    }
    resetRivalry();
}

function resetRivalry() {
    // Resetta i punteggi e torna alla schermata principale
    playerScore = 0;
    cpuScore = 0;

    currentTurn = 0;
    totalMatches = 0;
    turnHistory = [];

    playerGamePoints = 0;
    cpuGamePoints = 0;

    console.log("Rivalità resettata. Punteggi: ", playerGamePoints, cpuGamePoints);
}

function continua() {
    window.location.href = 'game.html'; // Inserisci il percorso corretto
}