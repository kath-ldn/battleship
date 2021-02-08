import { createGameBoard, areAllSunk } from "./gameBoards";
import { gameVisualSetup } from "./visuals";
import { setId } from "./visuals";
import { userPlace } from './ships';
import { updateMessage } from './msgsAndScores';

// *** MANAGES GAMEPLAY *** //
//global Board & user variables
let personBoard;
let aiBoard;

//function to remove single event listener once user has attacked it
function removeListener(coord, user){
    const squ = document.getElementById(user + '-' + coord);
    squ.removeEventListener("click", userPlay);
};

//function to manage user turn onclick
function userPlay(event){
    event.preventDefault();
    let arr = event.target.id.split("-");
    let coord = arr[1];
    aiBoard.receiveAttack(aiBoard, coord);
    removeListener(coord, 'ai');
    let allSunk = areAllSunk(aiBoard);
    if (allSunk === false){
        setTimeout(aiPlay, 500);
        areAllSunk(personBoard);
    }
};

//adds event listeners to gameboard visual
function addListeners(user){
    if(user === 'ai'){
        for (let i = 1; i < 101; i++) {
            let id = setId(i);
            const squ = document.getElementById(user + '-' + id);
            squ.addEventListener("click", userPlay);
        }
    } else if(user === 'person'){
        for (let i = 1; i < 101; i++) {
            let id = setId(i);
            const squ = document.getElementById(user + '-' + id);
            squ.addEventListener("click", () =>{
                userPlace();
            });
        }
    }
};

//removes event listeners to gameBoard visual
function removeListeners(user){
    if(user === 'ai'){
        for (let i = 1; i < 101; i++) {
            let id = setId(i);
            const squ = document.getElementById(user + '-' + id);
            squ.removeEventListener("click", userPlay);
        }
    } else if(user === 'person'){
        for (let i = 1; i < 101; i++) {
            let id = setId(i);
            const squ = document.getElementById(user + '-' + id);
            squ.removeEventListener("click", () =>{
                userPlace();
            });
        }
    }
};

//function to get random coordinate for AI to attack
function getRandCoord() {
    let coord1 = Math.floor(Math.random() * Math.floor(10) + 1);
    let coord2 = Math.floor(Math.random() * Math.floor(10) + 1);
    let coord = coord1 + '.' + coord2;
    return coord;
}

//function to manage AI play
function aiPlay(){
    let legal = false;
    let coord;
    while(legal === false){
        coord = getRandCoord();
        if(!personBoard[coord]){
            legal = true;
        }
        if(personBoard[coord]){
            if(personBoard[coord] === 'miss'){
                legal = false;
            } else if(!personBoard[coord].hitCoords[coord]){
                legal = true;
            }
        }
    }
    personBoard.receiveAttack(personBoard, coord);
};

//initial function to set up the game
function setUpGame(){
    personBoard = createGameBoard('Kath');
    aiBoard = createGameBoard('Ai');
    gameVisualSetup();
    updateMessage("Hey user! Click on your board to start placing your ships.")
    addListeners('person');
};

//factory function to create user and keep track of scores
const createuser = ( name, shipsSunk, shipsRemaining ) => {
    return { name, shipsSunk, shipsRemaining };
};

//creates users for game
const person = createuser('user', 0, 5);
const ai = createuser('ai', 0, 5);

export { removeListeners, setUpGame, personBoard, aiBoard, addListeners, getRandCoord }