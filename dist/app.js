class Vector2 {
}
class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.board = [];
        this.isFirstPlayerMove = true;
        this.createBoard(width, height);
    }
    move(v) {
        this.board[v.x][v.y] = this.isFirstPlayerMove ? 1 : 2;
        this.isFirstPlayerMove = !this.isFirstPlayerMove;
    }
    resetMove(v) {
        this.board[v.x][v.y] = 0;
        this.isFirstPlayerMove = !this.isFirstPlayerMove;
    }
    possibleMoves() {
        let moves = [];
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.board[i][j] === 0)
                    moves.push({ x: i, y: j });
            }
        }
        return moves;
    }
    isLegalMove(move) {
        return (this.board[move.x][move.y] === 0);
    }
    isGameFinished() {
        let isFinished = true;
        for (let i = 0; i < this.height; i++) {
            if (this.board[i].every(v => v !== 0)) {
                return true;
            }
            if (this.board.every((v) => v[i] !== 0)) {
                return true;
            }
            if (this.board[i][i] === 0)
                isFinished = false;
            //if(this.board[i][this.width-i-1]===0) return false;        
        }
        if (isFinished)
            return true;
        isFinished = true;
        for (let i = 0; i < this.height; i++) {
            if (this.board[this.width - i - 1][i] === 0)
                isFinished = false;
        }
        if (isFinished)
            return true;
        else
            return false;
    }
    createBoard(width, height) {
        this.board = new Array(width)
            .fill(false)
            .map(() => new Array(width).fill(0));
    }
}
class Game {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.boardElements = [];
        this.initializeBoard(width, height);
    }
    move(v) {
        if (this.board.isLegalMove(v)) {
            this.boardElements[v.x][v.y].innerHTML = 'X';
            if (!this.board.isFirstPlayerMove) {
                this.boardElements[v.x][v.y].classList.add('second-player');
            }
            this.board.move(v);
            if (this.board.isGameFinished()) {
                this.showWinner(this.board.isFirstPlayerMove);
                this.newGame();
                return;
            }
            else {
            }
        }
        if (!this.board.isFirstPlayerMove) {
            let bestMove = this.findBestMove();
            this.move(bestMove);
        }
    }
    newGame() {
        // this.isFirstPlayerMove=true;
        // for (let i = 0; i < this.width; i++) {
        //     for (let j = 0; j < this.height; j++) {
        //         this.board[i][j]=0;
        //         this.boardElements[i][j].innerHTML='';
        //         this.boardElements[i][j].classList.remove('second-player');
        //     }
        // }
    }
    initializeBoard(width, height) {
        this.board = new Board(this.width, this.height);
        boardContainer.style.width = `${this.width * 150}px`;
        boardContainer.style.width = `${this.height * 150}px`;
        for (let i = 0; i < height; i++) {
            this.board[i] = [];
            this.boardElements[i] = [];
            for (let j = 0; j < width; j++) {
                const element = document.createElement("div");
                element.classList.add('board-cell');
                element.addEventListener('click', () => { this.move({ x: i, y: j }); });
                boardContainer.appendChild(element);
                this.boardElements[i].push(element);
            }
        }
        if (!this.board.isFirstPlayerMove)
            this.move(this.findBestMove());
    }
    minimax(isMaximizing, board, depth) {
        let results = [];
        depth++;
        if (board.isGameFinished()) {
            return board.isFirstPlayerMove ? -1 : 1;
        }
        board.possibleMoves().forEach(move => {
            board.move(move);
            results.push(this.minimax(!isMaximizing, board, depth));
            board.resetMove(move);
        });
        if (isMaximizing) {
            return Math.max(...results);
        }
        else {
            return Math.min(...results);
        }
    }
    findBestMove() {
        let bestScore = -Infinity;
        let bestMove;
        this.board.possibleMoves().forEach(element => {
            this.board.move(element);
            this.board[element.x][element.y] = 0;
            let score = this.minimax(false, this.board, 0);
            console.log(element, score);
            this.board.resetMove(element);
            if (score > bestScore) {
                bestScore = score;
                bestMove = element;
            }
        });
        console.log('-----------');
        return bestMove;
    }
    showWinner(isFirstPlayerWinner) {
        const winnerInfo = document.querySelector('.winner-info');
        winnerInfo.innerHTML = isFirstPlayerWinner ? 'First player won' : 'Second plyer won';
        winnerInfo.classList.add('winner-info-show');
        this.delay(3000).then(() => winnerInfo.classList.remove('winner-info-show'));
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
/*
0 = empty cell
1 = player one
2 = player two
*/
const boardContainer = document.querySelector('.board');
let game = new Game(4, 4);
