'use strict'

class Interpreter { // <? change name

    constructor({ dataDocks, exeDocks, func, stringFunc }) {

        Object.assign(this, {
            node: arguments[0],
            dataDocks,
            exeDocks,
            func,
            stringFunc,
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

    }

    isReady() {

        return this.dataDocks.in.every(dock => dock.value); // <? could determine which dock aren't solved

    }


}
