'use strict'

/**
 * Helper class that associates mouse button codes codes with their names
 */
class MouseCode {

	/**
	 * Hash table mapping mouse codes and mouse buttons
	 */
	static list = {
		0: 'left',
		1: 'middle',
		2: 'right'
	}

	/**
	 * Gives the button name associated with the mouse code
	 * @param {Event} event a document event
	 */
    static get({ button }) {

        return MouseCode.list[ button ];

    }

}

/**
 * Any events of type `MouseEvent`, triggered on the document, are handled here.
 */
class MouseEventHandler {

	/**
	 * A new instance is created everytime the mouse is clicked.
	 * @param {MouseEvent} event the event that needs to be handled
	 * @param {State} state the state that will respond to this event
	 */
	constructor(event, state) {

		if (State.debug) console.log('Mouse Clicked, bubble path: ', event.path);

		this.state = state;

		this.watchElements(event);

	}

	/**
	 * Depending on the key that was pressed, check for "on-element" and "off-element" triggers. 
	 * @param {MouseEvent} event 
	 */
	watchElements(event) {

		const buttonName = MouseCode.get(event);

		const { not, ...on } = { ...this.state.mousebinds.all, ...this.state.mousebinds[ buttonName ] };

		this.checkSelectorsOn(event, Object.entries(on || {}));
 		this.checkSelectorsOff(event, Object.entries(not || {}));

	}

	/**
	 * Finds the event handler that is the closest one to the element that fired the event, then calls its callback.
	 * @param {MouseEvent} event 
	 * @param {Object} observedSelectors contains the selectors as keys and callbacks as values
	 */
	checkSelectorsOn(event, observedSelectors) {

		const matches = observedSelectors.map(([ observedSelector, callback ]) => {

			const matchIndex = event.path.findIndex(target => target.matches && target.matches(observedSelector));

			return !~matchIndex ? null : { 
				distance: matchIndex, 
				target: event.path[ matchIndex ],
				callback, 
				event, 
				observedSelector
			};

		}).filter(Boolean);

		const closestMatchIndex = matches.reduce((min, { distance }, i, a) => distance < a[min].distance ? i : min, 0)

		if (matches.length) this.trigger(matches[ closestMatchIndex ]);

    }

	/**
	 * Finds the event handlers that are not in the event element tree then calls their callbacks
	 * @param {MouseEvent} event 
	 * @param {Object} observedSelectors contains the selectors as keys and callbacks as values
	 */
    checkSelectorsOff(event, observedSelectors) {

		observedSelectors.forEach(([ observedSelector, callback ]) => {

			const noMatch = event.path.every(element => !(element.matches && element.matches(observedSelector)));

			if (noMatch) this.trigger({ callback, event, observedSelector });

		});

	}
	
	/**
	 * Executes the given callback binded to the state's data object
	 * @param {Object} param1 contains information regarding the event: the `event` object itself, the selector that caught the event and the target element
	 * as well as the actual function that needs to be called: `callback`. 
	 */
	trigger({ callback, event, observedSelector, target = null }) { // ( { callback, ...arguments }), then callback.bind(this.state.data)(arguments)

		if (State.debug) console.log({ event, observedSelector, target });

		callback.bind(this.state.data)({ event, observedSelector, target });

	}

}