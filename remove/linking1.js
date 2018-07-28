class Linking {

    constructor(dockData) {

        Object.assign(this, dockData).mouseDown();

    }

    mouseDown() {

        this.target = {};
        this.snapped = false;

        /*if (this.occupied) {

            if (this.side == 'left') {
                // RENAME THOSE METHODS FOR CLARITY

                this.unoccupy();

                this.findOccupant();

            } else if (this.type == 'exe') {

                this.updateExisting();

            }

        }*/

        this.pos = this.offset();

        Linking.listen['mouseenter'] = true;

        Linking.listen['mouseleave'] = true;

    }

    updateExisting() {

        this.occupied = false;
        let oldTargetDock = path.chgAttr(this.id);

        // TO BE REVIEWED
        let a, b;
        [a, b] = oldTargetDock.split('-');
        $('.'+a).find('.'+b+' > .snapDock').attr('state', '');

    }

    findOccupant() {
        const pathId = path.linkedTo();

        const startDock = path.startDock(pathId)

        this.start = startDock[0]; this.$ = startDock[1];
        [this.node, this.occupied, this.type, this.dock, this.side] = this.details(startDock[0]);
        this.id = this.node+'-'+this.dock;
        this.pos = this.offset();

        path.switchId(pathId, this.id);
        if(this.type == 'exe') { this.occupied = false }

    }

    offset() {

        let pos = this.$.offset();
        return view.adjust(pos.left, pos.top, 15.5);

    }

    mouseLeave() {

        this.snapped = false;

        $('body').unbind('mousemove').mousemove(() => this.mouseMove());

        $('body').unbind('mouseup').mouseup(() => this.mouseUp());

    }

    unoccupy() {
        lk.occupied = false;
        lk.$.attr('state', '');
    }

    remove() {

        removeCurve(this.id)

    }

    mouseUp() {

        $('body').unbind('mousemove').unbind('mouseup')
        Linking.listen['mouseenter'] = false;
        Linking.listen['mouseleave'] = false;

        if (!this.snapped) {

            this.remove();

            if (this.type == 'exe') {

                this.unoccupy();

            }

        } else if(this.snapped) {

            if(this.target.occupied) {

                // this variable is only used in the the below if stmt
                let oldId = path.removeOccupant();

                if (this.type == 'exe') {

                    let freedDock = oldId[0] == this.target.id ? oldId[1] : oldId[0]
                    let a, b;
                    [a, b] = freedDock.split('-');
                    $('.'+a).find('.'+b+' > .snapDock').attr('state', '')

                }

            } this.save();

        }

    }

    save() {

        // QUITE SHADDY TO BE HONEST...
        const attr = path.orientAttr()

        if (this.type == 'exe') {

            this.occupy(attr[0]);

        } else {

            this.occupy([attr[0][0]]);

        } path.setAttr(this.id, attr[1])

    }

    occupy(a) {

        for (let i in a) {

            a[i].attr('state', true);

        } a[0].attr(this.id+','+this.target.id);

    }

    /*targetInit(that) {

        lk.target = {}
        const details = lk.details(that);

        lk.target.$ = $(that)
        lk.target.node = details[0];
        lk.target.occupied = details[1];
        lk.target.type = details[2];
        lk.target.dock = details[3];
        lk.target.side = details[4];
        lk.target.id = details[0]+'-'+details[3];

    }*/

    mouseEnter(dock) {

        this.target = new Linking(dock)
        _(this)
        $('body').unbind('mousemove');

        if (this.isCompatible(this.target)) {

            this.snapped = true;

            this.target.pos = this.target.offset();

            drawCurve(this.id, this.side, this.pos, this.target.pos);

        } else {

            $('body').mousemove(() => this.mouseMove());

        }

    }

    isCompatible(that) {

        return (this.node != that.node) && (this.side != that.side) && (this.type == that.type);

    }

    mouseMove() {

        const mousePos = view.adjust(event.pageX, event.pageY)
        drawCurve(this.id, this.side, this.pos, mousePos);

    }

    details() {
        let el = arguments[0] ? $(arguments[0]) : this.$;
        let array = [];

        array[0] = el.parents('.container').attr('class').split(' ')[1]
        array[1] = el.attr('state') == 'true';

        return array.concat(el.parent().attr('class').split(' '));
    }


} let lk; Linking.listen = {};
