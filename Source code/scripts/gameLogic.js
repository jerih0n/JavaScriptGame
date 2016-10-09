const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT  = 450;
const canvas = document.getElementById("c");
let ctx = canvas.getContext('2d');
let lowerBottom = CANVAS_HEIGHT -25,
    highestTop  = 25;
let triangleCorrection =0;
function drawLines() {
    ctx.beginPath();
    ctx.moveTo(0,25);
    ctx.lineTo(CANVAS_WIDTH,highestTop);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.shadowColor = 'purple';
    ctx.shadowBlur = 20;
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(0,425);
    ctx.lineTo(CANVAS_WIDTH,lowerBottom);
    ctx.stroke();
}

drawLines();
setInterval(drawLines,600);



