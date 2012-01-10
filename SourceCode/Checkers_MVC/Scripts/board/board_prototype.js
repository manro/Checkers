/// <reference path="../jquery-1.7.1-vsdoc.js" />

(function ($) {

    $.fn.board_p = function (options) {
        var settings = $.extend({
            'cells' : 8,
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

        var color_classes = [settings.cell_white_class, settings.cell_black_class];

        var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

        var cell_w = parseInt(settings.cell_width);
        var cell_h = parseInt(settings.cell_height);

        $(this).width(cell_w * settings.cells);
        $(this).height(cell_h * settings.cells);
        $(this).css("border", "1px solid black");
        $(this).css("position", "relative");

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


            if (settings.board_labels) {
                for (var j = 0; j < 2; j++) {
                    for (var k = 0; k < 2; k++) {
                        var board_label = $("<div />").addClass(settings.board_label_class).appendTo($(this));
                        board_label.width($(this).width() / 16);
                        board_label.height($(this).height() / 16);
                        var fontSize = Math.min(board_label.width(), board_label.height());
                        board_label.css("fontSize", fontSize * 0.75);

                        var _preventDefault = function (evt) { evt.preventDefault(); };
                        board_label.bind("dragstart", _preventDefault).bind("selectstart", _preventDefault);

                        if (k == 0) {
                            var top;
                            if (j == 0)
                                top = -1.5 * board_label.height();
                            else
                                top = (settings.cells) * cell_h + 0.5 * board_label.height();

                            board_label.text(letters[i])
                        .css("left", i * cell_w + (cell_w - board_label.width()) / 2)
                        .css("top", top);
                        }
                        else {
                            var left;
                            if (j == 0)
                                left = -1.5 * board_label.width();
                            else
                                left = (settings.cells) * cell_w + 0.5 * board_label.width();

                            board_label.text(settings.cells - i)
                        .css("left", left)
                        .css("top", i * cell_h + (cell_h - board_label.height()) / 2);
                        }
                    }
                }
            }
        }

        //$(this).checkers(settings);

        return $(this);
    }

})($)