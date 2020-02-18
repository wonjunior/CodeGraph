'use strict'

// Node is the model of a graph node. It uses by default to represent itself visually.
// Node's View class (by default NodeElement) should meet implement the #update and #remove methods.
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
    constructor(args) {

		super();

		// call the Executable's constructor if this is not an instance of Executable but is supposed to be
		if (!(this instanceof Executable) && args.executable) return new Executable(args);

		const { process, ...nodeAttributes } = args;

		this.id = Node.constructId();
		Node.register(this.id, this);
		
		this.element = new NodeElement(this, Canvas.nodeArea, nodeAttributes);
		
		const { func, stringFunc, params, result } = process; 
		this.process = new Process(this, func, stringFunc, params, result);
		
		this.router = new DefaultRouter(this);
		
		this.docks = new Set([...this.process.docks, ...this.router.docks]);
		
		
		// this.dependencies = new NodeDependencyHandler(this);
        // attach the process component to the node's instance
        // const interpreter = new Process(this);
        // this.process.calculate = interpreter.calculate.bind(interpreter);

    }

    /**
     * This method updates all links connected to the node.
     */
    update() { 

        this.docks.forEach(dock => dock.update());

    }

    /**
     * This method safely removes the node.
	 * (1) destroy docks
	 * (2) unregister node
	 * (3) remove node element
     */
    destroy() {

        this.docks.forEach(dock => dock.destroy());

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