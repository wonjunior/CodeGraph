$('.paramContainer > input').focus(() => new ConstInput(event));

/*let inputConstant = function(e) {

    let display = $(e.target).hide()
	let input = display.next()

    input.width(display.width()).show();

    wait(() => {input.focus()})
    $('.paramContainer').unbind('mousedown')

}*/

class ConstInput {

    constructor(e) {
        constInput = this;
    }

    hide(el) {
        this.$.hide();
    }

} let constInput;
