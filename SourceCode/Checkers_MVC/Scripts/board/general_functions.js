/// <reference path="../jquery-1.7.1-vsdoc.js" />

function set_position_checker_in_cell(checker, settings) {
    $(checker)
    .css("top", Math.round((settings.cell_height - settings.checker_height) / 2) + Math.round(($(checker).height() - $(checker).outerHeight()) / 2))
    .css("left", Math.round((settings.cell_width - settings.checker_width) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2));
};

function get_board_number_by_i_j(i, j, settings) {
    return parseInt(settings.board_array[parseInt(i, 10) * parseInt(settings.cells, 10) + parseInt(j, 10)], 10);
};

function enable_move(checker, cell, settings) {
    var result = false;
    var checker_type = $(checker).attr("checker_type");
    var cell_i = parseInt($(cell).attr("i"), 10);
    var cell_j = parseInt($(cell).attr("j"), 10);
    var checker_i = parseInt($(checker).attr("i"), 10);
    var checker_j = parseInt($(checker).attr("j"), 10);
    var cells = parseInt(settings.cells, 10);
    var need_beat_arr = need_beat(checker, settings);

    if (need_beat_arr.length > 0) {
        for (x = 0; x < need_beat_arr.length; x++)
            if (need_beat_arr[x] == cell_i * cells + cell_j)
                return true;
    }
    else
        switch (checker_type) {
            case (settings.board_dictionary.white_checker):
                {
                    if ((cell_i == checker_i - 1) && 
                        (Math.abs(checker_j - cell_j) == 1) &&
                        (get_board_number_by_i_j(cell_i, cell_j, settings) == settings.board_dictionary.play)) {
                        return true
                    }
                }
            case (settings.board_dictionary.black_checker):
                {
                    if ((cell_i == checker_i + 1) &&
                        (Math.abs(checker_j - cell_j) == 1) &&
                        (get_board_number_by_i_j(cell_i, cell_j, settings) == settings.board_dictionary.play)) {
                        return true
                    }
                }
        };
    return result;
};

function need_beat(checker, settings) {
    var checker_type = parseInt($(checker).attr("checker_type"),10);
    var checker_i = parseInt($(checker).attr("i"));
    var checker_j = parseInt($(checker).attr("j"));
    var cells = parseInt(settings.cells, 10);
    var result = new Array();

    switch (checker_type) {
        case (settings.board_dictionary.white_checker || settings.board_dictionary.black_checker):
            {
                for (var x = -1; x <= 1; x = x + 2)
                    for (var y = -1; y <= 1; y = y + 2)
                        if (((checker_i + x > 0) && (checker_i + x < cells - 1)) &&
                            ((checker_j + y > 0) && (checker_j + y < cells - 1)) &&
                            (get_board_number_by_i_j(checker_i + x, checker_j + y, settings) != checker_type) &&
                            (get_board_number_by_i_j(checker_i + x, checker_j + y, settings) != checker_type + 2) &&
                            (get_board_number_by_i_j(checker_i + x, checker_j + y, settings) > settings.board_dictionary.play) &&
                            (get_board_number_by_i_j(checker_i + 2 * x, checker_j + 2 * y, settings) == settings.board_dictionary.play)) {
                            result.push(parseInt((checker_i + 2 * x) * cells + (checker_j + 2 * y)));
                        }
            }
        case (settings.board_dictionary.white_king || settings.board_dictionary.black_king):
            {

            }
    }
    return result;
};