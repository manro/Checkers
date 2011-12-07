/// <reference path="../jquery-1.7.min.js" />

//ExecuteAjax(
//        "{'param1': 'param1'}",
//        "CheckersService.asmx/HelloWorld",
//        onSuccessHelloWorld,
//        onError
//      );

//ExecuteAjax(
//        "{}",
//        "Checkers/GetBoard",
//        onSuccessGetBoard,
//        onError
//      );

function ExecuteAjax(params, url, callbackSuccess, callbackError) {
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: params,
        success: callbackSuccess,
        error: callbackError
    });
}

function onError(XMLHttpRequest, textStatus, errorThrown) {
    $("#message").text("Ошибка при выполнении AJAX-запроса. Попробуйте перезагрузить страницу.");
}