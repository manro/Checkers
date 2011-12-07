/// <reference path="../jquery-1.7.min.js" />
/// <reference path="board.js" />

$(document).ready(function () {
var boardargs = 
    {
        cells: 8,
        cell_width: 32,
        cell_height: 32,
        board_labels: true,
        cell_class: "cell",
        cell_white_class: "cell-white",
        cell_black_class: "cell-black",
        board_label_class: "board-label",
        checker_width: 24,
        checker_height: 24,
        checker_class: "checker",
        checker_white_class: "checker-white",
        checker_black_class: "checker-black"
    };


    $("#board").board(boardargs);
});