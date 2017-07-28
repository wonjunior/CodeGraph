<!--<circle id="testerA" fill="purple" cx="" cy="" r="3"></circle>
<g stroke="black" stroke-width="3" fill="black">
    <circle id="pointA" cx="318" cy="345" r="1" />
    <circle id="pointB" cx="330" cy="345" r="1" />
</g>
<g stroke="red" stroke-width="3" fill="red">
    <circle id="pointC" cx="450" cy="345" r="1" />
</g>
<g stroke="green" stroke-width="3" fill="green">
    <circle id="pointD" cx="380" cy="124" r="1" />
</g>
<g stroke="black" stroke-width="3" fill="black">
    <circle id="pointE" cx="504" cy="124" r="1" />
    <circle id="pointF" cx="519" cy="124" r="1" />
</g>-->

document.getElementById('pointA').setAttribute("cx", AX);
document.getElementById('pointA').setAttribute("cy", AY);
document.getElementById('pointB').setAttribute("cx", BX);
document.getElementById('pointB').setAttribute("cy", BY);
document.getElementById('pointC').setAttribute("cx", CX);
document.getElementById('pointC').setAttribute("cy", CY);
document.getElementById('pointD').setAttribute("cx", DX);
document.getElementById('pointD').setAttribute("cy", DY);
document.getElementById('pointE').setAttribute("cx", EX);
document.getElementById('pointE').setAttribute("cy", EY);
document.getElementById('pointF').setAttribute("cx", FX);
document.getElementById('pointF').setAttribute("cy", FY);














if(state) {
    var docksId = $('path[class*='+idSearch+']').attr('id');
    var docksIds = docksId.split('-');

    var firstId = docksIds[0]+'-'+docksIds[1];
    var secondId = docksIds[2]+'-'+docksIds[3];

    idSearchI = (idSearch == firstId) ? idSearch = secondId : idSearch = firstId;

    $('path[class*='+idSearch+']').attr('id',idSearchI);

    initialNode = idSearchI.split('-')[0]
    initialDock = idSearchI.split('-')[1]


    var initialDockElement = $('.' + initialNode + ' ' + '.' + initialDock + ' .snapDock').offset();
    dockX = initialDockElement.left +  20;
    dockY = initialDockElement.top +  20;

    dockSide = 'right';
    idSearch = idSearchI;

    //
    // change the state of the dock we have just left
    //

}
