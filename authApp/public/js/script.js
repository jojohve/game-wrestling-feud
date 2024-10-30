// Funzione per gestire il login
function handleLogin(event) {
    event.preventDefault(); // Evita il comportamento di invio del modulo

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulazione di un controllo se l'utente è registrato
    // Sostituisci questa logica con una richiesta al tuo backend
    const isRegistered = false; // Cambia questa logica secondo il tuo caso

    if (!isRegistered) {
        // Se l'utente non è registrato, reindirizzalo alla pagina di registrazione
        alert('Utente non registrato. Verrai reindirizzato alla pagina di registrazione.');
        window.location.href = 'register.html'; // Reindirizza alla pagina di registrazione
    } else {
        // Qui puoi gestire il login se l'utente è registrato
        alert('Accesso eseguito con successo!');
    }
}