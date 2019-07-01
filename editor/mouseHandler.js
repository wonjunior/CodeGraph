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

class MouseEventHandler {

    constructor(event, state) {

		if (State.debug) console.log('Mouse Clicked, path: ', event.path);

		this.state = state;

        this.watchElements(event);

    }

    watchElements(event) {

        const buttonName = MouseCode.get(event);

		const { not, ...on } = { ...this.state.mousebinds.all, ...this.state.mousebinds[ buttonName ] };

        this.checkSelectorsOn(event, Object.entries(on || {}));
        this.checkSelectorsOff(event, Object.entries(not || {}));

    }

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

    checkSelectorsOff(event, observedSelectors) {

		observedSelectors.forEach(([ observedSelector, callback ]) => {

			const noMatch = event.path.every(element => !(element.matches && element.matches(observedSelector)));

			if (noMatch) this.trigger({ callback, event, observedSelector });

		});

	}
	
	trigger({ callback, event, observedSelector, target = null }) { // ( { callback, ...arguments }), then callback.bind(this.state.data)(arguments)

		if (State.debug) console.log({ event, target, observedSelector });

		callback.bind(this.state.data)({ event, target, observedSelector });

	}

}