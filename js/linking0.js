class Linking {

    static handler() {

        $('.snapDock').mousedown(function() {

            lk = new Linking(this);
            lk.mouseDown();

        })

    }

    mouseDown() {

        lk.snapped = false;
        if (this.occupied) {

            if (this.side == 'left') {
                // RENAME THOSE METHODS FOR CLARITY

                lk.unoccupy();

                lk.findOccupant();

            } else if (this.type == 'exe') {

                lk.updateExisting();

            }


        }


        if (!this.occupied) {

            lk.pos = lk.offset();

            $('.snapDock').mouseenter(function() {

                lk.mouseEnter(this);

            });

        }

        $('.snapDock').mouseleave(function() {

            lk.mouseLeave();

        })

    }

    updateExisting() {

        this.occupied = false;
        let oldTargetDock = path.chgAttr(this.id);

        // TO BE REVIEWED
        let a, b;
        [a, b] = oldTargetDock.split('-');
        $('.'+a).find('.'+b+' > .snapDock').attr('state', '');

    }

    unoccupy() {
        lk.occupied = false;
        lk.$.attr('state', '');
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

        let pos = arguments[0] ? lk.target.$.offset() : lk.$.offset();
        pos = view.adjust(pos.left, pos.top, 15.5);
        return [pos[0], pos[1]]

    }

    mouseLeave() {

        this.snapped = false;

        $('body').unbind('mousemove');

        // <!-- Added to prevent mouseup event stacking -->
        $('body').unbind('mouseup');

        $('body').mousemove(function() {
            lk.mouseMove();
        })

        $('body').mouseup(function() {
            lk.mouseUp();
        })

    }

    mouseUp() {

        /**************************/
        $('body').unbind('mousemove')
        $('body').unbind('mouseup')
        $('.snapDock').unbind('mouseenter')
        $('.snapDock').unbind('mouseleave')
        /**************************/

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

            lk.occupy(attr[0]);

        } else {

            lk.occupy([attr[0][0]]);

        } path.setAttr(this.id, attr[1])

    }

    occupy(a) {

        for (let i in a) {

            a[i].attr('state', true);

        } a[0].attr(this.id+','+this.target.id);

    }

    remove() {

        if (arguments[0]) { removeCurve(this.target.id) } else { removeCurve(this.id) }

    }

    mouseEnter(that) {

        lk.targetInit(that);
        $('body').unbind('mousemove');

        if (lk.areCompatible()) {

            this.target.pos = this.offset('target');

            lk.snapped = true;

            drawCurve(this.id, this.side, this.pos, this.target.pos);

        } else {

            $('body').mousemove(function() {

                lk.mouseMove();

            })

        }

    }

    mouseMove() {

        const mousePos = view.adjust(event.pageX, event.pageY)
        drawCurve(this.id, this.side, this.pos, mousePos);

    }

    targetInit(that) {

        lk.target = {}
        const details = lk.details(that);

        lk.target.$ = $(that)
        lk.target.node = details[0];
        lk.target.occupied = details[1];
        lk.target.type = details[2];
        lk.target.dock = details[3];
        lk.target.side = details[4];
        lk.target.id = details[0]+'-'+details[3];

    }

    areCompatible() {

        const notEqual = (this.node != this.target.node);
        const opposite = (this.side != this.target.side);
        const sameType = (this.type == this.target.type);
        return notEqual && opposite && sameType;

    }

    details() {
        let el = arguments[0] ? $(arguments[0]) : this.$;
        let array = [];

        array[0] = el.parents('.container').attr('class').split(' ')[1]
        array[1] = el.attr('state') == 'true';

        return array.concat(el.parent().attr('class').split(' '));
    }

    constructor(startDock) {
        this.start = startDock;
        this.$ = $(this.start);
        [this.node, this.occupied, this.type, this.dock, this.side] = this.details();
        this.id = this.node+'-'+this.dock;
    }

} let lk;
