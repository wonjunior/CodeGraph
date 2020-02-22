'use strict'

class GetterProcess extends Process {

    constructor(variable) {

        super(null, null, [], [{ label: variable }]);
        
        this.getter = variable;

    };

    func() {

        return true;

    }

    stringFunc() {

        return this.getter;

    }

}