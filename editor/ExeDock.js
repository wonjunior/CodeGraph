'use strict'

class ExeDock extends Dock {

    static attributes = { 
		isData: false, 
		defaultType: 'executable',
		typePrefix: 'e', 
		defaultLocation: 'head' 
	};
    static offset = 10;

    constructor(parameters) {

        super(parameters);

        const { name } = parameters; // <? use Editable?
        Object.assign(this, { name });

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
