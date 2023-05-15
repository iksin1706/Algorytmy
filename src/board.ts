import { Vector2 } from "./vector2";

export class Board {

    board: number[][] = [];
    isPlayerOneTurn = false;

    constructor(public readonly size: number) {
        this.createBoard(size);
    }

    move(move: Vector2) : void {
        this.board[move.x][move.y] = this.isPlayerOneTurn ? 1 : 2;
        this.isPlayerOneTurn = !this.isPlayerOneTurn;
    }

    undoMove(move: Vector2) : void {
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

    getBoardState() : number{
        if (this.isGameOver()) {
            return this.size;
        } else return 0

    }
    isGameOver(): boolean {
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

    getRandomMove() : Vector2 {
        return {
            x: Math.round(Math.random() * this.size),
            y: Math.round(Math.random() * this.size)
        }
    }

    createBoard(size: number) : void {
        this.board = new Array<number[]>(size)
            .fill([])
            .map(() =>
                new Array<number>(size).fill(0)
            );
    }

    clearBoard() :void {
        this.board = new Array<number[]>(this.size)
            .fill([])
            .map(() =>
                new Array<number>(this.size).fill(0)
            );
    }


}