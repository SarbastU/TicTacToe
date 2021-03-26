'use strict';

const screenElement = document.querySelector('[data-game-board]');

const newGame = new TicTacToe(screenElement)
newGame.gameMenu();

const startBtn = document.getElementById('start-game');

startBtn.addEventListener('click', () => {
    let winCondition = document.getElementById('win-condition').value;
    let columns = document.getElementById('cell-columns').value;
    let rows = document.getElementById('cell-rows').value;
    let playerOne = document.getElementById('player-one').value;
    let playerTwo = document.getElementById('player-two').value;

    newGame.gameBoard(winCondition, columns, rows, playerOne, playerTwo);
    newGame.gameStart();
});