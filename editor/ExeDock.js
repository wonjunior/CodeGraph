'use strict'

class ExeDock extends Dock {

    static typeAttributes = { isData: false, propertyName: 'exeDocks', typePrefix: 'e', blockName: 'head', otherBlockName: 'body' };
    static offset = 10;

    constructor(parameters) {

        super(parameters);

        const { editable, type, label } = parameters; // <? use Editable?
        Object.assign(this, {/*type,*/ label});

        this.element.block.appendChild(this.element.dock); // <? put this inside Dock?

        docks[ this.id ] = this;

        wait(() => this.offset = this.calculateRelativePos()); //<? use a promise on createDock

        //



    }

    createDock(label) {

        this.element = this.prepareDock();

        this.element.block.appendChild(this.element.dock);

        this.label = label || '';

        return this;

    };

}
