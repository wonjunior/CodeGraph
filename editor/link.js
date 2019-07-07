'use strict'

/**
 * Represent a link object used to connect two nodes together
 */
class Link {

	static separator = '-';
	static parameters = {
		data: { width: 3, stroke: '#4CAF50' },
		exe: { width: 4, stroke: '#3F51B5' },
	}

	/**
	 * Hash object containing all instanciated and set links.
	 */
	static all = {};

	/**
	 * Gets all values from the `Link.all` hash.
	 */
	static get values() {

		return Object.values(Link.all);

	}

	/**
	 * Gets the link's unique identifier.
	 */
	get id() {

		return (this.element.link) ? this.element.link.id : undefined;

 	}

	/**
	 * Sets the link's id on its HTML element.
	 */
 	set id(newId) {

		this.element.link.id = newId;

 	}

	/**
	 * Retrieves the svg path string expression.
	 */
	get path() {

		return this.element.link.getAttribute('d');

	}

	/**
	 * Updates the position of the link's svg path.
	 */
	set path(newPath) {

		this.element.link.setAttribute('d', newPath);

	}
	
	/**
	 * Gets the stroke value from the link html element's styles.
	 */
	get stroke() {

		return this.element.link.style.stroke;

	}

	/**
	 * Updates the link's drawing stroke.
	 */
	set stroke(newStroke) {

		this.element.link.style.stroke = newStroke;

	}

	/**
	 * Gets the stroke width from the link html element's styles.
	 */
	get width() {

		return this.element.link.style.strokeWidth;

	}

	/**
	 * Updates the link's drawing stroke width.
	 */
	set width(newWidth) {

		this.element.link.style.strokeWidth = newWidth;

	}

	/**
	 * Adds a new link object to the Canvas.
	 * @param {Dock} startDock the dock from where the link has been pulled
	 * @param {Dock || undefined} endDock a dock instance if the second dock is already known, else `undefined`
	 */
	constructor(startDock, endDock) {
		
		if (startDock.occupiedAndUnique()) {
			
			const link = startDock.links.first.edit();
			if (!endDock) return link;

			link.destroy();

		}
		
		this.startDock = startDock;
		this.isData = startDock instanceof DataDock;
		
		this.createLink();
		
		this.id = startDock.id;
		
		this.startDock.addLink(this);
		
		if (endDock) this.setEndDock(endDock);

    }

	/**
	 * 
	 * @param {Dock} endDock 
	 */
	setEndDock(endDock) {
		
		if (!this.startDock.isCompatible(endDock)) this.destroy();

		this.endDock = endDock;

		this.set();
		
		this.update();

	}

	/**
     * Creates the link's HTML element and renders it on the canvas. All HTML elements that are needed
	 * are saved as HTML objects in the link's instance.
	 */
    createLink() {

        const $ = Template.link();

        this.element = {
			link: $('path')
		};

		Object.assign(this, Link.parameters[this.isData ? 'data' : 'exe']);

        Canvas.linkArea.appendChild(this.element.link);

    }

    edit() {

        delete Link.all[ this.id ];

        this.endDock.dropLink();

        // ControlFlow.update(this.endDock.node);

		delete this.endDock;

        return this;

    }

    update(position) {

        if (!position) {

            this.path = Curve.calculate(this.startDock.position, this.endDock.position);

        } else if (this.startDock.isRight) {

            this.path = Curve.calculate(this.startDock.position, position);

        } else {

            this.path = Curve.calculate(position, this.startDock.position);

        }

    }

    set() {

		this.endDock.popExistingLink();

        this.endDock.addLink(this);

        if (this.endDock.isRight) this.swapDocks();

        this.id = this.constructId();

		Link.all[ this.id ] = this;

    }

	swapDocks() {

		[ this.startDock, this.endDock ] = [ this.endDock, this.startDock ];

	}

	destroy() {

        delete Link.all[ this.id ];

        this.element.link.remove();

		this.startDock.dropLink(this);

        if (this.endDock) this.endDock.dropLink(this);

    }

	constructId() {

		return this.startDock.id + Link.separator + this.endDock.id;

	}

    serialize() {

        return [ this.startDock.id, this.endDock.id ];

	}
	
	static update() {

        Link.values.forEach(link => link.update());

    }

}