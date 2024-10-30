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

// Configura la selezione dei personaggi per PLAYER e CPU
setupCharacterSelection('player-grid', (name) => {
    selectedPlayerCharacter = name; // Memorizza il personaggio selezionato dal giocatore
});

setupCharacterSelection('cpu-grid', (name) => {
    selectedCpuCharacter = name; // Memorizza il personaggio selezionato dalla CPU
});

// Aggiungi l'evento click per il pulsante di conferma del bottone in home.html
document.getElementById('confirm-button').addEventListener('click', () => {
    if (selectedPlayerCharacter && selectedCpuCharacter) {
        // Memorizza le selezioni in localStorage (opzionale)
        localStorage.setItem('selectedPlayerCharacter', selectedPlayerCharacter);
        localStorage.setItem('selectedCpuCharacter', selectedCpuCharacter);

        // Reindirizza a game.html
        window.location.href = 'game.html';
    } else {
        alert('Seleziona un personaggio per il Player e per la CPU!'); // Avviso se non sono selezionati entrambi i personaggi
    }
});