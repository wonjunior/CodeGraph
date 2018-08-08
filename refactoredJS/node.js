'use strict'

class Node {

    static createId() {

        return Node.idPrefix + String(Node.length + 1);

    };

    static get length() {

        return Object.keys(node).length;

    };

    static set length(a) {};

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

    get headerColor() {

        return this.headerElement.style.background;

    };

    set headerColor(newColor) {

        this.headerElement.style.background = newColor;

    };

    constructor({ label, position, exeDocks, dataDocks, func, background, headerColor }) {

        Object.assign(this, {

            func,
            dock: [],
            background: background || '',
            id:  Node.createId()

        });

        this.createNode();

        if (headerColor) this.headerColor = headerColor;
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

    createNode() {

        let template = document.querySelector('template#node');
        template = document.importNode(template.content, true);

        // <? write how the logic sees the structure, here .container > .body > blocks..
        Object.assign(this, {
            nodeElement: template.querySelector('.container'),
            headerElement: template.querySelector('.header'),
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

        template.querySelector('.body > .bodybefore').textContent = this.background;

        template.querySelector('.header').ref = this.id;

        this.nodeElement.id = this.id;

        Canvas.nodeArea.appendChild(this.nodeElement);

    };

    update() {

        this.dock.forEach(dock => {

            dock.link.forEach(link => {

                link.path = Curve.get(link.startDock.position, link.snapDock.position);

            });

        });

    };

    static updateAll() {

        Object.entries(node).forEach(([ nodeId, node ]) => {

            node.update();

        });

    };

    // change this by using the rest of the properties we don't want, i.e. ...rest
    static destruct({ label, position, func, exeDocks, dataDocks, headerColor, background }) {

    	exeDocks = Dock.destruct(exeDocks);

    	dataDocks = Dock.destruct(dataDocks);

    	return { label, position, func, exeDocks, dataDocks, headerColor, background };
        // could change this to ((nope1, nope2, ...rest) => rest)();

    };

}; let node = {};

Node.idPrefix = 'n';
