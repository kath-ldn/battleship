import { setId, colourSqu } from "./visuals";
import { aiBoard, userBoard, removeListeners, addListeners, getRandCoord } from "./gameplay";
import { updateMessage, messageNoLoader } from './msgsAndScores';
import { placementVisual, addHover, removeHover } from './visuals';

// *** MANAGES CREATING AND PLACING SHIPS *** //

//factory function to create ships
const buildShip = ( length, hitLocation, sunk, master ) => {
    return { length, hitLocation, sunk, master,
        hitCoords: {}
    }
};

//ship templates - not currently used, but if use 5 boats, will use
const supertanker = buildShip(5, 0, false);
const tanker = buildShip(4, 0, false);
const carrier = buildShip(3, 0, false);
const yacht = buildShip(2, 0, false);
const dinghy = buildShip(1, 0, false);

//function for AI to place ships
function aiPlaceShips(){
    let directions = ['horizontal', 'vertical'];
    let legal;
        if(aiBoard.shipsPlaced === false){
            aiBoard.shipsToPlace = 5;
        }
        while(aiBoard.shipsPlaced === false && aiBoard.shipsToPlace <=5 && aiBoard.shipsToPlace > 0){
            let coord = getRandCoord();
            let direction = directions[Math.floor(Math.random() * directions.length)];
            let coordInt = returnCoordIntegers(coord);
            let x = coordInt[0]; let y = coordInt[1];
            let size = aiBoard.shipsToPlace;
            legal = checkIfOccupied(aiBoard, x, y, size, direction);
                if(legal === true){
                    placeShip(aiBoard, coord, 'vertical');
                }
                if(aiBoard.shipsToPlace === 0) {
                    aiBoard.shipsPlaced = true;
                    console.log(aiBoard)
                }
    }
};

//changes coordinate to an array of integers to increase them/place ship
function returnCoordIntegers(coordinate){
    let x; let y;
    if (coordinate.length === 3){
        x = parseInt(coordinate.charAt(0));
        y = parseInt(coordinate.charAt(2));
    } else if (coordinate.charAt(1) === '.'){
        x = parseInt(coordinate.charAt(0));
        y = coordinate.charAt(2) + coordinate.charAt(3);
        parseInt(y);
    } else if (coordinate.charAt(2) === '.'){
        x = coordinate.charAt(0) + coordinate.charAt(1);
        parseInt(x);
        y = parseInt(coordinate.charAt(3));
    };
    return [x, y]
};

//function to check if ship spaces is already occupied
function checkIfOccupied(gameboard, x, y, size, direction) {
    x = parseInt(x);
    y = parseInt(y);
    let legal = true;
    if(direction === 'vertical') {
        for (let i=0; i < size; i++) {
            let a = x + i;
            if(a >= 11 || y >= 11){
                legal = false;
            }
            let coordChild = a.toString() + "." + y.toString();
            if (gameboard[coordChild]) {
                legal = false;
            }
        }
    } else if(direction === 'horizontal') {
        for (let i=0; i < size; i++) {
            let b = y + i;
            if(x >= 11 || b >= 11){
                legal = false;
            }
            let coordChild = x.toString() + "." + b.toString();
            if (gameboard[coordChild]) {
                legal = false;
            }
        }
    }
    return legal;
};

//function to place ships on gameboard object
function placeShip(gameboard, coordinate, direction){
    let length = gameboard.shipsToPlace;
    let coordInt = returnCoordIntegers(coordinate);
    let x = coordInt[0];
    let y = coordInt[1];
    let coord = x.toString() + "." + y.toString();
    let legal = checkIfOccupied(gameboard, x, y, length, direction);
    if (legal === true){
        gameboard.allMasters.push(coord);
        gameboard[coord] = buildShip(gameboard.shipsToPlace, '', false, coordinate);
        if(direction === 'vertical') {
            for (let i=0; i < length; i++) {
                let a = x + i;
                let coordChild = a.toString() + "." + y.toString();
                gameboard[coordChild] = gameboard[coord];
                if (gameboard === userBoard) {
                    colourSqu('place', gameboard, coordChild)
                }
            }
        } else if(direction === 'horizontal') {
            for (let i=0; i < length; i++) {
                let b = y + i;
                let coordChild = x.toString() + "." + b.toString();
                gameboard[coordChild] = gameboard[coordinate];
                if (gameboard === userBoard) {
                    colourSqu('place', gameboard, coordChild)
                }
            }
        }
        gameboard.shipsToPlace--;
    } else if (legal === false){
        if(gameboard === userBoard){
            messageNoLoader("Invalid move! Not enough space to place ship.");
        }
        return false;
    }
};

//global direction variable
let userDirection = "horizontal";

//function to change direction of placing ships
function changeDirection(){
    if(userDirection === "horizontal"){
        userDirection = "vertical";
        let dirButton = document.getElementById('dirButton');
        dirButton.textContent = userDirection;
    } else if(userDirection === "vertical"){
        userDirection = "horizontal";
        let dirButton = document.getElementById('dirButton');
        dirButton.textContent = userDirection;
    }
}

//button to call function to change ship direction
function makeDirButton(){
    let dirButton = document.createElement('button');
    dirButton.textContent = userDirection;
    dirButton.setAttribute('id', 'dirButton');
    dirButton.addEventListener("click", changeDirection);
    let parent = document.getElementById('dirButtonContainer');
    parent.appendChild(dirButton);
}

//MSG: Click to start placing boats
function userPlace(){
    if(!userBoard.shipsToPlace && userBoard.shipsPlaced === false){
        userBoard.shipsToPlace = 5;
        makeDirButton();
        addHover();
        return;
    } else if(userBoard.shipsToPlace <= 5 && userBoard.shipsToPlace > 0){
        let arr = event.target.id.split("-");
        let coord = arr[1];
        placeShip(userBoard, coord, userDirection);
        if(userBoard.shipsToPlace === 0) {
            userBoard.shipsPlaced = true;
            removeHover();
            removeListeners('user');
            aiPlaceShips();
            setTimeout(updateMessage("...AI has placed their ships. Click on their board to take your shot..."), 1000);
            //make this more interactive - settimeout, 'AI is placing...'
            addListeners('ai');
            let dirButton = document.getElementById('dirButton');
            dirButton.style.display = 'none';
        }
    }
};

export { userPlace, aiPlaceShips, placeShip, userDirection, returnCoordIntegers }
