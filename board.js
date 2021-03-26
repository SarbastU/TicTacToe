'use strict';

class Board {
    constructor(screenElement) {
        this.screenElement = screenElement;

        this.board = document.createElement('div');
        this.board.setAttribute('class', 'board');
        this.screenElement.appendChild(this.board);

        this.cellElement = document.createElement('div');
        this.cellElement.setAttribute('class', 'cell');
    }

    cellSetUp(columns, rows) {
        this.board.textContent = ""; //clears any previous childnodes

        this.columns = parseInt(columns);
        this.rows = parseInt(rows);
        this.cellAmount = this.rows * this.columns;

        this.board.style.cssText = `grid-template-columns: repeat(${this.columns}, auto);`;


        for (let i = 0; i < this.rows * this.columns; i++) {
                this.cellElement.setAttribute('data-cell', i);
                this.board.appendChild(this.cellElement.cloneNode(true)); 
        }
    }

    get boardElement() {
        return this.board;
    }
}

