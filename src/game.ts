import { Ai } from "./ai.js";
import { Board } from "./board.js";
import { GameSettings } from "./GameSettings.js";
import { Vector2 } from "./vector2.js";

export class Game {

    board: Board;
    boardElements: HTMLElement[][] = [];
    isPlayerOneStarting = false;
    public gameSettings: GameSettings;

    constructor(private size: number, private boardContainerElement: HTMLElement) {
        this.board = new Board(size);
        this.generateBoardView();
    }

    move(v: Vector2) : void {
        if (this.board.isLegalMove(v)) {
            this.boardElements[v.x][v.y].innerHTML = 'X';
            if (!this.board.isPlayerOneTurn) {
                this.boardElements[v.x][v.y].classList.add('second-player');
            }
            this.board.move(v)
            if (this.board.isGameOver()) {
                this.showWinner(this.board.isPlayerOneTurn);
                return;
            }
        }
        if (!this.board.isPlayerOneTurn && this.gameSettings.isAiPlaying) {
            let bestMove = Ai.findBestMove(this.board);
            this.move(bestMove);
        }
    }

    newGame() : void {
        this.isPlayerOneStarting = this.gameSettings.isPlayerOneStarting;
        this.clearBoard();
    }

    newRound() : void {
        if (this.gameSettings.isAlternating) {
            this.isPlayerOneStarting = !this.isPlayerOneStarting;
        }
        this.clearBoard()
    }
    clearBoard() : void {
        this.board.isPlayerOneTurn = this.isPlayerOneStarting;
        this.board.clearBoard();
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.boardElements[i][j].innerHTML = '';
                this.boardElements[i][j].classList.remove('second-player');
            }
        }
        console.log(this.isPlayerOneStarting);
        console.log(this.board.isPlayerOneTurn);
        if (this.gameSettings.isAiPlaying && !this.isPlayerOneStarting) {
            this.move(this.board.getRandomMove());
        }
    }

    generateBoardView() : void {
        this.boardContainerElement.style.width = `${(this.board.size * 160)}px`;
        for (let i = 0; i < this.board.size; i++) {
            this.board[i] = [];
            this.boardElements[i] = [];
            for (let j = 0; j < this.board.size; j++) {
                const element = document.createElement("div");
                element.classList.add('board-cell');
                element.addEventListener('click', () => { this.move({ x: i, y: j }) })
                this.boardContainerElement.appendChild(element);
                this.boardElements[i].push(element);
            }
        }
    }

    showWinner(isFirstPlayerWinner: boolean) : void {
        const winnerInfo = document.querySelector('.winner-info');
        winnerInfo.innerHTML = isFirstPlayerWinner ? 'First player won' : 'Second player won';
        if (isFirstPlayerWinner) winnerInfo.classList.remove('second-player-shadow');
        else winnerInfo.classList.add('second-player-shadow');
        winnerInfo.classList.add('winner-info-show');
        this.delay(3000).then(() => {
            winnerInfo.classList.remove('winner-info-show')
            this.newRound();
        }
        );
    }

    delay(ms: number) : Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}