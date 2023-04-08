//import { Game } from "./game";
import { Game } from "./game.js";
const settings = document.querySelector('#settings');
const boardContainer = document.querySelector('.board');
const backToSettings = document.querySelector('.back-to-settings');
backToSettings.addEventListener('click', () => {
    settings.style.display = "flex";
});
let game = new Game(4, boardContainer);
document.querySelector("#startGame").addEventListener('click', () => {
    let isAiPlaying = document.querySelector('#isAiPlaying').checked;
    let isPlayerOneStarting = document.querySelector('#isPlayerOneStarting').checked;
    let isAlternating = document.querySelector('#isAlternating').checked;
    game.gameSettings = { isAiPlaying: isAiPlaying, isPlayerOneStarting: isPlayerOneStarting, isAlternating: isAlternating };
    game.newGame();
    settings.style.display = "none";
});
