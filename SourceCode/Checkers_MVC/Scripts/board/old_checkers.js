/// <reference path="../jquery-1.7.1.min.js" />

$.fn.old_checkers = function (checkersargs) {
    var context = $(this);

    ExecuteAjax('{}', 'Checkers/GetBoard', onSuccessGetBoard, onError);
    function onSuccessGetBoard(response) {

        if (response.Data) {
            $("#message").text("ОК").css("color", "green");
            var checkers_positions_arr = [response.Data.WhiteCheckers, response.Data.BlackCheckers];
            var color_class_arr = [checkersargs.checker_white_class, checkersargs.checker_black_class];
            $.each(checkers_positions_arr, function (index_out, white_or_black) {
                $.each(white_or_black, function (index_in, value) {
                    if (value > 0) {
                        var i = ((index_in - index_in % checkersargs.cells) / checkersargs.cells);
                        var j = (index_in % checkersargs.cells);
                        var checker = $("<div />")
                        //.appendTo(context)
                        .appendTo($("." + checkersargs.cell_class + "[i=" + i + "][j=" + j + "]"))
                        .addClass(checkersargs.checker_class)
                        .addClass(color_class_arr[index_out])
                        .width(Math.round(checkersargs.checker_width))
                        .height(Math.round(checkersargs.checker_height))
                        .attr("checker_id", value)
                        .attr("i", i)
                        .attr("j", j);

                        $(checker)
                        //.css("top", i * checkersargs.cell_height + Math.round((checkersargs.cell_height - checkersargs.checker_height) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2))
                        //.css("left", j * checkersargs.cell_width + Math.round((checkersargs.cell_width - checkersargs.checker_width) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2));
                        .css("top", Math.round((checkersargs.cell_height - checkersargs.checker_height) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2))
                        .css("left", Math.round((checkersargs.cell_width - checkersargs.checker_width) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2));

                        $(checker).draggable({
                            containment: [parseInt($(context).offset().left), parseInt($(context).offset().top), parseInt($(context).offset().left) + Math.round(checkersargs.cell_width * (checkersargs.cells - (checkersargs.checker_width / checkersargs.cell_width))), parseInt($(context).offset().top) + Math.round(checkersargs.cell_height * (checkersargs.cells - (checkersargs.checker_height / checkersargs.cell_height)))], // $(context).selector.toString()
                            zIndex: 100,
                            opacity: 0.75,
                            start: function () { $(this).parent().css("zIndex", "2"); },
                            stop: function () { $(this).parent().css("zIndex", "1"); }
                            ,revert: "valid"
                        });

                        $("." + checkersargs.cell_class).each(function () {
                            $(this).droppable({
                                accept: function (element) {
                                    //var result = false;
                                    //                                    if ($(element).hasClass(checkersargs.checker_class) &&
                                    //                                        $(element).attr("i") == $(this).attr("i") &&
                                    //                                        $(element).attr("j") == $(this).attr("j"))
                                    //                                        result = true;
                                    //                                    var point = new Object();
                                    //                                    point.x = $(element).offset().left + Math.round($(element).outerWidth(true) / 2);
                                    //                                    point.y = $(element).offset().top + Math.round($(element).outerHeight(true) / 2);
                                    //                                    var circuit = new Object();
                                    //                                    circuit.left = $(this).offset().left;
                                    //                                    circuit.top = $(this).offset().top;
                                    //                                    circuit.right = $(this).offset().left + $(this).outerWidth(true);
                                    //                                    circuit.bottom = $(this).offset().left + $(this).outerHeight(true);
                                    //                                    var result = ($(element).parent() !== $(this) && PointInCircuit(point, circuit)) ? true : false;
                                    return true; //result;
                                }
                                //,drop: function (event, ui) { $(this).append(ui.draggable); }
                            });
                        });
                    }
                });
            });
        }
        else {
            $("#message").text("NO").css("color", "red");
        }
    }

    return $(this);
}