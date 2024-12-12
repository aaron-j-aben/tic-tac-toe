/** 
 *  Tic-Tac-Toe 
 *  @author Aaron JM Aben
*/

const Gameboard = (function () {
    const _board = Array(3).map((col) => Array(3).fill(0));

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
        for (let i = 0; i < _board.length; i++) {
            for (let j = 0; j < _board[i].length; j++) {
                _board[rowInd][colInd] = 0;
            }
        }
    }

    return {
        getSquareValue,
        setSquareValue,
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
        // check main diagonal
        if (row === col) {
            for (let main = 0; main < 3; main++) {
                if (Gameboard.getSquareValue(main, main) !== _playerTurn) {
                    return false;
                }
            }
        }

        //check minor diagonal
        if (Math.abs(row - col) === 2 || row === 1 && col === 1) {
            for (let minor = 0; minor < 3; main++) {
                if (Gameboard.getSquareValue(minor, 2 - minor) !== _playerTurn) {
                    return false;
                }
            }
        }

        return true;

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
    function playTurn(row, col) {
        Gameboard.setSquareValue(getPlayerTurn(), row, col);
        updateGameState(row, col) !== 0;
    }

    return {
        getGameState,
        getPlayerTurn,
        playTurn,
        restartGame
    }
})();

const DisplayController = (function () {
    // Initialize board - assign listeners for all positions

    // Reset board

    // Restart board button handling

    // Deactivate squares

    // Announce winner
})();