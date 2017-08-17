refactorPlease = function() {
    state = $(this).attr('state');
    nodeId = getNodeId(this);
    dockId = getDockId(this);

    /* !!!!!!!!!!!!!! */
    if (state) {
        //change the state back to undefined

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
        dockX = coords.left+17; dockY = coords.top+17

        dockSide = 'right'
        // change the id of this path back to a undetermined end socket
        $('path[class*='+currentSocketId+']').attr('id',initialSocketId);

    } else {

        dockSide = getDockSide(this);
        dockPos = $(this).offset();
        dockX = dockPos.left + 17;
        dockY = dockPos.top + 17;

    }

    dockPressed = true;
    snapped = false;

    currentStartDock = this;

    if(!state) {

        $('.snapDock').mouseenter(function() {


            currentSnapDock = this;

            $('body').unbind('mousemove');

            snapNodeId = getNodeId(this);
            snapDockId = getDockId(this);
            snapDockSide = getDockSide(this);
            thereAnotherLink = $(this).attr('state') || false;

            if((dockSide != snapDockSide) && (nodeId != snapNodeId)) {

                // position of the dock to snap to
                snapDockPos = $(this).offset();
                snapDockX = snapDockPos.left + 17;
                snapDockY = snapDockPos.top + 17;

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

            if(thereAnotherLink) {
                $('path[class*="'+snapNodeId+'-'+snapDockId+'"]').remove();
            }

            // link is snapped and mouse is up
            var startId = nodeId + '-' + dockId;
            var endId = snapNodeId + '-' + snapDockId;
            var pathId = (dockSide == 'left')  ? endId + '-' + startId : startId + '-' + endId;

            if(exist('#'+pathId)) {
                // link already exists, remove current displayed curve (already registered in node)

                removeCurve(startId);

            } else {
                // link doesn't exist, so we can save it by changing the id name and sending the connection to node

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

                // register the connection in the node object
                //node.connect(nodeId,dockId,snapNodeId,snapDockId,[dockX,dockY,snapDockX,snapDockY]);

            }

        }

    })


}
