import { setUpGame } from './gameplay';
import './reset.css';
import './style.css'; 

function hideLoader(){
    let loader = document.getElementById("loaderOverlay");
    loader.classList.add("loaded");
    let loaderSm = document.getElementById("loader-small")
    loaderSm.classList.add("d-none");
    let pageTitle = document.getElementById("page-title");
    pageTitle.classList.remove('d-none');
}

(function startGame(){
   setUpGame();
   setTimeout(hideLoader, 2000)
})();

