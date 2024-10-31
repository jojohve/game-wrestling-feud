// Variabili per memorizzare i personaggi selezionati
let selectedPlayerCharacter = null; // Personaggio del giocatore
let selectedCpuCharacter = null; // Personaggio della CPU   

// Funzione per gestire la selezione dei personaggi
function setupCharacterSelection(gridId, onSelect) {
    const characters = document.querySelectorAll(`#${gridId} .character`);

    characters.forEach(character => {
        character.addEventListener('click', () => {
            // Rimuovi la selezione da tutti i personaggi nella griglia
            characters.forEach(c => c.classList.remove('selected'));

            // Aggiungi la classe "selected" al personaggio cliccato
            character.classList.add('selected');

            // Memorizza il nome del personaggio selezionato
            const characterName = character.getAttribute('data-name');
            onSelect(characterName); // Chiama la funzione di callback
            console.log(gridId === 'player-grid' ? 'Personaggio Player selezionato:' : 'Personaggio CPU selezionato:', characterName);
        });
    });
}

// Selezione casuale se si preme nella tendina della cpu
function selectRandomPlayer() {
    const characters = Array.from(document.querySelectorAll('.character-grid .character')).filter(character => !["Casuale"].includes(character.dataset.name));

    // Log: Visualizza i personaggi disponibili
    console.log("Personaggi disponibili per il giocatore:", characters);

    // Controlla se ci sono personaggi disponibili da selezionare
    if (characters.length === 0) {
        alert("Nessun personaggio disponibile per la selezione.");
        return; // Esci dalla funzione se non ci sono personaggi
    }

    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    const characterName = randomCharacter.getAttribute('data-name');

    // Log: Visualizza il personaggio selezionato
    console.log("Personaggio casuale selezionato per il giocatore:", characterName);

    // Aggiorna la selezione e segna il personaggio come selezionato
    selectedPlayerCharacter = characterName; // Memorizza il personaggio selezionato
    localStorage.setItem('selectedPlayerCharacter', selectedPlayerCharacter); // Salva nel localStorage

    // Aggiungi la classe "selected" al personaggio casuale
    const playerGridCharacters = document.querySelectorAll('#player-grid .character');
    playerGridCharacters.forEach(character => character.classList.remove('selected')); // Rimuovi la selezione precedente

    const selectedCharacterElement = Array.from(playerGridCharacters).find(c => c.getAttribute('data-name') === characterName);
    if (selectedCharacterElement) {
        selectedCharacterElement.classList.add('selected'); // Aggiungi la selezione al personaggio scelto
        selectedCharacterElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        // Log: Se il personaggio selezionato non viene trovato
        console.error("Elemento selezionato non trovato nella griglia:", characterName);
    }
}

// Selezione casuale se si preme il tasto casuale nella tendina player
function selectRandomCpu() {
    const characters = Array.from(document.querySelectorAll('.character-grid .character')).filter(character => !["CpuCasuale"].includes(character.dataset.name));

    // Log: Visualizza i personaggi disponibili
    console.log("Personaggi disponibili per la CPU:", characters);

    // Controlla se ci sono personaggi disponibili da selezionare
    if (characters.length === 0) {
        alert("Nessun personaggio disponibile per la selezione.");
        return; // Esci dalla funzione se non ci sono personaggi
    }

    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    const characterName = randomCharacter.getAttribute('data-name');

    // Log: Visualizza il personaggio selezionato
    console.log("Personaggio casuale selezionato per la CPU:", characterName);

    // Aggiorna la selezione e segna il personaggio come selezionato
    selectedCpuCharacter = characterName; // Memorizza il personaggio della CPU
    localStorage.setItem('selectedCpuCharacter', selectedCpuCharacter); // Salva nel localStorage

    // Aggiungi la classe "selected" al personaggio casuale
    const cpuGridCharacters = document.querySelectorAll('#cpu-grid .character');
    cpuGridCharacters.forEach(character => character.classList.remove('selected')); // Rimuovi la selezione precedente

    const selectedCharacterElement = Array.from(cpuGridCharacters).find(c => c.getAttribute('data-name') === characterName);
    if (selectedCharacterElement) {
        selectedCharacterElement.classList.add('selected'); // Aggiungi la selezione al personaggio scelto
        selectedCharacterElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        // Log: Se il personaggio selezionato non viene trovato
        console.error("Elemento selezionato della CPU non trovato nella griglia:", characterName);
    }
}

// Configura la selezione dei personaggi per PLAYER e CPU per tutta la partita
setupCharacterSelection('player-grid', (name) => {
    selectedPlayerCharacter = name; // Memorizza il personaggio selezionato dal giocatore
});
setupCharacterSelection('cpu-grid', (name) => {
    selectedCpuCharacter = name; // Memorizza il personaggio selezionato dalla CPU
});

// Aggiungi l'evento click per il personaggio "Casuale" quando si clicca
document.querySelector('.character[data-name="Casuale"]').addEventListener('click', selectRandomPlayer);
document.querySelector('.character[data-name="CpuCasuale"]').addEventListener('click', selectRandomCpu);

// Aggiungi l'evento click per il pulsante di conferma del bottone in home.html per passare al gioco in game.html
document.getElementById('confirm-button').addEventListener('click', () => {
    if (selectedPlayerCharacter && selectedCpuCharacter) {
        // Memorizza le selezioni in localStorage (opzionale)
        localStorage.setItem('selectedPlayerCharacter', selectedPlayerCharacter);
        localStorage.setItem('selectedCpuCharacter', selectedCpuCharacter);

        // Reindirizza a game.html
        window.location.href = 'root/game.html';
    } else {
        alert('Seleziona un personaggio per il Player e per la CPU!'); // Avviso se non sono selezionati entrambi i personaggi
    }
});

// Funzione per registrare un turno
function recordTurn(turnResult) {
    turnHistory.push(turnResult); // Aggiunge il risultato del turno allo storico
    localStorage.setItem('turnHistory', JSON.stringify(turnHistory)); // Salva lo storico nel localStorage
}