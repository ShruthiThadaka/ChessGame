import { initGame } from "./data.js";
import { initGameRender } from "./main.js";
import { GlobalEvent } from "./globalevent.js";
import { ROOT_DIV } from "./constant.js";

//will be usefull till the game ends
const globalState = initGame(); //we are getting the data
let keySquareMapper = {};

globalState.flat().forEach((square) => {
    keySquareMapper[square.id] = square;
})

initGameRender(globalState);

GlobalEvent();

document.getElementById("restart").addEventListener("click", () => {

    window.location.reload()
})

// Retrieve player names from localStorage
const getUsername = localStorage.getItem("data");

if (getUsername) {
    const parsedData = JSON.parse(getUsername);

    // Check if player names exist in parsed data
    if (parsedData.player1 && parsedData.player2) {
        const player1Element = document.getElementById("name1");
        const player2Element = document.getElementById("name2");

        // Set player names in the corresponding elements
        player1Element.textContent = `Player - Black: ${parsedData.player2}`;
        player2Element.textContent = `Player - White: ${parsedData.player1}`;
    } else {
        console.error("Player names not found in localStorage data.");
    }
} else {
    console.error("No data found in localStorage.");
}

export { globalState, keySquareMapper };



