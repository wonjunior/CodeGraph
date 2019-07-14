'use strict'

class NodeElement extends Element {

	/**
	 * Getter/Setter for `NodeElement#headerColor`, the node's header background color.
	 */
	get headerColor() { 
		
		return this.header.style.background;
	
	}

	set headerColor(color) {

		this.header.style.background = color;
	
	}

	/**
	 * Getter for `NodeElement#size`, the width and length of the node's container returned as an array.
	 */
	get size() {
		
		const properties = this.container.getBoundingClientRect();

		return [ properties.width, properties.height ];

	}

 	/**
	 * Setter which adds or remove the `"selected"` class name the node's container.
	 */
	set highlight(bool) { 
		
		this.element.container.classList[ bool ? 'add' : 'remove' ]('selected'); 
	
	}

	/**
     * Getter for `Node#position` which returns the x and y coordinates of the node's position on the canvas
     */
    get position() {

        return [ this.container.style.left, this.container.style.top ].map(parseFloat);

    }

	/**
	 * Setter to update the absolute position of the node container on the parent canvas.
	 */
	set position([ x, y ] = [ 0, 0 ]) { 
		
		Object.assign(this.container.style, { left: `${x}px`, top: `${y}px` });

	}

	/**
	 * Getter/Setter callback definitions delegated to `Node`.
	 */
	callbacks = {
		
		/**
		 * Sets the text on the node's header section.
		 */
		label(label) { this.label.textContent = label },

		/**
		 * Sets the text displayed on the node's background
		 */
		background(background) { this.background.textContent = background },

	}
		
	constructor(node, parent, parameters) {

		super(node, parent, parameters.select('headerColor', 'position', 'hideBody', 'hideHeader'));

		this.render();

		this.observe(node);

	}

	/**
	 * Creates the node's HTML element. All HTML elements that are needed are saved as HTML objects 
	 * in the NodeElement instance. The property element contains the following elements:
	 * { `node`, `header`, `label`, `headLeft`, `headRight`, `bodyLeft`, `bodyRight`, `background` }
	 * @override
	 */
	create(node) {

		const $ = Template.node();

		Object.assign(this, {
			container: $('.node-container'),
			header: $('.header'),
			label: $('.header-title'),
			headLeft: $('.header-block > .left-block'),
			headRight: $('.header-block > .right-block'),
			bodyLeft: $('.body > .left-block'),
			bodyRight: $('.body > .right-block'),
			background: $('.body > .background')
		});
		
		this.header.ref = node.id;
		this.container.id = node.id;

		if (this.hideBody) this.hide('body');
		if (this.hideHeader) this.hide('header');

	}

	/**
	 * Clamps the provided [x, y] position so the node container remains inside its parent canvas area.
	 */
	boundaryClamp(position) {

		return position.map((value, i) => {

			const [ minLimit, maxLimit ] = [ 0, (Canvas.size[i] - this.size[i]) / Canvas.zoomLevel ];

			return value <= minLimit ? minLimit : (value >= maxLimit ? maxLimit : value);

		});

	}

	/**
	 * Hides the corresponding node portion
	 * @param {string} part is either `"head"` or `"body"`
	 */
	hide(part) {

		this.container.classList.add(`hide-${part}`);

	}

	/**
	 * Toggles the `"selected"` class name on the node's container element.
	 * @returns {Boolean} - the state of the node, i.e. if it is selected or not
	 */
	toggleHighlight() {
		
		return this.container.classList.toggle('selected');

	}

}