'use strict'

class Node extends CanvasObject {
	
	static all = {};

    static idOfLast = 1;
	static idPrefix = 'n';

    /**
     * Depending on the number of nodes already instanciated, the function will create a new node identifier.
     */
    static constructId() {

        return Node.idPrefix + Node.idOfLast++;

	}

    /**
     * Node instance constructor which takes in an node object definition and:
     * (1) adds the properties to the Node's instance ;
     * (2) creates and renders a node element on the canvas with `NodeElement` ;
     * (3) registers the node to the canvas context.
     * @param {Object | Node} parameters - an object containing all the necessary properties
	 * to define a node or an actual instance of `Node`.
     */
    constructor(parameters) {

		super()

		// call the Executable's constructor if this is not an instance of Executable but is supposed to be
		if (!(this instanceof Executable) && parameters.executable) return new Executable(parameters);

		const { name, header, hideHeader, hideBody, background, position, process, getters, exeDocks } = parameters;

        Object.assign(this, {
			id: Node.constructId(),
			process: { 
				function: process.function,
				string: process.string,
			},
			background,
			label: name,
		});
		
		Node.register(this.id, this);
		
		this.element = new NodeElement(this, Canvas.nodeArea, {
			hideHeader, 
			hideBody, 
			headerColor: header,
			position: position || [ 0, 0 ]
		});
		
        this.createDocks(process, getters, exeDocks);

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

		this.process.result = Dock.create([ result ], 'out', DataDock, this).first;
		this.process.params = Dock.create(params, 'in', DataDock, this);
		this.getters = Dock.create(getters, 'out', GetterDock, this);
		
		this.dataDocks = {
			in: this.process.params,
			out: [ this.process.result, ...this.getters ]
		}

		this.docks = [ ...this.exeDocks.in, ...this.exeDocks.out, ...this.dataDocks.in, ...this.dataDocks.out ];
		
	}

    /**
     * This method updates all links connected to the node.
     */
    update() {

        this.docks.forEach(dock => {

            dock.links.forEach(link => {

				link.element.update()

            });

        });

    }

    /**
     * This method removes the node and all its attached links:
	 * (1) destroy all connected links
	 * (2) unregister the node
	 * (3) remove the node element from canvas
     */
    destroy() {

        this.docks.forEach(dock => {

            dock.links.forEach(link => {

                link.destroy();

			});
			
			Dock.unregister(dock);

        });

		Node.unregister(this);

		this.element.remove();

    }

	/**
     * This static method serializes the given node object into a non circular object.
     * Because node's have a property Node#docks which contains references to itself this
     * circular structure cannot be stringified by the saving mechanism. Thefore this method
     * has to modify the object by serializing the node's dock instances into dock objects.
     * @param {Node} { exeDocks, dataDocks, docks, headerColor, label, position, ...rest } -
     * exeDocks, dataDocks and docks have circular structures. headerColor, label and position
     * are  getters (they are not iterable i.e not in rest which contains all other properties.
     * @returns {object} { exeDocks, dataDocks, headerColor, label and position, ...rest } -
     * the returned object doesn't contain dock: the array of Dock instances, as it is not
     * needed in the saved node object
     */
    serialize({ exeDocks, dataDocks, docks, headerColor, label, position, ...rest }) {

    	exeDocks = Dock.serialize(exeDocks);
    	dataDocks = Dock.serialize(dataDocks);

    	return { exeDocks, dataDocks, headerColor, label, position, ...rest };

    }

}
//347