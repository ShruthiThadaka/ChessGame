import { ROOT_DIV } from "./constant.js";
import { globalState, keySquareMapper } from "../index.js";
import { renderHighlight } from "./main.js";
import { clearHightlight } from "./main.js";
import { selfHighlight } from "./main.js";
// import { clearPreviousSelfHighlight } from "./main.js";
import { moveElement } from "./main.js";
import { checkPieceofOpponentOnElement } from "./commonhelper.js";
import { globalStateRender } from "./main.js";
import { checkSquareCaptureId } from "./commonhelper.js";
import { giveBishopHighlightIds } from "./commonhelper.js";

//highlighted or not = state
let hightlight_state = false;

//current self highlighted piece square state
let selfHighlightState = null;

//in move state or not
let moveState = null;

// globalStateRender();

//local function that will clear highlight with state
function clearHighlightLocal() {
    clearHightlight();
    hightlight_state = false;
}

//move piece from x-square to y-square
function movePiecFromXToY(from, to) {
    to.piece = from.piece;
    from.piece = null;
    globalStateRender();
}

//white pawn event
function whitePawnClick(square) {
    //clear board for any previous highlight

    const piece = square.piece;

    //if clicked on same element twice
    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }
    if (square.captureHighlight) {
        // movePiecFromXToY(selfHighlightState,piece)
        // console.log(piece)
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    };
    //clear all highlights
    clearPreviousSelfHighlight(selfHighlightState)
    clearHighlightLocal();

    //highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    //add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    //on initial position movement
    if (current_pos[1] == '2') {
        let highlightSquareIds = [
            `${current_pos[0]}${Number(current_pos[1]) + 1}`,
            `${current_pos[0]}${Number(current_pos[1]) + 2}`];

        highlightSquareIds = checkSquareCaptureId(highlightSquareIds)
        highlightSquareIds.forEach((hightlight) => {
            // globalState.forEach(row => {
            //     row.forEach((element) => {
            //         if (element.id == hightlight) {
            //            element.highlight = true;
            //         }
            //     })
            // })
            const element = keySquareMapper[hightlight];
            element.highlight = true;
        })

        globalStateRender();
    }

    else {
        const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1]) + 1}`;
        const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1]) + 1}`;

        let captureIds = [col1, col2];
        // captureIds = checkSquareCaptureId(captureIds)

        let highlightSquareIds = [
            `${current_pos[0]}${Number(current_pos[1]) + 1}`,
        ];

        captureIds.forEach((element) => {
            checkPieceofOpponentOnElement(element, "white")
        })

        highlightSquareIds.forEach((hightlight) => {
            const element = keySquareMapper[hightlight];
            element.highlight = true;
        })
        globalStateRender();
    }
    // console.log(globalState)
}

//white bishop event 
function whiteBishopClick(square) {
    //clear board for any previous highlight

    const piece = square.piece;

    //if clicked on same element twice
    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }
    if (square.captureHighlight) {
        // movePiecFromXToY(selfHighlightState,piece)
        // console.log(piece)
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    };
    //clear all highlights
    clearPreviousSelfHighlight(selfHighlightState)
    clearHighlightLocal();

    //highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    //add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let highlightSquareIds = giveBishopHighlightIds(current_pos);

    const {bottomLeft,topLeft,bottomRight,topRight} = highlightSquareIds;
    
    highlightSquareIds = checkSquareCaptureId(highlightSquareIds);

    highlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    })

    highlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    })
    const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1]) + 1}`;
    const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1]) + 1}`;

    let captureIds = [col1, col2];
    // captureIds = checkSquareCaptureId(captureIds)

    highlightSquareIds = [
        `${current_pos[0]}${Number(current_pos[1]) + 1}`,
    ];

    captureIds.forEach((element) => {
        checkPieceofOpponentOnElement(element, "white")
    })

    highlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    })
    globalStateRender();

    
}
    // console.log(globalState)


//black pawn function
function blackPawnClick(square) {

    //clear board for any previous highlight
    const piece = square.piece;


    //if clicked on same element twice
    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }
    if (square.captureHighlight) {
        // movePiecFromXToY(selfHighlightState,piece)
        // console.log(piece)
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    };
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    //highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    //add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    //on initial position movement
    if (current_pos[1] == '7') {
        let highlightSquareIds = [
            `${current_pos[0]}${Number(current_pos[1]) - 1}`,
            `${current_pos[0]}${Number(current_pos[1]) - 2}`];

        highlightSquareIds = checkSquareCaptureId(highlightSquareIds)

        highlightSquareIds.forEach((hightlight) => {
            const element = keySquareMapper[hightlight];
            element.highlight = true;
        })
        highlightSquareIds.forEach((hightlight) => {
            const element = keySquareMapper[hightlight];
            element.highlight = true;
        })

        globalStateRender();
    }

    else {
        const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1]) - 1}`;
        const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1]) - 1}`;

        let captureIds = [col1, col2];
        // captureIds = checkSquareCaptureId(captureIds)


        // let highlightSquareIds = [
        //     `${current_pos[0]}${Number(current_pos[1]) - 1}`,
        // ];

        captureIds.forEach((element) => {
            checkPieceofOpponentOnElement(element, "black")
        })

        // highlightSquareIds.forEach((hightlight) => {
        //     const element = keySquareMapper[hightlight];
        //     element.highlight = true;
        // })
        globalStateRender();
    }
    // console.log(globalState)
}
function clearPreviousSelfHighlight(piece) {
    if (piece) {
        document
            .getElementById(piece.current_position)
            .classList.remove("highlightYellow");
        // selfHighlight = false;
        // selfHighlightState = null;
    }
}
//black pawn event
// function blackPawnClick({ piece }) {

//     // if(hightlight_state) {
//     //     movePiecFromXToY(selfHighlightState,piece)
//     //     return;
//     // };

//     //if clicked on same element twice
//     if (piece == selfHighlightState) {
//         clearPreviousSelfHighlight(selfHighlightState);
//         selfHighlightState = null;
//         clearHighlightLocal();
//         return;
//     }

//     selfHighlight(piece);
//     hightlight_state = true;
//     selfHighlightState = piece;

//     //add piece as move state
//     moveState = piece;

//     const current_pos = piece.current_position;
//     const flatArray = globalState.flat();

//     //on initial position movement
//     if (current_pos[1] == '7') {
//         const highlightSquareIds = [
//             `${current_pos[0]}${Number(current_pos[1]) - 1}`,
//             `${current_pos[0]}${Number(current_pos[1]) - 2}`];

//         //clear board for any previous highlight
//         clearHighlightLocal();

//         highlightSquareIds.forEach((hightlight) => {
//             globalState.forEach(row => {
//                 row.forEach((element) => {
//                     if (element.id == hightlight) {
//                         element.highlight = true;
//                     }
//                 })
//             })
//         })
//         globalStateRender()
//     }
//     else {
//         const highlightSquareIds = [
//             `${current_pos[0]}${Number(current_pos[1]) - 1}`,
//         ];

//         //clear board for any previous highlight
//         clearHighlightLocal();

//         highlightSquareIds.forEach((hightlight) => {
//             globalState.forEach(row => {
//                 row.forEach((element) => {
//                     if (element.id == hightlight) {
//                         element.highlight = true;;
//                     }
//                 })
//             })
//         })
//     }
//     globalStateRender();
//     // console.log(globalState)
// }

function GlobalEvent() {
    ROOT_DIV.addEventListener("click", function (event) {
        if (event.target.localName === "img") {
            const clickedId = event.target.parentNode.id;  //to get id of the dquare that we click
            // const flatArray = globalState.flat();
            // const square = flatArray.find((el) => el.id == clickedId);
            const square = keySquareMapper[clickedId];
            //     // console.log(`Clicked on ${clickedId} , ${square.piece.piece_name}`)
            if (square.piece.piece_name == "white_pawn") {
                whitePawnClick(square);
            } else if (square.piece.piece_name == "black_pawn") {
                blackPawnClick(square);
            } else if (square.piece.piece_name == "white_bishop") {
                whiteBishopClick(square);
            }
        }
        else {
            // selfHighlightState = null;
            const childElementsOfclickedEl = Array.from(event.target.childNodes);
            if (childElementsOfclickedEl.length == 1 ||
                event.target.localName == "span"
            ) {
                if (event.target.localName == "span") {
                    clearPreviousSelfHighlight(selfHighlightState);
                    const id = event.target.parentNode.id;
                    moveElement(moveState, id);
                    moveState = null;
                } else {
                    clearPreviousSelfHighlight(selfHighlightState);
                    const id = event.target.id;
                    moveElement(moveState, id);
                    moveState = null;
                }
            } else {

                //clear highlights
                clearHighlightLocal();
                clearPreviousSelfHighlight(selfHighlightState);
            }
        }
    })
}

export { GlobalEvent, movePiecFromXToY };




