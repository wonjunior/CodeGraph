'use strict'

class GetterNode extends Node {

	constructor(args) {

		const { /*process,*/ ...nodeAttributes } = args;
		// const { func, stringFunc, params, result } = process;

		super(
			new GetterProcess('a'),
			new NullRouter(),
			nodeAttributes
		);
		
	}

}