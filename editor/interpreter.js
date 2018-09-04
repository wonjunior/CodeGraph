'use strict'

class Interpreter { // <? change name

    constructor({ dataDocks, exeDocks, func, stringFunc }) {

        Object.assign(this, {
            node: arguments[0],  // not necessary
            dataDocks,           // not necessary
            exeDocks,            // not necessary
            func,
            stringFunc,
            dataIn: dataDocks.in,
            dataOut: dataDocks.out,
        });

    };

    calculate(depth = 0) {

        // _('called by ', this.node.id)
        const args = this.dataIn.map(dock => dock.value);

        _(this.node.id, args)
        if (args.every(argument => argument)) { // <? doesn't allow falsy values!!

            const result = this.func(...args);
            this.dataOut[0].label = result
            this.dataOut[0].value = result;

            this.propagate(depth + 1);

            // return result

        }

    };

    propagate(depth) {

        this.dataOut[0].link.forEach(link => {

            _('depth', depth, 'propagation from :', this.node.id, 'to', link.snapDock.node.id);
            link.snapDock.node.calculate(depth);

        });

    }

    solveDependency() {

        return new Promise((resolve, reject) => {

            const promises = this.dataDocks.in.map(dock => dock.value);
            Promise.all(promises).then(args => {

                const result = this.func(...args);
                // const stringResult = this.stringFunc(...args)

                this.dataDocks.out[0].label = result;

                resolve(result);

                // _(`[ENGINE] node ${this.node.id}'s result`, result, stringResult);

            });

        });

    };

    isReady() {

        return this.dataDocks.in.every(dock => dock.value); // <? could determine which dock aren't solved

    };


}
