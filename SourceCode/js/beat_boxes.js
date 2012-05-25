/// <reference path="../jquery-1.7.1-vsdoc.js" />

(function ($) {

    var methods = {
        //INIT
        init: function (options) {

            var settings = $.extend({}, options);

            return this.each(function () {
                //draw beat boxes
                var board_wrapper = $("." + settings.board_wrapper_class);

                var beat_box_columns_count = (settings.cells / 2 - 1);
                var beat_box_rows_count = (settings.cells / 2);
                var beat_box_prototype = $("<div />")
                                    .addClass(settings.beat_box_class)
                                    .addClass(settings.default_border_class)
                                    .css("width", settings.cell_width * beat_box_columns_count)
                                    .css("height", settings.cell_height * beat_box_rows_count);
                var beat_box_white = $(beat_box_prototype).clone().addClass(settings.beat_box_white_class).css("left", -settings.cell_width * beat_box_columns_count - 10).appendTo(board_wrapper);
                var beat_box_black = $(beat_box_prototype).clone().addClass(settings.beat_box_black_class).css("right", -settings.cell_width * beat_box_columns_count - 10).appendTo(board_wrapper);

                $(beat_box_prototype).remove();

                //draw beat-cells on beat-box
                var beat_cell_prototype = $("<div />").addClass(settings.beat_cell_class).css("width", settings.cell_width).css("height", settings.cell_height);
                for (var i = 0; i < beat_box_rows_count; i++) {
                    for (var j = 0; j < beat_box_columns_count; j++) {
                        $(beat_cell_prototype).clone().appendTo(beat_box_white).css("left", j * settings.cell_width).css("top", i * settings.cell_height).attr("filled", "false");
                        $(beat_cell_prototype).clone().appendTo(beat_box_black).css("left", j * settings.cell_width).css("top", i * settings.cell_height).attr("filled", "false");
                    }
                }
                $(beat_cell_prototype).remove();
            });
        }
    };

    $.fn.beat_boxes = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else $.error('Method ' + method + ' does not exist');
    };
})(jQuery)