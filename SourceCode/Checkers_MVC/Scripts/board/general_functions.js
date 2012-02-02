/// <reference path="../jquery-1.7.1-vsdoc.js" />

function position_checker_in_cell(checker, settings) {
    $(checker)
    .css("top", Math.round((settings.cell_height - settings.checker_height) / 2) + Math.round(($(checker).height() - $(checker).outerHeight()) / 2))
    .css("left", Math.round((settings.cell_width - settings.checker_width) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2));
}

function get_board_number_by_i_j(i, j, settings) {
    return parseInt(settings.board_array[parseInt(i, 10) * parseInt(settings.cells, 10) + parseInt(j, 10)], 10);
}

function enable_move(checker, cell, settings) {
    var result = false;
}