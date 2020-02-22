'use strict'

class Process {

    constructor(func, stringFunc, params, results) {

        const paramDefs = params.map(({label}, i) => new DockDefinition(label, 'body'));
        this.params = new InDataDockFactory(paramDefs);

        const resultDefs = results.map(({label}, i) => new DockDefinition(label, 'body'));
        this.results = new OutDataDockFactory(resultDefs);

        // which option should we check?
        // (a) if func and stringFunc are provided
        // (b) if this.func && this.stringFunc are implemented
        // (c) constructor is Process or some other child class 
        if (func !== null && stringFunc !== null) Object.assign(this, { func, stringFunc });

        this.docks = new Set([...this.params.docks, ...this.results.docks]);

    };

}