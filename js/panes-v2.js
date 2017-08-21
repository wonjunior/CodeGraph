let clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

class Separator {

    constructor() {
        this.view = 'full';
        this.saved = {}
    }

    switch(view) {

        $('.window').attr('style', '')

        if(view == 'full') {

            $('.window').attr('class', 'window');

        } else if(view == 'col') {

            $('.window').attr('class', 'window left-right');
            this.col = true;
            this.move('fract', this.saved.col || 75);

        } else if(view == 'row') {

            $('.window').attr('class', 'window top-bottom');
            this.col = false;
            this.move('fract', this.saved.row || 75);

        }
    }

    move(unit, pos) {

        let fract;

        if (unit == 'px') {
            const total = this.col ? view.width : view.height;
            fract = view.clamp(Math.round((pos / total)*10000) / 100);
        } else if (unit == 'fract') {
            fract = pos;
        }

        if (this.col) {
            $('.left-right').attr('style', 'grid-template-columns:' + fract + '% 10px auto');
            this.saved.col = fract;
        } else {
            $('.top-bottom').attr('style', 'grid-template-rows:' + fract + '% 10px auto');
            this.saved.row = fract;
        }

    }

} let sp = new Separator()


class View {

    constructor() {
        this.scale = 1;
        this.offset = $('.objects').offset();
        this.width = $(window).width();
        this.height = $(window).height();
    }

    clamp(num) {
        return clamp(num, 0, 99);
    }

    adjust(x, y) {
        let mv = arguments[2] || 0;
        return [(x-this.offset.left)/this.scale+mv, (y-this.offset.top)/this.scale+mv];
    }

    zoom(zoomIn, scale, mouse) {

        $('.objects').css('transformOrigin', zoomIn ? view.getMouse(mouse) : NaN)
            .css('transform', 'scale('+scale+')');

        this.scale = scale;
    	this.offset = $('.objects').offset();

    }

    __getMouse(mouse) {
        let x, y;
        x = $('.objects').css('left').split('p')[0];
        y = $('.objects').css('top').split('p')[0];

        return String(mouse[0] - x + 'px ') + String(mouse[1] - y + 'px');
    }

    getMouse() {
        let midX = window.innerWidth / 2;
        let midY = window.innerHeight / 2;
        let x = $('.objects').css('left').split('p')[0];
        let y = $('.objects').css('top').split('p')[0];

        return String(midX - x + 'px ') + String(midY - y + 'px');
    }

} let view = new View();


let scrollFactor = 1
$(window).bind('wheel mousewheel', function(e){

    let scroll = e.originalEvent.deltaY;
    let sign = Math.sign(scroll);
    let newScale = Math.round((view.scale + scrollFactor * -0.1 * sign)*100)/100;

    if (1 <= newScale && newScale <= 2) {
        view.zoom((sign == -1), newScale, [e.pageX, e.pageY]);
    }

});

$(window).resize(function() {
    // to be revised... because this will change view.scale!!!
    view = new View();
});

['full', 'col', 'row'].forEach(function(v) {
    Object.defineProperty(View, v, {
        get: function() {
            sp.switch(v);
        }
    });
});

$('.separator').mousedown(function() {

    $(document).mousemove(function() {

        let position = sp.col ? event.pageX : event.pageY;
        sp.move('px', position)

    });

    $(document).mouseup(function() {
        $(document).unbind('mousedown').unbind('mouseup').unbind('mousemove');
    })

});


$('.panes-btn > div').mousedown(function() {

    if(event.which == 1) {
        expandContractHandler(this);
    }

});

let expandContractHandler = function(el) {

    let params = $(el).parent().attr('id').split('-');

    sp.switch(params[0])
    $('.expand').show()
    $('.'+params[1]).hide()

}
