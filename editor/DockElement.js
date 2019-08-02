'use strict'

class DockElement extends Element {

	get position() {

        const [ nodePosX, nodePosY ] = this.node.element.position;
        const [ offsetX, offsetY ] = this.offset;

        return [ nodePosX + offsetX, nodePosY + offsetY ];

    }

	/**
	 * Getter/Setter callback definitions delegated to `Dock`.
	 */
	callbacks = {

		/**
		 * Sets the text displayed beside the dock.
		 */
		label(label) { this.label.textContent = label },

	}

	constructor(dock, parent, parameters) {

		super(dock, parent, parameters.select('label'));

		this.node = dock.node;
		this.dock = dock;

		wait(() => this.offset = this.getRelativePosition());

		this.observe(dock);

	}

	create(dock) {

		const $ = Template.dock();
		
        Object.assign(this, {
            container: $('.dock-container'),
            pin: $('.dock'),
            snap: $('.snap-dock'),
            param: $('.param-container'),
            label: $('.param-label'),
        });

        this.container.classList.add(
            dock instanceof DataDock ? 'data' : 'exe',
            dock.isRight ? 'right' : 'left'
        );

        this.snap.ref = dock.id;
        this.container.id = dock.id;

    }

	getRelativePosition() {

        const nodePos = this.node.element.container.getBoundingClientRect();
        const dockPos = this.pin.getBoundingClientRect();
		const offset = this.dock.constructor.offset;
		
        return [
            (dockPos.x - nodePos.x) / Canvas.zoomLevel + offset,
            (dockPos.y - nodePos.y) / Canvas.zoomLevel + offset
        ];

    }

}