/// <reference path="../jquery-1.7.1.min.js" />

function PointInCircuit(point, circuit) {
    var result = 
       (point.x >= circuit.left &&
        point.x <= circuit.right &&
        point.y >= circuit.top &&
        point.y <= circuit.bottom) ? true : false;
    return result;
}

function CellUnderPoint(point, cells) {
    var cell = {};
    $(cells).each(function () {
        var circuit = {
            left: $(this).offset().left,
            top: $(this).offset().top,
            right: $(this).offset().left + $(this).outerWidth(true),
            bottom: $(this).offset().top + $(this).outerHeight(true)
        };

        if (PointInCircuit(point, circuit)) {
            cell = $(this);
            return false;
        }
    });

    return cell;
}