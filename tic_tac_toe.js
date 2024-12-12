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
    /*
       -1 - draw
        0 - ongoing
        1 - player 1 wins
        2 - player 2 wins
    */
    let _gameState = 0;
    let player1 = Player(1, 'X');
    let player2 = Player(2, 'O');
    let _playerTurn = player1.getTurn();

    function getTurn() {
        return _playerTurn;
    }

    function toggleTurn() {
        _playerTurn = (_playerTurn === player1.getTurn()) ? player2.getTurn() : player1.getTurn();
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