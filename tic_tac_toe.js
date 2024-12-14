/** 
 *  Tic-Tac-Toe 
 *  @author Aaron JM Aben
*/

// Gameboard on global scope because it should be independent of both game logic
// and GUI logic
const Gameboard = (function () {
    const _board = [...Array(3)].map((col) => Array(3).fill(0));

    // FUNCTIONS FOR TESTING
    function printTicTacToeBoard() {
        if (_board.length !== 3 || _board.some(row => row.length !== 3)) {
          console.error("Invalid board! The board must be a 3x3 array.");
          return;
        }
      
        const symbols = { 0: " ", 1: "X", 2: "O" };
      
        for (let i = 0; i < _board.length; i++) {
          const row = _board[i].map(cell => symbols[cell] || " ").join(" | ");
          console.log(row);
          if (i < _board.length - 1) {
            console.log("--|---|--");
          }
        }
    }

    function getSquareValue(rowInd, colInd) {
        return _board[rowInd][colInd];
    }

    /**
     * 
     * @param {number} playerTurn - integer corresponding to the player number; 1 or 2
     * @param {number} rowInd 
     * @param {number} colInd 
     */
    function setSquareValue(playerTurn, rowInd, colInd) {
        _board[rowInd][colInd] = playerTurn;
    }

    function isFull() {
        return _board.every((row) => !row.includes(0));
    }

    function clearBoard() {
        for (let rowInd = 0; rowInd < _board.length; rowInd++) {
            for (let colInd = 0; colInd < _board[rowInd].length; colInd++) {
                _board[rowInd][colInd] = 0;
            }
        }
    }

    return {
        printTicTacToeBoard,
        getSquareValue,
        setSquareValue,
        isFull,
        clearBoard
    };

})();

function Player(turn, symbol) {
    // Player symbol
    let _symbol = symbol;
    const _turn = turn;

    function getTurn() {
        return _turn;
    }

    function getSymbol() {
        return _symbol;
    }

    return {
        getSymbol,
        getTurn
    };
};

const GameController = (function () {
    const DRAW = -1;
    const ONGOING = 0;
    const P1WIN = 1;
    const P2WIN = 2;

    let _gameState = ONGOING;
    let player1 = Player(1, 'X');
    let player2 = Player(2, 'O');
    let _playerTurn = player1.getTurn();

    function getGameState() {
        return _gameState;
    }

    function getPlayerTurn() {
        return _playerTurn;
    }

    function getPlayerSymbol(playerTurn) {
        return (playerTurn === player1.getTurn()) ? player1.getSymbol() : player2.getSymbol();
    }

    function setGameState(state) {
        _gameState = state;
    }

    function toggleTurn() {
        _playerTurn = (_playerTurn === player1.getTurn()) ? player2.getTurn() : player1.getTurn();
    }

    function setTurn(player) {
        _playerTurn = player;
    }

    // Check for win conditions
    function checkColumn(col) {
        for (let row = 0; row < 3; row++) {  // Probably update this to reflect boards of different sizes
            if (Gameboard.getSquareValue(row, col) !== _playerTurn) {
                return false;
            }
        }

        return true;
    }

    function checkRow(row) {
        for (let col = 0; col < 3; col++) {  // Probably update this to reflect boards of different sizes
            if (Gameboard.getSquareValue(row, col) !== _playerTurn) {
                return false;
            }
        }

        return true;
    }

    function checkDiagonals(row, col) {
        let mainDiag = true;
        let minorDiag = true;

        // check main diagonal
        for (let main = 0; main < 3; main++) {
            if (Gameboard.getSquareValue(main, main) !== _playerTurn) {
                mainDiag = false;
            }
        }

        //check minor diagonal
        for (let minor = 0; minor < 3; minor++) {
            if (Gameboard.getSquareValue(minor, 2 - minor) !== _playerTurn) {
                minorDiag = false;
            }
        }

        return mainDiag || minorDiag;

    }

    /**
     * 
     * @param {number} row 
     * @param {number} col 
     * @returns - integer representing the game state after checking win conditions
     */
    function updateGameState(row, col) {
        if (checkRow(row) || checkColumn(col) || checkDiagonals(row, col)) {
            setGameState(_playerTurn);
            return _playerTurn;
        }

        if (Gameboard.isFull()) {
            setGameState(DRAW);
            return DRAW;
        }

        setGameState(ONGOING);
        return ONGOING;
    }

    // Restart game
    function restartGame() {
        Gameboard.clearBoard();
        setTurn(player1.getTurn());
        setGameState(ONGOING);
    }

    // Individual turn
    /**
     * 
     * @param {number} row 
     * @param {number} col 
     * @returns game state
     */
    function playTurn(row, col) {
        if (getGameState() === ONGOING) {
            if (Gameboard.getSquareValue(row, col) !== 0) {
                console.log("SQUARE OCCUPIED. CHOOSE OTHER SQUARE");
                return getGameState();
            }

            Gameboard.setSquareValue(getPlayerTurn(), row, col);
            if (updateGameState(row, col) === ONGOING) {
                toggleTurn();
            };

        }

        return getGameState();
    }

    return {
        getGameState,
        getPlayerTurn,
        playTurn,
        getPlayerSymbol,
        restartGame,

        DRAW,
        ONGOING,
        P1WIN,
        P2WIN
    }
})();

const DisplayController = (function () {
    const boardDisplay = document.querySelector(".ttt-board");
    const gameStateDisplay = document.querySelector(".game-state-display");
    const startBtn = document.querySelector(".game-start");
    
    function gameTurn(clickEvent) {
        const square = clickEvent.target.closest(".ttt-board-square");
        const row = square.dataset.xcoord;
        const col = square.dataset.ycoord;
        const gameState = GameController.playTurn(row, col); // changes turn 
        const player = Gameboard.getSquareValue(row, col)
        const symbol = GameController.getPlayerSymbol(player);

        square.classList.add(symbol);
        square.dataset.player = player;

        square.disabled = true;

        // Handle game ending
        if (gameState !== GameController.ONGOING) {
            endGame();
        } else {
            boardDisplay.classList.toggle("maybe-x");
            boardDisplay.classList.toggle("maybe-o");
            gameStateDisplay.textContent = (player === 1) ? "Player 2's turn" : "Player 1's turn";
        }
    }

    // Initialize board - assign listeners for all positions
    const boardSquareNodes = document.querySelectorAll(".ttt-board-square");

    for (squareNode of boardSquareNodes) {
        squareNode.addEventListener("click", gameTurn);
        squareNode.disabled = true;
    }

    // GAME START
    function startGame() {
        GameController.restartGame();

        for (squareNode of boardSquareNodes) {
            squareNode.disabled = false;
            squareNode.classList.remove('X', 'O');
            squareNode.dataset.player = 0;
        }

        boardDisplay.classList.add("maybe-x");
        boardDisplay.classList.remove("maybe-o");
        gameStateDisplay.textContent = "Player 1's turn";
        startBtn.textContent = "RESTART GAME";
    }

    startBtn.addEventListener("click", startGame);

    // Announce winner
    function endGame() {
        // Disable all player game actions
        for (squareNode of boardSquareNodes) {
            squareNode.disabled = true;
        }

        if (GameController.getGameState() === GameController.DRAW) {
            gameStateDisplay.textContent = "A DRAW!";
        } else if (GameController.getGameState() === GameController.P1WIN) {
            gameStateDisplay.textContent = "PLAYER 1 WINS!";
        } else if (GameController.getGameState() === GameController.P2WIN) {
            gameStateDisplay.textContent = "PLAYER 2 WINS!";
        }

        startBtn.textContent = "START GAME";
    }

})();

  