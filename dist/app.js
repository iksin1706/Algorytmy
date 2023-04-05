class Vector2 {
}
class Board {
    constructor(width, height, boardContainer) {
        this.width = width;
        this.height = height;
        this.boardContainer = boardContainer;
        this.board = [];
        this.boardElements = [];
        this.isFirstPlayerMove = true;
        this.initializeBoard(width, height);
    }
    backToPreviouseState() {
        this.board[this.lastMove.x][this.lastMove.y] = 0;
    }
    initializeBoard(width, height) {
        boardContainer.style.width = `${this.width * 150}px`;
        boardContainer.style.width = `${this.height * 150}px`;
        for (let i = 0; i < height; i++) {
            this.board[i] = [];
            this.boardElements[i] = [];
            for (let j = 0; j < width; j++) {
                this.board[i].push(0);
                const element = document.createElement("div");
                element.classList.add('board-cell');
                element.addEventListener('click', () => { this.move({ x: i, y: j }); });
                boardContainer.appendChild(element);
                this.boardElements[i].push(element);
            }
        }
    }
    move(v) {
        if (this.isLegalMove(v)) {
            this.board[v.x][v.y] = this.isFirstPlayerMove ? 1 : 2;
            this.boardElements[v.x][v.y].innerHTML = 'X';
            if (!this.isFirstPlayerMove) {
                this.boardElements[v.x][v.y].classList.add('second-player');
            }
            this.isFirstPlayerMove = !this.isFirstPlayerMove;
            console.log(this.isGameFinished());
            if (this.isGameFinished() !== 0) {
                this.showWinner(this.isFirstPlayerMove);
                this.newGame();
            }
        }
        if (!this.isFirstPlayerMove) {
            let bestScore = -Infinity;
            let bestMove;
            this.possbileMoves().forEach(element => {
                this.dryMove({ x: element.x, y: element.y });
                let score = this.minimaxDepth1(false, element, 0);
                console.log(score);
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = element;
                }
                this.backToPreviouseState();
            });
            this.move(bestMove);
        }
    }
    dryMove(v) {
        this.board[v.x][v.y] = this.isFirstPlayerMove ? 1 : 2;
        this.lastMove = v;
    }
    possbileMoves() {
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
                return this.isFirstPlayerMove ? 1 : -1;
            }
            if (this.board.every((v) => v[i] !== 0)) {
                return this.isFirstPlayerMove ? 1 : -1;
                ;
            }
            if (this.board[i][i] === 0)
                isFinished = false;
            //if(this.board[i][this.width-i-1]===0) return false;        
        }
        if (isFinished)
            return this.isFirstPlayerMove ? 1 : -1;
        ;
        isFinished = true;
        for (let i = 0; i < this.height; i++) {
            if (this.board[this.width - i - 1][i] === 0)
                isFinished = false;
        }
        if (isFinished)
            this.isFirstPlayerMove ? 1 : -1;
        else
            return 0;
    }
    newGame() {
        this.isFirstPlayerMove = true;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.board[i][j] = 0;
                this.boardElements[i][j].innerHTML = '';
                this.boardElements[i][j].classList.remove('second-player');
            }
        }
        console.table(this.board);
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
    minimaxDepth1(isMaximizing, move, depth) {
        let results = [];
        this.dryMove(move);
        let score = this.isGameFinished();
        this.backToPreviouseState();
        return score;
        // if(isMaximizing) return Math.max(...results);
        // else return Math.min(...results);
    }
    minimax(isMaximizing, board, depth) {
        let results = [];
        // if(isMaximizing) return Math.max(...results);
        // else return Math.min(...results);
    }
}
/*
0 = empty cell
1 = player one
2 = player two
*/
const boardContainer = document.querySelector('.board');
const board = new Board(4, 4, boardContainer);
