var curveFactor = 0.4;

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
var initialDock;

function updateInteraction() {
    var startX;
    var startY;
    var diffX;
    var diffY;
    var nodeId;
    var linkId;
    var links = {};

    $('.container').draggable({
        handle: ".header",
        // the following is to be avoided if no links are connected to this node.
        // $('path[class*='+nodeId+']').length gives the number of links connected to this node
        start: function() {
            links = {};
            startX = $(this).offset().left;
            startY = $(this).offset().top;

            nodeId = $(this).attr('class').split(' ')[1];
            nbDocks = $('path[class*='+nodeId+']').length

            if(nbDocks) {

                for (var i = 0; i < nbDocks; i++) {
                    var pathElement = $('path[class*='+nodeId+']')[i]

                    var pathClass = pathElement.getAttribute('class')
                    var side = pathClass.substring(0,nodeId.length) == nodeId

                    linkId = pathElement.getAttribute('id');
                    path = pathElement.getAttribute('d').split(' ');

                    firstCoor = path[0].substring(1).split(',')
                    lastCoor = path[path.length-1].substring(1).split(',')
                    links[linkId] = [side,firstCoor[0],firstCoor[1],lastCoor[0],lastCoor[1]]

                }
            }


        },
        drag: function() {

                if(nbDocks) {

                    var offset = $(this).offset();
                    diffX = startX - offset.left;
                    diffY = startY - offset.top;

                    // apply this difference to every link that is connected to this node
                    for(link in links) {
                        coords = links[link];
                        if(coords[0]) {
                            updateCurve(link,[parseInt(coords[1])-diffX,parseInt(coords[2])-diffY,parseInt(coords[3]),parseInt(coords[4])])
                        } else {
                            updateCurve(link,[parseInt(coords[1]),parseInt(coords[2]),parseInt(coords[3])-diffX,parseInt(coords[4])-diffY])
                        }

                    }

                }
        }

    });

    if($('.dock').length) {
        $('.dock').unbind('mousedown')
        $('.snapDock').unbind('mousedown')
        $('body').unbind('mousemove')
        $('body').unbind('mousedown');
    }

    $('.snapDock').mousedown(function() {

        state = $(this).attr('state');

        nodeId = getNodeId(this);
        dockId = getDockId(this);

        if (state) {
            //change the state back to undefined
            $$(this)
            $(this).attr('state','')
            state = '';

            // this dock is already linked to another
            var currentSocketId = nodeId + '-' + dockId;
            var pathId =  $('path[class*='+currentSocketId+']').attr('id');

            var socketIds = pathId.split('-');
            var firstSocketId = socketIds[0] + '-' + socketIds[1];
            var secondSocketId = socketIds[2] + '-' + socketIds[3];

            var initialSocketId;
            if(currentSocketId == firstSocketId) {
                initialSocketId = secondSocketId;
            } else {
                initialSocketId = firstSocketId;
            }

            [nodeId,dockId] = initialSocketId.split('-');

            var coords = $('.' + nodeId + ' ' + '.' + dockId + ' .snapDock').offset()
            dockX = coords.left+20; dockY = coords.top+20

            dockSide = 'right'
            // change the id of this path back to a undetermined end socket
            $('path[class*='+currentSocketId+']').attr('id',initialSocketId);

        } else {

            dockSide = getDockSide(this);
            dockPos = $(this).offset();
            dockX = dockPos.left + 20;
            dockY = dockPos.top + 20;

        }

        dockPressed = true;
        snapped = false;


        currentStartDock = this;
        $$('state?')
        if(!state) {

            $('.snapDock').mouseenter(function() {
                $$('entering')
                currentSnapDock = this;

                $('body').unbind('mousemove');

                snapNodeId = getNodeId(this);
                snapDockId = getDockId(this);
                snapDockSide = getDockSide(this);
                if((dockSide != snapDockSide) && (nodeId != snapNodeId)) {

                    // position of the dock to snap to
                    snapDockPos = $(this).offset();
                    snapDockX = snapDockPos.left + 20;
                    snapDockY = snapDockPos.top + 20;

                    snapped = true;

                    drawCurve(nodeId+'-'+dockId,dockSide,dockX,dockY,snapDockX,snapDockY);

                } else {

                    $('body').mousemove(function() {

                        drawCurve(nodeId+'-'+dockId,dockSide,dockX,dockY,event.pageX, event.pageY);

                    })

                }

            })

        }

        $('.snapDock').mouseleave(function() {

            snapped = false;

            $('body').unbind('mousemove');

            $('body').mousemove(function() {

                var idSearch = nodeId + '-' + dockId;

                drawCurve(idSearch,dockSide,dockX,dockY,event.pageX, event.pageY);

            })

        })

        $('body').mouseup(function() {

                $('body').unbind('mousemove')
                $('body').unbind('mouseup')
                $('.snapDock').unbind('mouseenter')
                $('.snapDock').unbind('mouseleave')

                if(!snapped) {

                    // actually delete it
                    removeCurve(initialNode+'-'+initialDock)
                    removeCurve(nodeId+'-'+dockId);

                } else if(snapped) {

                    // link is snapped and mouse is up
                    var startId = nodeId + '-' + dockId;
                    var endId = snapNodeId + '-' + snapDockId;
                    var pathId = (dockSide == 'left')  ? endId + '-' + startId : startId + '-' + endId;

                    if(inDOM('#'+pathId)) {
                        // link already exists, remove current displayed curve (already registered in Nodes)

                        removeCurve(startId);

                    } else {
                        // link doesn't exist, so we can save it by changing the id name and sending the connection to Nodes

                        // change the id of this link since it has now a determined dock and node start and end point

                        var pathClass;
                        if(dockSide == 'left') {
                            pathClass = endId + ' ' + startId
                            $(currentStartDock).attr('state', true);
                        } else {
                            pathClass = startId + ' ' + endId
                            $(currentSnapDock).attr('state', true);
                        }

                        $('#'+startId).attr('id',pathId).attr('class',pathClass)

                        // register the connection in the Nodes object
                        Nodes.connect(nodeId,dockId,snapNodeId,snapDockId,[dockX,dockY,snapDockX,snapDockY]);

                    }

                }

            })


    })

}

/*var snapLink = function(dockSide,nodeId,dockId,snapNodeId,snapDockId,positions) {
    //$$('snapped');
    drawCurve(dockSide,positions[0],positions[1],positions[2],positions[3]);
    Nodes.connect(nodeId,dockId,snapNodeId,snapDockId,positions);
}*/

var getDockSide = function(element) {
    return $(element).parent().attr('class').split(' ')[2];
}

var getNodeId = function(element) {
    return $(element).parents('.container').attr('class').split(' ')[1]
}
var getDockId = function(element) {
    return $(element).parents('.parameter').attr('class').split(' ')[1]
}

var $$ = function(a) {
    console.log(a);
}

var inDOM = function(id) {

    return $(id).length;

}
