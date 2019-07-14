'use strict'

class Dock extends CanvasObject {

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

		super();

		Dock.register(id, this);

        Object.assign(this, {
			id,
			label,
            isRight,
			node,
            location,
            links: [],
            occupied: false,
			label: id
        });

		this.element = new DockElement(this, parent, {});

        // this.defineArgumentGetSet();

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

    /*getRelativePosition() {

        const nodePos = this.node.element.container.getBoundingClientRect();
        const dockPos = this.element.pin.getBoundingClientRect();
		const offset = this.constructor.offset;
		
        return [
            (dockPos.x - nodePos.x) / Canvas.zoomLevel + offset,
            (dockPos.y - nodePos.y) / Canvas.zoomLevel + offset
        ];

    }*/

	/**
	 * Right-sided data docks are never occupied
	 */
	allowsMultipleLinks() {

		return this.isRight && this instanceof DataDock;

	}

	occupiedAndUnique() {

		return this.occupied && !this.allowsMultipleLinks();

	}

	getLink() {

		return this.occupiedAndUnique() ? this.links.first.edit() : new Link(this);

	}

    isCompatible(dock) {

        const notEqual = (this.node != dock.node);
        const opposite = (this.isRight != dock.isRight);
        const sameType = (this instanceof DataDock == dock instanceof DataDock) && (this.type == dock.type);

        return notEqual && opposite && sameType;

    }

	dropLink(link) {

		this.links = link ? this.links.filter(({ id }) => id !== link.id) : [];
		this.occupied = !!this.links.length;

	}

	addLink(link) {
		
		this.links.push(link);
        this.occupied = true;

	}

	/**
	 * Destroys the link if there is any that's occupying the dock
	 */
	popExistingLink() {
		
		if (this.occupiedAndUnique()) this.links.first.destroy();

	}

    serialize(docks) {

        return {
            in: docks.in.map(({ label, editable, switchSection }) => { return { label, editable, switchSection } }),
            out: docks.out.map(({ label, editable, switchSection }) => { return { label, editable, switchSection } })
        }

    }

}
// 323