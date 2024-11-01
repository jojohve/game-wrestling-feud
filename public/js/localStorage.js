document.addEventListener('DOMContentLoaded', () => {
    // Recupera i personaggi selezionati da localStorage
    const playerCharacter = localStorage.getItem('selectedPlayerCharacter');
    const cpuCharacter = localStorage.getItem('selectedCpuCharacter');

    // Visualizza i personaggi nella pagina
    document.getElementById('playerCharacter').textContent = playerCharacter || 'Nessun personaggio selezionato';
    document.getElementById('cpuCharacter').textContent = cpuCharacter || 'Nessun personaggio selezionato';

    console.log(`Personaggio del giocatore: ${playerCharacter}`);
    console.log(`Personaggio della CPU: ${cpuCharacter}`);

    caricaDati();
    console.log(localStorage);
});