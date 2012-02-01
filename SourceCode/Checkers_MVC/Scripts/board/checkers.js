/// <reference path="../jquery-1.7.1.min.js" />
(function ($) {
    var methods = {
        //INIT
        init: function (options) {
            var settings = $.extend({}, options);

            //set checkers as in array
            return this.each(function () {
                for (var item in settings.board_array) {
                    
                }
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
    }
})(jQuery)