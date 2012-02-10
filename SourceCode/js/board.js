/// <reference path="../jquery-1.7.1-vsdoc.js" />


(function ($) {

    // Default board array - older will get by AJAX from server
    var board_array = [ 0, 3, 0, 3, 0, 3, 0, 3,
                        3, 0, 3, 0, 3, 0, 3, 0,
                        0, 3, 0, 3, 0, 3, 0, 3,
                        1, 0, 1, 0, 1, 0, 1, 0,
                        0, 1, 0, 1, 0, 1, 0, 1,
                        2, 0, 2, 0, 2, 0, 2, 0,
                        0, 2, 0, 2, 0, 2, 0, 2,
			            2, 0, 2, 0, 2, 0, 2, 0, ];

    // Default board dictionary 
    var board_dictionary = {
        'not_play': 0,
        'play': 1,
        'white_checker': 2,
        'black_checker': 3,
        'white_king': 4,
        'black_king': 5
    };

    // Board plugin methods 
    var methods = {
        //INIT
        init: function (options) {
            var settings = $.extend({
                'cells': 8,
                'cell_width': 48, // in px
                'cell_height': 48, // in px
                'board_labels': true,
                'board_label_class': 'board-label',
                'cell_class': 'cell',
                'cell_white_class': 'cell-white',
                'cell_black_class': 'cell-black',
                'checker_width': 36, // in px
                'checker_height': 36, // in px
                'checker_class': 'checker',
                'checker_white_class': 'checker-white',
                'checker_black_class': 'checker-black',
                'king_white_class': 'king-white',
                'king_black_class': 'king-black',
                'board_array': board_array,
                'board_dictionary': board_dictionary
            }, options);

            // color classes - for comfort using
            var color_classes = [ settings.cell_white_class,
                                  settings.cell_black_class,
                                  settings.checker_white_class,
                                  settings.checker_black_class,
                                  settings.king_white_class,
                                  settings.king_black_class ];

            settings = $.extend(settings, { 'color_classes': color_classes });

            //var color_classes = [settings.cell_white_class.toString(), settings.cell_black_class.toString()];

            return this.each(function () {
                
                // draw board - set border and width/height
                $(this).css("position", "relative").css("border", "1px solid black")
                       .width(settings.cell_width * settings.cells)
                       .height(settings.cell_height * settings.cells);
                
                // draw cells
                for (var i = 0; i < settings.cells; i++) {
                    for (var j = 0; j < settings.cells; j++) {
                        var cell = $("<div />").appendTo($(this))
                        .addClass(settings.cell_class)
                        .addClass(color_classes[(i + j) % 2])
                        .css("width", settings.cell_width)
                        .css("height", settings.cell_height)
                        .css("left", j * settings.cell_width)
                        .css("top", i * settings.cell_height)
                        .attr("i", i)
                        .attr("j", j);

                        // Bind cell droppable (for checker)
                        $(cell).droppable({
                            drop: function (event, ui) {
                                var checker = ui.draggable;
                                if (!enable_move(checker, this, settings)) // Check if checker can move to this cell
                                    return false;
                                $(checker).parent().css("zIndex", "1"); // Set default cell z-index
                                settings = change_in_board_array($(checker).parent(), $(this), settings); // set changes in settings after move
                                $(this).append(checker);
                                $(checker).attr("i", $(this).attr("i")).attr("j", $(this).attr("j")); // set checker i and j after move
                                set_position_checker_in_cell(ui.draggable, settings); // position checker in cell by center
                            }
                        });

                    };
                };

                if (settings.board_labels) {
                    //draw labels
                    $(this).board_labels(settings);
                };

                //draw checkers
                $(this).checkers(settings);
            });
        }
    };

    $.fn.board = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else $.error('Method ' + method + ' does not exist');
    };
})(jQuery)