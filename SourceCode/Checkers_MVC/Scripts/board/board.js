/// <reference path="../jquery-1.7.1.min.js" />

(function ($) {

    var methods = {
        //INIT
        init: function (options) {
            var settings = $.extend({
                'cells': 8,
                'cell_width': '32px',
                'cell_height': '32px',
                'board_labels': true,
                'board_label_class': 'board-label',
                'cell_class': 'cell',
                'cell_white_class': 'cell-white',
                'cell_black_class': 'cell-black',
                'checker_white_class': 'checker-white',
                'checker_black_class': 'checker-black'
            }, options);

            var color_classes = [settings.cell_white_class.toString(), settings.cell_black_class.toString()];

            return this.each(function () {
                // draw board
                var cell_w = parseInt(settings.cell_width);
                var cell_h = parseInt(settings.cell_height);

                $(this).width(cell_w * settings.cells);
                $(this).height(cell_h * settings.cells);
                $(this).css("position", "relative").css("border", "1px solid black");
                for (var i = 0; i < settings.cells; i++) {
                    for (var j = 0; j < settings.cells; j++) {
                        $("<div />").appendTo($(this))
                        .addClass(settings.cell_class)
                        .addClass(color_classes[(i + j) % 2])
                        .css("width", cell_w)
                        .css("height", cell_h)
                        .css("left", j * cell_w)
                        .css("top", i * cell_h)
                        .attr("i", i)
                        .attr("j", j);
                    }
                }

                if (settings.board_labels) {
                    //draw labels
                    $(this).board_labels(settings);
                }

                //draw checkers
            });
        }
    }

    $.fn.board = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else $.error('Method ' + method + ' does not exist');
    }
})(jQuery)