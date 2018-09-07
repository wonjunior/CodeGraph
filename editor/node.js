'use strict'

class Node {

    /**
     * Depending on the number of nodes already created, the function will create
     * a new node identifier. This id includes the idPrefix specific to Node.
     * @returns {String} a unique node identifier
     * @static
     */
    static createId() {

        return Node.idPrefix + String(Node.length + 1);

    };

    /**
     * Property of Node: counts the number of instanciated nodes
     * @returns {Number} the number of instanciated nodes
     */
    static get length() {

        return Object.keys(nodes).length;

    };

    /**
     * Getter for Node#label which gets the node's displayed label
     * @returns {String} the node's label
     */
    get label() {

        // gets the string label directly from the DOM element
        return this.labelElement.textContent;

    };

    /**
     * Setter for Node#label which sets the node's displayed label
     * @param {String} newLabel - the new label to set
     */
    set label(newLabel) {

        this.labelElement.textContent = newLabel;

    };

    /**
     * Getter for Node#position which gets the position of the node in the Canvas
     * @returns {Number[2]} - the x and y coordinates of the node's current position
     */
    get position() {

        // gets the position directly from inline-style as an array
        // of Strings and maps it into an array of Numbers
        return [this.nodeElement.style.left, this.nodeElement.style.top]
            .map(posString => parseInt(posString));

    };

    /**
     * Setter for Node#position which sets the position of the node in the Canvas
     * @param {Number[2]} [ x, y ] - the x and y coordinates to which it is moved
     */
    set position([ x, y ]) {

        // coerces the two coordinates into string applied to the node's style
        this.nodeElement.style.left = x + 'px';
        this.nodeElement.style.top = y + 'px';

    };

    /**
     * Getter for Node#headerColor to get the color of the node's header
     * this getter is needed when saving the nodes into a string format
     * @returns {String} - the CSS color of the node's header
     */
    get headerColor() {

        return this.headerElement.style.background;

    };

    /**
     * Setter for Node#headerColor to change the color of the node's header
     * @param {String} newColor - the color to change the node's header to
     */
    set headerColor(newColor) {

        this.headerElement.style.background = newColor;

    };

    /**
     * Getter for Node#size to get the size of the node container element
     * Might as well be a method because it is not explicit enough
     * @returns {Number[2]} - the width and height of the container element
     */
    get size() {

        const properties = this.nodeElement.getBoundingClientRect();
        return [ properties.width, properties.height ];

    };

    set highlight(bool) {

        this.nodeElement.classList[ bool ? 'add' : 'remove' ]('selected');

    };

    toggleHighlight() {

        return this.nodeElement.classList.toggle('selected');

    }

    /**
     * Node instance constructor which takes in an node object and does:
     * 1) adds the properties to the Node's instance
     * 2) creates and renders the node's element on the canvas
     * 3) appends the instance to the node object
     * @param {Node | Object} - takes in an actual instance of Node OR an object
     * containing all the necessary properties to construct a node, i.e.: label
     * (String), position (Number[2]), exeDocks (Object), dataDocks (Object) and func
     * (function). Optional parameters are background (String) and headerColor (String)
     */
    constructor({ label, position, exeDocks, dataDocks, func, stringFunc, background, headerColor }) {

        // the following property assignments are happening first because the method
        // Node#createNode() needs these to create the HTML elements properly
        Object.assign(this, {
            id: Node.createId(),
            background,
            docks: [],
            func,
            stringFunc,
        })

        // creating the actual HTML node element
        this.createNode();

        // This second set of property assignments (styling) needs the HTML
        // elements to be created because they directly take effect on them
        Object.assign(this, {
            headerColor,
            label,
            position,
        });

        // create and render all of the node's docks with their HTML elements
        this.createDocks({ exeDocks, dataDocks });

        // adds this Node instance to the object of instances, it can be
        // accessed with the unique node identifier provided previously
        nodes[ this.id ] = this;

        const interpreter = new Interpreter(this);
        // this.solveDependency = interpreter.solveDependency.bind(interpreter);
        this.calculate = interpreter.calculate.bind(interpreter);

    };

    /**
     * With all the docks properties, the method instanciates all the Dock objects
     * The method is instanciating them by side and by type by accessing the Dock's
     * attributes object. Then for each element in the provided dockDef it calls the
     * Dock constructor and adds the dock to the node's properties.
     * @param {Object} { exeDocks, dataDocks } - the dock properties provided by Node's constructor
     */
    createDocks(dockDef) {

        // the four arrays that will be filled with instances of Dock
        this.exeDocks = { in: [], out: [] };
        this.dataDocks = { in: [], out: [] };

        Dock.sideAttributes.forEach(({ direction, side, isRight, sidePrefix }) => {
        //                            'in'/'out', 'left'/'right', F/T, 'L'/'R'

            Dock.typeAttributes.forEach(({ isData, propertyName, typePrefix, blockName, otherBlockName }) => {
            //                            true/false, 'exeDocks'/'dataDocks', 'e'/'d', 'head'/'body'

                dockDef[ propertyName ][ direction ].forEach(({ label, editable, type, switchSection }, i) => {

                    // default position for the dock is determined by is type but the position
                    // can be switched by setting switchSection to true. In this case the dock
                    // will take the other position. Available positions are in body and head
                    const sectionName = (switchSection ? otherBlockName : blockName) + 'Section';

                    const newDock = new Dock({
                        id: this.id + typePrefix + sidePrefix + i,
                        label,
                        isRight,
                        isData,
                        editable,
                        type,
                        node: this,                                  // @this is an instance of Node
                        switchSection,
                        blockElement: this[ sectionName ][ side ],   // the element where the dock will be appended
                    });

                    this[ propertyName ][ direction ].push(newDock); // append the dock to the side-type specific array
                    this.docks.push(newDock);                        // append the dock to the array containing all node's docks

                });

            });

        });

    }

    /**
     * Creates the node's HTML element and renders it on the canvas. Most HTMLElement
     * objects are saved as the node's properties: nodeElement, headerElement, labelElement,
     * headerSection.left, headerSection.right, bodySection.left and bodySection.right
     *
     * <? we might call in a class to deal with importing the html
     *    should we use templates, as they are visible in the DOM
     *    this method needs to know the structure: .container > .body > .block
     */
    createNode() { //

        let template = document.querySelector('template#node');
        template = document.importNode(template.content, true);

        Object.assign(this, {
            nodeElement: template.querySelector('.container'),
            headerElement: template.querySelector('.header'),
            labelElement: template.querySelector('.headerTitle'),
            headSection: {
                left: template.querySelector('.exeblock > .leftblock'),
                right: template.querySelector('.exeblock > .rightblock')
            },
            bodySection: {
                left: template.querySelector('.body > .leftblock'),
                right: template.querySelector('.body > .rightblock')
            }
        });

        template.querySelector('.body > .bodybefore').textContent = this.background;

        template.querySelector('.header').ref = this.id;

        this.nodeElement.id = this.id;

        Canvas.nodeArea.appendChild(this.nodeElement);

    };

    /**
     * This method updates all links connected to all docks of the node
     */
    update() {

        this.docks.forEach(dock => {

            dock.links.forEach(link => {

                // get the path expression from the static Curve.get and
                // change the link's path directly by utilising the Link#path
                // setter which updates the SVG element in the DOM
                link.path = Curve.get(link.startDock.position, link.endDock.position);

            });

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
     *
     * <? this static method could be a Node#destruct method instead
     */
    static destruct({ exeDocks, dataDocks, docks, headerColor, label, position, ...rest }) {

        // exeDocks and dataDocks are modified by Dock's own destruct method
        // to convert the Docks objects into non circular dock objects
    	exeDocks = Dock.destruct(exeDocks);
    	dataDocks = Dock.destruct(dataDocks);

    	return { exeDocks, dataDocks, headerColor, label, position, ...rest };

    };

}; let nodes = {};

Object.assign(Node, {

    idPrefix: 'n',

});
