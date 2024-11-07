const choices = ["sasso", "carta", "forbici"];
const playerDisplay = document.getElementById("playerDisplay");
const cpuDisplay = document.getElementById("cpuDisplay");
const resultDisplay = document.getElementById("resultDisplay");

const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const cpuScoreDisplay = document.getElementById("cpuScoreDisplay");

let playerScoreMG = 0;
let cpuScoreMG = 0;

function playGame(playerChoice) {
    const cpuChoice = choices[Math.floor(Math.random() * 3)];

    let result = "";


    if (playerChoice === cpuChoice) {
        result = "È un pareggio!";
        playerDisplay.style.display = 'block'; // Mostra
        cpuDisplay.style.display = 'block'; // Mostra
    } else {
        switch (playerChoice) {
            case "sasso":
                result = (cpuChoice === "forbici") ? "HAI VINTO!" : "HAI PERSO!";
                playerDisplay.style.display = 'block'; // Mostra
                cpuDisplay.style.display = 'block'; // Mostra
                break;
            case "carta":
                result = (cpuChoice === "sasso") ? "HAI VINTO!" : "HAI PERSO!";
                playerDisplay.style.display = 'block'; // Mostra
                cpuDisplay.style.display = 'block'; // Mostra
                break;
            case "forbici":
                result = (cpuChoice === "carta") ? "HAI VINTO!" : "HAI PERSO!";
                playerDisplay.style.display = 'block'; // Mostra
                cpuDisplay.style.display = 'block'; // Mostra
                break;
        }
    }
    console.log(cpuChoice);

    playerDisplay.textContent = `${playerCharacter} : ${playerChoice}`;
    cpuDisplay.textContent = `${cpuCharacter} : ${cpuChoice}`;
    resultDisplay.textContent = result;

    resultDisplay.classList.remove("greenText", "redText");

    switch (result) {
        case "HAI VINTO!":
            resultDisplay.classList.add("greenText");
            playerScoreMG++;
            playerScoreDisplay.textContent = playerScoreMG;
            break;
        case "HAI PERSO!":
            resultDisplay.classList.add("redText");
            cpuScoreMG++;
            cpuScoreDisplay.textContent = cpuScoreMG;
            break;
    }

    determinaRisultato();
    salvaDati();

    turnMessage.innerHTML = `Punteggio: ${playerCharacter}: ${playerScore}, ${cpuCharacter}: ${cpuScore}`;
}

function determinaRisultato() {
    if (playerScoreMG >= 3) {
        showCustomAlert2("Congratulazioni! Hai vinto!");

        battleSong.pause(); // Ferma la canzone
        battleSong.currentTime = 0; // Riporta la canzone all'inizio
    
        playerScore += 5;
        // Mostra il pulsante "Continua"
        continuaButton.style.display = 'block'; // Mostra il pulsante
        continuaButton.scrollIntoView({ behavior: 'smooth' }); // Scrolla fino al pulsante
    } else if (cpuScoreMG >= 3) {
        showCustomAlert2("La CPU ha vinto!");

        battleSong.pause(); // Ferma la canzone
        battleSong.currentTime = 0; // Riporta la canzone all'inizio

        cpuScore += 5;
        // Mostra il pulsante "Continua"
        continuaButton.style.display = 'block'; // Mostra il pulsante
        continuaButton.scrollIntoView({ behavior: 'smooth' }); // Scrolla fino al pulsante
    }
    salvaDati();
}

const battleSong = new Audio('../assets/audio/western-165285.mp3');

function play() {
    battleSong.volume = 0.2;
    battleSong.play().catch(error => console.error("Impossibile riprodurre il suono:", error));
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
        play();
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