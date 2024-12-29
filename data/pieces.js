//black pieces
function blackPawn(current_position){
    return {
        current_position,
        img:"Assets/black/pawn.png",
        piece_name:"black_pawn"
    };
}
function blackBishop(current_position){
    return {
        current_position,
        img:"./bishop.png",
        piece_name:"black_bishop"
    };
}
function blackKing(current_position){
    return {
        move:false,
        current_position,
        img:"./king.png",
        piece_name:"black_king"
    };
}
function blackQueen(current_position){
    return {
        move:false,
        current_position,
        img:"Assets/black/queen.png",
        piece_name:"black_queen"
    };
}
function blackRook(current_position){
    return {
        current_position,
        img:"Assets/black/rook.png",
        piece_name:"black_rook"
    };
}
function blackKnight(current_position){
    return {
        current_position,
        img:"Assets/black/knight.png",
        piece_name:"black_knight"
    };
}

//white pieces
function whitePawn(current_position){
    return {
        current_position,
        img:"Assets/white/pawn.png",
        piece_name:"white_pawn"
    };
}
function whiteRook(current_position){
    return {
        move:false,
        current_position,
        img:"Assets/white/rook.png",
        piece_name:"white_rook"
    };
}
function whiteKnight(current_position){
    return {
        current_position,
        img:"Assets/white/knight.png",
        piece_name:"white_knight"
    };
}
function whiteBishop(current_position){
    return {
        current_position,
        img:"Assets/white/bishop.png",
        piece_name:"white_bishop"
    };
}
function whiteQueen(current_position){
    return {
        current_position,
        img:"Assets/white/queen.png",
        piece_name:"white_queen"
    };
}
function whiteKing(current_position){
    return {
        move:false,
        current_position,
        img:"Assets/white/king.png",
        piece_name:"white_king"
    };
}

export {
    blackPawn,
    blackBishop,
    blackKing,
    blackKnight,
    blackQueen,
    blackRook,
    whitePawn,
    whiteBishop,
    whiteKing,
    whiteKnight,
    whiteQueen,
    whiteRook
};