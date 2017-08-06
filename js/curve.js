class Curve {



}
var getPath = function(startX, startY, endX, endY) {

    // M
    var AX = startX;
    var AY = startY;

    // L
    var BX = Math.abs(endX - startX) * 0.05 + startX;
    var BY = startY;

    // C
    var CX = startX + Math.abs(endX - startX) * curveFactor;
    var CY = startY;
    var DX = endX - Math.abs(endX - startX) * curveFactor;
    var DY = endY;
    var EX = - Math.abs(endX - startX) * 0.05 + endX;
    var EY = endY;

    // L
    var FX = endX;
    var FY = endY;

    // setting up the path string
    var path  = 'M' + AX + ',' + AY;
    path += ' L' + BX + ',' + BY;
    path += ' C' + CX + ',' + CY + ' ' + DX + ',' + DY + ' ' + EX + ',' + EY;
    path += ' L' + FX + ',' + FY;

    return path;

}

var addCurve = function(pathId,positions) {

    var path = getPath(positions[0],positions[1],positions[2],positions[3]);

    var html = '<path id="'+pathId+'" d="'+path+'" stroke="blue" stroke-width="2" fill="none"></path>';

    appendSVG(html);
}

var updateCurve = function(pathId,positions) {

    var path = getPath(positions[0],positions[1],positions[2],positions[3]);

    $('#'+pathId).attr("d",path);

}

var drawCurve = function(pathId,side,startX,startY,endX,endY) {

    var position = (side == 'right') ? [startX,startY,endX,endY] : [endX,endY,startX,startY]

    if($('#'+pathId).length) {

        // path already exists
        updateCurve(pathId,position);

    } else {

        // path doesn't exist
        addCurve(pathId,position);
    }


}

var snapOffCurve = function() {

}

var appendSVG = function(html) {

    $('svg').append(html);
    $("svg").html($("svg").html());

}

var removeCurve = function(id) {

    $('#'+id).remove();

}
