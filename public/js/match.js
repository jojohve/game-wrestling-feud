function match() {
    playerCharacter = localStorage.getItem('selectedPlayerCharacter');
    cpuCharacter = localStorage.getItem('selectedCpuCharacter');
    updateScoreDisplay(); // Aggiorna l'interfaccia utente

    totalMatches++;
    console.log(`Total Matches: ${totalMatches}`);

    const differenzaPunti = playerScore - cpuScore;
    let probabilitaVittoriaGiocatore1 = 0.5 + (differenzaPunti / 100);
    probabilitaVittoriaGiocatore1 = Math.min(Math.max(probabilitaVittoriaGiocatore1, 0.1), 0.9);

    // Determinazione del vincitore
    vincitore = Math.random() < probabilitaVittoriaGiocatore1 ? playerCharacter : cpuCharacter; // Usa i valori delle variabili

    // Definisci totalFrasi in base a totalMatches
    let totalFrasi;
    if (totalMatches === 0) {
        totalFrasi = Math.floor(Math.random() * 3) + 1; // Da 1 a 3
    } else if (totalMatches === 1) {
        totalFrasi = Math.floor(Math.random() * 3) + 2; // Da 2 a 4
    } else if (totalMatches === 2) {
        totalFrasi = Math.floor(Math.random() * 3) + 3; // Da 3 a 5
    } else if (totalMatches === 3) {
        totalFrasi = Math.floor(Math.random() * 4) + 4; // Da 4 a 7
    } else {
        totalFrasi = 3; // Imposta un valore predefinito se totalMatches è maggiore di 3
    }

    const fraseMatch = document.getElementById('fraseMatch');
    risultatoMatchElement = document.getElementById('risultatoMatch'); // Assegna qui per essere visibile
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
            "La resistenza è messa alla prova! Solo i più forti sopravvivranno!"
        ];
        const ringTheBell = new Audio('../assets/audio/wwe-bell.mp3');

        function playBell() {
            ringTheBell.play().catch(error => {
                console.error("Impossibile riprodurre il suono:", error);
            });
        }
        alert("L'arbitro da via al match!");
        playBell();
        let currentIndex = 0; // Indice per tenere traccia delle frasi mostrate
        const interval = 3000; // Intervallo di 3 secondi

        // Mostra la prima frase all'inizio
        fraseMatch.textContent = frasiMatch[Math.floor(Math.random() * frasiMatch.length)];

        const changeFrase = () => {
            // Se l'indice è minore del numero totale di frasi
            if (currentIndex < totalFrasi) {
                const fraseCasuale = frasiMatch[Math.floor(Math.random() * frasiMatch.length)];
                fraseMatch.innerHTML += `<p>${fraseCasuale}</p>`; // Aggiungi la nuova frase in un paragrafo
                currentIndex++; // Incrementa l'indice
            } else {
                clearInterval(intervalId); // Ferma l'intervallo

                // Mostra il pulsante "Continua"
                continuaButton.style.display = 'block'; // Mostra il pulsante

                updateScoreDisplay(); // Aggiorna i punteggi sullo schermo

                alert("Uno! Due! Tre! Finisce il match!"); // Mostra l'alert finale
                terminaMatch(vincitore);
            }
        };

        // Inizia a cambiare frase dopo 3 secondi
        const intervalId = setInterval(changeFrase, interval);
    }

    function terminaMatch(vincitore) {
        // Aggiorna i punteggi
        aggiornaPunteggi(vincitore);

        // Mostra il risultato finale
        const risultatoMatch = vincitore === playerCharacter ? `${playerCharacter} vince il match!` : `${cpuCharacter} vince il match!`;
        risultatoMatchElement.textContent = risultatoMatch; // Mostra il risultato

        updateScoreDisplay(); // Aggiorna l'interfaccia utente
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

        // Aggiungere il match allo storico
        turnHistory.push({
            match: turnHistory.length + 1, // Numero del match
            playerScore: playerScore,
            cpuScore: cpuScore,
            vincitore: vincitore // Nome del vincitore
        });
    }
}