class Dock {

    constructor(data) {

        this.id = data.prefix+'dock_'+data.index;
        this.node = data.nodeId;
        this.ref = this.node+'-'+this.id;
        this.type = data.type;
        this.isRight = data.isRight;
        this.label = data.label || '';
        this.occupied = false;
        this.path = [];

        if (data.type == 'data') {

            this.$ = this.createDataDock(data.parent);

        } else if (data.type == 'exe') {

            this.$ = this.createExeDock(data.parent);

        }  this.listen(); return this;

    }

    createExeDock(parent) {

        const side = this.isRight ? 'right' : 'left';
        let frame = element([
            '<div class="exe '+this.id+' '+side+'">',
                '<div class="pin"></div>',
            '</div>'
        ]).appendTo(parent);

        return $('<div class="snapDock"></div>').appendTo(frame);
    }

    createDataDock(parent) {

        const side = this.isRight ? 'right' : 'left';
        let frame = element([
            '<div class="data '+this.id+ ' ' +side+'">',
                '<div class="dock"></div>',
                '<div class="paramContainer">',
                    !this.isRight ? '<input required="required" type="text" ></input>' : '<div class="paramName">'+this.label+'</div>',
                '</div>',
            '</div>'
        ]).appendTo(parent);

        return $('<div class="snapDock"></div>').appendTo(frame);

    }

    listen() {
        this.$
            .bind('mousedown', () => { lk = new Linking(this); })
            .bind('mouseenter', () => { if (Linking.listen['mouseenter']) lk.mouseEnter(this) })
            .bind('mouseleave', () => { if (Linking.listen['mouseleave']) lk.mouseLeave(this) });
    }

    offset() {

        let pos = this.$.offset();
        return view.adjust(pos.left, pos.top, 15.5);

    }

}



/*linkedTo(id) {

return $('.'+id).attr('class').split(' ')[0].split('-');

}

getIndex(dock) {

return dock.split('_')[1];

}

getConst() {

}*/
