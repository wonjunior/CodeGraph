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

    wrapper(value) {

        if (typeof value == "string") {

            return `"${value}"`;

        } else {

            return value;

        }

    };

    calculate(tree = []) {

        let args = this.dataIn.map(dock => dock.value);

        if (args.every(arg => arg)) {

            args = args.map(arg => arg.value);

            const result = this.func(...args);
            // const stringResult = this.stringFunc(...args.map(value => this.wrapper(value)));
            this.dataOut[0].value = result;

            // visual cues
            // this.dataOut[0].label = result;
            // this.dataOut[0].labelElement.title = stringResult;

        } else {

            // this.dataOut[0].value = undefined;

            // visual cues
            this.dataOut[0].label = '';
            this.dataOut[0].labelElement.title = '';

        }

        tree.push(this.node.id);
        this.propagate(tree);

    };

    propagate(tree) {

        this.dataOut[0].links.forEach(link => {

            // _('tree', tree, 'propagation from :', this.node.id, 'to', link.endDock.node.id);

            const cycleDetected = ~tree.indexOf(link.endDock.node.id);
            if (!cycleDetected) {

                link.endDock.node.calculate(tree);

            } else {

                _('rejected');

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
