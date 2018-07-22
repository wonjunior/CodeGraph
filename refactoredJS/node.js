/*new Node({
    label: 'var1',
    position: [300, 300],
    dock: { execution: 'none', input: [], output: [``] },
    function: ()  =>  [`var1`]
})*/

/*
Node {
  id: string,
  element: HTMLElement,
  set label: ƒ,
  docks: { in: [ Dock ], out: [ Dock ] },
  exe: { in: Dock, out: Dock },
  position: [ set x: ƒ, set y: ƒ ],
  function: ƒ,
}
*/

class Node {

    static createId() {

        let currentCount = Object.keys(node).length;
        return Node.idPrefix + String(currentCount+1);

    };

    set label(newLabel) {

        this.labelElement.textContent = newLabel;

    };

    constructor({ label, position, exeDocks, dataDocks, func }) {

        // _(dock)
        Object.assign(this, {

            id:  Node.createId(),
            position,
            func,

        });

        this.createNode();

        this.label = label;

        this.createDocks(exeDocks, dataDocks);

        node[this.id] = this;

        // this.handler();
    }

    createDocks(exeDocks, dataDocks) {

        this.exeDocks = { in: [], out: [] };

        Dock.attributes.forEach(({ direction, side, isRight, sidePrefix }) => {
        //                           'in'    'left'   false     'L'
        //                           'out'   'right'  true      'R'

            exeDocks[direction].forEach( ({ label }, i) => {

                this.exeDocks[direction].push(

                    new Dock({
                        id: this.id + Dock.exeIdPrefix + sidePrefix + i,
                        label,
                        isRight,
                        type: 'exe',
                        node: this,
                        blockElement: this.exeElement[side]
                    })

                );

            });

        });


        this.dataDocks = { in: [], out: [] };

        Dock.attributes.forEach(({ direction, side, isRight, sidePrefix }) => {
        //                           'in'    'left'   false     'L'
        //                           'out'   'right'  true      'R'

            dataDocks[direction].forEach( ({ label }, i) => {

                this.dataDocks[direction].push(

                    new Dock({
                        id: this.id + Dock.dataIdPrefix + sidePrefix + i,
                        label,
                        isRight,
                        type: 'data',
                        node: this,
                        blockElement: this.dataElement[side]
                    })

                );

            });

        });

    }

    createNode(exeDocks, dataDocks) {

        let template = document.querySelector('template#node')
        template = document.importNode(template.content, true);

        // ?! write how the logic sees the structure, here .container > .body > blocks..
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

        this.nodeElement.id = this.id;

        Node.canvas.appendChild(this.nodeElement);

    }

    select() { UI.select(this.$) }

    getDocksRef() {
        return map(this.docks.in, (dock) => dock.ref);
    }

    handler() {

        let pointer;

        this.$.draggable({

            handle: this.header,

            start: (e) => pointer = drag.eventStart(e),

            drag: (e,ui) => [ui.position.left, ui.position.top] = drag.eventDrag(e, pointer),

        });

    }


} let node = {};

Object.assign(Node, {
    canvas: document.querySelector('.nodes'),
    idPrefix: 'n'
});
