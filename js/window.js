class View {

    constructor() {
        this.scale = 1;
        this.offset = $('.objects').offset();
        // this.width = $(window).width();
        // this.height = $(window).height();
    }

    static zoom(zoomIn, scale) {

        Canvas.zoomLevel = scale;

        $('.canvas').css('transformOrigin', zoomIn ? view.getMouse() : NaN)
            .css('transform', 'scale('+scale+')');

        this.scale = scale;
    	this.offset = $('.objects').offset();

    }


};


Canvas.zoomWrapper.addEventListener('wheel', event => {

    const sign = Math.sign(
        event.deltaY
    );

    const newScale = Math.round((Canvas.zoomLevel + Canvas.zoomFactor * sign)*100)/100;

    if (0.5 <= newScale && newScale <= 2) {

        Canvas.zoom((sign == -1),newScale);

    }

});


// $(window).resize(function() {
//     // to be revised... because this will change view.scale!!!
//     view = new View();
// });
