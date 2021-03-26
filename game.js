'use strict';

class TicTacToe {
    constructor(screenElement) {
        this.screenElement = screenElement
        this.menuElement = new Menu(this.screenElement);
        this.board = new Board(this.screenElement);
        this.playerIcon = ['x', 'o'];
        this.cellSizes = [3, 4, 5, 6, 7, 8, 9];
        this.players = ['human', 'computer'];
    }

    gameMenu() {
        this.menuElement.buildSelect('win-condition', 'Win condition: ', this.cellSizes);
        this.menuElement.buildSelect('cell-columns', 'Column size: ', this.cellSizes);
        this.menuElement.buildSelect('cell-rows', 'Row size: ', this.cellSizes);
        this.menuElement.buildSelect('player-one', 'Select player 1: ', this.players);
        this.menuElement.buildSelect('player-two', 'Select player 2: ', this.players, this.players[1]);
        this.menuElement.buildButton({ 'type': 'button', 'id': 'start-game' }, 'Start');
    }

    gameBoard(winCondition, columns, rows, playerOne, playerTwo) {
        this.menuElement.createdElement.classList.remove('show');
        this.board.cellSetUp(columns, rows);

        this.boardState = new BoardState(winCondition, columns, rows)

        this.playerOne = new Player(playerOne, this.playerIcon[0]);
        this.playerTwo = new Player(playerTwo, this.playerIcon[1]);

        this.nextMove();
    }

    checkBoard() {
        if (this.boardState.isConcluded() == true) {
            setTimeout(() => {
                this.board.boardElement.innerHTML = "";
                alert(`${this.currentPlayer.icon.toUpperCase()} wins!`);
            }, 0);   
        } else if (this.boardState.isConcluded() === 'tie') {
            setTimeout(() => {
                this.board.boardElement.innerHTML = "";
                alert(`Tie!`);
            }, 0);  
        } else {
            return false;
        }
        this.menuElement.createdElement.classList.add('show');
        return true;
    }

    gameMove(cellIndex) {
        this.boardState.updateBoardState(this.currentPlayer.icon, cellIndex);
        if (this.checkBoard() === false){
            this.nextMove();  
        }
    }

    nextMove() {  
        if (this.currentPlayer === this.playerOne) {
            this.currentPlayer = this.playerTwo;
        } else {
            this.currentPlayer = this.playerOne;
        }

        if (this.currentPlayer.isComputer) {
            setTimeout(() => {
                this.gameMove(this.currentPlayer.computerAction(this.boardState));
            }, 150); 
        } else {
            this.currentPlayer.beginTurn();
        }
    }

    clickHandle(cell) { 
        if (cell.classList.contains(this.playerIcon[0]) || cell.classList.contains(this.playerIcon[1]) || this.currentPlayer.isComputer) {
            return false;
        } else {
            this.currentPlayer.action(cell);
            this.gameMove(parseInt(cell.getAttribute('data-cell')));
        }
    }

    gameStart() {
        this.cells.forEach(cell => cell.addEventListener('click', () => this.clickHandle(cell)));
    }

    get cells() {
        return this.board.boardElement.querySelectorAll('[data-cell]');
    }
}

