'use strict'

class CustomProcess extends Process {

	constructor(func, stringFunc, inputs, outputs) {

		super();

		const paramDefs = inputs.map(({ label }) => new DockDefinition(label, 'body'));
    this.inputs = new InDataDockFactory(paramDefs).docks;

    const resultDefs = outputs.map(({ label }) => new DockDefinition(label, 'body'));
    this.outputs = new OutDataDockFactory(resultDefs).docks;

		if (this.constructor === CustomProcess) Object.assign(this, { func, stringFunc });

	}

}