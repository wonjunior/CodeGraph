'use strict'

class Stream {

    scope = {};

    constructor(root) {

        this.nodes = [ root ];

        this.walk();

    }

    get current() {

        return this.nodes[ this.nodes.length - 1 ];

    }

    set current(nextNode) {

        this.nodes.push(nextNode);

    };

    walk() {

        do {

            const resultObj = this.current.calculate();

            if (!this.current.setter || !resultObj) continue;

            this.scope[ this.current.setter.variableName ] = resultObj.result;

            this.updateGetters(resultObj.dependencies);

        } while (this.next());

    };

    updateGetters(dependencies) {

        _(dependencies)
        Object.entries(dependencies).forEach(([variableName, branches]) => {

            if (!this.scope[variableName]) return;

            branches.forEach(branch => {

                branch.forEach(node => {

                    _(`updating... ${node.id}`);
                    node.calculate(false);

                });

            });

        });

    }

    next() {

        const exeDocks = this.current.exeDocks.out;
        if (exeDocks[0].links.length) {

            return this.current = exeDocks[0].links[0].endDock.node;

        }

    };

}
