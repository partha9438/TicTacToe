let board = [['', '', ''], ['', '', ''], ['', '', '']];
let currentPlayer = '';
let playerNames = ['', ''];
let gameActive = false;

const playerForm = document.getElementById('player-form');
const startButton = document.getElementById('start-button');
const gameBoard = document.getElementById('game-board');
const currentPlayerDisplay = document.getElementById('current-player');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const winnerMessage = document.getElementById('winner-message');
const winnerName = document.getElementById('winner-name');
const restartButton = document.getElementById('restart-button');

function startGame() {
  const player1Input = document.getElementById('player1');
  const player2Input = document.getElementById('player2');
  
  if (player1Input.value.trim() === '' || player2Input.value.trim() === '') {
    alert('Please enter both player names.');
    return;
  }
  
  playerNames[0] = player1Input.value;
  playerNames[1] = player2Input.value;
  currentPlayer = playerNames[0];
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
  gameActive = true;
  
  playerForm.classList.add('hidden');
  gameBoard.classList.remove('hidden');
}

function makeMove(row, col) {
  if (!gameActive || board[row][col] !== '') {
    return;
  }

  board[row][col] = currentPlayer;
  document.getElementById(`cell-${row}-${col}`).textContent = currentPlayer;

  if (checkWinner()) {
    currentPlayerDisplay.textContent = '';
    winnerName.textContent = `${currentPlayer} wins!`;
    gameBoard.classList.add('hidden');
    winnerMessage.classList.remove('hidden');
    gameActive = false;
    return;
  }

  if (isBoardFull()) {
    currentPlayerDisplay.textContent = '';
    winnerName.textContent = "It's a tie!";
    gameBoard.classList.add('hidden');
    winnerMessage.classList.remove('hidden');
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === playerNames[0] ? playerNames[1] : playerNames[0];
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] && 
      board[i][1] === board[i][2] && 
      board[i][0] !== ''
    ) {
      return true;
    }

    if (
      board[0][i] === board[1][i] && 
      board[1][i] === board[2][i] && 
      board[0][i] !== ''
    ) {
      return true;
    }
  }

  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== ''
  ) {
    return true;
  }

  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== ''
  ) {
    return true;
  }

  return false;
}

function isBoardFull() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === '') {
        return false;
      }
    }
  }
  return true;
}

function resetGame() {
  board = [['', '', ''], ['', '', ''], ['', '', '']];
  currentPlayer = playerNames[0];
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
  console.log(currentPlayer)
  
  for (let cell of cells) {
    cell.textContent = '';
  }

  winnerMessage.classList.add('hidden');
  gameBoard.classList.remove('hidden');
  gameActive = true;
}

function restartGame() {
  playerForm.classList.remove('hidden');
  winnerMessage.classList.add('hidden');
  resetGame();
}
console.log(restartGame)

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
