
class Ai {
    constructor() {
        this.p = 'x';
        this.c = 'o';
        this.board = [
            0, 0, 0, 
            0, 0, 0, 
            0, 0, 0
        ];
    }

    check = () => {
        // row check
        if(this.board[1] === this.board[0] && this.board[2] === this.board[0] && this.board[0] !== 0)
            return this.board[0] === this.c ? 1 : -1;
        else if (this.board[4] === this.board[3] && this.board[5] === this.board[3] && this.board[3] !== 0)
            return this.board[3] === this.c ? 1 : -1;
        else if (this.board[7] === this.board[6] && this.board[8] === this.board[6] && this.board[6] !== 0)
            return this.board[6] === this.c ? 1 : -1;
        // column check
        else if (this.board[3] === this.board[0] && this.board[6] === this.board[0] && this.board[0] !== 0)
            return this.board[0] === this.c ? 1 : -1;
        else if (this.board[4] === this.board[1] && this.board[7] === this.board[1] && this.board[1] !== 0)
            return this.board[1] === this.c ? 1 : -1;
        else if (this.board[5] === this.board[2] && this.board[8] === this.board[2] && this.board[2] !== 0)
            return this.board[2] === this.c ? 1 : -1;
        // diagonal check
        else if (this.board[4] === this.board[0] && this.board[8] === this.board[0] && this.board[0] !== 0)
            return this.board[0] === this.c ? 1 : -1;
        else if (this.board[4] === this.board[2] && this.board[6] === this.board[2] && this.board[2] !== 0)
            return this.board[2] === this.c ? 1 : -1;
        else 
        {
            // checking for tie game
            let available_moves = 0;
            this.board.forEach((arr) => {
                if(arr === 0)
                    available_moves++;
            });
            // returning 0 for tie
            if (available_moves === 0)
                return 0;
            // returning true for next move
            return true;
        }
    }

    bestMove = () => { 
        let bestScore = -Infinity, move, count_for_random = 0;
        // -----------------------------------
        // return random index if first to move
        this.board.forEach(arr => {
            if(arr === 0)
                count_for_random++;
        })
        if(count_for_random === 9)
            return Math.round(Math.random() * 9);
        // -------------------------------------
        
        this.board.forEach((arr, index) => {
            if(arr === 0) {
                
                this.board[index] = this.c;

                let score = this.minimax(100, false);
                this.board[index] = 0;
                console.log('Index:', index, ', ', score);
                if(score > bestScore) {
                    bestScore = score;
                    move = index;
                }
            }
        })
        return move;
    }

    minimax = (depth, isMaximixing) => {
        let result = this.check();

        if(result !== true) 
            return result * depth;


        if(isMaximixing) {
            let bestScore = -Infinity;
            this.board.forEach((arr, index) => {
                if(arr === 0) {
                    this.board[index] = this.c;
                    bestScore = Math.max(bestScore, this.minimax(depth - 1, !isMaximixing));

                    this.board[index] = 0;
                }
            })
            return bestScore;
        }
        else {
            let bestScore = Infinity;
            this.board.forEach((arr, index) => {
                if(arr === 0) {
                    this.board[index] = this.p;
                    let temp = this.minimax(depth - 1, !isMaximixing);
                    
                    bestScore = Math.min(bestScore, temp);
                    
                    this.board[index] = 0;
                }
            })
            return bestScore;
        }
    }
}

export default Ai;