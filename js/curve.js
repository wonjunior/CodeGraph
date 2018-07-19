let curveFactor = 0.4;

class Curve {

    getPath(leftPos, rightPos) {

        const [startX, startY] = leftPos; const [endX, endY] = rightPos;

        const Xdiff = Math.abs(endX - startX);

        // M
        const _M = 'M' + startX + ',' + startY;

        // L
        const l1 = Xdiff * 0.05 + startX;
        const _L1 = 'L' + l1 + ',' + startY;

        // C
        const c1 = startX + Xdiff * curveFactor;
        const c2 = endX - Xdiff * curveFactor;
        const c3 = - Xdiff * 0.05 + endX;
        const _C = 'C' + c1 + ',' + startY + ' ' + c2 + ',' + endY + ' ' + c3 + ',' + endY

        // L
        const _L2 = 'L' + endX + ',' + endY;

        // setting up the path string
        const path = _M + ' ' + _L1 + ' ' + _C + ' ' + _L2  ;

        return path;

    }

}; let curve = new Curve();

/*var addCurve = function(pathId,positions) {

    var path = getPath(positions[0],positions[1],positions[2],positions[3]);

    const color = (lk.origin.type == 'data') ? 'blue' : 'white';
    const weight = (lk.origin.type == 'data') ? '2' : '3';

    var html = '<path id="'+pathId+'" d="'+path+'" stroke="'+color+'" stroke-width="'+weight+'" fill="none"></path>';

    appendSVG(html);
}

var updateCurve = function(pathId,positions) {

    var path = getPath(positions[0],positions[1],positions[2],positions[3]);

    $('#'+pathId).attr("d",path);

}

var drawCurve = function(id, side, a, b) {

    const position = (side == 'right')
        ? [a[0], a[1], b[0], b[1]]
        : [b[0], b[1], a[0], a[1]];

    if(path.exist(id)) {

        updateCurve(id, position);

    } else {

        addCurve(id, position);

    }

}

var appendSVG = function(html) {

    $('svg').append(html);
    $("svg").html($("svg").html());

}
*/
