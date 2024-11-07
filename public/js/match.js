function match() {
    playerCharacter = localStorage.getItem('selectedPlayerCharacter');
    cpuCharacter = localStorage.getItem('selectedCpuCharacter');
    updateScoreDisplay(); // Aggiorna l'interfaccia utente

    totalMatches++;
    console.log(`Total Matches: ${totalMatches}`);

    const differenzaPunti = playerScore - cpuScore;
    let probabilitaVittoriaGiocatore1 = 0.5 + (differenzaPunti / 100);
    probabilitaVittoriaGiocatore1 = Math.min(Math.max(probabilitaVittoriaGiocatore1, 0.1), 0.9);

    vincitore = Math.random() < probabilitaVittoriaGiocatore1 ? playerCharacter : cpuCharacter;

    let totalFrasi;
    if (totalMatches === 0) {
        totalFrasi = Math.floor(Math.random() * 3) + 1;
    } else if (totalMatches === 1) {
        totalFrasi = Math.floor(Math.random() * 3) + 2;
    } else if (totalMatches === 2) {
        totalFrasi = Math.floor(Math.random() * 3) + 3;
    } else if (totalMatches === 3) {
        totalFrasi = Math.floor(Math.random() * 4) + 4;
    } else {
        totalFrasi = 2;
    }

    const fraseMatch = document.getElementById('fraseMatch');
    risultatoMatchElement = document.getElementById('risultatoMatch');

    if (fraseMatch) {
        const frasiMatch = [
            "I due sfidanti si lanciano sguardi di sfida!",
            "La folla esplode di entusiasmo! Chi vincerà?",
            "È il momento decisivo! La tensione è palpabile!",
            "Un colpo feroce! Come reagirà l’avversario?",
            "Il pubblico è in piedi! È una battaglia epica!",
            "Le emozioni sono alle stelle! Ogni attimo conta!",
            "Un attacco improvviso! La strategia avversaria viene messa alla prova!",
            "Il sudore scorre, ma nessuno si arrende!",
            "Un colpo di scena! Chi avrà la meglio in questa sfida?",
            "La battaglia si intensifica! Il vincitore è ancora sconosciuto!",
            "L'atmosfera è elettrica! Il destino dei contendenti è in gioco!",
            "Un attacco perfetto! Ma l'avversario è pronto a rispondere!",
            "Le urla della folla risuonano come un'eco! Chi si porterà a casa la vittoria?",
            "Un confronto leggendario! I guerrieri sono pronti a tutto!",
            "Si sente il brivido dell'azione! Ogni mossa potrebbe essere decisiva!",
            "La resistenza è messa alla prova! Solo i più forti sopravvivranno!",
            "Il campo di battaglia trema sotto i colpi dei guerrieri!",
            "Un attimo di esitazione può costare caro in questa lotta senza tregua!",
            "Gli avversari si scambiano colpi furiosi, chi cederà per primo?",
            "La tensione sale, ogni respiro è fondamentale per la vittoria!"
        ];

        let frasiUsate = new Set();
        let currentIndex = 0;
        const interval = 3000;

        const changeFrase = () => {
            if (currentIndex < totalFrasi) {
                let fraseCasuale;

                // Cerca una frase casuale non ancora usata
                do {
                    fraseCasuale = frasiMatch[Math.floor(Math.random() * frasiMatch.length)];
                } while (frasiUsate.has(fraseCasuale));

                // Aggiungi la frase selezionata all'elenco delle frasi usate
                frasiUsate.add(fraseCasuale);
                fraseMatch.innerHTML += `<p>${fraseCasuale}</p>`;
                currentIndex++;

                // Scorri fino all'ultima frase generata
                fraseMatch.lastElementChild.scrollIntoView({ behavior: 'smooth' });
            } else {
                clearInterval(intervalId);

                continuaButton.style.display = 'block';
                continuaButton.scrollIntoView({ behavior: 'smooth' }); // Scrolla fino al pulsante
                showCustomAlert2("Uno! Due! Tre! Finisce il match!");
                updateScoreDisplay();
                terminaMatch(vincitore);
            }
        };

        const intervalId = setInterval(changeFrase, interval);
    }

    function terminaMatch(vincitore) {
        aggiornaPunteggi(vincitore);

        const risultatoMatch = vincitore === playerCharacter ? `${playerCharacter} vince il match!` : `${cpuCharacter} vince il match!`;
        risultatoMatchElement.textContent = risultatoMatch;

        updateScoreDisplay();
    }

    function aggiornaPunteggi(vincitore) {
        if (risultatoMatchElement) {
            if (vincitore === playerCharacter) {
                playerScore += 5;
                cpuScore -= 5;
                playerGamePoints += 1;
            } else {
                playerScore -= 5;
                cpuScore += 5;
                cpuGamePoints += 1;
            }
        }
        salvaDati();

        turnHistory.push({
            match: turnHistory.length + 1,
            playerScore: playerScore,
            cpuScore: cpuScore,
            vincitore: vincitore
        });
    }
}

// Configura l'audio
const ringTheBell = new Audio('../assets/audio/wwe-bell.mp3');
const matchSound = new Audio('../assets/audio/wrestling-crowd-popcheer-made-with-Voicemod.mp3');
const pinFall = new Audio('../assets/audio/wwe-referee-count-made-with-Voicemod.mp3');

function playBell() {
    console.log("Riproduzione del suono della campana.");
    ringTheBell.play().catch(error => {
        console.error("Impossibile riprodurre il suono:", error);
    });

    ringTheBell.volume = 0.5;
    matchSound.volume = 0.3;
    matchSound.play();
}

function playPinFall() {
    matchSound.pause(); // Ferma la canzone
    matchSound.currentTime = 0; // Riporta la canzone all'inizio

    pinFall.play().catch(error => {
        console.error("Impossibile riprodurre il suono:", error);
    });
}

// Funzione per mostrare l'alert personalizzato
function showCustomAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    const alertOkButton = document.getElementById('alertOkButton');

    // Imposta il messaggio dell'alert
    alertMessage.textContent = message;

    // Mostra l'alert personalizzato
    customAlert.style.visibility = 'visible';

    // Aggiungi un evento per il bottone "OK"
    alertOkButton.onclick = () => {
        // Nascondi l'alert
        customAlert.style.visibility = 'hidden';

        // Riproduci l'audio
        playBell();
    };
}

function showCustomAlert2(message) {
    const customAlert = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    const alertOkButton = document.getElementById('alertOkButton');

    // Imposta il messaggio dell'alert
    alertMessage.textContent = message;

    // Mostra l'alert personalizzato
    customAlert.style.visibility = 'visible';

    // Aggiungi un evento per il bottone "OK"
    alertOkButton.onclick = () => {
        let countdown = 3; // Countdown di 3 secondi
        alertOkButton.disabled = true; // Disabilita il pulsante "OK" per il countdown

        // Riproduci l'audio o qualsiasi altra azione desiderata
        playPinFall();

        // Aggiorna il testo del bottone per mostrare il countdown
        alertOkButton.textContent = `Ok (${countdown})`;

        // Esegui un intervallo di 1 secondo per aggiornare il countdown
        const countdownInterval = setInterval(() => {
            countdown--;
            alertOkButton.textContent = `Ok (${countdown})`;

            // Quando il countdown raggiunge zero, nasconde l'alert e ferma l'intervallo
            if (countdown === 0) {
                clearInterval(countdownInterval); // Ferma il countdown
                customAlert.style.visibility = 'hidden'; // Nascondi l'alert
                alertOkButton.textContent = 'Ok'; // Resetta il testo del bottone
                alertOkButton.disabled = false; // Rende di nuovo il pulsante attivo
            }
        }, 1000);
    };
}
