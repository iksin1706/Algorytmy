export class Board {
    constructor(size) {
        this.size = size;
        this.board = [];
        this.isPlayerOneTurn = true;
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
    isGameOver() {
        let isFinished = true;
        for (let i = 0; i < this.size; i++) {
            if (this.board[i].every(v => v !== 0)) {
                return true;
            }
            if (this.board.every((v) => v[i] !== 0)) {
                return true;
            }
            if (this.board[i][i] === 0)
                isFinished = false;
        }
        if (isFinished)
            return true;
        isFinished = true;
        for (let i = 0; i < this.size; i++) {
            if (this.board[this.size - i - 1][i] === 0)
                isFinished = false;
        }
        if (isFinished)
            return true;
        else
            return false;
    }
    createBoard(size) {
        this.board = new Array(size)
            .fill([])
            .map(() => new Array(size).fill(0));
    }
}
