'use strict'

class Dock {

    set label(newLabel) {

        if(this.labelElement) {

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
            (dockPos.x - nodePos.x) / Canvas.zoomLevel + Dock.offset,
            (dockPos.y - nodePos.y) / Canvas.zoomLevel + Dock.offset
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
            labelElement: template.querySelector('.paramContainer > .paramName')
        });

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


} let dock = {};


Dock.offset = 7;
Dock.exeIdPrefix = 'e';
Dock.dataIdPrefix = 'd';
Dock.attributes = [
    {direction: 'in', side: 'left', isRight: false, sidePrefix: 'L'},
    {direction: 'out', side: 'right', isRight: true, sidePrefix: 'R'}
];
