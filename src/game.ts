import { Ai } from "./ai.js";
import { Board } from "./board.js";
import { Vector2 } from "./vector2.js";

export class Game {

    board: Board;
    boardElements: HTMLElement[][] = [];
    isPlayingAgainstAi=true;

    constructor(private size:number,private boardContainerElement : HTMLElement) {
        this.board=new Board(size);
        this.generateBoardView();
    }

    move(v: Vector2) {
        if (this.board.isLegalMove(v)) {
            this.boardElements[v.x][v.y].innerHTML = 'X';
            if (!this.board.isPlayerOneTurn) {
                this.boardElements[v.x][v.y].classList.add('second-player');
            }
            this.board.move(v)
            if (this.board.isGameOver()) {
                this.showWinner(this.board.isPlayerOneTurn);
                this.newGame();
                return;
            }
        }
        if (!this.board.isPlayerOneTurn&&this.isPlayingAgainstAi) {
            let bestMove = Ai.findBestMove(this.board);
            this.move(bestMove);
        }
    }

    newGame() {
        this.board.isPlayerOneTurn = true;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.board.board[i][j] = 0;
                this.boardElements[i][j].innerHTML = '';
                this.boardElements[i][j].classList.remove('second-player');
            }
        }
    }

    generateBoardView() {
        this.boardContainerElement.style.width = `${this.board.size * 150}px`;
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
        if (!this.board.isPlayerOneTurn&&this.isPlayingAgainstAi) this.move(Ai.findBestMove(this.board));
    }

   

    showWinner(isFirstPlayerWinner: boolean) {
        const winnerInfo = document.querySelector('.winner-info');
        winnerInfo.innerHTML = isFirstPlayerWinner ? 'First player won' : 'Second plyer won';
        if(winnerInfo.classList.contains('second-player-shadow')&&isFirstPlayerWinner)winnerInfo.classList.remove('second-player-shadow');
        else winnerInfo.classList.add('second-player-shadow');
        winnerInfo.classList.add('winner-info-show');
        this.delay(3000).then(() => winnerInfo.classList.remove('winner-info-show'));
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}