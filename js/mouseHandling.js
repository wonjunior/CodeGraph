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

}

var mh = new MouseHandling();
