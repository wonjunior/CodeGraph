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

    calculate(tree = []) {

        _('[INTERPRETER] calculating', this.node.id)
        let args = this.dataIn.map(dock => dock.argument);

        if (args.every(arg => arg)) {

            const [ values, strings ] = args.reduce(([ values, strings ], arg) => {

                return [ [...values, arg.value], [...strings, arg.string] ];

            }, [ [], [] ]);

            // _(this.node.id, values, strings)

            const result = this.func(...values);
            const stringResult = this.stringFunc(...strings);

            // _(this.node.id, result, stringResult)

            if (this.dataOut.length) {

                this.dataOut[0].argument = [ result, stringResult ];

            }

        } else {

            // _('some arguments are missing on block:', this.id)
            if (this.dataOut.length) {

                this.dataOut[0].argument = undefined;
                this.dataOut[0].label = '';
                this.dataOut[0].labelElement.title = '';

            }

        }

        if (this.dataOut.length) {

            tree.push(this.node.id);
            this.propagate(tree);

        }

    };

    propagate(tree) {

        this.dataOut[0].links.forEach(link => {

            const targetNode = link.endDock.node;
            const cycleDetected = ~tree.indexOf(targetNode.id);

            if (targetNode.executable) {

                // <? can we not start reading from this node and not start from the start?
                _('[PROPAGATE] this is an executable')
                Engine.compile();

            } else if (!cycleDetected) {

                targetNode.calculate(tree);

            }

        });

    };

}

let variables = {
    a: { value: 1, string: 'a' },
}

class Engine {

    static compile() {

        // initialize the compilation, starting at the node roots
        const streams = Engine.getStreams();
        _(streams)
        streams.forEach(stream => {

            do {

                stream.calculate();

            } while (stream.next())

        });

    };

    static getStreams() {

        return Object.values(nodes)
            .filter(node => node.hasNoAscendantCommand() && node.hasDescendantCommand())
            .map(rootNode => new Stream(rootNode));

    };

}

class Stream {

    constructor(rootNode) {

        Object.assign(this, {
            root: rootNode,
            stream: [],
            current: rootNode,
        });

    }

    get current() {

        return this.stream[ this.stream.length-1 ];

    }

    set current(nextNode) {

        this.stream.push(nextNode);

    };

    calculate() {

        this.current.calculate(); // no propagation right?

    };

    next() {

        const exeDocks = this.current.exeDocks.out;
        if (exeDocks.length && exeDocks[0].links.length) {

            return this.current = exeDocks[0].links[0].endDock.node;

        }

    }

}
