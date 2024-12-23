import { ROOT_DIV } from "./constant.js";
import * as piece from "./data/pieces.js";
import { globalState } from "./script.js";
import { movePiecFromXToY } from "./globalevent.js";

//funnction globalstate render(this function is useful to render pieces from globalstatedata)=>use when updating globalstate
function globalStateRender(){

    globalState.forEach((row)=>{
        row.forEach((element)=>{

            if(element.highlight){
                const highlightSpan = document.createElement("span");
                highlightSpan.classList.add("highlight");
                document.getElementById(element.id).appendChild(highlightSpan);
            }
            else if(element.highlight === null){
                const el= document.getElementById(element.id);
                const highlights = Array.from(el.getElementsByTagName("span"));
                highlights.forEach((element)=>{
                    el.removeChild(element);
                })
            }
        })
    })
}

//move element to square with id
function moveElement(piece, id) {
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
    // globalStateRender();
}



function selfHighlight(piece) {
    document
    .getElementById(piece.current_position)
    .classList.add("highlightYellow");
}

// // use when you want to render pieces on board
function pieceRender(data) {
    data.forEach(row => {
        row.forEach(square => {
            //if square has piece
            if (square.piece) {
                const squareEl = document.getElementById(square.id);
                //create piece
                const piece = document.createElement("img");
                piece.src = square.piece.img;
                piece.classList.add("piece")

                //insert piece into square element
                squareEl.appendChild(piece)
            }
        })
    })
}

// //this function calls only when the game starts and only for one time . use when you want to render board for first time game starts
function initGameRender(data) {
    data.forEach((element) => {
        const rowEl = document.createElement("div");
        element.forEach((square) => {
            const squareDiv = document.createElement("div");
            squareDiv.id = square.id;
            squareDiv.classList.add(square.color, "square");

            //render black pawn
            if (square.id[1] == 7) {
                square.piece = piece.blackPawn(square.id);
            }

            //render black rook
            if (square.id == "h8" || square.id == "a8") {
                square.piece = piece.blackRook(square.id);
            }

            //render black knight
            if (square.id == "b8" || square.id == "g8") {
                square.piece = piece.blackKnight(square.id);
            }

            //render black bishop
            if (square.id == "c8" || square.id == "f8") {
                square.piece = piece.blackBishop(square.id);
            }

            //render black Queen
            if (square.id == "d8") {
                square.piece = piece.blackQueen(square.id);
            }

            //render black King
            if (square.id == "e8") {
                square.piece = piece.blackKing(square.id);
            }

            //render white pawn
            if (square.id[1] == 2) {
                square.piece = piece.whitePawn(square.id);
            }

            //render white Queen
            if (square.id == "d1") {
                square.piece = piece.whiteQueen(square.id);
            }

            //render white king
            if (square.id == "e1") {
                square.piece = piece.whiteKing(square.id);
            }

            //render white rook
            if (square.id == "a1" || square.id == "h1") {
                square.piece = piece.whiteRook(square.id);
            }

            //render white knight
            if (square.id == "b1" || square.id == "g1") {
                square.piece = piece.whiteKnight(square.id);
            }

            //render white bishop
            if (square.id == "c1" || square.id == "f1") {
                square.piece = piece.whiteBishop(square.id);
            }
            rowEl.appendChild(squareDiv)
        })

        rowEl.classList.add("squareRow");
        ROOT_DIV.appendChild(rowEl);
    });
    pieceRender(data)
}

//render highlight circle
function renderHighlight(squareId) {
    const highlightSpan = document.createElement("span");
    highlightSpan.classList.add("highlight");
    document.getElementById(squareId).appendChild(highlightSpan);

}

//clear all highlights from the board
function clearHightlight(){

    const flatData = globalState.flat();
   flatData.forEach((el)=>{
    if(el.clearHightlight){
        document.getElementById(el,id).classList.remove("captureColor");
        el.clearHightlight = false;
    }

    if(el.highlight){
       el.highlight = null;
    }
    globalStateRender();
   })
}

export { initGameRender,renderHighlight,clearHightlight,selfHighlight,moveElement,globalStateRender };



