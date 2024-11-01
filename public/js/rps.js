const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const cpuDisplay = document.getElementById("cpuDisplay");
const resultDisplay = document.getElementById("resultDisplay");

const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const cpuScoreDisplay = document.getElementById("cpuScoreDisplay");

let playerScoreMG = 0;
let cpuScoreMG = 0;

function playGame(playerChoice) {
    const cpuChoice = choices[Math.floor(Math.random() * 3)];

    console.log(cpuChoice);

    let result = "";

    if (playerChoice === cpuChoice) {
        result = "È un pareggio!";
    } else {
        switch (playerChoice) {
            case "rock":
                result = (cpuChoice === "scissors") ? "HAI VINTO!" : "HAI PERSO!";
                break;
            case "paper":
                result = (cpuChoice === "rock") ? "HAI VINTO!" : "HAI PERSO!";
                break;
            case "scissors":
                result = (cpuChoice === "paper") ? "HAI VINTO!" : "HAI PERSO!";
                break;
        }
    }

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
        alert("Congratulazioni! Hai vinto!");
        playerScore += 5;
            // Mostra il pulsante "Continua"
    continuaButton.style.display = 'block'; // Mostra il pulsante
    } else if (cpuScoreMG >= 3) {
        alert("La CPU ha vinto!");
        cpuScore += 5;
            // Mostra il pulsante "Continua"
    continuaButton.style.display = 'block'; // Mostra il pulsante
    }
    salvaDati();
}