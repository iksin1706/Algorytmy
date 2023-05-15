//import { Game } from "./game";
import { Game } from "./game.js";
const settings = document.querySelector('#settings');
const boardContainer = document.querySelector('.board');
const backToSettings = document.querySelector('.back-to-settings');
const isAiPlayingCheckbox = document.querySelector('#isAiPlaying');
const isPlayerOneStartingCheckbox = document.querySelector('#isPlayerOneStarting');
const isAlternatingCheckbox = document.querySelector('#isAlternating');
backToSettings.addEventListener('click', () => {
    settings.style.display = "flex";
});
let game = new Game(4, boardContainer);
document.querySelector("#startGame").addEventListener('click', () => {
    game.gameSettings = {
        isAiPlaying: isAiPlayingCheckbox.checked,
        isPlayerOneStarting: isPlayerOneStartingCheckbox.checked,
        isAlternating: isAlternatingCheckbox.checked
    };
    game.newGame();
    settings.style.display = "none";
});
