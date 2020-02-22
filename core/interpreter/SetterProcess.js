'use strict'

class SetterProcess extends Process {

    constructor(variable) {

        super(null, null, [{ label: variable }], []);
        
        this.getter = variable;

    };

    func() {

        return true;

    }

    stringFunc(value) {

        return `${this.getter}  = ${value}`;

    }

}