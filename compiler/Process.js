'use strict'

class Process {

    constructor(node) {

        const { dataDocks, exeDocks, func, stringFunc } = node;
        Object.assign(this, {
            node,
            func,
            stringFunc,
            dataIn: dataDocks.in,
            dataOut: dataDocks.out,
        });

    };

    mergeDependencies(arraysOfDependencies) {

        // loop through each object of dependencies and return the merged object
    	return arraysOfDependencies.reduce((merged, dependencies) => {

            // for each variable, add its dependencies to the set of dependencies
    		Object.entries(dependencies).forEach(([variableName, nodes]) => {

                // merge the set of dependencies with the array of dependencies
    			const set = new Set([...(merged[ variableName ] || []), ...nodes]);

                // if the temporary merged set it not empty add it to the merged object
    			if (set.size) merged[ variableName ] = set;

    		});

            // return the merged object as accumulator
            return merged;

    	}, {});

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

            const result = this.func.bind(this.node)(...values);
            const stringResult = this.stringFunc.bind(this.node)(...strings);
            const mergedDependencies = this.mergeDependencies(dependencies);

            if (this.node instanceof Executable) {

                _(`setting dependencies for ${this.node.id}`);
                this.node.dependencies = mergedDependencies;

            }

            // _('->', this.node.id, result, stringResult);

            if (this.dataOut.length) {

                this.dataOut[0].argument = [ result, stringResult, mergedDependencies ];

                // quick fix, added:
                data.propagationTree = data.propagationTree || [];
                data.propagationTree.push(this.node);
                this.propagate(data);

            }
            return {result, stringResult, dependencies:mergedDependencies};

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
            data.propagationTree.push(this.node); //Node.all[this.id]
            // <? because we removed Process#node

            // propagate to the next node
            this.propagate(data);

        }

        return {}

    };

    propagate(data) {

        this.dataOut[0].links.forEach(link => ControlFlow.update(link.endDock.node));

    };

}

let variables = {
    a: { value: 1, string: 'a' },
    b: { value: 'hello', string: 'b' }
}
