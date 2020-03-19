'use strict'

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

    $.Event.log(`┌── new <MouseEventHandler> state = ${State.current.id.toString()}`);
    $.Event.pipe();
    $.Event.log('(1) bubble path:', [event.path]);

    this.state = state;

    this.checkSelectors(event);

    $.Event.unindent();
    $.Event.log(`└──/ <MouseEventHandler> ended`);

  }

  /**
   * Depending on the key that was pressed, check for "on-element" and "off-element" triggers.
   * @param {MouseEvent} event
   */
  checkSelectors(event) {

    const buttonName = MouseCode.get(event);

    const { not, ...on } = { ...this.state.mousebinds.all, ...this.state.mousebinds[ buttonName ] };

    $.Event.log(`(2) candidates for "${buttonName} mouse button":`);

    $.Event.indent();
    $.Event.log('└──> (on-candidates)', Object.keys(on || {}));
    this.checkSelectorsOn(event, Object.entries(on || {}));

    $.Event.log('└──> (not on el.)', Object.keys(not || {}));
    this.checkSelectorsOff(event, Object.entries(not || {}));
    $.Event.unindent();

  }

  /**
   * Finds the event handler that is the closest one to the element that fired the event, then calls its callback.
   * @param {MouseEvent} event
   * @param {Object} candidates contains the selectors as keys and callbacks as values
   */
  checkSelectorsOn(event, candidates) {

    const matches = candidates.map(([ selector, callback ]) => {

      const matchIndex = event.path.findIndex(target => target.matches && target.matches(selector));

      return ~matchIndex
        ? { distance: matchIndex, target: event.path[ matchIndex ], callback, event, selector }
        : null;

    }).filter(Boolean);

    $.Event.indent();
    $.Event.log(`(1) cross match`, matches.map(({target, distance}) => `.${target.classList}#${target.id} (d=${distance})`));

    if (matches.length) {
      const match = matches.reduce((min, curr) => curr.distance < min.distance ? curr : min);
      $.Event.log(`(2) closest match`, match.target);
      $.Event.log(`(3) executing callback`);
      $.Event.unindent();
      return this.trigger(match);
    }

    $.Event.log('(2) no match, exiting.')
    $.Event.unindent();

  }

  /**
   * Finds the event handlers that are not in the event element tree then calls their callbacks
   * @param {MouseEvent} event
   * @param {Object} selectors contains the selectors as keys and callbacks as values
   */
  checkSelectorsOff(event, selectors) {

    $.Event.indent();
    $.Event.log(`(1) checking for selectors with zero match to elements of event path`);

    selectors.forEach(([ selector, callback ]) => {

      const noMatch = event.path.every(element => !(element.matches && element.matches(selector)));

      if (noMatch) {
        $.Event.indent();
        $.Event.log('- not a single match for', selector, 'executing callback');
        $.Event.unindent();
        this.trigger({ callback, event, selector });
      }

    });

    $.Event.unindent();

  }

  /**
   * Executes the given callback binded to the state's data object
   * @param {Object} param1 contains information regarding the event: the `event` object itself, the selector that caught the event and the target element
   * as well as the actual function that needs to be called: `callback`.
   */
  trigger({ callback, event, selector, target = null }) { // ( { callback, ...arguments }), then callback.bind(this.state.data)(arguments)

    callback.bind(this.state.data)({ event, selector, target });

  }

}