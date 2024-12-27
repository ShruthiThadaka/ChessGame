import { globalState } from "./script.js";
import { keySquareMapper } from "./script.js";

//function to check if piece exists of opponent
function checkPieceofOpponentOnElement(id, color) {
  const opponentColor = color === "white" ? "black" : "white";

  const element = keySquareMapper[id];

  if (!element) return false;

  if (element.piece && element.piece.piece_name.includes(opponentColor)) {
    const el = document.getElementById(id);
    el.classList.add("captureColor");
    element.captureHighlight = true;
    return true;
  }

  return false;
}

function checkPieceOfOpponentOnElementNoDom(id, color) {
  const opponentColor = color === "white" ? "black" : "white";

  const element = keySquareMapper[id];

  if (!element) return false;

  if (element.piece && element.piece.piece_name.includes(opponentColor)) {
    return true;
  }

  return false;
}

//function to check whether piece exists or not by square id
function checkWhetherPieceExistsOrNot(squareId) {
  const square = keySquareMapper[squareId];

  if (square.piece) {
    return square;
  } else {
    return false;
  }
}
// function to check capture id square
function checkSquareCaptureId(array) {
  let returnArray = [];

  for (let index = 0; index < array.length; index++) {
    const squareId = array[index];
    const square = keySquareMapper[squareId];

    if (square.piece) {
      break;
    }
    returnArray.push(squareId);
  }

  return returnArray;
}

// function to give highlight ids for bishop
function giveBishopHighlightIds(id) {
  let finalReturnArray = [];

  // will give top left id
  function topLeft(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "a" && num != 8) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  // find bottom left ids
  function bottomLeft(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "a" && num != 1) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  // find top right ids
  function topRight(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "h" && num != 8) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  // find bottom right ids
  function bottomRight(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "h" && num != 1) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }
  return {
    topLeft: topLeft(id),
    bottomLeft: bottomLeft(id),
    topRight: topRight(id),
    bottomRight: bottomRight(id),
  };
}

function giveBishopCaptureIds(id) {
  let result = giveRookHighlightIds(id);
  result = Object.values(result).flat();
  result = result.filter(element => {
    if(checkPieceOfOpponentOnElementNoDom(element,"black")){
      return true
    }
  })
  return result;
}

//function to give highlight ids for rook
function giveRookCaptureIds(id) {
  let result = giveBishopHighlightIds(id);
  result = Object.values(result).flat();
  result = result.filter(element => {
    if(checkPieceOfOpponentOnElementNoDom(element,"black")){
      return true
    }
  })
  return result;
}

function giveRookHighlightIds(id) {
  let finalReturnArray = [];

  // will give top left id
  function top(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (num != 8) {
      // alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  // find bottom left ids
  function bottom(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (num != 1) {
      // alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  // find top right ids
  function right(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "h") {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      // num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  // find bottom right ids
  function left(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "a") {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      // num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  return {
    top: top(id),
    bottom: bottom(id),
    right: right(id),
    left: left(id),
  };
}
//function to give highlight ids for knight
function giveKnightHighlightIds(id) {
  if(!id){
    return;
  }
  function left() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    let temp = 0;

    while (alpha != "a") {
      if (temp == 2) {
        break;
      }
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    if (resultArray.length == 2) {

      let finalReturnArray = [];

      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);
      if (number < 8) {
        finalReturnArray.push(`${alpha}${number + 1}`)
      }
      if (number > 1) {
        finalReturnArray.push(`${alpha}${number - 1}`)
      }
      return finalReturnArray;
      // resultArray.push(`${Number(lastElement[1])}`)
    } else {
      return [];
    }
  }

  function top() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    let temp = 0;

    while (num != "8") {
      if (temp == 2) {
        break;
      }
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    if (resultArray.length == 2) {

      let finalReturnArray = [];

      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);
      if (alpha != "h") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 1);
        finalReturnArray.push(`${alpha2}${number}`)
      }
      if (alpha != "a") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 1);
        finalReturnArray.push(`${alpha2}${number}`)      
      }
      return finalReturnArray;
      // resultArray.push(`${Number(lastElement[1])}`)
    } else {
      return [];
    }
  }
  function bottom() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    let temp = 0;

    while (num != "1") {
      if (temp == 2) {
        break;
      }
      num = num - 1;
      // alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    if (resultArray.length == 2) {

      let finalReturnArray = [];

      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);
      if (alpha != "h") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 1);
        finalReturnArray.push(`${alpha2}${number}`)
      }
      if (alpha != "a") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 1);
        finalReturnArray.push(`${alpha2}${number}`)      
      }
      return finalReturnArray;
      // resultArray.push(`${Number(lastElement[1])}`)
    } else {
      return [];
    }
  }
  function right() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    let temp = 0;

    while (alpha != "h") {
      if (temp == 2) {
        break;
      }
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    if (resultArray.length == 2) {

      let finalReturnArray = [];

      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);
      if (number < 8) {
        finalReturnArray.push(`${alpha}${number + 1}`)
      }
      if (number > 1) {
        finalReturnArray.push(`${alpha}${number - 1}`)
      }
      return finalReturnArray;
      // resultArray.push(`${Number(lastElement[1])}`)
    } else {
      return [];
    }
  }

  return [...top(),...right(),...bottom(),...left()]
}

function giveKnightCaptureIds(id) {
  if(!id){
    return;
  }

let returnArr = giveKnightHighlightIds(id,color);

  returnArr = returnArr.filter(element => {
    if(checkPieceOfOpponentOnElementNoDom(element,"black")){
      return true;
    }
  })
  return returnArr;
}


//function to give highlight ids for queen
function giveQueenHighlightIds(id){
  const rookMoves = giveRookHighlightIds(id)
  const bishopMoves = giveBishopHighlightIds(id)
  return {
    "left":rookMoves.left,
    "right":rookMoves.right,
    "top":rookMoves.top,
    "bottom":rookMoves.bottom,
    "topLeft":bishopMoves.topLeft,
    "topRight":bishopMoves.topRight,
    "bottomLeft":bishopMoves.bottomLeft,
    "bottomRight":bishopMoves.bottomRight
  }
}

//function to give highlight ids for queen
function giveKingHighlightIds(id){
  const rookMoves = giveRookHighlightIds(id)
  const bishopMoves = giveBishopHighlightIds(id)
  const returnResult = {
    "left":rookMoves.left,
    "right":rookMoves.right,
    "top":rookMoves.top,
    "bottom":rookMoves.bottom,
    "topLeft":bishopMoves.topLeft,
    "topRight":bishopMoves.topRight,
    "bottomLeft":bishopMoves.bottomLeft,
    "bottomRight":bishopMoves.bottomRight
  }

  for (const key in returnResult) {
    if (Object.prototype.hasOwnProperty.call(returnResult, key)) {
      const element = returnResult[key];

      if(element.length != 0){
        returnResult[key] = new Array(element[0]);
      }
      
    }
  }

  return returnResult;
}

function giveKingCaptureIds(id,color){
  let result = giveKingHighlightIds(id);
  result = Object.values(result).flat();
  result = result.filter(element=>{
    if(checkPieceOfOpponentOnElementNoDom(element,"black")){
      return true;
    }
  })
  return result;
}
export {
  checkPieceofOpponentOnElement,
  checkSquareCaptureId,
  giveBishopHighlightIds,
  checkWhetherPieceExistsOrNot,
  giveRookHighlightIds,
  giveKnightHighlightIds,
  giveQueenHighlightIds,
  giveKingHighlightIds,
  giveKnightCaptureIds,
  giveKingCaptureIds,
  giveBishopCaptureIds,
  giveRookCaptureIds

};