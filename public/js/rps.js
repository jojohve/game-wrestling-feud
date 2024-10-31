function rps() {
        // Genera un numero casuale tra 0 e 1
        const vincitore = Math.random() < 0.5 ? 'giocatore' : 'cpu'; // 50% di probabilità per ciascuno

        // Stampa il vincitore nella console
        console.log(`Il vincitore del minigioco è: ${vincitore}`);
    
        // Ritorna il vincitore
        return vincitore;
  }