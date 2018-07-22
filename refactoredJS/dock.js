class Dock {

    set label(newLabel) {

        if(this.labelElement) {

            this.labelElement.textContent = newLabel;

        }

    }

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
            path: []
        });

        dock[ this.id ] = (this.type == 'exe')
            ? this.createExeDock()
            : this.createDataDock();

        this.label = label || '';

        // this.listen(); return this;

    }

    createExeDock(parent) {

        let template = document.querySelector('template#exeDock');
        template = document.importNode(template.content, true);

        const side = this.isRight ? 'right' : 'left';

        Object.assign(this, {
            dockElement: template.querySelector('.exe'),
            pinElement: template.querySelector('.exe > .pin'),
            snapElement: template.querySelector('.exe > .snapDock')
        });

        this.dockElement.classList.add(side);
        this.dockElement.id = this.id;

        this.blockElement.appendChild(this.dockElement);

        return this;

    }

    createDataDock(parent) {

        let template = document.querySelector('template#dataDock');
        template = document.importNode(template.content, true);

        const side = this.isRight ? 'right' : 'left';

        Object.assign(this, {
            dockElement: template.querySelector('.data'),
            pinElement: template.querySelector('.data > .dock'),
            snapeElement: template.querySelector('.data > .snapDock'),
            paramElement: template.querySelector('.data > .paramContainer'),
            labelElement: template.querySelector('.data > .paramName')
        });

        this.dockElement.classList.add(side);
        this.dockElement.id = this.id;

        this.blockElement.appendChild(this.dockElement);

        return this;

    }


} let dock = {};


Dock.exeIdPrefix = 'e';
Dock.dataIdPrefix = 'd';
Dock.attributes = [
    {direction: 'in', side: 'left', isRight: false, sidePrefix: 'L'},
    {direction: 'out', side: 'right', isRight: true, sidePrefix: 'R'}
];
