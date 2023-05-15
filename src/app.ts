//import { Game } from "./game";

import { Game } from "./game.js";

const settings = document.querySelector('#settings') as HTMLElement;
const boardContainer = document.querySelector('.board') as HTMLElement;
const backToSettings = document.querySelector('.back-to-settings') as HTMLElement;
const isAiPlayingCheckbox = document.querySelector('#isAiPlaying') as HTMLInputElement;
const isPlayerOneStartingCheckbox = document.querySelector('#isPlayerOneStarting') as HTMLInputElement;
const isAlternatingCheckbox = document.querySelector('#isAlternating') as HTMLInputElement;

backToSettings.addEventListener('click', () => {
    settings.style.display = "flex";
})

let game: Game = new Game(4, boardContainer);

document.querySelector("#startGame").addEventListener('click', () => {
    game.gameSettings = {
        isAiPlaying: isAiPlayingCheckbox.checked,
        isPlayerOneStarting: isPlayerOneStartingCheckbox.checked,
        isAlternating: isAlternatingCheckbox.checked
    };
    game.newGame();

    settings.style.display = "none";
});