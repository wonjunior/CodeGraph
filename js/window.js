let clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

class View {

    constructor() {
        this.scale = 1;
        this.offset = $('.objects').offset();
        // this.width = $(window).width();
        // this.height = $(window).height();
    }

    clamp(num) {
        return clamp(num, 0, 99);
    }

    adjust(x, y) {
        let mv = arguments[2] || 0;
        return [(x-this.offset.left)/this.scale+mv, (y-this.offset.top)/this.scale+mv];
    }

    zoom(zoomIn, scale, mouse) {

        $('.canvas').css('transformOrigin', zoomIn ? view.getMouse(mouse) : NaN)
            .css('transform', 'scale('+scale+')');

        this.scale = scale;
    	this.offset = $('.objects').offset();

    }

    /*__getMouse(mouse) {
        let x, y;
        x = $('.objects').css('left').split('p')[0];
        y = $('.objects').css('top').split('p')[0];

        return String(mouse[0] - x + 'px ') + String(mouse[1] - y + 'px');
    }*/

    getMouse() {
        let midX = window.innerWidth / 2;
        let midY = window.innerHeight / 2;
        let x = $('.objects').css('left').split('p')[0];
        let y = $('.objects').css('top').split('p')[0];

        return String(midX - x + 'px ') + String(midY - y + 'px');
    }

} let view = new View();


let scrollFactor = -0.1;

// needs to be fixed (you don't want to zoom other than canvas)

document.addEventListener('wheel', event => {

    const scroll = event.deltaY;
    const sign = Math.sign(scroll);

    const newScale = Math.round((view.scale + scrollFactor * sign)*100)/100;

    if (0.5 <= newScale && newScale <= 2) {
        view.zoom((sign == -1), newScale, [event.pageX, event.pageY]);
    }

});

/*$(window).bind('wheel mousewheel', function(e){

    let scroll = e.originalEvent.deltaY;
    let sign = Math.sign(scroll);
    let newScale = Math.round((view.scale + scrollFactor * -0.1 * sign)*100)/100;

    if (1 <= newScale && newScale <= 2) {
        view.zoom((sign == -1), newScale, [e.pageX, e.pageY]);
    }

});*/

$(window).resize(function() {
    // to be revised... because this will change view.scale!!!
    view = new View();
});
