'use strict'

class DockFactory {

    static sideAttributes = {
		left: { bool: false, capitalized: 'Left', prefix: 'L' },
        right: { bool: true, capitalized: 'Right', prefix: 'R' }
	}

	static typeAttributes = {
		DataDock: { prefix: 'd' },
		ExeDock: { prefix: 'e' },
	}

    constructor(dockDefinitions, side, factory, node) {

		this.sideAttributes = DockFactory.sideAttributes[ side ];
		this.typeAttributes = DockFactory.typeAttributes[ factory.name ];

		this.docks = dockDefinitions.map((dockDefinition, index) => {
			
			const { label, location } = dockDefinition;

			return new factory({
				id: this.constructId(node.id, index),
				isRight: this.sideAttributes.bool,
				node,
				label,
				location: location + this.sideAttributes.capitalized,
			});

		});
	
	}
	
	constructId(nodeId, index) {

        return nodeId + this.sideAttributes.prefix + this.typeAttributes.prefix + index;

    }
}