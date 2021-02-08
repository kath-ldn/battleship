import { placeShip } from '../ships';
import { createGameBoard } from '../gameBoards';

describe('placing ships', () => {
    let testGameBoard;
    beforeEach(() => {
        testGameBoard = createGameBoard('test');
        testGameBoard.shipsToPlace = 2;
    });

    test('ships successfully placed in master array', () => {
        placeShip(testGameBoard, '2.2', 'vertical');
        expect(testGameBoard.allMasters).toContain('2.2');
    });

    test('object keys created ', () => {
        placeShip(testGameBoard, '2.2', 'vertical');
        expect(testGameBoard[2.2] && testGameBoard[3.2]).toBeTruthy();
    });

    test('invalid placement returns false', () => {
        expect(placeShip(testGameBoard, '12.2', 'vertical')).toBeFalsy();
    });

});