/// <reference path="../jquery-1.7.1-vsdoc.js" />


(function ($) {

    var board_array = [0, 3, 0, 3, 0, 3, 0, 3,
                        3, 0, 3, 0, 3, 0, 3, 0,
                        0, 3, 0, 3, 0, 3, 0, 3,
                        1, 0, 1, 0, 1, 0, 1, 0,
                        0, 1, 0, 1, 0, 1, 0, 1,
                        2, 0, 2, 0, 2, 0, 2, 0,
                        0, 2, 0, 2, 0, 2, 0, 2,
			            2, 0, 2, 0, 2, 0, 2, 0, ];

    var board_dictionary = {
        'not_play': 0,
        'play': 1,
        'white_checker': 2,
        'black_checker': 3,
        'white_king': 4,
        'black_king': 5
    };

    var methods = {
        //INIT
        init: function (options) {
            var settings = $.extend({
                'cells': 8,
                'cell_width': '32', // in px
                'cell_height': '32', // in px
                'board_labels': true,
                'board_label_class': 'board-label',
                'cell_class': 'cell',
                'cell_white_class': 'cell-white',
                'cell_black_class': 'cell-black',
                'checker_width': '24', // in px
                'checker_height': '24', // in px
                'checker_class': 'checker',
                'checker_white_class': 'checker-white',
                'checker_black_class': 'checker-black',
                'king_white_class': 'king-white',
                'king_black_class': 'king-black',
                'board_array': board_array,
                'board_dictionary': board_dictionary
            }, options);

            var color_classes = [settings.cell_white_class,
                                  settings.cell_black_class,
                                  settings.checker_white_class,
                                  settings.checker_black_class,
                                  settings.king_white_class,
                                  settings.king_black_class];

            settings = $.extend({ 'color_classes': color_classes }, settings);

            //var color_classes = [settings.cell_white_class.toString(), settings.cell_black_class.toString()];

            return this.each(function () {
                // draw board
                $(this).width(settings.cell_width * settings.cells);
                $(this).height(settings.cell_height * settings.cells);
                $(this).css("position", "relative").css("border", "1px solid black");
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


                        $(cell).droppable({
                            accept: function (element) {
                                console.log($(this));
                                if (get_board_number_by_i_j($(this).attr("i"), $(this).attr("j"), settings) > board_dictionary.not_play &&
                                    $(this).children().length < 1)
                                    return true;
                                else
                                    return false;
                                
                                //return true;
                                //return enable_move(element, this, settings);
                            },
                            drop: function (event, ui) {
                                var checker = ui.draggable;
                                $(checker).parent().css("zIndex", "1");
                                $(this).append(checker);
                                $(checker).attr("i", $(this).attr("i")).attr("j", $(this).attr("j"));
                                set_position_checker_in_cell(ui.draggable, settings);
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