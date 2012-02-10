/// <reference path="../jquery-1.7.1-vsdoc.js" />

function set_position_checker_in_cell(checker, settings) {
    $(checker)
    .css("top", Math.round((settings.cell_height - settings.checker_height) / 2) + Math.round(($(checker).height() - $(checker).outerHeight()) / 2))
    .css("left", Math.round((settings.cell_width - settings.checker_width) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2));
};

function get_board_number_by_i_j(i, j, settings) {
    return parseInt(settings.board_array[parseInt(i, 10) * parseInt(settings.cells, 10) + parseInt(j, 10)], 10);
};

function get_i_j_by_array_id(id, settings) {
    var i = parseInt(parseInt(id, 10) / settings.cells, 10);
    var j = parseInt(id, 10) % settings.cells;
    return { 'i': i, 'j': j };
};

function set_board_number_by_i_j(i, j, new_number, settings) {
    settings.board_array[parseInt(i, 10) * parseInt(settings.cells, 10) + parseInt(j, 10)] = new_number;
    return settings;
};

function change_in_board_array(cell1, cell2, settings) {
    var cell1_i = parseInt($(cell1).attr("i"), 10);
    var cell1_j = parseInt($(cell1).attr("j"), 10);
    var cell2_i = parseInt($(cell2).attr("i"), 10);
    var cell2_j = parseInt($(cell2).attr("j"), 10);

    var number1 = get_board_number_by_i_j(cell1_i, cell1_j, settings);
    var number2 = get_board_number_by_i_j(cell2_i, cell2_j, settings);

    settings = set_board_number_by_i_j(cell1_i, cell1_j, number2, settings);
    settings = set_board_number_by_i_j(cell2_i, cell2_j, number1, settings);
    return settings;
}

function enable_move(checker, cell, settings) {
    var result = false;
    var checker_type = parseInt($(checker).attr("checker_type"), 10);
    var cell_i = parseInt($(cell).attr("i"), 10);
    var cell_j = parseInt($(cell).attr("j"), 10);
    var checker_i = parseInt($(checker).attr("i"), 10);
    var checker_j = parseInt($(checker).attr("j"), 10);
    var cells = parseInt(settings.cells, 10);
    var can_beat_arr = can_beat(checker, settings);

    if (can_beat_arr.length > 0) {
        for (var x = 0; x < can_beat_arr.length; x++)
            if (can_beat_arr[x] == cell_i * cells + cell_j)
                return true;
    }
    else
        switch (checker_type) {
        case settings.board_dictionary.white_checker:
            {
                if ((cell_i == checker_i - 1) &&
                        (Math.abs(checker_j - cell_j) == 1) &&
                        (get_board_number_by_i_j(cell_i, cell_j, settings) == settings.board_dictionary.play)) {
                    return true;
                }
                break;
            }
        case settings.board_dictionary.black_checker:
            {
                if ((cell_i == checker_i + 1) &&
                        (Math.abs(checker_j - cell_j) == 1) &&
                        (get_board_number_by_i_j(cell_i, cell_j, settings) == settings.board_dictionary.play)) {
                    return true;
                }
                break;
            }

    };
    return result;
};

function can_beat(checker, settings) {
    var checker_type = parseInt($(checker).attr("checker_type"), 10);
    var checker_i = parseInt($(checker).attr("i"), 10);
    var checker_j = parseInt($(checker).attr("j"), 10);
    var cells = parseInt(settings.cells, 10);
    var result = new Array();

    if ((checker_type == settings.board_dictionary.white_checker) || (checker_type == settings.board_dictionary.black_checker)) {
        for (var x = -1; x <= 1; x = x + 2)
            for (var y = -1; y <= 1; y = y + 2) {
                if (((checker_i + x > 0) && (checker_i + x < cells - 1)) &&
                            ((checker_j + y > 0) && (checker_j + y < cells - 1)) &&
                            (get_board_number_by_i_j(checker_i + x, checker_j + y, settings) != checker_type) &&
                            (get_board_number_by_i_j(checker_i + x, checker_j + y, settings) != checker_type + 2) &&
                            (get_board_number_by_i_j(checker_i + x, checker_j + y, settings) > settings.board_dictionary.play) &&
                            (get_board_number_by_i_j(checker_i + 2 * x, checker_j + 2 * y, settings) == settings.board_dictionary.play)) {
                    result.push(parseInt((checker_i + 2 * x) * cells + (checker_j + 2 * y), 10));
                }
                //                        console.log(" ");
                //                        console.log("x: " + x.toString());
                //                        console.log("y: " + y.toString());
                //                        console.log("checker_i + x > 0: " + (checker_i + x > 0));
                //                        console.log("checker_i + x < cells - 1: " + (checker_i + x < cells - 1));
                //                        console.log("checker_j + y > 0: " + (checker_j + y > 0));
                //                        console.log("checker_j + y < cells - 1: " + (checker_j + y < cells - 1));
                //                        console.log("get_board_number_by_i_j(checker_i + x, checker_j + y, settings) != checker_type: " + (get_board_number_by_i_j(checker_i + x, checker_j + y, settings) != checker_type));
                //                        console.log("get_board_number_by_i_j(checker_i + x, checker_j + y, settings) != checker_type + 2: " + (get_board_number_by_i_j(checker_i + x, checker_j + y, settings) != checker_type + 2));
                //                        console.log("get_board_number_by_i_j(checker_i + x, checker_j + y, settings) > settings.board_dictionary.play: " + (get_board_number_by_i_j(checker_i + x, checker_j + y, settings) > settings.board_dictionary.play));
                //                        console.log("get_board_number_by_i_j(checker_i + 2 * x, checker_j + 2 * y, settings) == settings.board_dictionary.play: " + (get_board_number_by_i_j(checker_i + 2 * x, checker_j + 2 * y, settings) == settings.board_dictionary.play));
                //                        console.log(" ");
                //                        console.log(get_board_number_by_i_j(checker_i + x, checker_j + y, settings).toString() + " " + checker_type.toString());
            }
    }

    else if ((checker_type == settings.board_dictionary.white_king) || (checker_type == settings.board_dictionary.black_king)) {

    }

    return result;
};

//function need_beat(checker, settings) {
//    var result = new Array();
//    var checker_i = parseInt($(checker).attr("i"),10);
//    var checker_j = parseInt($(checker).attr("j"),10);
//    var checker_type = parseInt($(checker).attr("checker_type"), 10);

//    var same_color_checkers = $("." + settings.checker_class)
//    if (checker_type == settings.board_dictionary.white_checker) {
//        
//    }
//    else {
//    }
//}