'use strict'

/**
 * Helper class that associates mouse button codes codes with their names
 */
class MouseCode {

  /**
   * Hash table mapping mouse codes and mouse buttons
   */
  static list;

  /**
   * Gives the button name associated with the mouse code
   * @param {Event} event a document event
   */
  static get({ button }) {

    return MouseCode.list[ button ];

  }

}