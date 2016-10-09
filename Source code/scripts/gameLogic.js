const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT  = 450;
const canvas = document.getElementById("c");
const TOP_LINE  = 'red';
const  BOTTOM_LINE = 'blue';
let ctx = canvas.getContext('2d');
let triangleCorrection =0;
function drawLines() {
    ctx.beginPath();
    ctx.strokeStyle = '#DD0000';
    ctx.moveTo(0,25);
    ctx.lineTo(CANVAS_WIDTH,25);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.moveTo(0,425);
    ctx.beginPath();
    ctx.strokeStyle = '00308F';
    ctx.lineTo(CANVAS_WIDTH,CANVAS_HEIGHT-25);
    ctx.stroke();
}
function drawTriangle(correction) {
    ctx.beginPath();
    ctx.moveTo(60 + correction,400);
    ctx.lineTo(90 + correction,360);
    ctx.lineTo(120 + correction,400);
    ctx.closePath();
    ctx.stroke();

}
drawLines();
setInterval(drawLines,600);



