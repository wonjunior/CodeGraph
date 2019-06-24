'use strict'

class Canvas {

    static get zoomLevel() {

        const scaleFromStyle = Canvas.zoomWrapper.style.transform.replace(/[^\d.]/g, ''); // <? make class to handle it
		
		return parseFloat(scaleFromStyle) || 1;

    };

    static set zoomLevel(scale) {

        Canvas.zoomWrapper.style.transform = `scale(${scale})`;

    };

    static get position() {

        return [ Canvas.element.style.left, Canvas.element.style.top ].map(parseFloat);

    };

    static set position([ x, y ]) {

        Canvas.element.style.left = x + 'px';
        Canvas.element.style.top = y + 'px';

    };

    static positionFromOrigin()  {

        const properties = this.element.getBoundingClientRect();
        return [ properties.x, properties.y ];

    };

    static get size() {

        const properties = this.element.getBoundingClientRect();
        return [ properties.width, properties.height ];

    };

    /*static set size([ x, y ]) {

        // more complex than that: need to check
        //  a) not too small
        //  b) displace all the Canvas' content i.e. re-center the canvas
        Canvas.element.style.left = x + 'px';
        Canvas.element.style.top = y + 'px';

    };*/

    static draggableBoundaryClamp(position) {

        return position.map((value, i) => {

            const minLimit = - Canvas.positionFromOrigin()[i] / Canvas.zoomLevel + Canvas.position[i] ; // -1
            const maxLimit = minLimit - (Canvas.size[i] - View.screenSize[i]) / Canvas.zoomLevel;

			return value >= minLimit ? minLimit : (value <= maxLimit ? maxLimit : value);
			
        });

    }

};

Canvas.window = document.querySelector('.window');
Canvas.zoomWrapper = document.querySelector('.canvas');
Canvas.element = document.querySelector('.objects');
Canvas.nodeArea = document.querySelector('.nodes');
Canvas.linkArea = document.querySelector('.links > svg');
