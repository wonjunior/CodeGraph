class Stream {

    constructor(id) {
        this.name = 'init::'+id;
        this.current = id
        this.stream = {};

        stream[this.name] = this;
    }

    next() {
        

        let dockId = $('.'+'node_1').find('.exe').attr('class').split(' ')[1]; // <--- ???
        let pathId = this.current + '-' + dockId;

        let nodeId, link = path.search(pathId);
        if (link.length == 1) {

            nodeId = link.attr('class').split(' ')[1].split('-')[0];

            this.current = nodeId;
            this.stream[this.current] = [];

        } else {

            closed[this.name] = this;
            delete stream[this.name];

            return false;

        } return node[nodeId]


    }

    run() {

        while (this.next()) {

            this.resolveDependencies();

        }
        //wait(() => {_('finished analysing ' + this.name)})

    }

    resolveDependencies() {

        // need to resolve the dependencies of this.current
        let input = node[this.current].dock.input;

        for (let i in input) {

            let dockId = this.current+'-'+'Idock_'+i;

            let precedingNode = path.search(dockId)
                .attr('class').split(' ')[0].split('-')[0];
            precedingNode = node[precedingNode];

            let inputDocks = precedingNode.getDocksRef()
                .map((inputDock) => findConstant(inputDock) || findArgument(inputDock));

        	Promise.all(inputDocks).then((args) => {

                let arr = [precedingNode.function(args)[i]]
                _(node[this.current].function(arr)[i])  // testing only

			});

        }

    }

} let stream = {}; let closed = {};

let findConstant = function(dockRef) {
    let nd, dk; [nd, dk] = dockRef.split('-');
    return $('.'+nd).find('.'+dk).find('input').val();
}

let findArgument = function(dockId) {

	return new Promise((resolve, reject) => {

		let currentNode, i; [currentNode, i] = dock.linkedTo(dockId);
        currentNode = node[currentNode]; i = dock.getIndex(i);

		if (currentNode.isConstant) {

    		resolve(currentNode.function()[i]);

 		} else {

			let inputDocks = currentNode.getDocksRef()
                .map((inputDock) => findConstant(inputDock) || findArgument(inputDock)); // carefull here

			Promise.all(inputDocks).then((args) => {

				resolve(currentNode.function(args)[i]);

			});

		}

    });

};


let compile = () => { for (let name in stream) { stream[name].run() } };
