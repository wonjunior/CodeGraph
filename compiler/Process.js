'use strict'

class Process {

    constructor(node, func, stringFunc, params, result) {

        const paramDefs = params.map(({label}, i) => new DockDefinition(label, 'body'));
        this.params = new InDataDockFactory(paramDefs, node);

        const resultDef = [ new DockDefinition(result.label, 'body') ];
        this.result = new OutDataDockFactory(resultDef, node);

        Object.assign(this, { func, stringFunc });

        this.docks = new Set([...this.params.docks, ...this.result.docks]);

    };

}