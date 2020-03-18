'use strict'

class KeyEventHandler {

  constructor(event, state) {

    this.state = state;

    const keyName = KeyCode.get(event);

    this.checkKeybinds(keyName);

  }

  checkKeybinds(keyName) {

    const eventCallback = this.state.keybinds[ keyName ] || this.state.keybinds[ 'alphabet' ];

    if (eventCallback) eventCallback.bind(this.state.data)(event);

  }

}