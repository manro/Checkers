/// <reference path="../jquery-1.7.1-vsdoc.js" />

if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}

function set_position_checker_in_cell(checker, settings) {
    $(checker)
    .css("top", Math.round((settings.cell_height - settings.checker_height) / 2) + Math.round(($(checker).height() - $(checker).outerHeight()) / 2))
    .css("left", Math.round((settings.cell_width - settings.checker_width) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2));
};

function get_checker_type_by_ij(i, j, settings) {
    return parseInt(settings.board_array[parseInt(i, 10) * parseInt(settings.cells, 10) + parseInt(j, 10)], 10);
};

function get_ij_by_array_id(id, settings) {
    var i = parseInt(parseInt(id, 10) / settings.cells, 10);
    var j = parseInt(id, 10) % settings.cells;
    return { 'i': i, 'j': j };
};

function get_array_id_by_ij(i, j, settings) {
    return parseInt(i, 10) * settings.cells + parseInt(j, 10);
};

function set_checker_type_by_ij(i, j, new_checker_type, settings) {
    settings.board_array[parseInt(i, 10) * parseInt(settings.cells, 10) + parseInt(j, 10)] = new_checker_type;
    return settings;
};

function change_in_board_array(cell1, cell2, settings) {
    var cell1_i = parseInt($(cell1).attr("i"), 10);
    var cell1_j = parseInt($(cell1).attr("j"), 10);
    var cell2_i = parseInt($(cell2).attr("i"), 10);
    var cell2_j = parseInt($(cell2).attr("j"), 10);

    var checker_type1 = get_checker_type_by_ij(cell1_i, cell1_j, settings);
    var checker_type2 = get_checker_type_by_ij(cell2_i, cell2_j, settings);

    settings = set_checker_type_by_ij(cell1_i, cell1_j, checker_type2, settings);
    settings = set_checker_type_by_ij(cell2_i, cell2_j, checker_type1, settings);
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
    var need_beat_arr = need_beat(checker, false, settings);

    if (need_beat_arr.length > 0) {
        for (var x = 0; x < need_beat_arr.length; x++)
        //if (need_beat_arr[x] == get_array_id_by_ij(cell_i, cell_j, settings))
            if (need_beat_arr[x].from == get_array_id_by_ij(checker_i, checker_j, settings))
                for (var y = 0; y < need_beat_arr[x].to.length; y++)
                    if (need_beat_arr[x].to[y] == get_array_id_by_ij(cell_i, cell_j, settings))
                        return true;
    }
    else
        switch (checker_type) {
        case settings.board_dictionary.white_checker:
            {
                if ((cell_i == checker_i - 1) &&
                        (Math.abs(checker_j - cell_j) == 1) &&
                        (get_checker_type_by_ij(cell_i, cell_j, settings) == settings.board_dictionary.play)) {
                    return true;
                }
                break;
            }
        case settings.board_dictionary.black_checker:
            {
                if ((cell_i == checker_i + 1) &&
                        (Math.abs(checker_j - cell_j) == 1) &&
                        (get_checker_type_by_ij(cell_i, cell_j, settings) == settings.board_dictionary.play)) {
                    return true;
                }
                break;
            }

    };
    return result;
};

function need_beat(checker, only_this/*true in checker start beat and neet to beat several checkers */, settings) {
    var cells = parseInt(settings.cells, 10);
    var result = new Array();

    var same_color_checkers = (settings.move_checkers.white.indexOf(parseInt($(checker).attr("checker_type"), 10)) >= 0) ? settings.move_checkers.white : settings.move_checkers.black;
    var checkers_id = new Array();

    if (only_this)
        checkers_id.push({ 'checker_type': parseInt($(checker).attr("checker_type"), 10),
            'i': parseInt($(checker).attr("i"), 10),
            'j': parseInt($(checker).attr("j"), 10)
        });
    else
        for (var w = 0; w < settings.board_array.length; w++)
            if (same_color_checkers.indexOf(settings.board_array[w]) >= 0) {
                var ij = get_ij_by_array_id(w, settings);
                checkers_id.push({ 'checker_type': settings.board_array[w], 'i': ij.i, 'j': ij.j });
            }

            for (var w = 0; w < checkers_id.length; w++) {
                var chk = checkers_id[w];
                if (settings.only_checkers.indexOf(chk.checker_type) >= 0) {
                    var beat = { 'from': get_array_id_by_ij(chk.i, chk.j, settings), 'to': new Array(), 'bits': new Array() };
                    for (var x = -1; x <= 1; x = x + 2)
                        for (var y = -1; y <= 1; y = y + 2) {
                            if (((chk.i + x > 0) && (chk.i + x < cells - 1)) &&
                            ((chk.j + y > 0) && (chk.j + y < cells - 1)) &&
                            (same_color_checkers.indexOf(get_checker_type_by_ij(chk.i + x, chk.j + y, settings)) < 0) &&
                            (get_checker_type_by_ij(chk.i + x, chk.j + y, settings) > settings.board_dictionary.play) &&
                            (get_checker_type_by_ij(chk.i + 2 * x, chk.j + 2 * y, settings) == settings.board_dictionary.play)) {
                                //result.push(parseInt((chk.i + 2 * x) * cells + (chk.j + 2 * y), 10));
                                beat.to.push(get_array_id_by_ij(chk.i + 2 * x, chk.j + 2 * y, settings));
                                beat.bits.push(get_array_id_by_ij(chk.i + x, chk.j + y, settings));
                            }
                        }
                        if (beat.to.length > 0) 
                            result.push(beat);
                }

                //else if (settings.only_kings.indexOf(checker_type) >= 0) {

                //}
                }
    return result;
};