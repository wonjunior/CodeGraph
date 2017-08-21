/*let aa = function() {

    var handler = function(e) {
        if (e.ctrlKey) {
            $('.objects').draggable({
                disabled: false,
            });
        } else {
            $(".objects").draggable('disable');
        }
    };
    $(document).keydown(handler);
    $(document).keyup(handler);

}*/


let draggableFix = function() {

    //aa()
    $('.objects').draggable({
        start: function(event, ui) {
            pointerX = (event.pageX - $('body').offset().left) / view.scale - parseInt($(event.target).css('left'));
            pointerY = (event.pageY - $('body').offset().top) / view.scale - parseInt($(event.target).css('top'));
        },

        drag: function(event,ui) {
            ui.position.left = Math.round((event.pageX) / view.scale - pointerX);
            ui.position.top = Math.round((event.pageY) / view.scale - pointerY);
        },
        stop: function() {
            view.offset = $('.objects').offset();
        }
    })

    $('.objects').draggable('option', 'cancel', '.container');

    let pointerX, pointerY;

    $(".container").draggable({
        handle: ".header",

        start: function(event, ui) {
            pointerX = (event.pageX - $('body').offset().left) / view.scale - parseInt($(event.target).css('left'));
            pointerY = (event.pageY - $('body').offset().top) / view.scale - parseInt($(event.target).css('top'));
        },

        drag: function(event,ui) {

            ui.position.left = Math.round((event.pageX) / view.scale - pointerX);
            ui.position.top = Math.round((event.pageY) / view.scale - pointerY);


            //[ui.position.left, ui.position.top] = view.adjust(event.pageX, event.pageY, pointerX, pointerY)

            // fix the zoom
            /*ui.position.top = Math.round((event.pageY - canvasTop) / view.scale - pointerY);
            ui.position.left = Math.round((event.pageX - canvasLeft) / view.scale - pointerX);*/

            /*// Check if element is outside canvas
            if (ui.position.left < 0) ui.position.left = 0;
            if (ui.position.top < 0) ui.position.top = 0;

            // Finally, make sure offset aligns with position
            ui.offset.top = Math.round(ui.position.top + canvasTop);
            ui.offset.left = Math.round(ui.position.left + canvasLeft);*/

        }
    });

}
/*
draggableFix = function() {
    let zoom = 2;
    let canvasHeight = $('#canvas').height();
    let canvasWidth = $('#canvas').width();

    $('.container').draggable({
        drag: function(evt,ui)
        {
            // zoom fix
            ui.position.top = Math.round(ui.position.top / zoom);
            ui.position.left = Math.round(ui.position.left / zoom);

            // don't let draggable to get outside of the canvas
            if (ui.position.left < 0)
                ui.position.left = 0;
            if (ui.position.left + $(this).width() > canvasWidth)
                ui.position.left = canvasWidth - $(this).width();
            if (ui.position.top < 0)
                ui.position.top = 0;
            if (ui.position.top + $(this).height() > canvasHeight)
                ui.position.top = canvasHeight - $(this).height();

        }
    });
}
*/


/********************/
/********************/

class MouseHandling {

    dragStartFn(that) {
        let nd = Node.get(that);
        _(nd)
        let linkCount = path.count(nd.id)

        //nd.select();

        mh.links = {};
        /*
        startX = $(that).offset().left;
        startY = $(that).offset().top;


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
        }*/

    }

    draggingFn(that) {
        /*
        if(nbDocks) {

            var offset = $(that).offset();
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

        }*/
    }

    // the following is to be avoided if no links are connected to this node.
    // $('path[class*='+nodeId+']').length gives the number of links connected to this node
    draggable() {
        $('.container').draggable({
            handle: ".header",
            start: function() { mh.dragStartFn(this) },
            drag: function() { mh.draggingFn(this) }
        });
    }

    unbindAll() {

        $('.dock').unbind('mousedown')
        $('.snapDock').unbind('mousedown')
        $('body').unbind('mousemove')
        $('body').unbind('mousedown');

    }

    init() {}

    select() {
        $('.body').unbind('mousedown').mousedown(function() {

            node[getNodeId(this)].select();

        });
    }

    stick(id) {
        $(document).mousemove( () => $('.'+id).css('left',event.pageX-20).css('top',event.pageY-10) );
        ui.cursor.drop()
        this.drop();
    }

    drop(id) {
        $(document).mousedown(function() {

            $(document).unbind('mousemove').unbind('mousedown');
            ui.cursor.default()
            wait( () => ui.update())
        });
    }

}

var mh = new MouseHandling();
