/*var curveFactor = 0.4;

var snapped;
var dockPressed = false;
var nodeId;
var snapNodeId;
var dockSide;
var snapDockSide;
var dockPos;

var state;
var currentStartDock;
var currentSnapDock;

var snapDockPos;
var snapDockX;
var snapDockY;

var initialNode;
var initialDock;*/

function updateInteraction() {

    // initialize selection of nodes
    //mh.select()

    /*var startX;
    var startY;
    var diffX;
    var diffY;
    var nodeId;
    var linkId;
    var links = {};
*/
    mh.draggable();

    mh.unbindAll();

    Linking.handler();

}

/*var getDockSide = function(element) {
    return $(element).parent().attr('class').split(' ')[2];
}
var getNodeId = function(element) {
    return $(element).parents('.container').attr('class').split(' ')[1]
}
var getDockId = function(element) {
    return $(element).parents('.parameter').attr('class').split(' ')[1]
}*/
