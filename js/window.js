class View {

    static zoom(scale) {

        View.updateOrigin();
        Canvas.zoomLevel = scale;

    };

    static updateOrigin() {

        const screenCenter = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        const CSSProperty = `${String(screenCenter.x)}px ${String(screenCenter.y)}px`;

        Canvas.zoomWrapper.style.transformOrigin = CSSProperty;

    };

};

View.zoomFactor = -0.1;

Canvas.zoomWrapper.addEventListener('wheel', event => {

    const sign = Math.sign(
        event.deltaY
    );

    const newScale = Canvas.zoomLevel + View.zoomFactor * sign;

    if (0.5 <= newScale && newScale <= 2) {

        View.zoom(newScale);

    }

});


// $(window).resize(function() {
//     // to be revised... because this will change view.scale!!!
//     view = new View();
// });
