'use strict'

class Interpreter {

    constructor({ dataDocks, exeDocks, func, stringFunc }) {

        Object.assign(this, {
            node: arguments[0],
            dataIn: dataDocks.in,
            dataOut: dataDocks.out,
            func,
            stringFunc,
        });

    };

    mergeDependencies(arraysOfDependencies) {

        // _('init: ', arraysOfDependencies)

        // get an array of arrays of keys
        const arraysOfKeys = arraysOfDependencies
        	.map(dependencies => Object.keys(dependencies || []));

        // _('arraysOfkeys: ', arraysOfKeys)

        // flatten the arrays of keys into a set of unique keys
        const keys = new Set([].concat.apply([], arraysOfKeys));

        // fill the merged object before returning
        const merged = {};

        keys.forEach(key => {

        	// add a new entry
            merged[ key ] = [];

            arraysOfDependencies.forEach(dependencies => {

        		// if the entry in the array of dependency exists, add it to the merged object
                if (dependencies && dependencies[ key ]) {

        			merged[ key ].push(...dependencies[ key ]);

                }

            });

        });

        return merged;

    };

    getArgumentData(arrayOfArguments) {

        return arrayOfArguments.reduce(([ values, strings, dependencies ], arg) => {

            return [
                [ ...values, arg.value ],
                [ ...strings, arg.string ],
                [ ...dependencies, arg.dependencies ],
            ];

        }, [ [], [], [] ]);

    };

    calculate(data = {}) { // <? refactor this part
                           // a) check arguments
                           // b) update the Dock#argument
                           // c) propagate

        //_('[INTERPRETER] calculating', this.node.id, data);

        let args = this.dataIn.map(dock => dock.argument);

        if (args.every(arg => arg)) {

            const [ values, strings, dependencies ] = this.getArgumentData(args);

            // _('dependencies', dependencies)

            const result = this.func(...values);
            const stringResult = this.stringFunc(...strings);
            const mergedDependencies = this.mergeDependencies(dependencies);

            // _('->', this.node.id, result, stringResult);

            if (this.dataOut.length) {

                this.dataOut[0].argument = [ result, stringResult, mergedDependencies ];

            }

        } else {

            // _('some arguments are missing on block:', this.id)
            if (this.dataOut.length) {

                // <? refactor this mess
                this.dataOut[0].argument = undefined;
                this.dataOut[0].label = '';
                this.dataOut[0].labelElement.title = '';

            }

        }

        if (this.dataOut.length) {

            // update the propagation tree
            data.propagationTree = data.propagationTree || [];
            data.propagationTree.push(this.node);

            // propagate to the next node
            this.propagate(data);

        }

    };

    propagate(data) {

        this.dataOut[0].links.forEach(link => {

            const targetNode = link.endDock.node;
            const cycleDetected = ~data.propagationTree.indexOf(targetNode);

            if (targetNode instanceof Executable) {

                _('[PROPAGATE] this is an executable', targetNode, data.propagationTree)
                Engine.compile(targetNode);

            } else if (!cycleDetected) {

                targetNode.calculate(data);

            }

        });

    };

}

let variables = {
    a: { value: 1, string: 'a' },
    b: { value: 'hello', string: 'b' }
}
