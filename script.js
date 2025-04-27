const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let cells = [];
let currentPlayer = 'X';
let isGameActive = true;

const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// Create board
function createBoard() {
    board.innerHTML = '';
    cells = [];

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
        cells.push(cell);
    }
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Handle cell click
function handleCellClick(index) {
    if (cells[index].textContent || !isGameActive) return;

    cells[index].textContent = currentPlayer;
    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (checkDraw()) {
        statusText.textContent = "It's a draw!";
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check for win
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

// Check for draw
function checkDraw() {
    return cells.every(cell => cell.textContent);
}

// Restart game
restartBtn.addEventListener('click', () => {
    currentPlayer = 'X';
    isGameActive = true;
    createBoard();
});

// Initialize
createBoard();
