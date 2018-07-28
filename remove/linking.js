class Linking {

    constructor(dockData) {

        this.origin = dockData;
        this.path = undefined;
        
        this.mouseDown();

    }

    mouseDown() {

        if (this.origin.occupied && (!this.origin.isRight || this.origin.type == 'exe')) {

            this.target = this.origin;
            [this.origin, this.path] = this.origin.path[0].edit();

        }

        this.origin.pos = this.origin.offset();

        $('body').unbind('mouseup').mouseup(() => this.mouseUp());
        this.snapped = Linking.listen['mouseenter'] = Linking.listen['mouseleave'] = true;

    }

    mouseLeave() {

        this.snapped = false;

        $('body').unbind('mousemove').mousemove(() => this.mouseMove());

    }

    mouseMove() {

        Path.draw(this.origin, view.adjust(event.pageX, event.pageY));

    }

    mouseEnter(dock) {

        this.target = dock;

        $('body').unbind('mousemove');

        if (this.areCompatible()) {

            this.snapped = true;

            this.target.pos = this.target.offset();

            Path.draw(this.origin, this.target)

        } else {

            $('body').mousemove(() => this.mouseMove());

        }

    }

    mouseUp() {

        $('body').unbind('mousemove').unbind('mouseup');
        Linking.listen['mouseenter'] = Linking.listen['mouseleave'] = false;

        if (!this.snapped) {

            this.remove();

        } else if (this.snapped && this.path) {

            if (this.target.occupied) {

                _('occupied')

            } this.save();

        }

    }

    remove() {

        this.path.remove(this.origin);

    }

    save() {

        this.path.save(this.origin.type, this.target);

    }

    areCompatible() {

        return (this.origin.node != this.target.node)
        && (this.origin.isRight != this.target.isRight)
        && (this.origin.type == this.target.type);

    }

    /**************************/
    /**************************/

    /*popOccupant() {

        // to be rewritten on path refactor
        let fullRef = path.getOccupant(this.target.ref);

        let [node1, dock1] = fullRef[0].split('-');
        let [node2, dock2] = fullRef[1].split('-');
        node[node1].docks

    }*/


    updateExisting() {

        this.origin.occupied = false;
        let oldTargetDock = path.chgAttr(this.id);

        // TO BE REVIEWED
        let a, b;
        [a, b] = oldTargetDock.split('-');
        $('.'+a).find('.'+b+' > .snapDock').attr('state', '');

    }


    occupy(a) {

        for (let i in a) {

            a[i].attr('state', true);

        } a[0].attr(this.id+','+this.target.id);

    }


    details() {
        let el = arguments[0] ? $(arguments[0]) : this.$;
        let array = [];

        array[0] = el.parents('.container').attr('class').split(' ')[1]
        array[1] = el.attr('state') == 'true';

        return array.concat(el.parent().attr('class').split(' '));
    }

} let lk; Linking.listen = {};
