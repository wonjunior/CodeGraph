'use strict'

class Dock {

    static sideAttributes = [
        { direction: 'in', side: 'left', isRight: false, sidePrefix: 'L' },
        { direction: 'out', side: 'right', isRight: true, sidePrefix: 'R' }
    ];

    static instanciate(parameters) {

        if (!parameters.isData) return new ExeDock(parameters);

        if (parameters.getter) return new Getter(parameters);

        if (parameters.editable) return new Editable(parameters);

        return new DataDock(parameters);

    }

    constructor({ id, label, isRight, isData, editable, type, node, blockElement, switchSection, getter }) {

        Object.assign(this, {
            id,
            isRight,
            node,
            isData,
            switchSection,
            element: Object.assign(
                {block:blockElement},
                this.prepareElement(id, isRight)
            ),
            links: [],
            occupied: false,
        });

        this.defineArgumentGetSet();

    };

    set constant(bool) {

        // this.inputElement.classList[ this.inputElement.value != '' && this.occupied ? 'add' : 'remove' ]('occupied');

        this.element.dock.classList[ bool ? 'add' : 'remove' ]('constant');

    };

    get label() {

        return (this.element.label) ? this.element.label.textContent : "";

    };

    set label(newLabel) {

        if (!this.element || !this.element.label) return;

        this.element.label.textContent = newLabel;

    };

    get position() {

        const [ nodePosX, nodePosY ] = this.node.position;
        const [ offsetX, offsetY ] = this.offset;

        return [ nodePosX + offsetX, nodePosY + offsetY ];

    };

    prepareElement(id, isRight) {

        let template = document.querySelector('template#dock');
        template = document.importNode(template.content, true);

        const element = {
            dock: template.querySelector('.dock-container'),
            pin: template.querySelector('.dock'),
            snap: template.querySelector('.snap-dock'),
            param: template.querySelector('.param-container'),
            label: template.querySelector('.param-label'),
        }

        // add the dock's type and side to the list of classes
        element.dock.classList.add(
            this instanceof DataDock ? 'data' : 'exe',
            isRight ? 'right' : 'left'
        );

        element.dock.id = id;
        element.snap.ref = id;

        return element;

    }

    defineArgumentGetSet() {

        var _argument;
        var _dependencies = this.node.getter && { [this.node.getter.variableName]: [[this.node]] };

        Object.defineProperties(this, {
            "argument": {

                get: () => {

                    if (this.isData) {

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

                    } else if (argument && this.isData) {

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

    };

    calculateRelativePos() {

        const nodePos = this.node.nodeElement.getBoundingClientRect();
        const dockPos = this.element.pin.getBoundingClientRect();

        const offset = this.isData ? DataDock.offset : ExeDock.offset;
        return [
            (dockPos.x - nodePos.x) / Canvas.zoomLevel + offset,
            (dockPos.y - nodePos.y) / Canvas.zoomLevel + offset
        ];

    };

    isCompatible(target) {

        const notEqual = (this.node != target.node);
        const opposite = (this.isRight != target.isRight);
        const sameType = (this.isData == target.isData) && (this.type == target.type);

        return notEqual && opposite && sameType;

    };

    inputConstant(constant) {

        this.constant = Boolean(constant);

        if (this.occupied) {

            this.links[0].remove();

        }

        this.argument = this.adjustInput(constant);
        ControlFlow.update(this.node);

    };

    adjustInput(input) {

        const coercedInput = Number(input);

        if (input && typeof coercedInput == 'number' && !Number.isNaN(coercedInput)) {

            return [ coercedInput, coercedInput ];

        } else if (input) {

            return [ input, (typeof input == 'string') ? `"${input}"` : input ]; // <? "" isn't necessary

        }

    };

    inputVariable(variable) {

        _(variable);

    };

    static destruct(docks) {

        return {
            in: docks.in.map(({ label, editable, switchSection }) => { return { label, editable, switchSection } }),
            out: docks.out.map(({ label, editable, switchSection }) => { return { label, editable, switchSection } })
        }

    };

} const docks = {};
