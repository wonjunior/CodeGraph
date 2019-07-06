'use strict'

/**
 * Handles the dragging behavior of links in UI. Anytime the user is interacting with a link
 * a new instance of this class is created and takes care of initiating and closing mouse events
 * 
 * @todo feat: add event hooks
 * @todo bug: when linking and alt-switching the view, the link not tracked anymore
 */
class Linkable {

	/**
	 * When creating an event the link is not snapped by default
	 */
	snapped = false;

	/**
	 * Creates a new event handler for the linking behavior
	 * @param {MouseEvent} event the event that triggered Linkable
	 * @param {Dock} startDock the dock from which the event is initiated
	 */
    constructor(e, startDock) {

        this.link = startDock.getLink();

        this.startLinking(e);

    }

	/**
	 * Initiates the mouse event listeners and binds the callbacks
	 */
    startLinking(e) {

		Linkable.mousemove = e => this.linking(e);
		Linkable.mousemove(e)
        document.addEventListener('mousemove', Linkable.mousemove);

        Linkable.mouseup = e => this.endLink(e);
        document.addEventListener('mouseup', Linkable.mouseup, { once: true });

    }

	/**
	 * 
	 * @param {*} e 
	 */
    linking(e) {

		// [!] mouse is on a snap area
        if (e.target.matches('.snap-dock')) {

            // [!] mouse just entered the snap area
            if (!this.snapped) {

                const endDock = Dock.all[ e.target.ref ];

                // snapping can occur
                if (this.link.startDock.isCompatible(endDock)) {

                    this.snap(endDock);
					
					// snapping cannot occur
                } else {
					
					_('1')
                    this.trackMouse(e);

                }

			// [!] mouse is already in the snap area 
            } else {

                // this.link.update(this.endDock.position);

            }

        // [!] mouse is not on snap area
        } else {

			// [!] mouse just left the snap area
            if (this.snapped) {

				this.snapped = false;

            }

            this.trackMouse(e);

        }

	}
	
	trackMouse(event) {

		_('2')
		this.link.update(View.mousePosition(event));

	}

    snap(endDock) {

        this.snapped = true;
        this.link.endDock = endDock;
        this.link.update(endDock.position);

    }

    endLink() {

        if (this.snapped) {

			// this.popExistingIfNeeded()
			const endDock = this.link.endDock;
			
			if (endDock.occupiedAndUnique()) {
				
				endDock.links.first.remove();

            }

            this.link.set();

        } else {

            this.link.remove();

        }

        document.removeEventListener('mousemove', Linkable.mousemove);

    }

}