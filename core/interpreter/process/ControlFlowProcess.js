'use strict'

const ControlFlowProcess = (function() {

	class Conditional extends Process {
		constructor() {
	
			super(null, null, [{ label: 'condition' }], []);
	
		}
	
		func() {
		
			return condition;
	
		}
	
		stringFunc(condition) {

			return `if(${condition}) {`;

		}
	}

	class ForLoop extends Process {
		constructor() {

			super(null, null, [{ label: 'first'}, { label: 'last'}], [{ label: 'index'}]);

		}

		func() {

			return null;

		}

		stringFunc() {

			return null;

		}
	}

	return { Conditional, ForLoop };

})();