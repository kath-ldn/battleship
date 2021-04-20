import { setUpGame } from './gameplay';
import './reset.css';
import './style.css'; 

function hideLoader(){
    let loader = document.getElementById("loaderOverlay");
    loader.classList.add("loaded");
    setTimeout( () => {
        loaderSm.classList.add("d-none");
    }, 2000)
}

(function startGame(){
   setUpGame();
   setTimeout(hideLoader, 2000)
})();

