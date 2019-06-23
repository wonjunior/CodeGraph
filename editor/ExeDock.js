'use strict'

class ExeDock extends Dock {

    static typePrefix = 'e'; 
	static defaultLocation = 'head';
    static offset = 10;

    constructor(parameters) {

        super(parameters);

        // const { label } = parameters; // <? use Editable?
        // Object.assign(this, { label });

    }

    /*createDock(label) {

        this.element = this.prepareDock();

        this.element.block.appendChild(this.element.dock);

        this.label = label || '';

        return this;

    }*/

}
