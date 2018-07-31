'use strict'

class Link {

    get id() {

        return (this.linkElement) ? this.linkElement.id : undefined;

    };

    set id(newId) {

        // catch?

        this.linkElement.id = newId;

    };

    get path() {

        return this.linkElement.getAttribute('d');

    };

    set path(newPath) {

        this.linkElement.setAttribute('d', newPath);

    }

    constructor(startDock) {

        this.startDock = startDock;
        this.type = startDock.type;

        this.createLink();

        this.id = startDock.id;

    };

    createLink() {

        let template = document.querySelector('template#link');
        template = document.importNode(template.content, true);

        this.linkElement = template.querySelector('path');

        Canvas.linkArea.appendChild(this.linkElement);

    };

    edit() {

        delete link[ this.id ];

        delete this.endDock; // and remove the endDock's lin[0]

        return this;

    };

    update(endPoint) {

        this.path = Curve.get(this.startDock.position, endPoint);

    };

    /*
    ** first method called to draw a path betwen obj1 (Dock) and obj2 (Dock
    ** or mouse coordinates). Define if the path needs to be updated of created
    */
    /*
    static draw(obj1, obj2) {

        const path = paths[obj1.ref];

        if (path == undefined) {
            new Path(obj1, obj2);
        } else {
            path.update(obj1, obj2);
        }

    }*/

    /*
    ** appends a new SVG <path> to the document with correct styling
    */
    /*
    create(type) {

        const [color, weight] = (type == 'data') ? ['white', '2'] : ['blue', '3'];
        const path = curve.getPath(this.leftPos, this.rightPos);

        element('<path id="'+this.ref+'" d="'+path+'" stroke="'+color+'" stroke-width="'+weight+'" fill="none"></path>').drawSVG();

    }*/

    /*
    ** updates the coordinates of the point that has changed and recalculates
    ** the curve to join the two points, updates SVG element
    */
    /*
    update(obj1, obj2) {

        if (obj2 instanceof Dock) { obj2 = obj2.pos; }

        if (obj1.isRight) { this.rightPos = obj2 } else { this.leftPos = obj2 }

        this.$.attr('d', curve.getPath(this.leftPos, this.rightPos))

    }*/

    /*
    ** removes path in DOM, in `paths` array and in the origin dock
    */
    /*
    remove(origin) {

        this.$.remove();
        delete paths[this.ref];
        origin.path.pop();

    }*/

    /*
    ** saves the target dock in path object, and vise versa. Also sets the
    ** correct occupied state for all docks involved, updates ref to unique id.
    */
    /*save(type, target) {

        this[(this.leftDock == undefined) ? 'leftDock' : 'rightDock'] = target;

        target.path.push(this);

        if (type == 'exe') {

            this.leftDock.occupied = true;

        } this.rightDock.occupied = true;


        delete paths[this.ref];
        this.$.attr('id', this.ref = this.leftDock.ref+'-'+this.rightDock.ref);
        if (paths[this.ref]) { this.$.remove() };
        paths[this.ref] = this;

    }*/

    /*
    ** edit the path by unsnapping its right side dock and returning the origin
    */
    /*edit() {

        this.leftDock.occupied = this.rightDock.occupied = false;
        this.rightDock.path.pop();

        delete paths[this.ref];
        this.$.attr('id', this.ref = this.leftDock.ref);
        paths[this.ref] = this;

        return [this.leftDock, this]

    }*/

    /*
    ** define the get method for path.$ (the SVG DOM element of the path) each
    ** time it is requested it needs to be selected with jQuery why all that?
    ** when a SVG element is added the <svg> is refreshed to allow SVG elements
    ** to appear on screen. This refresh breaks the link between the actual DOM
    ** element and the jQuery element making path.$ unusable.
    */
    /*get $() {
        return $('#'+this.ref)
    }*/

}; let link = {};
