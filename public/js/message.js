// Funzione per mostrare il messaggio di inizio gioco in game.html
function startMessageGame() {
    const messageContainer = document.createElement('div');
    messageContainer.textContent = 'La rivalità sta per cominciare!';
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '80%';
    messageContainer.style.left = '50%';
    messageContainer.style.transform = 'translate(-50%, -50%)';
    messageContainer.style.padding = '20px';
    messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageContainer.style.color = 'white';
    messageContainer.style.fontSize = '24px';
    messageContainer.style.borderRadius = '10px';
    messageContainer.style.zIndex = '1000';
    messageContainer.style.transition = 'opacity 1s ease';

    document.body.appendChild(messageContainer);

    // Aggiungi un'animazione per far apparire il messaggio
    setTimeout(() => {
        messageContainer.style.opacity = '1';
    }, 100);

    // Rimuovi il messaggio dopo 2 secondi e inizia il gioco
    setTimeout(() => {
        messageContainer.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageContainer);
            // Qui puoi iniziare la logica del gioco
        }, 1000); // Attendi che l'animazione di uscita finisca prima di rimuovere il div
    }, 2000); // Mostra il messaggio per 2 secondi
}