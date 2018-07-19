$.extend($.ui.draggable.prototype, {
    _mouseInit: function () {
        var that = this;
        if (!this.options.mouseButton) {
            this.options.mouseButton = 1;
        }

        $.ui.mouse.prototype._mouseInit.apply(this, arguments);

        if (this.options.mouseButton === 3) {
            this.element.bind("contextmenu." + this.widgetName, function (event) {
                if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
                    $.removeData(event.target, that.widgetName + ".preventClickEvent");
                    event.stopImmediatePropagation();
                    return false;
                }
                event.preventDefault();
                return false;
            });
        }

        this.started = false;
    },
    _mouseDown: function (event) {

        // we may have missed mouseup (out of window)
        (this._mouseStarted && this._mouseUp(event));

        this._mouseDownEvent = event;

        var that = this,
            btnIsLeft = (event.which === this.options.mouseButton),
            // event.target.nodeName works around a bug in IE 8 with
            // disabled inputs (#7620)
            elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
        if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
            return true;
        }

        this.mouseDelayMet = !this.options.delay;
        if (!this.mouseDelayMet) {
            this._mouseDelayTimer = setTimeout(function () {
                that.mouseDelayMet = true;
            }, this.options.delay);
        }

        if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
            this._mouseStarted = (this._mouseStart(event) !== false);
            if (!this._mouseStarted) {
                event.preventDefault();
                return true;
            }
        }

        // Click event may never have fired (Gecko & Opera)
        if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
            $.removeData(event.target, this.widgetName + ".preventClickEvent");
        }

        // these delegates are required to keep context
        this._mouseMoveDelegate = function (event) {
            return that._mouseMove(event);
        };
        this._mouseUpDelegate = function (event) {
            return that._mouseUp(event);
        };
        $(document)
            .bind("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .bind("mouseup." + this.widgetName, this._mouseUpDelegate);

        event.preventDefault();

        mouseHandled = true;
        return true;
    }
});
