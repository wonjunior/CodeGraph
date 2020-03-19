'use strict'

/**
 * HTML Element factory for docks, nodes and links.
 */
class Template {

  /**
   * Retrieves the template from the DOM then clones its content.
   * @param {String} name template's name
   * @return a `querySelector` binded to the cloned HTML element
   */
  static import(name) {

    const template = document.querySelector(`template#${name}`);

    const element = document.importNode(template.content, true);

    return element.querySelector.bind(element);

  }

}

/**
 * Add a method for each type of template.
 */
[ 'node', 'dock', 'link', 'canvas' ].forEach(template => {

  Template[ template ] = () => Template.import(template);

});