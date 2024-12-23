import { initGame } from "./data.js";
import { initGameRender } from "./main.js";
import {GlobalEvent} from "./globalevent.js";

//will be usefull till the game ends
const globalState = initGame();
let keySquareMapper = {};

globalState.flat().forEach((square)=>{
    keySquareMapper[square.id] = square;
})

initGameRender(globalState);

GlobalEvent();

export { globalState,keySquareMapper };



