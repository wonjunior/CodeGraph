'use strict'

/**
 * HTML Element factory for frequently created/used/rendered elements such as docks and nodes.
 */
class Template {
	
	static get(name) {

		const template = document.querySelector(`template#${name}`);
		
		const element = document.importNode(template.content, true);

		return element.querySelector.bind(element);

	}

}

/**
 * Add a method for each type of template.
 */
[ 'node', 'dock' ].forEach(template => {

	Template[ template ] = () => Template.get(template);

});