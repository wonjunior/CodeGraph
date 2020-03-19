'use strict'

class MouseWheelEventHandler extends MouseEventHandler {

	constructor(event, state) {

		super(event, state);

	}

	/**
	 *
	 * @overrides MouseEventHandler#trigger
	 */
  trigger({ callback, event, selector, target = null }) {

    callback.bind(this.state.data)({ event, selector, target, direction: Math.sign(event.deltaY) });

  }

}