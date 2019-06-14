'use strict'

class DataDock extends Dock {

    static attributes = { 
		defaultType: 'data',
		typePrefix: 'd', 
		defaultLocation: 'body'
	};
    static offset = 7;

    constructor(parameters) {

        super(parameters);

        const { editable, /*type,*/ name } = parameters; // <? use Editable?
        Object.assign(this, {editable, /*type,*/ name});

        this.element.parent.appendChild(this.element.dock); // <? put this inside Dock?

        docks[ this.id ] = this;

        wait(() => this.offset = this.calculateRelativePos());

    };

    /*createDock(label) {

        // <input class="varInput" type="text" spellcheck="false">
        if (this.editable) { // <? Editable ?

            this.inputElement = template.querySelector('.paramContainer > input');
            this.inputElement.ref = this.id;

            this.inputElement.type = this.editable == 'number' ? 'number' : 'text';

            this.inputElement.placeholder = label || '';

        } else {

            //template.querySelector('.paramContainer > input').remove();
            this.label = label

        }

    };*/

}
