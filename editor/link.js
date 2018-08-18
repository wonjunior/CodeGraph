'use strict'

class Link {

    get id() {

        return (this.linkElement) ? this.linkElement.id : undefined;

    };

    set id(newId) {

        this.linkElement.id = newId; // <? catch?

    };

    get path() {

        return this.linkElement.getAttribute('d');

    };

    set path(newPath) {

        this.linkElement.setAttribute('d', newPath);

    }

    constructor(startDock, snapDock = undefined) {

        this.startDock = startDock;
        this.type = startDock.type;

        this.createLink();

        this.id = startDock.id;

        if (snapDock) {

            this.snapDock = snapDock;
            this.update(snapDock.position);
            this.set();

        }

        this.startDock.link.push(this);

        // right-sided data docks are never occupied
        startDock.occupied = !(startDock.isRight && startDock.type == 'data');

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

    static updateAll() {

        Object.entries(link).forEach(([ id, link ]) => {

            link.update();

        });

    };

    update(endPoint) {

        if (!endPoint) {

            this.path = Curve.get(this.startDock.position, this.snapDock.position);

        } else if (this.startDock.isRight) {

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

    };

    set() {

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

    };

    static destruct(link) {

        return [ link.startDock.id, link.snapDock.id ];

    };

}; let link = {};

Object.assign(Link, {

    separator: '-',

    color: {
        data: 'green',
        exe: 'blue'
    },

    width: {
        data: 3,
        exe: 4
    }

});
