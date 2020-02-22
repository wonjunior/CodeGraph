'use strict'

class SetterNode extends Node {

	constructor(args) {

		const { /*process,*/ ...nodeAttributes } = args;
		// const { func, stringFunc, params, result } = process;

		super(
			new SetterProcess('a'),
			new DefaultRouter(),
			nodeAttributes
		);
		
	}

}