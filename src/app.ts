//import { Game } from "./game";

import { Game } from "./game.js";

const boardContainer = document.querySelector('.board') as HTMLElement;

let game: Game = new Game(4,boardContainer);
