/// <reference path="../jquery-1.7.1.min.js" />
/// <reference path="../jquery-ui-1.8.16.min.js" />
/// <reference path="execute_ajax.js" />


$.fn.board = function (boardargs) {
    if (boardargs == null || boardargs == undefined) {
        boardargs = {};
    }
    if (typeof (boardargs) == "object") {
        if (boardargs.cells == null || boardargs.cells == undefined || boardargs.cells < 1) {
            boardargs.cells = 8;
        }
        if (boardargs.cell_width == null || boardargs.cell_width == undefined) {
            boardargs.cell_width = "32px";
        }
        if (boardargs.cell_height == null || boardargs.cell_height == undefined) {
            boardargs.cell_height = "32px";
        }
        if (boardargs.board_labels == null || boardargs.board_labels == undefined) {
            boardargs.board_labels = true;
        }
        if (boardargs.cell_class == null || boardargs.cell_class == undefined) {
            boardargs.cell_class = "cell";
        }
        if (boardargs.cell_white_class == null || boardargs.cell_white_class == undefined) {
            boardargs.cell_white_class = "cell-white";
        }
        if (boardargs.cell_black_class == null || boardargs.cell_black_class == undefined) {
            boardargs.cell_black_class = "cell-black";
        }
        if (boardargs.board_label_class == null || boardargs.board_label_class == undefined) {
            boardargs.board_label_class = "board-label";
        }
        if (boardargs.checker_width == null || boardargs.checker_width == undefined) {
            boardargs.checker_width = "24px";
        }
        if (boardargs.checker_height == null || boardargs.checker_height == undefined) {
            boardargs.checker_height = "24px";
        }
        if (boardargs.checker_class == null || boardargs.checker_class == undefined) {
            boardargs.checker_class = "checker";
        }
        if (boardargs.checker_white_class == null || boardargs.checker_white_class == undefined) {
            boardargs.checker_white_class = "checker-white";
        }
        if (boardargs.checker_black_class == null || boardargs.checker_black_class == undefined) {
            boardargs.checker_black_class = "checker-black";
        }

        var color_classes = [boardargs.cell_white_class.toString(), boardargs.cell_black_class.toString()];

        var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

        var cell_w = parseInt(boardargs.cell_width);
        var cell_h = parseInt(boardargs.cell_height);

        $(this).width(cell_w * boardargs.cells);
        $(this).height(cell_h * boardargs.cells);
        $(this).css("border", "1px solid black");
        $(this).css("position", "relative");

        for (var i = 0; i < boardargs.cells; i++) {
            for (var j = 0; j < boardargs.cells; j++) {
                $("<div />").appendTo($(this))
                .addClass(boardargs.cell_class)
                .addClass(color_classes[(i + j) % 2])
                .css("width", cell_w)
                .css("height", cell_h)
                .css("left", j * cell_w)
                .css("top", i * cell_h)
                .attr("i", i)
                .attr("j", j);
            }


            if (boardargs.board_labels) {
                for (var j = 0; j < 2; j++) {
                    for (var k = 0; k < 2; k++) {
                        var board_label = $("<div />").addClass(boardargs.board_label_class).appendTo($(this));
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
                                top = (boardargs.cells) * cell_h + 0.5 * board_label.height();

                            board_label.text(letters[i])
                            .css("left", i * cell_w + (cell_w - board_label.width()) / 2)
                            .css("top", top);
                        }
                        else {
                            var left;
                            if (j == 0)
                                left = -1.5 * board_label.width();
                            else
                                left = (boardargs.cells) * cell_w + 0.5 * board_label.width();

                            board_label.text(boardargs.cells - i)
                            .css("left", left)
                            .css("top", i * cell_h + (cell_h - board_label.height()) / 2);
                        }
                    }
                }
            }
        }

        // $(this).hide();
        $(this).checkers(boardargs);
        //$(this).checkers(boardargs);
        //        var ajax_timer = setInterval(function () {
        //            ExecuteAjax('{}', 'Checkers/GetBoard', onSuccessGetBoard, onError);
        //            function onSuccessGetBoard(response) {

        //                if (response.Data) {
        //                    $("#message").text("ОК").css("color", "green");
        //                    //$("#test").text(response.Data).css("color", "green");
        //                }
        //                else {
        //                    $("#message").text("NO").css("color", "red");
        //                }
        //            }
        //        }, 1000);

        return $(this);
    }

    if (typeof (boardargs) == "string") {
        if (boardargs == "checkersState") {
        }
    }
}

$.fn.checkers = function (checkersargs) {
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
                        .appendTo(context)
                        //.appendTo($("." + checkersargs.cell_class+"[i="+i+"][j="+j+"]"))
                        .addClass(checkersargs.checker_class)
                        .addClass(color_class_arr[index_out])
                        .width(Math.round(checkersargs.checker_width))
                        .height(Math.round(checkersargs.checker_height))
                        .attr("checker_id", value)
                        .attr("i", i)
                        .attr("j", j);

                        $(checker)
                        .css("top", i * checkersargs.cell_height + Math.round((checkersargs.cell_height - checkersargs.checker_height) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2))
                        .css("left", j * checkersargs.cell_width + Math.round((checkersargs.cell_width - checkersargs.checker_width) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2));
                        //.css("top", Math.round((checkersargs.cell_height - checkersargs.checker_height) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2))
                        //.css("left", Math.round((checkersargs.cell_width - checkersargs.checker_width) / 2) + Math.round(($(checker).width() - $(checker).outerWidth()) / 2));

                        $(checker).draggable({
                            containment: [parseInt($(context).offset().left), parseInt($(context).offset().top), parseInt($(context).offset().left) + Math.round(checkersargs.cell_width * (checkersargs.cells - (checkersargs.checker_width / checkersargs.cell_width))), parseInt($(context).offset().top) + Math.round(checkersargs.cell_height * (checkersargs.cells - (checkersargs.checker_height / checkersargs.cell_height)))], // $(context).selector.toString()
                            zIndex: 100,
                            opacity: 0.75,
                            start: function () { /*$(this).parent().css("zIndex", "50");*/ },
                            stop: function () { /*$(this).parent().css("zIndex", "3");*/  }
                        });

                        $("." + checkersargs.cell_class).each(function () {
                            $(this).droppable({
                                accept: function (element) {
                                    var result = false;
                                    if ($(element).hasClass(checkersargs.checker_class) &&
                                        $(element).attr("i") == $(this).attr("i") &&
                                        $(element).attr("j") == $(this).attr("j"))
                                        result = true;
                                    return result;
                                }
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





