'use strict'

class ExeDock extends Dock {

    static typePrefix = 'e'; 
	static defaultLocation = 'head';
    static offset = 10;

    constructor(parameters) {

        super(parameters);

        const { label } = parameters; // <? use Editable?
        Object.assign(this, { label });

        this.element.parent.appendChild(this.element.dock); // <? put this inside Dock?

        docks[ this.id ] = this;

		wait(() => this.offset = this.calculateRelativePos());
		
    }

    createDock(label) {

        this.element = this.prepareDock();

        this.element.block.appendChild(this.element.dock);

        this.label = label || '';

        return this;

    };

}
