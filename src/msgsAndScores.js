import { aiBoard, userBoard } from "./gameplay";

// *** MANAGES DISPLAY OF MESSAGES AND SCORES ***
let messageBoard = document.getElementById("messageBoard");
let loaderSm = document.getElementById("loader-small");

function messageSetText(message){
    loaderSm.classList.add("loaded");
    setTimeout( () => {
        messageBoard.textContent = message;
        loaderSm.classList.add("d-none");
    }, 500)
};

function updateMessage(message){
    messageBoard.textContent = "";
    loaderSm.classList.remove("loaded");
    loaderSm.classList.remove("d-none");
    setTimeout( () => {
        messageSetText(message)
    }, 500)
};

function textNoLoader(message){
    messageBoard.textContent = message;
}

function messageNoLoader(message){
    setTimeout( () => {
        textNoLoader(message)
    }, 400)
};

function updateScoreBoard(){
    let userSunkDiv = document.getElementById("userSunkDiv");
    let aiSunkDiv = document.getElementById("aiSunkDiv");
    userSunkDiv.textContent = userBoard.shipsSunk;
    aiSunkDiv.textContent = aiBoard.shipsSunk;
};

export { updateMessage, updateScoreBoard, messageNoLoader };