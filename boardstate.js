'use strict';

class BoardState {
    constructor(winCondition, columns, rows) {
        this.winCondition = parseInt(winCondition);
        this.rows = parseInt(rows);
        this.columns = parseInt(columns);
        this.cellCount = this.columns * this.rows - 1;
        this.cellIndex = 0;

        this.boardState = this.boardStateConstruct();
    }

    boardStateConstruct() {
        this.boardStructure = [];
        this.count = 0
        for (let i = 0; i < this.rows; i++) {
            this.boardStructure[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.boardStructure[i][j] = this.count;
                ++this.count;
            }
        }
        return this.boardStructure;
    }

    scoring(rInc, cInc, rIndex = this.rowIndex, cIndex = this.colIndex, score = 0, reverse = false) {
        if (rIndex > this.rows - 1 || rIndex < 0 || cIndex > this.columns - 1 || cIndex < 0) {
            return reverse === true ? score
                : this.scoring(rInc, cInc, this.rowIndex - rInc, this.colIndex - cInc, score, true);
        } else if (reverse) {
            return this.boardState[rIndex][cIndex] === this.currentPlayer ?
                this.scoring(rInc, cInc, rIndex - rInc, cIndex - cInc, ++score, true)
                : score;
        } else {
            return this.boardState[rIndex][cIndex] === this.currentPlayer ?
                this.scoring(rInc, cInc, rIndex + rInc, cIndex + cInc, ++score)
                : this.scoring(rInc, cInc, this.rowIndex - rInc, this.colIndex - cInc, score, true);
        }
    }

    isConcluded() {
        return this.scoring(0, 1) >= this.winCondition ? true           //checks for horizontal win condition
            : this.scoring(1, 0) >= this.winCondition ? true            //checks for verticle win condition
                : this.scoring(1, -1) >= this.winCondition ? true       //checks for "/" diagonal win condition
                    : this.scoring(1, 1) >= this.winCondition ? true    //checks for "\" diagonal win
                        : !this.boardState.some(arr => arr.some(x => !isNaN(x))) ? 'tie'
                            : false
    }

    updateBoardState(currentPlayer, cellIndex) {
        this.currentPlayer = currentPlayer;
        this.cellIndex = parseInt(cellIndex);
        this.rowIndex = this.boardState.findIndex(arr => arr.includes(this.cellIndex));
        this.colIndex = this.boardState[this.rowIndex].findIndex(i => i === this.cellIndex);
        this.boardState[this.rowIndex][this.colIndex] = this.currentPlayer;
        
    }

    get cellsOpen() {
        return this.boardState.reduce((p, c) => p.concat(... c), []).filter(i => !isNaN(i))
    }
}