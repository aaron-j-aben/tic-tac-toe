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
     * @param {number} player - integer corresponding to the player number; 1 or 2
     * @param {number} rowInd 
     * @param {number} colInd 
     */
    function setSquareValue(player, rowInd, colInd) {
        _board[rowInd][colInd] = player;
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

function Player(symbol) {
    // Player symbol
    let _symbol = symbol;

    function getSymbol() {
        return _symbol;
    }

    return {
        getSymbol
    };
};

const GameController = (function () {
    let _gameState = 0;
    let player1 = Player('X');
    let player2 = Player('O');
    let _playerTurn = 1;

    function getTurn() {
        return _playerTurn;
    }

    function toggleTurn() {
        _playerTurn = Number(!_playerTurn);
    }

    // Check for win conditions
    function checkColumn(player) {

    }

    function checkRow(player) {

    }

    function checkDiagonal(player) {

    }

    // Check for draws - all squares filled, win condition not fulfilled

    // player turn behavior
    function playerAction(player) {
    }

    // Restart game
    function restartGame() {

    }

    // End game
    function endGame() {

    }

    // Individual turn
    function playTurn() {

    }

    return {
        getTurn,
        playTurn,
        restartGame,
        endGame
    }
})();

const DisplayController = (function () {
    // Initialize board - assign listeners for all positions

    // Reset board

    // Restart board button handling

    // Deactivate squares

    // Announce winner
})();