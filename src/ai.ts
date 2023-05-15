import { Board } from "./board";
import { Vector2 } from "./vector2";

export class Ai {
    static minimax(isMaximizing: boolean, board: Board, depth: number, alpha: number, beta: number): number {

        depth++;
        /*
            if game is over return score

            Scores explaining

            for board.size = 4
            -16 fastest lose
            16 fastest win

            -1 slowest lose
            1 slowest win
            
            (This scores are just examples to explain system because you can't win after one move or fill full board)

            Ai.findBestMove will choose shortest way to win or longest way to lose to give player a chance to make mistake and then win
            and thats why deep is added
        */

        if (board.isGameOver()) {
            return board.isPlayerOneTurn ? -Math.pow(board.size, 2) + depth : Math.pow(board.size, 2) - depth; // calculating score 
        }

        let bestValue = isMaximizing ? -Infinity : +Infinity;

        for (let move of board.possibleMoves()) { //checking score for all possible moves
            board.move(move); // dry move without affecting ui
            let value = this.minimax(!isMaximizing, board, depth, alpha, beta); //recursion 
            board.undoMove(move); // undoing move 

            //alfa beta pruning
            bestValue = isMaximizing ? Math.max(bestValue, value) : Math.min(bestValue, value);
            if (isMaximizing) alpha = Math.max(alpha, bestValue);
            else beta = Math.min(beta, bestValue);
            if (beta <= alpha) break;
        };

        return bestValue;
    }

    /*
    //Implmentacja jak najbardziej zbliżona do podanej procedury jednak wolniejsza ze względu na częste iterowanie po tablicy results
     i nieco gorzej grająca jeżeli wie że przegra że względu na brak głębokości 
     dzięku której ai maksymalnie przeciąga gre dając graczowi szanse na popełnienie błędu

    static minimax(isMaximizing: boolean, board: Board, alpha: number, beta: number): number {
        let results = [];

        if (board.isGameOver()) {
            return board.isPlayerOneTurn ? -1 : 1;
        }

        for (let move of board.possibleMoves()) {
            board.move(move);
            results.push(this.minimax(!isMaximizing, board, alpha, beta))
            board.undoMove(move);

            if (isMaximizing) alpha = Math.max(...results, alpha);
            else beta = Math.min(...results, beta);
            if (beta <= alpha) break;
        };

        if (isMaximizing)
            return Math.max(...results);
        else
            return Math.min(...results);
    }
    */

    //Checking minimax scores for all possible moves and then returning move with highest score
    //You can see scores for each move in console
    static findBestMove(board: Board): Vector2 {
        let bestScore = -Infinity;
        let bestMove: Vector2;

        console.log('---------------');
        
        for (let move of board.possibleMoves()) {
            board.move(move);
            let score = Ai.minimax(false, board, 0, -Infinity, +Infinity);
            board.undoMove(move);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
            console.log(score, move);
        };
        return bestMove;
    }
}