'use strict'

/**
 * Helper class that associates key codes with their names
 */
class KeyCode {

  /**
   * Hash table mapping key codes and key names
   */
  static list;

  /**
   * Gives the key combination name corresponding to provided Event
   * @param {Event} event a document event
   */
  static get({ keyCode, ctrlKey, shiftKey, altKey }) {

    const modKey = (ctrlKey ? 'ctrl_' : '') + (shiftKey ? 'shift_' : '') + (altKey ? 'alt_' : '');

    return KeyCode.list[ keyCode ] ? (modKey + KeyCode.list[ keyCode ]) : null;

  }

}