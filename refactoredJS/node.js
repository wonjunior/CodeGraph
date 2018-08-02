'use strict'

class Node {

    static createId() {

        let currentCount = Object.keys(node).length;
        return Node.idPrefix + String(currentCount+1);

    };

    get label() {

        return this.labelElement.textContent;

    };

    set label(newLabel) {

        this.labelElement.textContent = newLabel;

    };

    get position() {

        return [this.nodeElement.style.left, this.nodeElement.style.top]
            .map(posString => parseInt(posString));

    };

    set position([ x, y ]) {

        this.nodeElement.style.left = x + 'px';
        this.nodeElement.style.top = y + 'px';

    };

    constructor({ label, position, exeDocks, dataDocks, func }) {

        Object.assign(this, {

            func,
            dock: [],
            id:  Node.createId()

        });

        this.createNode();

        this.label = label;
        this.position = position;

        this.createDocks(exeDocks, dataDocks);

        node[this.id] = this;

    };

    createDocks(exeDocks, dataDocks) {

        this.exeDocks = { in: [], out: [] };

        Dock.attributes.forEach(({ direction, side, isRight, sidePrefix }) => {
        //                           'in'    'left'   false     'L'
        //                           'out'   'right'  true      'R'

            exeDocks[direction].forEach( ({ label }, i) => {

                const dockObject = new Dock({
                    id: this.id + Dock.exeIdPrefix + sidePrefix + i,
                    label,
                    isRight,
                    type: 'exe',
                    node: this,
                    blockElement: this.exeElement[side],
                });

                this.exeDocks[direction].push(dockObject);
                this.dock.push(dockObject);

            });

        });


        this.dataDocks = { in: [], out: [] };

        Dock.attributes.forEach(({ direction, side, isRight, sidePrefix }) => {
        //                           'in'    'left'   false     'L'
        //                           'out'   'right'  true      'R'

            dataDocks[direction].forEach( ({ label }, i) => {

                const dockObject = new Dock({
                    id: this.id + Dock.dataIdPrefix + sidePrefix + i,
                    label,
                    isRight,
                    type: 'data',
                    node: this,
                    blockElement: this.dataElement[side],
                });

                this.dataDocks[direction].push(dockObject);
                this.dock.push(dockObject);

            });

        });

    };

    createNode(exeDocks, dataDocks) {

        let template = document.querySelector('template#node');
        template = document.importNode(template.content, true);

        // <? write how the logic sees the structure, here .container > .body > blocks..
        Object.assign(this, {
            nodeElement: template.querySelector('.container'),
            labelElement: template.querySelector('.headerTitle'),
            exeElement: {
                left: template.querySelector('.exeblock > .leftblock'),
                right: template.querySelector('.exeblock > .rightblock')
            },
            dataElement: {
                left: template.querySelector('.body > .leftblock'),
                right: template.querySelector('.body > .rightblock')
            }
        });

        template.querySelector('.header').ref = this.id;

        this.nodeElement.id = this.id;

        Canvas.nodeArea.appendChild(this.nodeElement);

    };

    updateLink() {

        this.dock.forEach(dock => {

            dock.link.forEach(link => {

                link.path = Curve.get(link.startDock.position, link.snapDock.position);

            });

        });

    };


}; let node = {};

Node.idPrefix = 'n';
