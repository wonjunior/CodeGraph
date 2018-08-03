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

    constructor({ startDock, snapDock = undefined, type, id }) {

        this.startDock = startDock;
        this.type = type;

        this.createLink();

        this.id = id;

        if (snapDock) {

            this.snapDock = snapDock;
            this.update(snapDock.position);
            this.save(snapDock);

        }

    };

    createLink() {

        let template = document.querySelector('template#link');
        template = document.importNode(template.content, true);

        this.linkElement = template.querySelector('path');
        this.linkElement.style.stroke = Link.color[ this.type ];
        this.linkElement.style.strokeWidth = Link.width[ this.type ];

        Canvas.linkArea.appendChild(this.linkElement);

    };

    edit() {

        delete link[ this.id ];

        this.snapDock.link = []; // reset the old snapDock
        this.snapDock.occupied = false;

        delete this.snapDock;

        return this;

    };

    update(endPoint) {

        if (this.startDock.isRight) {

            this.path = Curve.get(this.startDock.position, endPoint);

        } else {

            this.path = Curve.get(endPoint, this.startDock.position);

        }

    };

    remove() {

        this.linkElement.remove();

        // make it a Dock method <Dock>.unpin(this) where this is <Link>
        const linkIndexStartDock = this.startDock.link.findIndex(link => link.id == this.id);
        this.startDock.link.splice(linkIndexStartDock, 1);

        this.startDock.occupied = false;

        if (this.snapDock) {

            const linkIndexSnapDock = this.snapDock.link.findIndex(link => link.id == this.id);
            this.snapDock.link.splice(linkIndexSnapDock, 1);

            this.snapDock.occupied = false;

        }

    }

    save() {

        this.snapDock.link.push(this); // <- add to snapDock
        this.snapDock.occupied = true;

        // swap startDock and snapDock if necessary
        if (this.snapDock.isRight) {

            [ this.startDock, this.snapDock ] = [ this.snapDock, this.startDock ];

        }

        const linkId = this.startDock.id + Link.separator + this.snapDock.id;
        this.id = linkId;

        // this link already exists
        if (link[ linkId ]) {

            this.remove();

        // link doesn't yet exist
        } else {

            link[ linkId ] = this;

        }

    }

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

Link.separator = '-';
Link.color = {
    data: 'green',
    exe: 'blue'
}
Link.width = {
    data: 3,
    exe: 4
}
