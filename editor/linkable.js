'use strict'

/**
 * Handles the dragging behavior of links in UI. Anytime the user is interacting with a link
 * a new instance of this class is created and takes care of initiating and closing mouse events.
 * 
 * @todo feat: add event hooks
 * @todo bug: when linking and alt-switching the view, the link not tracked anymore
 */
class Linkable {

	/**
	 * When creating an event the link is not snapped by default.
	 */
	snapped = false;

	/**
	 * Creates a new event handler for the linking behavior and initiates the mouse event listeners.
	 * @param {MouseEvent} event the event that triggered Linkable
	 * @param {Dock} startDock the dock from which the event is initiated
	 */
    constructor(e, startDock) {

        this.link = startDock.getLink();

        document.addEventListener('mousemove', this.mouseMove);

        document.addEventListener('mouseup', this.mouseUp, { once: true });

    }
	
	mouseMove = (e) => {

		this.insideSnapArea(e) ? this.mouseIn(e) : this.mouseOut(e);

	}

	mouseIn(e) {

		if (!this.snapped) this.mouseEnter(e);

	}

	mouseOut(e) {

		if (this.snapped) this.mouseLeave(e);

		this.trackMouse(e);

	}

	mouseEnter(e) {
		
		const endDock = Dock.all[ e.target.ref ];

		this.canSnap(endDock) ? this.snap(endDock) : this.trackMouse(e);
		
	}

	mouseLeave(e) {

		this.snapped = false;

	}

	mouseUp = () => {

		this.snapped ? this.mouseUpIn() : this.mouseUpOut();

		document.removeEventListener('mousemove', this.mouseMove);

	}

	mouseUpIn() {
		
		this.popExistingLink();
		
		this.link.set();

	}

	mouseUpOut() {
		
		this.link.remove();

	}

	popExistingLink() {
		
		const endDock = this.link.endDock;
						
		if (endDock.occupiedAndUnique()) endDock.links.first.remove();

	}

	canSnap(endDock) {

		return this.link.startDock.isCompatible(endDock);

	}

	insideSnapArea(e) {

		return e.target.matches('.snap-dock');

	}

	trackMouse(event) {

		this.link.update(View.mousePosition(event));

	}

	trackDock(dock) {

		this.link.update(dock.position);

	}

    snap(endDock) {

        this.snapped = true;
        this.link.endDock = endDock;
        this.trackDock(endDock);

    }

}