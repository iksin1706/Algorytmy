class Board {

    board: number[][] = [];
    boardElements: HTMLElement[][] = [];
    isFirstPlayerMove = true;

    constructor(private width: number, private height: number, private boardContainer: HTMLElement) {
        this.initializeBoard(width, height);

    }


    initializeBoard(width: number, height: number) {

        boardContainer.style.width = `${this.width * 150}px`;
        boardContainer.style.width = `${this.height * 150}px`;
        for (let i = 0; i < height; i++) {
            this.board[i] = [];
            this.boardElements[i] = [];
            for (let j = 0; j < width; j++) {
                this.board[i].push(0);
                const element = document.createElement("div");
                element.classList.add('board-cell');
                element.addEventListener('click', () => { this.move(i, j) })
                boardContainer.appendChild(element);
                this.boardElements[i].push(element);
            }
        }
    }

    move(x: number, y: number) {

        if (this.isLegalMove(x, y)) {
            this.board[x][y] = this.isFirstPlayerMove ? 1 : 2;
            this.boardElements[x][y].innerHTML = 'X'
            if (!this.isFirstPlayerMove) {
                this.boardElements[x][y].classList.add('second-player');
            }
            this.isFirstPlayerMove = !this.isFirstPlayerMove

            if (this.isGameFinished()) {
                this.showWinner(this.isFirstPlayerMove);
                this.newGame();
            }
        }

    }
    isLegalMove(x: number, y: number) {
        return (this.board[x][y] === 0)
    }

    isGameFinished(): boolean {
        let isFinished = true;

        for (let i = 0; i < this.height; i++) {

            if (this.board[i].every(v => v !== 0)) {
                //TO IMPLEMENT SHOW WHO WON
                return true;
            }
            if (this.board.every((v: Array<number>) => v[i] !== 0)) {
                //TO IMPLEMENT SHOW WHO WON
                return true;
            }
            if (this.board[i][i] === 0) isFinished = false;
            //if(this.board[i][this.width-i-1]===0) return false;        
        }
        if (isFinished) return isFinished;
        isFinished = true;
        for (let i = 0; i < this.height; i++) {
            console.log(this.board[this.width - i - 1][i] === 0);
            if (this.board[this.width - i - 1][i] === 0) isFinished = false;
        }
        return isFinished;
    }

    newGame() {
        this.isFirstPlayerMove=true;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.board[i][j]=0;
                this.boardElements[i][j].innerHTML='';
                this.boardElements[i][j].classList.remove('second-player');
            }
            
        }
        console.table(this.board);
    }

    showWinner(isFirstPlayerWinner : boolean) {
        const winnerInfo = document.querySelector('.winner-info');
        winnerInfo.innerHTML=isFirstPlayerWinner?'First player won':'Second plyer won';
        winnerInfo.classList.add('winner-info-show');
        this.delay(3000).then(() => winnerInfo.classList.remove('winner-info-show'));
    }
    delay(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

   
}



/* 
0 = empty cell
1 = player one
2 = player two
*/


const boardContainer = document.querySelector('.board') as HTMLElement;

const board = new Board(4, 4, boardContainer);


