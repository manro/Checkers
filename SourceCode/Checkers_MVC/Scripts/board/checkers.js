/// <reference path="../jquery-1.7.1.min.js" />

(function ($) {

    var methods = {
        //INIT
        init: function (options) {
            var settings = $.extend({}, options);

            //set checkers as in array
            return this.each(function () {
                for (var h = 0; h < $($.makeArray(settings.board_array)).length; h++) {
                    if (parseInt(settings.board_array[h], 10) > parseInt(settings.board_dictionary["play"], 10)) {
                        var i = parseInt(h / settings.cells, 10);
                        var j = h % settings.cells;
                        var checker = $("<div />")
                        .appendTo($("." + settings.cell_class + "[i=" + i + "][j=" + j + "]"))
                        .addClass(settings.checker_class)
                        .addClass(settings.color_classes[parseInt(settings.board_array[h])])
                        .width(Math.round(parseInt(settings.checker_width,10)))
                        .height(Math.round(parseInt(settings.checker_height, 10)))
                        //.attr("checker_id", value)
                        //.attr("i", i)
                        //.attr("j", j)
                        ;
                        $(checker)
                        .css("top", Math.round((parseInt(settings.cell_height,10) - parseInt(settings.checker_height,10)) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2))
                        .css("left", Math.round((parseInt(settings.cell_width,10) - parseInt(settings.checker_width,10)) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2));
                    };
                };
            });
        }
    }

    $.fn.checkers = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else $.error('Method ' + method + ' does not exist');
    };
})(jQuery)