'use strict'

class Dock {

	static all = {};

    static sideAttributes = {
		in: { 
			isRight: false, 
			side: 'Left', 
			sidePrefix: 'L' 
		},
        out: { 
			isRight: true, 
			side: 'Right', 
			sidePrefix: 'R'
		}
	}
	
	static create(dockObjects, direction, dockConstructor, node) {

		const { isRight, side, sidePrefix } = Dock.sideAttributes[ direction ];

		return dockObjects.map(({ name, label, location/*, ...other*/ }, index) => {

			// if position is specified and valid use it else use the default value for this type of dock
			const parentName = ['body', 'head'].includes(location) ? location : dockConstructor.defaultLocation;

			return new dockConstructor({
				id: node.id + dockConstructor.typePrefix + sidePrefix + index,
				node,
				label: label || name,
				isRight,
				location: parentName,
				parent: node.element[ parentName + side ],
				// ...other,
			});

		});
	
	}

    constructor({ id, node, label, isRight, location, parent/*, ...other*/ }) {

        Object.assign(this, {
			id,
			label,
            isRight,
			node,
			element: { parent },
            location,
            links: [],
            occupied: false,
        });

        // create the actual HTML dock element
		this.createDock();

        // add the Dock instance to the object of instances, it can be accessed with its unique id
        Dock.all[ this.id ] = this;

		// get the dock's element offset relative to the node element
        wait(() => this.offset = this.getRelativePosition());

        // this.defineArgumentGetSet();

	}
	
	createDock() {

		// retrieve the node HTML template
		const $ = Template.dock();
		
		// bind HTML elements to JS instance
        Object.assign(this.element, {
            dock: $('.dock-container'),
            pin: $('.dock'),
            snap: $('.snap-dock'),
            param: $('.param-container'),
            label: $('.param-label'),
        });

        // add the dock's type and side to the list of classes
        this.element.dock.classList.add(
            this instanceof DataDock ? 'data' : 'exe',
            this.isRight ? 'right' : 'left'
        );

		// bind JS instance to HTML element 
        this.element.snap.ref = this.id;
        this.element.dock.id = this.id;

		// append the dock to the node element
        this.element.parent.appendChild(this.element.dock);

    }

    set constant(bool) {

        // this.inputElement.classList[ this.inputElement.value != '' && this.occupied ? 'add' : 'remove' ]('occupied');

        this.element.dock.classList[ bool ? 'add' : 'remove' ]('constant');

    }

    get label() {

        return (this.element.label) ? this.element.label.textContent : "";

    }

    set label(newLabel) {

        if (!this.element || !this.element.label) return;

        this.element.label.textContent = newLabel;

    }

    get position() {

        const [ nodePosX, nodePosY ] = this.node.position;
        const [ offsetX, offsetY ] = this.offset;

        return [ nodePosX + offsetX, nodePosY + offsetY ];

    }

    defineArgumentGetSet() {

        var _argument;
        var _dependencies = this.node.getter && { [this.node.getter.variableName]: [[this.node]] };

        Object.defineProperties(this, {
            "argument": {

                get: () => {

                    if (this instanceof DataDock) {

                        if (this.isRight) {

                            if (_argument) {

                                return _argument;

                            } else if(this.node.getter) {

                                return {
                                    ... this.node.func.bind(this.node.getter)(),
                                    dependencies: _dependencies,
                                };

                            }

                        } else {

                            if (this.occupied) {

                                return this.links[0].startDock.argument; // <? make a Dock method

                            } else {

                                return _argument;

                            }

                        }

                    }

                },

                set: (argument) => {

                    if (!argument) {

                        _argument = argument;

                    } else if (argument && this instanceof dataDock) {

                        const [ value, string, dependencies ] = argument;
                        if (this.isRight) {

                            this.label = value;
                            this.element.label.title = string;

                        }

                        _argument = { value, string, dependencies };

                    }

                }

            }
        });

    }

    getRelativePosition() {

        const nodePos = this.node.element.node.getBoundingClientRect();
        const dockPos = this.element.pin.getBoundingClientRect();
		const offset = this.constructor.offset;
		
        return [
            (dockPos.x - nodePos.x) / Canvas.zoomLevel + offset,
            (dockPos.y - nodePos.y) / Canvas.zoomLevel + offset
        ];

    }

    isCompatible(target) {

        const notEqual = (this.node != target.node);
        const opposite = (this.isRight != target.isRight);
        const sameType = (this instanceof DataDock == target instanceof DataDock) && (this.type == target.type);

        return notEqual && opposite && sameType;

    }

    inputConstant(constant) {

        this.constant = Boolean(constant);

        if (this.occupied) {

            this.links[0].remove();

        }

        this.argument = this.adjustInput(constant);
        ControlFlow.update(this.node);

    }

    adjustInput(input) {

        const coercedInput = Number(input);

        if (input && typeof coercedInput == 'number' && !Number.isNaN(coercedInput)) {

            return [ coercedInput, coercedInput ];

        } else if (input) {

            return [ input, (typeof input == 'string') ? `"${input}"` : input ]; // <? "" isn't necessary

        }

    }

    inputVariable(variable) {

        _(variable);

    }

    static destruct(docks) {

        return {
            in: docks.in.map(({ label, editable, switchSection }) => { return { label, editable, switchSection } }),
            out: docks.out.map(({ label, editable, switchSection }) => { return { label, editable, switchSection } })
        }

    }

}