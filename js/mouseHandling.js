class MouseHandling {

    unbindAll() {

        if($('.dock').length) {
            $('.dock').unbind('mousedown')
            $('.snapDock').unbind('mousedown')
            $('body').unbind('mousemove')
            $('body').unbind('mousedown');
        }

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
