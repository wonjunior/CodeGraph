'use strict'

class Template {

	static get(name) {

		const template = document.querySelector(`template#${name}`);
		
		const element = document.importNode(template.content, true);

		return element.querySelector.bind(element);

	}

	static node() {

		return Template.get('node');

	}

}