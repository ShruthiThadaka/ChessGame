import { ROOT_DIV } from "./constant.js";
import { globalState, keySquareMapper } from "./script.js";
import { renderHighlight } from "./main.js";
import { clearHightlight } from "./main.js";
import { selfHighlight } from "./main.js";
import { globalStateRender } from "./main.js";
import { checkSquareCaptureId } from "./commonhelper.js";
import { giveBishopHighlightIds } from "./commonhelper.js";
import { checkWhetherPieceExistsOrNot } from "./commonhelper.js";
import { giveRookHighlightIds } from "./commonhelper.js";
import { giveKnightHighlightIds } from "./commonhelper.js";
import { giveQueenHighlightIds } from "./commonhelper.js";
import { giveKingHighlightIds } from "./commonhelper.js";
import { checkPieceofOpponentOnElement } from "./commonhelper.js";
import { globalPiece } from "./main.js";
import { giveKnightCaptureIds } from "./commonhelper.js";
import { giveKingCaptureIds } from "./commonhelper.js";
import { giveBishopCaptureIds } from "./commonhelper.js";
import { giveRookCaptureIds } from "./commonhelper.js";
import { giveQueenCaptureIds } from "./commonhelper.js";
import pawnPromotion from "./modalCreator.js";
// import logMoves from "./logging.js";


//highlighted or not = state
let hightlight_state = false;
let inTurn = "white";

function changeTurn() {
    inTurn = inTurn === "white" ? "black" : "white";
}

function checkForCheck() {
    if (inTurn === "black") {
        const whiteKingCurrentPosition = globalPiece.white_king.current_position;
        const knight_1 = globalPiece.black_knight_1.current_position;
        const knight_2 = globalPiece.black_knight_2.current_position;
        const king = globalPiece.black_king.current_position;
        const bishop_1 = globalPiece.black_bishop_1.current_position;
        const bishop_2 = globalPiece.black_bishop_2.current_position;
        const rook_1 = globalPiece.black_rook_1.current_position;
        const rook_2 = globalPiece.black_rook_2.current_position;
        const queen = globalPiece.black_queen.current_position;

        let finalCheckList = [];
        finalCheckList.push(giveKnightCaptureIds(knight_1, inTurn));
        finalCheckList.push(giveKnightCaptureIds(knight_2, inTurn));
        finalCheckList.push(giveKingCaptureIds(king, inTurn));
        finalCheckList.push(giveBishopCaptureIds(bishop_1, inTurn));
        finalCheckList.push(giveBishopCaptureIds(bishop_2, inTurn));
        finalCheckList.push(giveRookCaptureIds(rook_1, inTurn));
        finalCheckList.push(giveRookCaptureIds(rook_2, inTurn));
        finalCheckList.push(giveQueenCaptureIds(queen, inTurn));

        finalCheckList = finalCheckList.flat();
        const checkOrNot = finalCheckList.find(
            (element) => element === whiteKingCurrentPosition
        );

        if (checkOrNot) {
            alert("wite")
        }
    } else {
        const blackKingCurrentPosition = globalPiece.black_king.current_position;
        const knight_1 = globalPiece.white_knight_1.current_position;
        const knight_2 = globalPiece.white_knight_2.current_position;
        const king = globalPiece.white_king.current_position;
        const bishop_1 = globalPiece.white_bishop_1.current_position;
        const bishop_2 = globalPiece.white_bishop_2.current_position;
        const rook_1 = globalPiece.white_rook_1.current_position;
        const rook_2 = globalPiece.white_rook_2.current_position;
        const queen = globalPiece.white_queen.current_position;

        let finalCheckList = [];
        finalCheckList.push(giveKnightCaptureIds(knight_1, inTurn));
        finalCheckList.push(giveKnightCaptureIds(knight_2, inTurn));
        finalCheckList.push(giveKingCaptureIds(king, inTurn));
        finalCheckList.push(giveBishopCaptureIds(bishop_1, inTurn));
        finalCheckList.push(giveBishopCaptureIds(bishop_2, inTurn));
        finalCheckList.push(giveRookCaptureIds(rook_1, inTurn));
        finalCheckList.push(giveRookCaptureIds(rook_2, inTurn));
        finalCheckList.push(giveQueenCaptureIds(queen, inTurn));

        finalCheckList = finalCheckList.flat();
        const checkOrNot = finalCheckList.find(
            (element) => element === blackKingCurrentPosition
        );

        if (checkOrNot) {
            alert("black")
        }
    }
}

function captureInTurn(square) {
    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }
    if (square.captureHighlight) {
        // movePiecFromXToY
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    };
    return;
}

function checkForPawnPromotion(piece, id) {

    if (inTurn === "white") {
        if (piece?.piece_name?.toLowerCase()?.includes("pawn") && id?.includes("8")) {
            return true;
        } else {
            return false;
        }
    } else {
        if (piece?.piece_name?.toLowerCase()?.includes("pawn") && id?.includes("1")) {
            return true;
        } else {
            return false;
        }
    }
}

function test(piece, id) {
    const realPiece = piece(id)
    const currentSquare = keySquareMapper[id];
    piece.current_position = id;
    currentSquare.piece = realPiece;
    const image = document.createElement("img");
    image.src = realPiece.img;
    image.classList.add("piece");
    const currentElement = document.getElementById(id);
    currentElement.innerHTML = "";
    currentElement.append(image)
}

//move element to square with id
function moveElement(piece, id, castle) {
    const pawnIsPromoted = checkForPawnPromotion(piece, id);

    if (piece.piece_name.includes("king") || piece.piece_name.includes("rook")) {
        piece.move = true;

        if (
            piece.piece_name.includes("king") && 
            piece.piece_name.includes("black")
        ) {
            if (id === 'c8' || id === 'g8') {
                let rook = keySquareMapper[id === 'c8' ? 'a8' : 'h8']
                moveElement(rook.piece, id === 'c8' ? 'd8' : 'f8',true)
            }
        }

        if (
            piece.piece_name.includes("king") && 
            piece.piece_name.includes("white")
        ) {
            if (id === 'c1' || id === 'g1') {
                let rook = keySquareMapper[id === 'c1' ? 'a1' : 'h1']
                moveElement(rook.piece, id === 'c1' ? 'd1' : 'f1',true)
            }
        }
    }

    // logMoves({from: piece.current_position,to:id,piece:piece.piece_name},inTurn)
    // pawnPromotion("white");

    const flatData = globalState.flat();
    // console.log(piece)
    flatData.forEach((el) => {
        if (el.id == piece.current_position) {
            delete el.piece;
        }
        if (el.id == id) {
            if (el.piece) {
                el.piece.current_position = null;
            }
            el.piece = piece;
        }
    });
    clearHightlight();
    const previousPiece = document.getElementById(piece.current_position);
    piece.current_position = null;
    previousPiece?.classList?.remove("highlightYellow");
    const currentPiece = document.getElementById(id);
    currentPiece.innerHTML = previousPiece?.innerHTML;
    if (previousPiece) previousPiece.innerHTML = "";
    piece.current_position = id;
    if (pawnIsPromoted) {
        pawnPromotion(inTurn, test, id)
    }
    checkForCheck();
    if(!castle){
        changeTurn();
    }

    // globalStateRender();
}

//current self highlighted piece square state
let selfHighlightState = null;

//in move state or not
let moveState = null;


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

// white pawn event
function whitePawnClick(square) {
    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        // movePieceFromXToY();
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // clear all highlights
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = null;

    // on initial position movement
    if (current_pos[1] == "2") {
        hightlightSquareIds = [
            `${current_pos[0]}${Number(current_pos[1]) + 1}`,
            `${current_pos[0]}${Number(current_pos[1]) + 2}`,
        ];
    } else {
        hightlightSquareIds = [`${current_pos[0]}${Number(current_pos[1]) + 1}`];
    }

    hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    // capture id logic
    const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1]) + 1
        }`;
    const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1]) + 1
        }`;

    let captureIds = [col1, col2];
    // captureIds = checkSquareCaptureId(captureIds);

    captureIds.forEach((element) => {
        checkPieceofOpponentOnElement(element, "white");
    });

    globalStateRender();
}

// white bishop event
function whiteBishopClick(square) {
    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        // movePieceFromXToY();
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // clear all highlights
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = giveBishopHighlightIds(current_pos);
    let temp = [];

    const { bottomLeft, topLeft, bottomRight, topRight } = hightlightSquareIds;

    let result = [];
    result.push(checkSquareCaptureId(bottomLeft));
    result.push(checkSquareCaptureId(topLeft));
    result.push(checkSquareCaptureId(bottomRight));
    result.push(checkSquareCaptureId(topRight));

    // insert into temp
    temp.push(bottomLeft);
    temp.push(topLeft);
    temp.push(bottomRight);
    temp.push(topRight);

    // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    hightlightSquareIds = result.flat();

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
        const arr = temp[index];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];

            let checkPieceResult = checkWhetherPieceExistsOrNot(element);
            if (
                checkPieceResult &&
                checkPieceResult.piece &&
                checkPieceResult.piece.piece_name.toLowerCase().includes("white")
            ) {
                break;
            }

            if (checkPieceofOpponentOnElement(element, "white")) {
                break;
            }
        }
    }

    globalStateRender();
}

//black bishop event
function blackBishopClick(square) {
    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        // movePieceFromXToY();
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // clear all highlights
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = giveBishopHighlightIds(current_pos);
    let temp = [];

    const { bottomLeft, topLeft, bottomRight, topRight } = hightlightSquareIds;

    let result = [];
    result.push(checkSquareCaptureId(bottomLeft));
    result.push(checkSquareCaptureId(topLeft));
    result.push(checkSquareCaptureId(bottomRight));
    result.push(checkSquareCaptureId(topRight));

    // insert into temp
    temp.push(bottomLeft);
    temp.push(topLeft);
    temp.push(bottomRight);
    temp.push(topRight);

    // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    hightlightSquareIds = result.flat();

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
        const arr = temp[index];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];

            let checkPieceResult = checkWhetherPieceExistsOrNot(element);
            if (
                checkPieceResult &&
                checkPieceResult.piece &&
                checkPieceResult.piece.piece_name.toLowerCase().includes("black")
            ) {
                break;
            }

            if (checkPieceofOpponentOnElement(element, "black")) {
                break;
            }
        }
    }


    globalStateRender();
}

//black rrok event
function blackRookClick(square) {
    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        // movePieceFromXToY();
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // clear all highlights
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = giveRookHighlightIds(current_pos);
    let temp = [];

    const { bottom, top, right, left } = hightlightSquareIds;

    let result = [];
    result.push(checkSquareCaptureId(bottom));
    result.push(checkSquareCaptureId(top));
    result.push(checkSquareCaptureId(right));
    result.push(checkSquareCaptureId(left));

    // insert into temp
    temp.push(bottom);
    temp.push(top);
    temp.push(right);
    temp.push(left);

    // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    hightlightSquareIds = result.flat();

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
        const arr = temp[index];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];

            let checkPieceResult = checkWhetherPieceExistsOrNot(element);
            if (
                checkPieceResult &&
                checkPieceResult.piece &&
                checkPieceResult.piece.piece_name.toLowerCase().includes("black")
            ) {
                break;
            }

            if (checkPieceofOpponentOnElement(element, "black")) {
                break;
            }
        }
    }
    globalStateRender();
}

//white rook event
function whiteRookClick(square) {
    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        // movePieceFromXToY();
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // clear all highlights
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = giveRookHighlightIds(current_pos);
    let temp = [];

    const { bottom, top, right, left } = hightlightSquareIds;

    let result = [];
    result.push(checkSquareCaptureId(bottom));
    result.push(checkSquareCaptureId(top));
    result.push(checkSquareCaptureId(right));
    result.push(checkSquareCaptureId(left));

    // insert into temp
    temp.push(bottom);
    temp.push(top);
    temp.push(right);
    temp.push(left);

    // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    hightlightSquareIds = result.flat();

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
        const arr = temp[index];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];

            let checkPieceResult = checkWhetherPieceExistsOrNot(element);
            if (
                checkPieceResult &&
                checkPieceResult.piece &&
                checkPieceResult.piece.piece_name.toLowerCase().includes("white")
            ) {
                break;
            }

            if (checkPieceofOpponentOnElement(element, "white")) {
                break;
            }
        }
    }


    globalStateRender();
}

//white knight event
function whiteKnightClick(square) {
    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        // movePieceFromXToY();
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // clear all highlights
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = giveKnightHighlightIds(current_pos);
    // let temp = [];

    // const { bottom, top, right, left } = hightlightSquareIds;

    // let result = [];
    // result.push(checkSquareCaptureId(bottom));
    // result.push(checkSquareCaptureId(top));
    // result.push(checkSquareCaptureId(right));
    // result.push(checkSquareCaptureId(left));

    // // insert into temp
    // temp.push(bottom);
    // temp.push(top);
    // temp.push(right);
    // temp.push(left);

    // // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    // hightlightSquareIds = result.flat();

    // hightlightSquareIds.forEach((hightlight) => {
    //     const element = keySquareMapper[hightlight];
    //     element.highlight = true;
    // });

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    let captureIds = [];

    // for (let index = 0; index < temp.length; index++) {
    //     const arr = temp[index];

    //     for (let j = 0; j < arr.length; j++) {
    //         const element = arr[j];

    //         let checkPieceResult = checkWhetherPieceExistsOrNot(element);
    //         if (
    //           checkPieceResult &&
    //           checkPieceResult.piece &&
    //           checkPieceResult.piece.piece_name.toLowerCase().includes("white")
    //         ) {
    //           break;
    //         }

    //         if (checkPieceofOpponentOnElement(element, "white")) {
    //           break;
    //         }
    //     }
    // }

    hightlightSquareIds.forEach((element) => {
        checkPieceofOpponentOnElement(element, "white");
    });


    globalStateRender();
}

//black knight event
function blackKnightClick(square) {
    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        // movePieceFromXToY();
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // clear all highlights
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = giveKnightHighlightIds(current_pos);
    // let temp = [];

    // const { bottom, top, right, left } = hightlightSquareIds;

    // let result = [];
    // result.push(checkSquareCaptureId(bottom));
    // result.push(checkSquareCaptureId(top));
    // result.push(checkSquareCaptureId(right));
    // result.push(checkSquareCaptureId(left));

    // // insert into temp
    // temp.push(bottom);
    // temp.push(top);
    // temp.push(right);
    // temp.push(left);

    // // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    // hightlightSquareIds = result.flat();

    // hightlightSquareIds.forEach((hightlight) => {
    //     const element = keySquareMapper[hightlight];
    //     element.highlight = true;
    // });

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    let captureIds = [];

    // for (let index = 0; index < temp.length; index++) {
    //     const arr = temp[index];

    //     for (let j = 0; j < arr.length; j++) {
    //         const element = arr[j];

    //         let checkPieceResult = checkWhetherPieceExistsOrNot(element);
    //         if (
    //           checkPieceResult &&
    //           checkPieceResult.piece &&
    //           checkPieceResult.piece.piece_name.toLowerCase().includes("white")
    //         ) {
    //           break;
    //         }

    //         if (checkPieceofOpponentOnElement(element, "white")) {
    //           break;
    //         }
    //     }
    // }

    hightlightSquareIds.forEach((element) => {
        checkPieceofOpponentOnElement(element, "black");
    });


    globalStateRender();
}

// white queen event
function whiteQueenClick(square) {
    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        // movePieceFromXToY();
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // clear all highlights
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = giveQueenHighlightIds(current_pos);
    let temp = [];

    const { bottomLeft, topLeft, bottomRight, topRight, top, right, bottom, left } = hightlightSquareIds;

    let result = [];
    result.push(checkSquareCaptureId(bottomLeft));
    result.push(checkSquareCaptureId(topLeft));
    result.push(checkSquareCaptureId(bottomRight));
    result.push(checkSquareCaptureId(topRight));
    result.push(checkSquareCaptureId(top));
    result.push(checkSquareCaptureId(right));
    result.push(checkSquareCaptureId(bottom));
    result.push(checkSquareCaptureId(left));


    // insert into temp
    temp.push(bottomLeft);
    temp.push(topLeft);
    temp.push(bottomRight);
    temp.push(topRight);
    temp.push(top);
    temp.push(right);
    temp.push(bottom);
    temp.push(left);

    // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    hightlightSquareIds = result.flat();

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
        const arr = temp[index];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];

            let checkPieceResult = checkWhetherPieceExistsOrNot(element);
            if (
                checkPieceResult &&
                checkPieceResult.piece &&
                checkPieceResult.piece.piece_name.toLowerCase().includes("white")
            ) {
                break;
            }

            if (checkPieceofOpponentOnElement(element, "white")) {
                break;
            }
        }
    }

    globalStateRender();
}

// white king event
function whiteKingClick(square) {
    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        // movePieceFromXToY();
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // clear all highlights
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = giveKingHighlightIds(current_pos);
    let temp = [];

    const { bottomLeft, topLeft, bottomRight, topRight, top, right, bottom, left } = hightlightSquareIds;

    let result = [];

    if (!piece.move) {
        const rook1 = globalPiece.white_rook_1;
        const rook2 = globalPiece.white_rook_2;
        if (!rook1.move) {
            const b1 = keySquareMapper['b1'];
            const c1 = keySquareMapper['c1'];
            const d1 = keySquareMapper['d1'];
            if (!b1.piece && !c1.piece && !d1.piece) {
                result.push("c1");
            }
        }
        if (!rook2.move) {
            const f1 = keySquareMapper["f1"];
            const g1 = keySquareMapper["g1"];
            if (!f1.piece && !g1.piece) {
                result.push("g1")
            }
        }
    }

    result.push(checkSquareCaptureId(bottomLeft));
    result.push(checkSquareCaptureId(topLeft));
    result.push(checkSquareCaptureId(bottomRight));
    result.push(checkSquareCaptureId(topRight));
    result.push(checkSquareCaptureId(top));
    result.push(checkSquareCaptureId(right));
    result.push(checkSquareCaptureId(bottom));
    result.push(checkSquareCaptureId(left));


    // insert into temp
    temp.push(bottomLeft);
    temp.push(topLeft);
    temp.push(bottomRight);
    temp.push(topRight);
    temp.push(top);
    temp.push(right);
    temp.push(bottom);
    temp.push(left);

    // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    hightlightSquareIds = result.flat();

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
        const arr = temp[index];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];

            let checkPieceResult = checkWhetherPieceExistsOrNot(element);
            if (
                checkPieceResult &&
                checkPieceResult.piece &&
                checkPieceResult.piece.piece_name.toLowerCase().includes("white")
            ) {
                break;
            }

            if (checkPieceofOpponentOnElement(element, "white")) {
                break;
            }
        }
    }

    globalStateRender();
}

// black king event
function blackKingClick(square) {
    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        // movePieceFromXToY();
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // clear all highlights
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = giveKingHighlightIds(current_pos);
    let temp = [];

    const { bottomLeft, topLeft, bottomRight, topRight, top, right, bottom, left } = hightlightSquareIds;

    let result = [];

    if (!piece.move) {
        const rook1 = globalPiece.black_rook_1;
        const rook2 = globalPiece.black_rook_2;
        if (!rook1.move) {
            const b1 = keySquareMapper['b8'];
            const c1 = keySquareMapper['c8'];
            const d1 = keySquareMapper['d8'];
            if (!b1.piece && !c1.piece && !d1.piece) {
                result.push("c8");
            }
        }
        if (!rook2.move) {
            const f1 = keySquareMapper["f8"];
            const g1 = keySquareMapper["g8"];
            if (!f1.piece && !g1.piece) {
                result.push("g8")
            }
        }
    }

    result.push(checkSquareCaptureId(bottomLeft));
    result.push(checkSquareCaptureId(topLeft));
    result.push(checkSquareCaptureId(bottomRight));
    result.push(checkSquareCaptureId(topRight));
    result.push(checkSquareCaptureId(top));
    result.push(checkSquareCaptureId(right));
    result.push(checkSquareCaptureId(bottom));
    result.push(checkSquareCaptureId(left));


    // insert into temp
    temp.push(bottomLeft);
    temp.push(topLeft);
    temp.push(bottomRight);
    temp.push(topRight);
    temp.push(top);
    temp.push(right);
    temp.push(bottom);
    temp.push(left);

    // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    hightlightSquareIds = result.flat();

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
        const arr = temp[index];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];

            let checkPieceResult = checkWhetherPieceExistsOrNot(element);
            if (
                checkPieceResult &&
                checkPieceResult.piece &&
                checkPieceResult.piece.piece_name.toLowerCase().includes("black")
            ) {
                break;
            }

            if (checkPieceofOpponentOnElement(element, "black")) {
                break;
            }
        }
    }

    globalStateRender();
}

// black queen event
function blackQueenClick(square) {
    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        // movePieceFromXToY();
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // clear all highlights
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = giveQueenHighlightIds(current_pos);
    let temp = [];

    const { bottomLeft, topLeft, bottomRight, topRight, top, right, bottom, left } = hightlightSquareIds;

    let result = [];
    result.push(checkSquareCaptureId(bottomLeft));
    result.push(checkSquareCaptureId(topLeft));
    result.push(checkSquareCaptureId(bottomRight));
    result.push(checkSquareCaptureId(topRight));
    result.push(checkSquareCaptureId(top));
    result.push(checkSquareCaptureId(right));
    result.push(checkSquareCaptureId(bottom));
    result.push(checkSquareCaptureId(left));


    // insert into temp
    temp.push(bottomLeft);
    temp.push(topLeft);
    temp.push(bottomRight);
    temp.push(topRight);
    temp.push(top);
    temp.push(right);
    temp.push(bottom);
    temp.push(left);

    // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    hightlightSquareIds = result.flat();

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
        const arr = temp[index];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];

            let checkPieceResult = checkWhetherPieceExistsOrNot(element);
            if (
                checkPieceResult &&
                checkPieceResult.piece &&
                checkPieceResult.piece.piece_name.toLowerCase().includes("black")
            ) {
                break;
            }

            if (checkPieceofOpponentOnElement(element, "black")) {
                break;
            }
        }
    }

    globalStateRender();
}

//black pawn function
function blackPawnClick(square) {
    // clear board for any previous highlight

    const piece = square.piece;

    if (piece == selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        // movePieceFromXToY();
        moveElement(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // highlighting logic
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // add piece as move state
    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = null;

    // on initial position movement
    if (current_pos[1] == "7") {
        hightlightSquareIds = [
            `${current_pos[0]}${Number(current_pos[1]) - 1}`,
            `${current_pos[0]}${Number(current_pos[1]) - 2}`,
        ];
    } else {
        hightlightSquareIds = [`${current_pos[0]}${Number(current_pos[1]) - 1}`];
    }

    hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    // capture logic id
    const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1]) - 1
        }`;
    const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1]) - 1
        }`;

    let captureIds = [col1, col2];
    // captureIds = checkSquareCaptureId(captureIds);

    captureIds.forEach((element) => {
        checkPieceofOpponentOnElement(element, "black");
    });

    globalStateRender();
}
function clearPreviousSelfHighlight(piece) {
    if (piece) {
        document
            .getElementById(piece.current_position)
            .classList.remove("highlightYellow");
    }
}


function GlobalEvent() {
    ROOT_DIV.addEventListener("click", function (event) {
        if (event.target.localName === "img") {
            const clickedId = event.target.parentNode.id;  //to get id of the dquare that we click
            const square = keySquareMapper[clickedId];

            if ((square.piece.piece_name.includes("white") && inTurn === "black")
                || (square.piece.piece_name.includes("black") && inTurn === "white")) {
                captureInTurn(square);
                return;
            }

            if (square.piece.piece_name == "white_pawn") {
                if (inTurn == "white")
                    whitePawnClick(square);
            } else if (square.piece.piece_name == "black_pawn") {
                if (inTurn == "black")
                    blackPawnClick(square);
            } else if (square.piece.piece_name == "white_bishop") {
                if (inTurn == "white")
                    whiteBishopClick(square);
            } else if (square.piece.piece_name == "black_bishop") {
                if (inTurn == "black")
                    blackBishopClick(square);
            } else if (square.piece.piece_name == "black_rook") {
                if (inTurn == "black")
                    blackRookClick(square);
            } else if (square.piece.piece_name == "white_rook") {
                if (inTurn == "white")
                    whiteRookClick(square);
            } else if (square.piece.piece_name == "white_knight") {
                if (inTurn == "white")
                    whiteKnightClick(square);
            } else if (square.piece.piece_name == "black_knight") {
                if (inTurn == "black")
                    blackKnightClick(square);
            } else if (square.piece.piece_name == "white_queen") {
                if (inTurn == "white")
                    whiteQueenClick(square);
            } else if (square.piece.piece_name == "black_queen") {
                if (inTurn == "black")
                    blackQueenClick(square);
            } else if (square.piece.piece_name == "white_king") {
                if (inTurn == "white")
                    whiteKingClick(square);
            } else if (square.piece.piece_name == "black_king") {
                if (inTurn == "black")
                    blackKingClick(square);
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




