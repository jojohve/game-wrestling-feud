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
        alert("Congratulazioni! Hai vinto!");
        playerScore += 5;
        // Mostra il pulsante "Continua"
        continuaButton.style.display = 'block'; // Mostra il pulsante
        continuaButton.scrollIntoView({ behavior: 'smooth' }); // Scrolla fino al pulsante
    } else if (cpuScoreMG >= 3) {
        alert("La CPU ha vinto!");
        cpuScore += 5;
        // Mostra il pulsante "Continua"
        continuaButton.style.display = 'block'; // Mostra il pulsante
        continuaButton.scrollIntoView({ behavior: 'smooth' }); // Scrolla fino al pulsante
    }
    salvaDati();
}