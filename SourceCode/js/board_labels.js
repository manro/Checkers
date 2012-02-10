/// <reference path="../jquery-1.7.1-vsdoc.js" />

(function ($) {

    //Constants
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

    var methods = {
        //INIT
        init: function (options) {

            var settings = $.extend({}, options);

            return this.each(function () {
                // draw labels

                for (var i = 0; i < settings.cells; i++) {
                    for (var j = 0; j < 2; j++) {
                        for (var k = 0; k < 2; k++) {
                            var board_label = $("<div />").addClass(settings.board_label_class).appendTo($(this));
                            board_label.width($(this).width() / 16).height($(this).height() / 16);

                            var fontSize = Math.min(board_label.width(), board_label.height());
                            board_label.css("fontSize", fontSize * 0.75);

                            var _preventDefault = function (evt) { evt.preventDefault(); };
                            board_label.bind("dragstart", _preventDefault).bind("selectstart", _preventDefault);

                            if (k == 0) {
                                var top;
                                if (j == 0)
                                    top = -1.5 * board_label.height();
                                else
                                    top = (settings.cells) * settings.cell_height + 0.5 * board_label.height();

                                board_label.text(letters[i])
                                        .css("left", i * settings.cell_width + (settings.cell_width - board_label.width()) / 2)
                                        .css("top", top);
                            }
                            else {
                                var left;
                                if (j == 0)
                                    left = -1.5 * board_label.width();
                                else
                                    left = (settings.cells) * settings.cell_width + 0.5 * board_label.width();

                                board_label.text(settings.cells - i)
                                        .css("left", left)
                                        .css("top", i * settings.cell_height + (settings.cell_height - board_label.height()) / 2);
                            };
                        };
                    };
                };
            });
        }
    };

    $.fn.board_labels = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else $.error('Method ' + method + ' does not exist');
    };
})(jQuery)