document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const modal = document.getElementById('modal');
    const resultMessage = document.getElementById('result-message');
    const newGameBtn = document.getElementById('new-game-btn');
    const resetButton = document.getElementById('reset-btn');
  
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
  
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
  
    const createBoard = () => {
      for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-index', i);
        square.addEventListener('click', () => handleSquareClick(i));
        board.appendChild(square);
      }
    };
  
    const checkWinner = () => {
      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          return gameState[a];
        }
      }
      return null;
    };
  
    const updateStatus = () => {
      const winner = checkWinner();
      if (winner) {
        showModal(`Player ${winner} wins!`);
      } else if (!gameState.includes('')) {
        showModal("It's a draw!");
      } else {
        resultMessage.textContent = `Player ${currentPlayer}'s turn`;
      }
    };
  
    const handleSquareClick = (index) => {
      if (gameState[index] || !gameState.includes('')) return;
      gameState[index] = currentPlayer;
      updateBoard();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatus();
    };
  
    const updateBoard = () => {
      const squares = document.querySelectorAll('.square');
      squares.forEach((square, index) => {
        square.textContent = gameState[index];
      });
    };
  
    const showModal = (message) => {
      resultMessage.textContent = message;
      modal.style.display = 'block';
    };
  
    const resetGame = () => {
      currentPlayer = 'X';
      gameState = ['', '', '', '', '', '', '', '', ''];
      updateBoard();
      modal.style.display = 'none';
      updateStatus();
    };
  
    createBoard();
    updateStatus();
  
    resetButton.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', resetGame);
  });
  