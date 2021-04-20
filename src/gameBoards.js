// *** MANAGES GAMEBOARDS & FUNCTIONS OWNED BY THEM, INCLUDING RECEIVING ATTACKS *** //
import { colourSqu } from "./visuals";
import { removeListeners, aiBoard, userBoard } from "./gameplay";
import { updateMessage, updateScoreBoard, messageNoLoader } from './msgsAndScores';

//in order to display messages in test mode. this feels clunky. amend in next iteration
function getOtherBoard(board){
    let otherBoard;
    if(board === userBoard || board === aiBoard){
        otherBoard = (board === userBoard) ? aiBoard : userBoard;
    } else if (board !== userBoard && board !== aiBoard){
        otherBoard = {
            name: 'other player'
        }
    }
    return otherBoard;
};

//check if all ships are sunk (gameover)
function areAllSunk(board){
    let otherBoard = getOtherBoard(board);
    let sunkShips = 0;
    let arr = board.allMasters;
    for (let i = 0; i < arr.length; i++) {
        let ship = board.allMasters[i];
        if (board[ship].sunk === true) {
            sunkShips++;
                if(sunkShips === arr.length) {
                    removeListeners('ai');
                    updateMessage('Game Over!! ' + otherBoard.name + ' wins!!');
                    return true;
                }
        } else return false;
    }
};

//function to check if ship is sunk
function amISunk(board, ship){
    if(ship.hitLocation === ship.length){
        ship.sunk = true;
        board.shipsSunk++;
    };
    return ship.sunk;
};

//factory function to create the gameBoard
const createGameBoard = (name) => {
    return {
        receiveAttack(board, coord){
        let otherBoard = getOtherBoard(board);
            if (!board[coord]) {
                board[coord] = 'miss';
                colourSqu('miss', board, coord);
                messageNoLoader(otherBoard.name + ' miss');
            } else if (board[coord] === 'miss') {
                messageNoLoader('invalid move');
                return 'invalid move';
            } else if (board[coord].hitCoords[coord] === true) {
                messageNoLoader('invalid move');
                return 'invalid move';
            } else if (board[coord] !== false) {
                messageNoLoader(otherBoard.name + ' hit! o_o');
                board[board[coord].master].hitLocation++;
                board[coord].hitCoords[coord] = true;
                colourSqu('hit', board, coord);
                amISunk(board, board[coord]);
                areAllSunk(board)
                updateScoreBoard();
            }
        },
        allMasters: [],
        shipsToPlace: 0,
        shipsPlaced: false,
        name: name,
        shipsSunk: 0
    }
};

export { createGameBoard, areAllSunk };