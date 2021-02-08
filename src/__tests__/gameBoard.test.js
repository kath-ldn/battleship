import { createGameBoard, amISunk, areAllSunk } from '../gameBoards';
import { placeShip } from '../ships';
import { updateMessage } from '../msgsAndScores';
import { colourSqu } from '../visuals';
import { removeListeners } from '../gameplay';

jest.mock('../msgsAndScores');
jest.mock('../visuals');
jest.mock('../gameplay');

describe('using the gameBoard, including attacking', () => {
    let testGameBoard;

    beforeEach(() => {
        testGameBoard = createGameBoard('test');
        testGameBoard.shipsToPlace = 3;
        placeShip(testGameBoard, '2.2', 'vertical');
        placeShip(testGameBoard, '3.4', 'vertical');
        placeShip(testGameBoard, '5.7', 'vertical');
    });

    test('board can receive miss', () => {
        testGameBoard.receiveAttack(testGameBoard, '9.1');
        expect(testGameBoard[9.1]).toMatch(/miss/);
    });

    test('board can return an invalid move - miss', () => {
        testGameBoard[8.1] = 'miss';
        expect(testGameBoard.receiveAttack(testGameBoard, '8.1')).toBe('invalid move');
    });

    test('board can return an invalid move - hit', () => {
        testGameBoard[2.2].hitCoords[2.2] = true;
        expect(testGameBoard.receiveAttack(testGameBoard, '2.2')).toBe('invalid move');
    });

    test('board can receive a hit', () => {
        testGameBoard.receiveAttack(testGameBoard, '2.2');
        expect(testGameBoard[2.2].hitCoords[2.2]).toBeTruthy();
    });

    test('board can check if boat is sunk - false', () => {
        testGameBoard.receiveAttack(testGameBoard, '2.2');
        testGameBoard.receiveAttack(testGameBoard, '3.2');
        expect(testGameBoard[2.2].sunk).toBeFalsy();
    });

    test('board can check if boat is sunk - true', () => {
        testGameBoard.receiveAttack(testGameBoard, '2.2');
        testGameBoard.receiveAttack(testGameBoard, '3.2');
        testGameBoard.receiveAttack(testGameBoard, '4.2');
        expect(testGameBoard[2.2].sunk).toBeTruthy();
    });

    test('board can check if all boats are sunk - false', () => {
        testGameBoard.receiveAttack(testGameBoard, '2.2');
        testGameBoard.receiveAttack(testGameBoard, '3.2');
        testGameBoard.receiveAttack(testGameBoard, '4.2');
        expect(areAllSunk(testGameBoard)).toBeFalsy();
    });

    test('board can check if all boats are sunk - true', () => {
        testGameBoard.receiveAttack(testGameBoard, '2.2');
        testGameBoard.receiveAttack(testGameBoard, '3.2');
        testGameBoard.receiveAttack(testGameBoard, '4.2');
        testGameBoard.receiveAttack(testGameBoard, '3.4');
        testGameBoard.receiveAttack(testGameBoard, '4.4');
        testGameBoard.receiveAttack(testGameBoard, '5.7');
        expect(areAllSunk(testGameBoard)).toBeTruthy();
    });

});


/*

let testboard;
testboard =
placeShip(testBoard, '1.1', supertanker, 'vertical');
personBoard.ships to place =
personBoard.receiveAttack(personBoard, '1.1')
//test for receiveAttack function
test('receive Attack fires on attack', () => {
    expect(receiveAttack('1.2', userArray)).toBeTruthy();
});

//test for isSunk function
test('isSunk function works', () => {
    expect(isSunk(modelShip2)).toBeTruthy();
});

check receive attaack, is sunk etc.

*/