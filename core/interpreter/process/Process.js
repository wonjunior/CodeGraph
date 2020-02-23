'use strict'

class Process {

  constructor(func, stringFunc, params, results) {

    const paramDefs = params.map(({label}, i) => new DockDefinition(label, 'body'));
    this.params = new InDataDockFactory(paramDefs).docks;

    const resultDefs = results.map(({label}, i) => new DockDefinition(label, 'body'));
    this.results = new OutDataDockFactory(resultDefs).docks;

    if (this.constructor === Process) Object.assign(this, { func, stringFunc });

    this.docks = new Set([...this.params, ...this.results]);

	}

	mergeDependencies() {

		return this.params.reduce((result, current) => {

			current.getDependencies().forEach(dep => result.add(dep));

			return result;

		}, new Set());

	}

	getArguments() {

		return this.params
			.map(param => param.getValue())
			.reduce(([R, S], {result, stringified}) => [[...R, result], [...S, stringified]], [[],[]]);

	}

	calculate(results, strings) {

		return [this.func(...results), this.stringFunc(...strings)];

	}

}