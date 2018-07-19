var append = function(parent, node) {
    return parent.insertAdjacentHTML('afterend', node)
}

var foo = function() {
    var btn = document.createElement('div');
    console.log(btn)
    var t = document.createTextNode('<span style="color:red">This</span> is the text');
    btn.appendChild(t);
    return document.body.appendChild(btn);
}


var addRow = function() {
    var div = document.createElement('div');

    var test = 'name';

    div.innerHTML = `
        <div class='box'>${test}</div>
        <div class='box'>Second</div>
    `;

    return document.querySelector('body').appendChild(div);
}

function removeRow(input) {
    document.getElementById('body').removeChild(input.parentNode);
}

var firstPart = addRow();
var SecondPart = addRow();
