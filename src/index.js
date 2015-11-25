
var v = document.getElementById('v');
var canvas = document.getElementById('c');
var context = canvas.getContext('2d');


var cw = 600;//Math.floor(canvas.clientWidth / 100);
var ch = 600;//Math.floor(canvas.clientHeight / 100);
canvas.width = cw;
canvas.height = ch;

v.addEventListener('play', function(){
    draw(this,context,cw,ch);
},false);

function draw(v,c,w,h) {
    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);
    setTimeout(draw,20,v,c,w,h);
}