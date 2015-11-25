
var v = document.getElementById('v');
var canvas = document.getElementById('c');
var context = canvas.getContext('2d');

var videoHeight = 393;
var videoWidth = 589.5;

var cols = 3;
var rows = 3;

canvas.width = videoWidth/cols;
canvas.height = videoHeight/rows;

v.addEventListener('play', function(){
    draw(this,context,videoWidth,videoHeight);
},false);

function draw(v,c,w,h) {
    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);
    setTimeout(draw,20,v,c,w,h);
}