/// <reference path="../jquery-1.7.1-vsdoc.js" />

(function ($) {

    var methods = {
        //INIT
        init: function (options) {

            var settings = $.extend({}, options);

            return this.each(function () {
                // draw cells

                for (var i = 0; i < settings.cells; i++) {
                    for (var j = 0; j < settings.cells; j++) {
                        var cell = $("<div />").appendTo($(this))
                        .addClass(settings.cell_class)
                        .addClass(settings.color_classes[(i + j) % 2])
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
                                settings = switch_move(checker, settings);
                            }
                        });

                    };
                };
            });
        }
    };

    $.fn.board_cells = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else $.error('Method ' + method + ' does not exist');
    };
})(jQuery)