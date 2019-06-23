'use strict'

class Link {

    static separator = '-';
    static color = { data: '#4CAF50', exe: '#3F51B5' };
    static width = { data: 3, exe: 4 };

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

    constructor(startDock, endDock = undefined) {

		this.startDock = startDock;
		// <? use isData on the link fully -> the dockType of the link
        this.isData = startDock instanceof DataDock;
        // this.type = startDock.type;

        this.createLink();

        this.id = startDock.id;

        if (endDock) {

            this.endDock = endDock;
            this.update(endDock.position);
            this.set();

        }

        this.startDock.links.push(this);

        // right-sided data docks are never occupied
        startDock.occupied = !(startDock.isRight && startDock instanceof DataDock);

    };

    createLink() {

        let template = document.querySelector('template#link');
        template = document.importNode(template.content, true);

        this.linkElement = template.querySelector('path');

        const dataName = this.isData ? 'data' : 'exe';
        this.linkElement.style.stroke = Link.color[ dataName ];
        this.linkElement.style.strokeWidth = Link.width[ dataName ];

        Canvas.linkArea.appendChild(this.linkElement);

    };

    edit() {

        delete links[ this.id ];

        this.endDock.links = []; // reset the old endDock
        this.endDock.occupied = false;

        ControlFlow.update(this.endDock.node);

        delete this.endDock;

        return this;

    };

    static updateAll() {

        Object.entries(links).forEach(([ id, link ]) => {

            link.update();

        });

    };

    update(endPoint) {

        if (!endPoint) {

            this.path = Curve.get(this.startDock.position, this.endDock.position);

        } else if (this.startDock.isRight) {

            this.path = Curve.get(this.startDock.position, endPoint);

        } else {

            this.path = Curve.get(endPoint, this.startDock.position);

        }

    };

    // <? is there any refactoring possible here? use linkIndexStartDock = this.startDock.links.indexOf(link);
    remove() {

        // make sure the link is removed from links
        delete links[ this.id ];

        this.linkElement.remove();

        // make it a Dock method <Dock>.unpin(this) where this is <Link>
        const linkIndexStartDock = this.startDock.links.findIndex(link => link.id == this.id);
        this.startDock.links.splice(linkIndexStartDock, 1);

        this.startDock.occupied = false;

        if (this.endDock) {

            const linkIndexSnapDock = this.endDock.links.findIndex(link => link.id == this.id);
            this.endDock.links.splice(linkIndexSnapDock, 1);

            this.endDock.occupied = false;

        }

    };

    set() {

        // add to endDock
        this.endDock.links.push(this);
        this.endDock.occupied = true;

        // swap startDock and endDock if necessary
        if (this.endDock.isRight) {

            [ this.startDock, this.endDock ] = [ this.endDock, this.startDock ];

        }

        const linkId = this.startDock.id + Link.separator + this.endDock.id;
        this.id = linkId;

        // this link already exists
        if (links[ linkId ]) {

            this.remove();

        // link doesn't yet exist
        } else {

            links[ linkId ] = this;

            wait(() => ControlFlow.update(this.endDock.node));

        }

    };

    static destruct(link) {

        return [ link.startDock.id, link.endDock.id ];

    };

}; const links = {};
