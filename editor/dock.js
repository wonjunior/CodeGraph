'use strict'

class Dock {

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

    constructor({ id, label, isRight, type, node, blockElement }) {

        // this.id = data.prefix+'dock_'+data.index;
        // this.node = data.nodeId;
        // this.ref = this.node+'-'+this.id;

        Object.assign(this, {
            id,
            isRight,
            node,
            type,
            blockElement,
            occupied: false,
            link: []
        });

        dock[ this.id ] = (this.type == 'exe')
            ? this.createExeDock()
            : this.createDataDock();

        this.label = label || '';

        setTimeout(() => {
            this.offset = this.calculateRelativePos();
        }, 0);

        // this.listen(); return this;

    };

    calculateRelativePos() {

        const nodePos = this.node.nodeElement.getBoundingClientRect();
        const dockPos = this.pinElement.getBoundingClientRect();

        return [
            (dockPos.x - nodePos.x) / Canvas.zoomLevel + Dock.offset[ this.type ],
            (dockPos.y - nodePos.y) / Canvas.zoomLevel + Dock.offset[ this.type ]
        ];

    };

    createExeDock(parent) {

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

        return this;

    };

    createDataDock(parent) {

        let template = document.querySelector('template#dataDock');
        template = document.importNode(template.content, true);

        const side = this.isRight ? 'right' : 'left';

        Object.assign(this, {
            dockElement: template.querySelector('.data'),
            pinElement: template.querySelector('.data > .dock'),
            snapElement: template.querySelector('.data > .snapDock'),
            paramElement: template.querySelector('.data > .paramContainer'),
            labelElement: template.querySelector('.paramContainer > .paramName'),
            inputElement: template.querySelector('.paramContainer > input')
        });

        this.dockElement.classList.add(side);
        this.dockElement.id = this.id;

        this.snapElement.ref = this.id;
        this.labelElement.ref = this.id;

        this.blockElement.appendChild(this.dockElement);

        return this;

    };

    isCompatible(target) {

        const notEqual = (this.node != target.node);
        const opposite = (this.isRight != target.isRight);
        const sameType = (this.type == target.type);
        return notEqual && opposite && sameType;

    };

    edit(callback) {

        this.inputElement.style.display = 'block';
        this.labelElement.style.display = 'none';

        setTimeout(() => this.inputElement.focus(), 0);

        const endInput = () => {

            if (event.target != this.inputElement) {

                _('not input')

                this.inputElement.style.display = 'none';
                this.labelElement.style.display = 'block';

                this.label = this.inputElement.value;

                callback();

                document.removeEventListener('mousedown', endInput);

            } else {

                _('input')

            }

        }

        document.addEventListener('mousedown', endInput);

    };

    static destruct(docks) {

        return {
            in: docks.in.map(({ label }) => { return {label} }),
            out: docks.out.map(({ label }) => { return {label} })
        }

    };

} let dock = {};


Dock.exeIdPrefix = 'e';
Dock.dataIdPrefix = 'd';
Dock.attributes = [
    {direction: 'in', side: 'left', isRight: false, sidePrefix: 'L'},
    {direction: 'out', side: 'right', isRight: true, sidePrefix: 'R'}
];
Dock.offset = {
    data: 7,
    exe: 10
};
