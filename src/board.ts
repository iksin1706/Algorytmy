import { Vector2 } from "./vector2";

export class Board {

    board: number[][] = [];
    isPlayerOneTurn = false;

    constructor(public readonly size: number) {
        this.createBoard(size);
    }

    move(move: Vector2) {
        this.board[move.x][move.y] = this.isPlayerOneTurn ? 1 : 2;
        this.isPlayerOneTurn = !this.isPlayerOneTurn;
    }

    undoMove(move: Vector2) {
        this.board[move.x][move.y] = 0;
        this.isPlayerOneTurn = !this.isPlayerOneTurn;
    }

    possibleMoves(): Vector2[] {
        let moves: Vector2[] = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0) moves.push({ x: i, y: j })
            }
        }
        return moves;
    }

    isLegalMove(move: Vector2) {
        return (this.board[move.x][move.y] === 0)
    }

    isGameOver(): boolean {
        let isFinished = true;

        for (let i = 0; i < this.size; i++) {

            if (this.board[i].every(v => v !== 0)) {
                return true;
            }
            if (this.board.every((v: Array<number>) => v[i] !== 0)) {
                return true;
            }
            if (this.board[i][i] === 0) isFinished = false;
        }
        if (isFinished) return true;
        isFinished = true;
        for (let i = 0; i < this.size; i++) {
            if (this.board[this.size - i - 1][i] === 0) isFinished = false;
        }
        if (isFinished) return true;
        else return false;
    }

    createBoard(size:number) {
        this.board = new Array<number[]>(size)
            .fill([])
            .map(() =>
                new Array<number>(size).fill(0)
            );
    }

    clearBoard(){
        this.board = new Array<number[]>(this.size)
        .fill([])
        .map(() =>
            new Array<number>(this.size).fill(0)
        );
    }


}