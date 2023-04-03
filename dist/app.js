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
    initializeBoard(width, height) {
        boardContainer.style.width = `${this.width * 200}px`;
        boardContainer.style.width = `${this.height * 200}px`;
        for (let i = 0; i < height; i++) {
            this.board[i] = [];
            this.boardElements[i] = [];
            for (let j = 0; j < width; j++) {
                this.board[i].push(0);
                const element = document.createElement("div");
                console.log(element);
                element.classList.add('board-cell');
                element.addEventListener('click', () => { this.move(i, j); });
                boardContainer.appendChild(element);
                this.boardElements[i].push(element);
            }
        }
    }
    move(x, y) {
        if (!this.isGameFinished()) {
            this.board[x][y] = this.isFirstPlayerMove ? 1 : 2;
            this.boardElements[x][y].innerHTML = 'X';
            if (!this.isFirstPlayerMove) {
                this.boardElements[x][y].classList.add('second-player');
            }
            this.isFirstPlayerMove = !this.isFirstPlayerMove;
        }
        console.log(this.isGameFinished());
    }
    isGameFinished() {
        for (let i = 0; i < this.height; i++) {
            if (this.board[i].every(v => v !== 0)) {
                //TO IMPLEMENT SHOW WHO WON
                return true;
            }
            if (this.board.every((v) => v[i] !== 0)) {
                //TO IMPLEMENT SHOW WHO WON
                return true;
            }
        }
        return false;
    }
    newGame() {
        this.initializeBoard(this.width, this.height);
    }
    showWinner() {
    }
}
/*
0 = empty cell
1 = player one
2 = player two
*/
const boardContainer = document.querySelector('.board');
const board = new Board(4, 4, boardContainer);
console.log(board.isGameFinished());
