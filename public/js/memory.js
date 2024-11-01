const immagini = [
  "../assets/images/memory1.jpg", "../assets/images/memory1.jpg",
  "../assets/images/memory2.jpg", "../assets/images/memory2.jpg",
  "../assets/images/memory3.jpg", "../assets/images/memory3.jpg",
  "../assets/images/memory4.jpg", "../assets/images/memory4.jpg",
  "../assets/images/memory5.jpg", "../assets/images/memory5.jpg",
  "../assets/images/memory6.jpeg", "../assets/images/memory6.jpeg",
  "../assets/images/memory7.jpg", "../assets/images/memory7.jpg",
  "../assets/images/memory8.jpg", "../assets/images/memory8.jpg"
];

let shuf_immagini = immagini.sort(() => Math.random() - 0.5);
let timer; // Timer
let timeLeft; // Tempo rimanente variabile
let timerDisplay = document.getElementById("Timer"); // Mostra il timer

function scegliDifficolta() {
  const difficolta = [
    { livello: "facile", tempo: 60 },
    { livello: "difficile", tempo: 30 },
    { livello: "estremo", tempo: 10 }
  ];
  
  // Scegli casualmente una difficoltà
  const scelta = difficolta[Math.floor(Math.random() * difficolta.length)];
  timeLeft = scelta.tempo; // Imposta il tempo in base alla difficoltà scelta
  alert(`Difficoltà: ${scelta.livello.toUpperCase()} - Hai ${timeLeft} secondi!`);
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      cpuScore += 5; // Incrementa il punteggio della CPU
      salvaDati();
      alert("Tempo scaduto! La CPU ha vinto.");
      turnMessage.innerHTML = `Punteggio: ${playerCharacter} ${playerScore}, ${cpuCharacter} ${cpuScore}`;
      continuaButton.style.display = 'block'; // Mostra il pulsante
    } else {
      timerDisplay.textContent = `Tempo rimasto: ${timeLeft} secondi`;
      timeLeft--;
    }
  }, 1000);
}

function memory() {
  scegliDifficolta(); // Scegli la difficoltà all'inizio del gioco
  
  const gameContainer = document.querySelector('.game');
  shuf_immagini.forEach((immagine, i) => {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = `<img src="${immagine}" alt="Memory Image" style="width: 100px; height: 100px;"/>`; // Mostra l'immagine

    box.onclick = function () {
      this.classList.add('boxOpen');
      setTimeout(() => {
        const aperte = document.querySelectorAll('.boxOpen');
        
        if (aperte.length > 1) {
          const match = aperte[0].innerHTML === aperte[1].innerHTML;
          
          if (match) {
            aperte.forEach(item => {
              item.classList.add('boxMatch');
              item.classList.remove('boxOpen'); // Rimuovi la classe boxOpen
            });

            if (document.querySelectorAll('.boxMatch').length === immagini.length) {
              alert("Hai vinto!");
              clearInterval(timer); // Ferma il timer quando il giocatore vince
              playerScore += 5;
              salvaDati();
              turnMessage.innerHTML = `Punteggio: ${playerCharacter} ${playerScore}, ${cpuCharacter} ${cpuScore}`;
              continuaButton.style.display = 'block'; // Mostra il pulsante
            }
          } else {
            aperte.forEach(item => {
              item.classList.remove('boxOpen');
            });
          }
        }
      }, 500);
    }
    gameContainer.appendChild(box);
  });

  startTimer(); // Inizia il timer quando il gioco inizia
}