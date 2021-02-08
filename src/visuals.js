import { personBoard } from "./gameplay";
import { returnCoordIntegers, userDirection } from './ships';

// *** MANAGES VISUALS *** //
//colours squares on hit/miss
function colourSqu(result, board, coord){
    let user = (board === personBoard) ? 'person' : 'ai';
    let squ = document.getElementById(user + '-' + coord );
    if(result === 'hit'){
        if(board === personBoard){
            squ.classList.remove('selectingBoat');
            squ.classList.remove('personBoat');
        }
        squ.classList.add('hitSqu');
    } else if (result === 'miss') {
        squ.classList.add('missSqu');
    } else if (result === 'place') {
        squ.classList.add('personBoat');
    }
};

//sets ID's for gameBoard visuals
//I'm sure there is a better way of doing so will come back to
function setId(i){
    let j; let k;
    let l = i + 9;
    if(i < 11){ j = 1; k = i; }
    if(i >= 11 && i < 91) { j = l.toString().charAt(0); k = i.toString().charAt(1);}
    if(i >= 91) { j = '10'; k = i.toString().charAt(1);}
    if (i.toString().charAt(1) === '0') { k = '10';}
    let id = j + '.' + k;
    return id;
};

//function to visually show gameboard
function showGameBoard(user){
    const container = document.getElementById(user + 'Container')
    let label = document.createElement('h2');
    label.textContent = user + ' board';
    container.appendChild(label);
    const board = document.createElement('div')
    board.setAttribute('id', user + 'Board')
        for (let i = 1; i < 101; i++) {
            let id = setId(i);
            let squ = document.createElement('div');
            squ.setAttribute('id', user + '-' + id );
            squ.classList.add('squ');
            board.appendChild(squ);
        }
    container.appendChild(board);
};

function gameVisualSetup(){
    //storing the person and computer gameboards in variables
    //replace with template.size
    //show person gameboard
    showGameBoard('person');
    //show ai gameboard
    showGameBoard('ai');
}



//ensures hover covers relevant squares
function placementVisual(coordinate, instruction, direction, length){
    let coord = returnCoordIntegers(coordinate);
    let x = coord[0];
    let y = coord[1];
    if(direction === 'vertical') {
        for (let i=0; i < length; i++) {
            let a = x + i;
            if(a >= 10 ){ a = 10};
            let coordChild = a.toString() + "." + y.toString();
            let id = 'person-' + coordChild;
            let element = document.getElementById(id);
            if (a <= 10){
                if (instruction === 'add'){
                    element.classList.add('selectingBoat');
                } else element.classList.remove('selectingBoat');
            }
        }   
    } else if(direction === 'horizontal') {
        for (let i=0; i < length; i++) {
            let b = y + i;
            if(b >= 10 ){ b = 10};
            let coordChild = x.toString() + "." + b.toString();
            let id = 'person-' + coordChild;
            let element = document.getElementById(id);
            if (b <= 10){            
                if (instruction === 'add'){
                    element.classList.add('selectingBoat');
                } else element.classList.remove('selectingBoat');
            }
        }
    }
};

//function to show placement of ship
function showPlacement(){
    event.preventDefault;
    let arr = event.target.id.split("-");
    let coord = arr[1];
    placementVisual(coord, 'add', userDirection, personBoard.shipsToPlace);
};

//function to hide placement of ship
function hidePlacement(){
        event.preventDefault;
        let arr = event.target.id.split("-");
        let coord = arr[1];
        placementVisual(coord, 'remove', userDirection, personBoard.shipsToPlace);
};

//adds hover event listeenrs
function addHover(){
    for (let i = 1; i < 101; i++) {
        let id = setId(i);
        let squ = document.getElementById('person-' + id);
        squ.addEventListener("mouseover", showPlacement);
        squ.addEventListener("mouseout", hidePlacement);
    }
};

function removeHover(){
    for (let i = 1; i < 101; i++) {
        let id = setId(i);
        let squ = document.getElementById('person-' + id);
        squ.removeEventListener("mouseover", showPlacement);
        squ.removeEventListener("mouseout", hidePlacement);
    }
};

export { colourSqu, gameVisualSetup, setId, placementVisual, addHover, removeHover };