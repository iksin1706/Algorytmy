export class Board {
    constructor(size) {
        this.size = size;
        this.board = [];
        this.isPlayerOneTurn = false;
        this.createBoard(size);
    }
    move(move) {
        this.board[move.x][move.y] = this.isPlayerOneTurn ? 1 : 2;
        this.isPlayerOneTurn = !this.isPlayerOneTurn;
    }
    undoMove(move) {
        this.board[move.x][move.y] = 0;
        this.isPlayerOneTurn = !this.isPlayerOneTurn;
    }
    possibleMoves() {
        let moves = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0)
                    moves.push({ x: i, y: j });
            }
        }
        return moves;
    }
    isLegalMove(move) {
        return (this.board[move.x][move.y] === 0);
    }
    getBoardState() {
        if (this.isGameOver()) {
            return this.size;
        }
        else
            return 0;
    }
    isGameOver() {
        for (let i = 0; i < this.size; i++) {
            if (this.board[i].every(v => v !== 0) || this.board.every((v) => v[i] !== 0)) {
                return true;
            }
        }
        let diag1 = true;
        let diag2 = true;
        for (let i = 0; i < this.size; i++) {
            if (this.board[i][i] === 0) {
                diag1 = false;
            }
            if (this.board[this.size - i - 1][i] === 0) {
                diag2 = false;
            }
        }
        return diag1 || diag2;
    }
    getRandomMove() {
        return {
            x: Math.round(Math.random() * this.size),
            y: Math.round(Math.random() * this.size)
        };
    }
    createBoard(size) {
        this.board = new Array(size)
            .fill([])
            .map(() => new Array(size).fill(0));
    }
    clearBoard() {
        this.board = new Array(this.size)
            .fill([])
            .map(() => new Array(this.size).fill(0));
    }
}
