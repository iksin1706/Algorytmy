export class Ai {
    static minimax(isMaximizing, board, depth, alpha, beta) {
        depth++;
        if (board.isGameOver()) {
            return board.isPlayerOneTurn ? -100 + depth : 100 - depth;
        }
        let bestValue = isMaximizing ? -Infinity : +Infinity;
        for (let move of board.possibleMoves()) {
            board.move(move);
            let value = this.minimax(!isMaximizing, board, depth, alpha, beta);
            board.undoMove(move);
            if (isMaximizing) {
                bestValue = Math.max(bestValue, value);
                alpha = Math.max(alpha, bestValue);
                if (beta <= alpha)
                    break;
            }
            else {
                bestValue = Math.min(bestValue, value);
                beta = Math.min(beta, bestValue);
                if (beta <= alpha)
                    break;
            }
        }
        ;
        return bestValue;
    }
    static findBestMove(board) {
        let bestScore = -Infinity;
        let bestMove;
        console.log('---------------');
        board.possibleMoves().forEach(move => {
            board.move(move);
            board[move.x][move.y] = 0;
            let score = Ai.minimax(false, board, 0, -Infinity, +Infinity);
            board.undoMove(move);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
            console.log(score, move);
        });
        return bestMove;
    }
}
