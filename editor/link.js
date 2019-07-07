'use strict'

/**
 * Data structure to hold registered links
 */
class Links {

	/**
	 * The actual object holding the Link instances.
	 */
	static all = {};

	/**
	 * Gets all values from the `Links` hash.
	 */
	static get values() {

		return Object.values(Links.all);

	}

	static register(link) {

		link.id = link.constructId();

		Links.all[ link.id ] = link;

		// _('UPDATE')

	}

	static unregister() {

		delete Links.all[ link.id ];

		// _('UPDATE')

	}

}

/**
 * Represent a link object used to connect two nodes together
 * Edited links (those that don't yet have an end dock are not registered in `Links`)
 */
class Link {

	static separator = '-';
	static parameters = {
		data: { width: 3, stroke: '#4CAF50' },
		exe: { width: 4, stroke: '#3F51B5' },
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
	 * Adds a new link object to the Canvas or edit a link if already exists
	 * @param {Dock} startDock the dock from where the link has been pulled
	 * @param {Dock || undefined} endDock a dock instance if the second dock is already known, else `undefined`
	 */
	constructor(startDock, endDock) {
		
		this.startDock = startDock;
		this.isData = startDock instanceof DataDock;

		if (startDock.occupiedAndUnique()) {
			
			const link = this.editExistingLink(endDock);
			if (link) return link;

		}
		
		this.createLink();
		
		this.id = startDock.id;
		
		this.startDock.addLink(this);
		
		if (endDock) this.setEndDock(endDock);

    }

	/**
	 * Deletes the existing link if the provided endDock is defined, else return this link.
	 * @param {Dock} endDock
	 */
	editExistingLink(endDock) {
		
		const link = this.unpinExistingLink();
		
		return endDock ? link.destroy() : link;

	}

	/**
	 * Returns the existing link hosted by the link's startDock.
	 */
	unpinExistingLink() {



		return this.startDock.links.first.unpin();

	}

	/**
	 * Check if endDock is compatible with link then save the link on the dock.
	 * @param {Dock} endDock 
	 */
	setEndDock(endDock) {
		
		if (!this.startDock.isCompatible(endDock)) this.destroy();

		this.endDock = endDock;

		this.pin();
		
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

	/**
	 * Remove the link from its endDock's links, unregister the link then return it.
	 * @returns the link that is edited
	 */
    unpin() {

        this.endDock.dropLink();

        Links.unregister(this);

		delete this.endDock;

        return this;

    }

	/**
	 * Adds the link to the endDock's links, swap docks if necessary and register it.
	 */
    pin() {

		this.endDock.popExistingLink();
		
		this.endDock.addLink(this);
		
		if (this.endDock.isRight) this.swapDocks();
		
		Links.register(this);
	
	}

	/**
	 * Updates the link's svg representation.
	 * @param {Array<Number>} position an array of two numbers
	 */
    update(position) {
		
		if (!position) {
			
			this.path = Curve.calculate(this.startDock.position, this.endDock.position);
		
		} else if (this.startDock.isRight) {

			this.path = Curve.calculate(this.startDock.position, position);

		} else {

			this.path = Curve.calculate(position, this.startDock.position);

		}

	}

	/**
	 * Swaps out startDock and endDock.
	 */
	swapDocks() {

		[ this.startDock, this.endDock ] = [ this.endDock, this.startDock ];

	}

	/**
	 * Unregisters the link, deletes the HTML object and unpins from start and end docks.
	 */
	destroy() {

		Links.unregister(this);
		
		this.element.link.remove();
		
		this.startDock.dropLink(this);
		
		if (this.endDock) this.endDock.dropLink(this);
	
	}

	/**
	 * Constructs an unique string to identify the link.
	 * @returns {String} the link's id
	 */
	constructId() {
		
		return this.startDock.id + Link.separator + this.endDock.id;

	}

	/**
	 * Serialiser simply returns an array of the start and end docks' id.
	 */
    serialize() {
		
		return [ this.startDock.id, this.endDock.id ];

	}
	
	/**
	 * Update all of registered links.
	 */
	static update() {
		
		Links.values.forEach(link => link.update());
	
	}

}