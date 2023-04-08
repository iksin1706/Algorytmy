//import { Game } from "./game";

import { Game } from "./game.js";

const settings = document.querySelector('#settings') as HTMLElement;
const boardContainer = document.querySelector('.board') as HTMLElement;
const backToSettings = document.querySelector('.back-to-settings') as HTMLElement;


backToSettings.addEventListener('click',()=>{
    settings.style.display = "flex";
})

let game: Game = new Game(4, boardContainer);

document.querySelector("#startGame").addEventListener('click', () => {
    let isAiPlaying = (document.querySelector('#isAiPlaying') as HTMLInputElement).checked;
    let isPlayerOneStarting = (document.querySelector('#isPlayerOneStarting') as HTMLInputElement).checked;
    let isAlternating = (document.querySelector('#isAlternating') as HTMLInputElement).checked;
    game.gameSettings= { isAiPlaying: isAiPlaying, isPlayerOneStarting: isPlayerOneStarting, isAlternating: isAlternating };
    game.newGame();
    
    settings.style.display = "none";
});