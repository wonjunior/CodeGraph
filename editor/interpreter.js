'use strict'

class Interpreter { // <? change name

    constructor({ dataDocks, exeDocks, func, stringFunc }) {

        Object.assign(this, {
            node: arguments[0],
            dataDocks,           // not necessary
            exeDocks,            // not necessary
            func,
            stringFunc,
            dataIn: dataDocks.in,
            dataOut: dataDocks.out,
        });

    };

    calculate(tree = []) {

        // _('called by ', this.node.id)
        const args = this.dataIn.map(dock => dock.value);

        if (args.every(argument => argument)) { // <? doesn't allow falsy values!!

            const result = this.func(...args);
            this.dataOut[0].label = result
            this.dataOut[0].value = result;

            tree.push(this.node.id);
            this.propagate(tree);

            // return result

        }

    };

    propagate(tree) {

        this.dataOut[0].link.forEach(link => {

            _('tree', tree, 'propagation from :', this.node.id, 'to', link.snapDock.node.id);

            const cycleDetected = ~tree.indexOf(link.snapDock.node.id);
            if (!cycleDetected) {

                link.snapDock.node.calculate(tree);

            } else {

                _('rejected')

            }

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
