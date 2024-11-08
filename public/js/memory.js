const immagini = [
  "../assets/images/memory1.jpg", "../assets/images/memory1.jpg",
  "../assets/images/memory2.jpg", "../assets/images/memory2.jpg",
  "../assets/images/memory3.jpg", "../assets/images/memory3.jpg",
  "../assets/images/memory4.jpg", "../assets/images/memory4.jpg",
  "../assets/images/memory5.jpg", "../assets/images/memory5.jpg",
  "../assets/images/memory6.jpeg", "../assets/images/memory6.jpeg",
  "../assets/images/memory7.jpg", "../assets/images/memory7.jpg",
  "../assets/images/memory8.jpg", "../assets/images/memory8.jpg",
  "../assets/images/memory9.jpg", "../assets/images/memory9.jpg",
  "../assets/images/memory10.jpeg", "../assets/images/memory10.jpeg",
  "../assets/images/memory11.jpg", "../assets/images/memory11.jpg",
  "../assets/images/memory12.jpg", "../assets/images/memory12.jpg",
  "../assets/images/memory13.jpg", "../assets/images/memory13.jpg",
  "../assets/images/memory14.jpg", "../assets/images/memory14.jpg"
];

function getRandomImages() {
  const uniqueImages = Array.from(new Set(immagini));
  const shuffledUniqueImages = uniqueImages.sort(() => 0.5 - Math.random());
  
  const selectedImages = [];
  for (let i = 0; i < 8; i++) {
    selectedImages.push(shuffledUniqueImages[i], shuffledUniqueImages[i]);
  }
  
  return selectedImages.sort(() => 0.5 - Math.random());
}

let timer;
let timeLeft;
const timerDisplay = document.getElementById("Timer");

function scegliDifficolta() {
  const difficolta = [
    { livello: "facile", tempo: 60 },
    { livello: "normale", tempo: 40 },
    { livello: "difficile", tempo: 20 }
  ];
  
  const scelta = difficolta[Math.floor(Math.random() * difficolta.length)];
  timeLeft = scelta.tempo;
  showCustomAlert(`Difficoltà: ${scelta.livello.toUpperCase()} - Hai ${timeLeft} secondi!`);
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      memorySong.pause(); // Ferma la canzone
      memorySong.currentTime = 0; // Riporta la canzone all'inizio

      clearInterval(timer);
      cpuScore += 5;
      salvaDati();
      showCustomAlert2("Tempo scaduto! La CPU ha vinto.");
      turnMessage.innerHTML = `Punteggio: ${playerCharacter} ${playerScore}, ${cpuCharacter} ${cpuScore}`;
      continuaButton.style.display = 'block';
      continuaButton.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (timerDisplay) {
        timerDisplay.textContent = `Tempo rimasto: ${timeLeft} secondi`;
      }
      timeLeft--;
    }
  }, 1000);
}

function memory() {
  scegliDifficolta();

  const selectedImages = getRandomImages();
  const gameContainer = document.querySelector('.game');

  selectedImages.forEach((immagine, i) => {
    const box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = `<img src="${immagine}" alt="Memory Image" style="width: 100px; height: 100px;"/>`;

    box.onclick = function () {
      this.classList.add('boxOpen');
      setTimeout(() => {
        const aperte = document.querySelectorAll('.boxOpen');
        
        if (aperte.length > 1) {
          const match = aperte[0].innerHTML === aperte[1].innerHTML;

          if (match) {
            aperte.forEach(item => {
              item.classList.add('boxMatch');
              item.classList.remove('boxOpen');
            });

            if (document.querySelectorAll('.boxMatch').length === selectedImages.length) {
              showCustomAlert2("Congratulazioni! Hai vinto!");
              memorySong.pause(); // Ferma la canzone
              memorySong.currentTime = 0; // Riporta la canzone all'inizio
        
              clearInterval(timer);
              playerScore += 5;
              salvaDati();
              turnMessage.innerHTML = `Punteggio: ${playerCharacter} ${playerScore}, ${cpuCharacter} ${cpuScore}`;
              continuaButton.style.display = 'block';
            }
          } else {
            aperte.forEach(item => item.classList.remove('boxOpen'));
          }
        }
      }, 500);
    };
    gameContainer.appendChild(box);
  });
}

const memorySong = new Audio('../assets/audio/quiz-game-show-timer-sba-300481542-made-with-Voicemod.mp3');

function play() {
  memorySong.volume = 0.4;
  memorySong.play().catch(error => console.error("Impossibile riprodurre il suono:", error));
}

function showCustomAlert(message) {
  const customAlert = document.getElementById('customAlert');
  const alertMessage = document.getElementById('alertMessage');
  const alertOkButton = document.getElementById('alertOkButton');

  alertMessage.textContent = message;
  customAlert.style.visibility = 'visible';

  alertOkButton.onclick = () => {
    customAlert.style.visibility = 'hidden';
    play();
    startTimer(); // Avvia il timer al click del bottone OK
  };
}

function showCustomAlert2(message) {
  const customAlert = document.getElementById('customAlert');
  const alertMessage = document.getElementById('alertMessage');
  const alertOkButton = document.getElementById('alertOkButton');

  alertMessage.textContent = message;
  customAlert.style.visibility = 'visible';

  alertOkButton.onclick = () => {
    customAlert.style.visibility = 'hidden';
  };
}