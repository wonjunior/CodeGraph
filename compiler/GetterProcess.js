'use strict'

class GetterProcess extends Process {

    constructor(node, variable) {

        super(node, null, null, [], [{ label: variable }]);
        
        this.getter = variable;

    };

    func() {

        return true;

    }

    stringFunc() {

        return this.getter;

    }

}