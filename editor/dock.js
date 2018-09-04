'use strict'

class Dock {

    get value() {

        if (this.type == 'data') {

            if (this.isRight) {

                if (this.node.result) {

                    // _('result in', this.node.id, 'exists: ', this.node.result);
                    return this.node.result;

                } /*else {

                    const result = this.node.calculate(false);

                    _('result in', this.node.id, 'does not exist, calculating result...');
                    _('result is: ', result);
                    return result;

                }*/

                // return this.node.result ? this.node.result : this.node.calculate(false);

            } else {

                if (this.editable && this.inputElement.value) {

                    return this.inputElement.value;

                } else if (this.occupied) {

                    return this.link[0].startDock.value;

                }

            }

        }

    };

    set value(newValue) {

        if (this.type == 'data') {

            this.node.result = newValue;

        }

    }

    set constant(bool) {

        this.dockElement.classList[ bool ? 'add' : 'remove' ]('constant');

    };

    get label() {

        return (this.labelElement) ? this.labelElement.textContent : "";

    };

    set label(newLabel) {

        if (this.labelElement) {

            this.labelElement.textContent = newLabel;

        }

    };

    get position() {

        const [ nodePosX, nodePosY ] = this.node.position;
        const [ offsetX, offsetY ] = this.offset;

        return [ nodePosX + offsetX, nodePosY + offsetY ];

    };

    constructor({ id, label, editable, isRight, type, node, blockElement, switchSection }) {

        Object.assign(this, {
            id,
            isRight,
            node,
            type,
            blockElement,
            editable,
            link: [],
            switchSection,
        });

        dock[ this.id ] = (this.type == 'exe')
            ? this.createExeDock(label)
            : this.createDataDock(editable, label);

        this.occupied = false;

        setTimeout(() => {

            this.offset = this.calculateRelativePos();

        }, 0);

    };

    calculateRelativePos() {

        const nodePos = this.node.nodeElement.getBoundingClientRect();
        const dockPos = this.pinElement.getBoundingClientRect();

        return [
            (dockPos.x - nodePos.x) / Canvas.zoomLevel + Dock.offset[ this.type ],
            (dockPos.y - nodePos.y) / Canvas.zoomLevel + Dock.offset[ this.type ]
        ];

    };

    createExeDock(label) {

            let template = document.querySelector('template#exeDock');
            template = document.importNode(template.content, true);

        const side = this.isRight ? 'right' : 'left';

        Object.assign(this, {
            dockElement: template.querySelector('.exe'),
            pinElement: template.querySelector('.exe > .dock'),
            snapElement: template.querySelector('.exe > .snapDock')
        });

        this.dockElement.classList.add(side);
        this.dockElement.id = this.id;

        this.snapElement.ref = this.id;

        this.blockElement.appendChild(this.dockElement);

        this.label = label || '';

        return this;

    };

    createDataDock(editable, label) {

        let template = document.querySelector('template#dataDock');
        template = document.importNode(template.content, true);

        const side = this.isRight ? 'right' : 'left';

        Object.assign(this, {
            dockElement: template.querySelector('.data'),
            pinElement: template.querySelector('.data > .dock'),
            snapElement: template.querySelector('.data > .snapDock'),
            paramElement: template.querySelector('.data > .paramContainer'),
            labelElement: template.querySelector('.paramContainer > .paramName'),
        });

        if (editable) {

            this.inputElement = template.querySelector('.paramContainer > input')
            this.inputElement.style.display = 'inline-block';
            this.inputElement.ref = this.id;

            this.inputElement.type = (this.editable == 'number') ? 'number': 'text' // for now

            this.inputElement.placeholder = label || '';

        }

        this.dockElement.classList.add(side);
        this.dockElement.id = this.id;

        this.snapElement.ref = this.id;

        this.blockElement.appendChild(this.dockElement);

        return this;

    };

    isCompatible(target) {

        const notEqual = (this.node != target.node);
        const opposite = (this.isRight != target.isRight);
        const sameType = (this.type == target.type);

        return notEqual && opposite && sameType;

    };

    inputConstant(constant) {

        this.constant = Boolean(constant);

        if (this.occupied) {

            this.link[0].remove();

        }

        this.node.calculate();

    };

    /*inputConstantEnd(constant) {

        _('inputConstantEnd')
        if (!constant.length) {

            this.constant = false;

        }

    };*/

    static destruct(docks) {

        return {
            in: docks.in.map(({ label, editable, switchSection }) => { return { label, editable, switchSection } }),
            out: docks.out.map(({ label, editable, switchSection }) => { return { label, editable, switchSection } })
        }

    };

} let dock = {};


Object.assign(Dock, {

    sideAttributes: [
        { direction: 'in', side: 'left', isRight: false, sidePrefix: 'L' },
        { direction: 'out', side: 'right', isRight: true, sidePrefix: 'R' }
    ],

    typeAttributes: [
        { type: 'exe', propertyName: 'exeDocks', typePrefix: 'e', blockName: 'head', otherBlockName: 'body' },
        { type: 'data', propertyName: 'dataDocks', typePrefix: 'd', blockName: 'body', otherBlockName: 'head' }
    ],

    offset: {
        data: 7,
        exe: 10
    }

});
