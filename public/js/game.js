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
displaySelectedCharacters();

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

// Funzione per mostrare i personaggi selezionati nella pagina di gioco
function displaySelectedCharacters() {
    // Recupera i dati dal localStorage
    const playerCharacter = localStorage.getItem('selectedPlayerCharacter');
    const playerImageSrc = localStorage.getItem('selectedPlayerImageSrc');

    const cpuCharacter = localStorage.getItem('selectedCpuCharacter');
    const cpuImageSrc = localStorage.getItem('selectedCpuImageSrc');

    // Associa i dati agli elementi HTML della pagina
    const playerImageElement = document.getElementById('player-image');
    const cpuImageElement = document.getElementById('cpu-image');

    if (playerCharacter && playerImageSrc) {
        playerImageElement.src = playerImageSrc; // Imposta l'immagine del giocatore
    } else {
        console.warn("Immagine o nome del personaggio del giocatore non trovati.");
    }

    if (cpuCharacter && cpuImageSrc) {
        cpuImageElement.src = cpuImageSrc; // Imposta l'immagine della CPU
    } else {
        console.warn("Immagine o nome del personaggio della CPU non trovati.");
    }
}

function salvaDati() {
    localStorage.setItem('playerCharacter', playerCharacter);
    localStorage.setItem('cpuCharacter', cpuCharacter);

    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('cpuScore', cpuScore);
    localStorage.setItem('totalMatches', totalMatches);

    localStorage.setItem('turnHistory', JSON.stringify(turnHistory));
    localStorage.setItem('playerGamePoints', playerGamePoints);
    localStorage.setItem('cpuGamePoints', cpuGamePoints);

    localStorage.setItem('currentTurn', currentTurn);
    localStorage.setItem('result', result);
}

// Carica i punteggi dal localStorage
function caricaDati() {
    playerCharacter = localStorage.getItem('selectedPlayerCharacter') || ''; // Valore di default
    cpuCharacter = localStorage.getItem('selectedCpuCharacter') || ''; // Valore di default

    playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
    cpuScore = parseInt(localStorage.getItem('cpuScore')) || 0;
    totalMatches = parseInt(localStorage.getItem('totalMatches')) || 0;
    playerGamePoints = parseInt(localStorage.getItem('playerGamePoints')) || 0;
    cpuGamePoints = parseInt(localStorage.getItem('cpuGamePoints')) || 0;
    currentTurn = parseInt(localStorage.getItem('currentTurn')) || 0;
    result = parseInt(localStorage.getItem('result')) || 0;

    // Assicurati che turnHistory sia un array anche se non ci sono dati salvati
    turnHistory = JSON.parse(localStorage.getItem('turnHistory')) || [];

    console.log('Dati caricati:', {
        playerScore,
        cpuScore,
        totalMatches,
        playerGamePoints,
        cpuGamePoints,
        currentTurn,
        result,
        turnHistory
    });

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
    document.getElementById('azioniDiv').style.display = 'none';

    const scelteCpu = ['match', 'promo', 'memory', 'rock-paper-scissor'];
    const sceltaRandom = scelteCpu[Math.floor(Math.random() * scelteCpu.length)];
    sceltaCorrente = sceltaRandom; // Salva la scelta nella variabile globale

    // Salva la scelta della CPU
    turnHistory.push({ currentTurn, scelta: sceltaRandom });
    document.getElementById('turnChoice').innerText = `La Cpu ha scelto il ${sceltaRandom}!`;

    mostraVaiButton();
}

function eseguiScelta(choice) {
    sceltaCorrente = choice;
    document.getElementById('azioniDiv').style.display = 'none';

    // Salva la scelta del turno corrente
    turnHistory.push({ currentTurn, scelta: choice });
    document.getElementById('turnChoice').innerText = `Hai scelto il ${choice}!`;

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

    // Controlla se il gioco è finito
    if (playerGamePoints >= 2 || cpuGamePoints >= 2) {
        terminaRivalità(); // Se la rivalità è terminata, non avviare un nuovo turno
    } else {
        iniziaTurno(); // Altrimenti, avvia il nuovo turno
    }
}

function terminaRivalità() {
    if (playerGamePoints >= 2) {
        showWinAlert("Congratulazioni! Hai vinto la rivalità!");
    } else if (cpuGamePoints >= 2) {
        showLoseAlert("Peccato! La CPU ha vinto la rivalità!");
    }
}

function showWinAlert(message) {
    document.getElementById('winAlert').style.display = 'flex';
    document.getElementById('winMessage').innerText = message;
    document.getElementById('winOkButton').onclick = function() {
        resetRivalry();
    };
}

function showLoseAlert(message) {
    document.getElementById('loseAlert').style.display = 'flex';
    document.getElementById('loseMessage').innerText = message;
    document.getElementById('loseOkButton').onclick = function() {
        resetRivalry();
    };
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

    result = "";

    // Resetta anche i dati nel localStorage
    localStorage.removeItem('playerScore');
    localStorage.removeItem('cpuScore');
    localStorage.removeItem('totalMatches');
    localStorage.removeItem('turnHistory');
    localStorage.removeItem('playerGamePoints');
    localStorage.removeItem('cpuGamePoints');
    localStorage.removeItem('currentTurn');
    localStorage.removeItem('result');

    console.log("Rivalità resettata. Punteggi: ", playerGamePoints, cpuGamePoints);
    window.location.href = '../index.html';
}

function continua() {
    window.location.href = 'game.html'; // Inserisci il percorso corretto
}