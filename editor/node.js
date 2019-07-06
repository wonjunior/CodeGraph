'use strict'

/**
 * dd
 */
class Node {
	
	static all = {};
	
    static idOfLast = 1;
	static idPrefix = 'n';

    /**
     * Depending on the number of nodes already created, the function will create a new node identifier. This id
     * includes the idPrefix specific to Node.
     */
    static createId() {

        return Node.idPrefix + Node.idOfLast++;

    }

    /**
     * Counts the number of instantiated nodes
     */
    static get length() {

        return Object.keys(Node.all).length;

    }

    /**
     * Getter for `Node#label` which gets the node's displayed label
     */
    get label() {

        // gets the string label directly from the DOM element
        return this.element.label.textContent;

    }

    /**
     * Setter for `Node#label` which sets the node's displayed label
     */
    set label(newLabel) {

        this.element.label.textContent = newLabel;

    }

    /**
     * Getter for `Node#position` which returns the x and y coordinates of the node's position on the Canvas
     */
    get position() {

		// gets the position directly from inline-style and converts it into an array of numbers
        return [ this.element.node.style.left, this.element.node.style.top ].map(parseFloat);

    }

    /**
     * Setter for `Node#position` which sets the position of the node in the Canvas
     */
    set position([ x, y ]) {

        // coerces the two coordinates into string applied to the node's style
        this.element.node.style.left = x + 'px';
        this.element.node.style.top = y + 'px';

    }

    /**
     * Getter for `Node#headerColor` to get the color of the node's header
     */
    get headerColor() {

        return this.element.header.style.background;

    }

    /**
     * Setter for `Node#headerColor` to change the color of the node's header
     */
    set headerColor(newColor) {

        this.element.header.style.background = newColor;

    }

	/**
	 * Getter for `Node#background` which returns the text displayed in the node's background
	 */
	get background() {

		return this.element.background.textContent;

	}

	/**
	 * Getter for `Node#background` to change the text displayed as the node's background
	 */
	set background(newBackground) {

		this.element.background.textContent = newBackground;

	}

    /**
     * Getter for `Node#size` to get the size of the node container element as an array `[width, height]`
     */
    get size() {

		const properties = this.element.node.getBoundingClientRect();
		
        return [ properties.width, properties.height ];

    }

    /**
     * Setter which updates the node's class depending on the provided boolean
     */
    set highlight(bool) {

        this.element.node.classList[ bool ? 'add' : 'remove' ]('selected');

    }

	/**
	 * Hides the corresponding node portion
	 * @param {string} part is either `"head"` or `"body"`
	 */
	hide(part) {

		this.element.node.classList.add(`hide-${part}`);

	}

    /**
     * Toggles the class on the node's container element
     * @returns {Boolean} - whether the class has been added or removed
     */
    toggleHighlight() {

        return this.element.node.classList.toggle('selected');

    }

    /**
     * Node instance constructor which takes in an node object and:
     * (1) adds the properties to the Node's instance
     * (2) creates and renders the node's element on the canvas
     * (3) appends the instance to the node object
     * @param {Object | Node} parameters - an object containing all the necessary properties
	 * to define a node or an actual instance of `Node`.
     */
    constructor(parameters) {

		// call the Executable's constructor if this is not an instance of Executable but is supposed to be
		if (!(this instanceof Executable) && parameters.executable) return new Executable(parameters);

        // destructure the parameters into distinct variables
		const { name, header, hideHeader, hideBody, background, position, process, getters, exeDocks } = parameters;

        // first set of properties assigned to the instance
        Object.assign(this, {
            id: Node.createId(),
			element: {},
			process: { 
				function: process.function,
				string: process.string,
			},
			hideHeader: !!hideHeader,
			hideBody: !!hideBody,
        });
		
        // creating the actual HTML node element
        this.createNode();
		
		// second set of property assignments for styling. They are all involving setters which need
		// the HTML element to exist in order to manipulate its style
        Object.assign(this, {
			background,
            headerColor: header,
            label: name,
            position: position || [0, 0],
        });

        // create and render all of the node's docks with their HTML elements
        this.createDocks(process, getters, exeDocks);

        // adds this Node instance to the object of instances, it can be accessed with the unique id
        Node.all[ this.id ] = this;

        // attach the process component to the node's instance
        // const interpreter = new Process(this);
        // this.process.calculate = interpreter.calculate.bind(interpreter);

    }
	
	/**
	 * From the docks properties, the method instanciates all the Dock objects. The method is instanciating 
	 * them by side and by type by accessing the `Dock`'s attributes object. Then for each element in 
	 * `dockDefinition` it calls `Dock`'s constructor and adds the dock's reference to the node's properties.
	 * @param {Object} dockDefinition - contains `exeDocks` and `dataDocks`
	 * 
	 * @todo is this really necessary, can we not save exeDocks et dataDocks in `ControlFlow` and `Process`
	 */
	createDocks({ result, params = [] }, getters = [], exeDocks = {}) {

		this.exeDocks = {
			in: Dock.create(exeDocks.in || [], 'in', ExeDock, this),
			out: Dock.create(exeDocks.out || [], 'out', ExeDock, this)
		}

		this.process.result = Dock.create([ result ], 'out', DataDock, this)[0];
		this.process.params = Dock.create(params, 'in', DataDock, this);
		this.getters = Dock.create(getters, 'out', GetterDock, this);
		
		this.dataDocks = {
			in: this.process.params,
			out: [ this.process.result, ...this.getters ]
		}

		this.docks = [ ...this.exeDocks.in, ...this.exeDocks.out, ...this.dataDocks.in, ...this.dataDocks.out ];
		
	}

    /**
     * Creates the node's HTML element and renders it on the canvas. All used HTML elements are saved
	 * as HTML objects in the node instance. The property element contains the following elements:
	 * { `node`, `header`, `label`, `headLeft`, `headRight`, `bodyLeft`, `bodyRight`, `background` }
	 */
    createNode() {

		// retrieve the node HTML template
        const $ = Template.node();

		// bind HTML elements to JS instance
        Object.assign(this.element, {
            node: $('.node-container'),
			header: $('.header'),
            label: $('.header-title'),
            headLeft: $('.header-block > .left-block'),
            headRight: $('.header-block > .right-block'),
            bodyLeft: $('.body > .left-block'),
			bodyRight: $('.body > .right-block'),
			background: $('.body > .background')
		});
		
		// bind JS instance to HTML element 
        this.element.header.ref = this.id;	// <? is this needed
		this.element.node.id = this.id;

		// hide parts if necessary
		if (this.hideBody) this.hide('body');
		if (this.hideHeader) this.hide('header');

		// append the node to the canvas
        Canvas.nodeArea.appendChild(this.element.node);

    }

    /**
     * This method updates all links connected to all docks of the node
     */
    update() {

        this.docks.forEach(dock => {

            dock.links.forEach(link => {

				// get the path expression from the static `Curve.calculate` and change the link's path 
				// directly by utilising the `Link#path` setter which updates the SVG element
                link.path = Curve.calculate(link.startDock.position, link.endDock.position);

            });

        });

    }

    /**
     * This method removes the node and all its attached links
     */
    remove() {

        // remove all the attached links
        this.docks.forEach(dock => {

            dock.links.forEach(link => {

                link.remove();

            });

        });

        // removes the node instance from the nodes object
        delete Node.all[ this.id ];

        // remove the HTML element from the DOM
        this.element.node.remove();

    }

	draggableBoundaryClamp(position) {

        // clamp the node's position: it cannot go outside the canvas area
        return position.map((value, i) => {

            const minLimit = 0;
            const maxLimit = (Canvas.size[i] - this.size[i]) / Canvas.zoomLevel;
			
			// here's where the clamp is actually happening
			return value <= minLimit ? minLimit : (value >= maxLimit ? maxLimit : value);

        });

    };

    /**
     * This static method destructs the given node object into a non circular object.
     * Because node's have a property Node#docks which contains references to itself this
     * circular structure cannot be stringified by the saving mechanism. Thefore this method
     * has to modify the object by destructuring the node's dock instances into dock objects.
     * @param {Node} { exeDocks, dataDocks, docks, headerColor, label, position, ...rest } -
     * exeDocks, dataDocks and docks have circular structures. headerColor, label and position
     * are  getters (they are not iterable i.e not in rest which contains all other properties.
     * @returns {object} { exeDocks, dataDocks, headerColor, label and position, ...rest } -
     * the returned object doesn't contain dock: the array of Dock instances, as it is not
     * needed in the saved node object
     */
    static destruct({ exeDocks, dataDocks, docks, headerColor, label, position, ...rest }) {

        // exeDocks and dataDocks are modified by Dock's own destruct method
        // to convert the Docks objects into non circular dock objects
    	exeDocks = Dock.destruct(exeDocks);
    	dataDocks = Dock.destruct(dataDocks);

    	return { exeDocks, dataDocks, headerColor, label, position, ...rest };

    }

}