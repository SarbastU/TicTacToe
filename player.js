'use strict';

class Player {
    constructor(player = 'human', playerIcon, playerActive = false){
        this.player = player;
        this.playerIcon = playerIcon;
        this.playerActive = playerActive;
    }

    computerAction(boardState) {
        if (boardState.cellsOpen.length > 0) {
            this.moveSpace = boardState.cellsOpen[Math.floor(Math.random() * boardState.cellsOpen.length)];
            document.querySelector(`[data-cell="${this.moveSpace}"]`).classList.add(this.playerIcon);       
            this.endTurn();
            return this.moveSpace;
        } else {
            this.endTurn();
        }
    }

    beginTurn() {
        this.playerActive = true;
    }

    endTurn() {
        this.playerActive = false;
    }

    action(cell) {     
        if (this.playerActive === true) {
            this.endTurn();
            cell.classList.add(this.playerIcon);
        }
    }

    get isActive() {
        return this.playerActive;
    }

    get isComputer() {
        return this.player.toLowerCase() === 'computer';
    }

    get icon() {
        return this.playerIcon;
    }

    
}