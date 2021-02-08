import { aiBoard, personBoard } from "./gameplay";

// *** MANAGES DISPLAY OF MESSAGES AND SCORES ***
let messageBoard = document.getElementById("messageBoard");

function updateMessage(message){
    messageBoard.textContent = message;
}

function updateScoreBoard(){
    let userSunkDiv = document.getElementById("userSunkDiv");
    let aiSunkDiv = document.getElementById("aiSunkDiv");
    userSunkDiv.textContent = personBoard.shipsSunk;
    aiSunkDiv.textContent = aiBoard.shipsSunk;

}

function createScoreBoard(){
    let scoreBoard = document.getElementById("scoreBoardContainer");
    let arr = ['userLabel', 'userSunkDiv', 'aiLabel', 'aiSunkDiv'];
    let content = ['User Ships Sunk', '0', 'Ai Ships Sunk', '0'];
    for(let i = 0; i < 4; i++){
        let div = document.createElement('div');
        div.setAttribute('id', arr[i]);
        div.classList.add('scores');
        div.textContent = content[i];
        scoreBoard.appendChild(div);
    }
};

export { updateMessage, createScoreBoard, updateScoreBoard, messageBoard };