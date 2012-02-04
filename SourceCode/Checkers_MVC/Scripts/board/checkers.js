/// <reference path="../jquery-1.7.1-vsdoc.js" />

(function ($) {
    var board = null;

    var methods = {
        //INIT
        init: function (options) {
            var settings = $.extend({}, options);

            //set checkers as in array
            return this.each(function () {
                init_checkers_on_board(settings)
            });
        }
    }

    $.fn.checkers = function (method) {
        board = $(this);
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else $.error('Method ' + method + ' does not exist');
    };

    function init_checkers_on_board(settings) {
        for (var h = 0; h < $($.makeArray(settings.board_array)).length; h++) {
            if (parseInt(settings.board_array[h], 10) > parseInt(settings.board_dictionary["play"], 10)) {
                var i = parseInt(h / settings.cells, 10);
                var j = h % settings.cells;
                var checker = $("<div />")
                        .appendTo($("." + settings.cell_class + "[i=" + i + "][j=" + j + "]"))
                        .addClass(settings.checker_class)
                        .addClass(settings.color_classes[parseInt(settings.board_array[h])])
                        .width(Math.round(settings.checker_width))
                        .height(Math.round(settings.checker_height))
                        .attr("checker_type", settings.board_array[h])
                        .attr("i", i)
                        .attr("j", j);

                set_position_checker_in_cell(checker, settings);

                $(checker).draggable({ containment: [parseInt($(board).offset().left),
                                                     parseInt($(board).offset().top),
                                                     parseInt($(board).offset().left)
                                                        + Math.round(settings.cell_width * (settings.cells - (settings.checker_width / settings.cell_width))),
                                                     parseInt($(board).offset().top)
                                                        + Math.round(settings.cell_height * (settings.cells - (settings.checker_height / settings.cell_height)))],
                    zIndex: 3,
                    opacity: 0.75,
                    start: function () { $(this).parent().css("zIndex", "2"); },
                    //,stop: function () { $(this).parent().css("zIndex", "1"); }
                    revert: true,
                    revertDuration: '250',
                    cursorAt: { left: parseInt(settings.checker_width / 2, 10), top: parseInt(settings.checker_height / 2, 10) }
                });
            };
        };
    };
})(jQuery)