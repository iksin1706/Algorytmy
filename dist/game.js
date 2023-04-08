var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Ai } from "./ai.js";
import { Board } from "./board.js";
export class Game {
    constructor(size, boardContainerElement) {
        this.size = size;
        this.boardContainerElement = boardContainerElement;
        this.boardElements = [];
        this.isPlayerOneStarting = false;
        this.board = new Board(size);
        this.generateBoardView();
    }
    move(v) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.board.isLegalMove(v)) {
                this.boardElements[v.x][v.y].innerHTML = 'X';
                if (!this.board.isPlayerOneTurn) {
                    this.boardElements[v.x][v.y].classList.add('second-player');
                }
                this.board.move(v);
                if (this.board.isGameOver()) {
                    this.showWinner(this.board.isPlayerOneTurn);
                    this.newRound();
                    return;
                }
            }
            if (!this.board.isPlayerOneTurn && this.gameSettings.isAiPlaying) {
                let bestMove = yield Ai.findBestMove(this.board);
                this.move(bestMove);
            }
        });
    }
    newGame() {
        this.isPlayerOneStarting = this.gameSettings.isPlayerOneStarting;
        this.clearBoard();
    }
    newRound() {
        if (this.gameSettings.isAlternating) {
            this.isPlayerOneStarting = !this.isPlayerOneStarting;
        }
        this.clearBoard();
    }
    clearBoard() {
        return __awaiter(this, void 0, void 0, function* () {
            this.board.isPlayerOneTurn = this.isPlayerOneStarting;
            this.board.clearBoard();
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    this.boardElements[i][j].innerHTML = '';
                    this.boardElements[i][j].classList.remove('second-player');
                }
            }
            if (this.gameSettings.isAiPlaying && !this.gameSettings.isPlayerOneStarting)
                this.move(yield Ai.findBestMove(this.board));
        });
    }
    generateBoardView() {
        this.boardContainerElement.style.width = `${(this.board.size * 160)}px`;
        for (let i = 0; i < this.board.size; i++) {
            this.board[i] = [];
            this.boardElements[i] = [];
            for (let j = 0; j < this.board.size; j++) {
                const element = document.createElement("div");
                element.classList.add('board-cell');
                element.addEventListener('click', () => { this.move({ x: i, y: j }); });
                this.boardContainerElement.appendChild(element);
                this.boardElements[i].push(element);
            }
        }
    }
    showWinner(isFirstPlayerWinner) {
        const winnerInfo = document.querySelector('.winner-info');
        winnerInfo.innerHTML = isFirstPlayerWinner ? 'First player won' : 'Second plyer won';
        if (isFirstPlayerWinner)
            winnerInfo.classList.remove('second-player-shadow');
        else
            winnerInfo.classList.add('second-player-shadow');
        winnerInfo.classList.add('winner-info-show');
        this.delay(3000).then(() => winnerInfo.classList.remove('winner-info-show'));
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
