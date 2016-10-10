const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT  = 450;
const canvas = document.getElementById("cMain");
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
function drawTriangle(){
    ctx.beginPath();
    ctx.moveTo(100,419);
    ctx.lineWidth=5;
    ctx.strokeStyle='red';
    ctx.shadowBlur=20;
    ctx.lineTo(150,419);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(150,419);
    ctx.strokeStyle='yellow';
    ctx.lineTo(125,369);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(125,369);
    ctx.strokeStyle='blue';
    ctx.lineTo(100,419);
    ctx.stroke();
}
function clearTriangle() {
    ctx.clearRect(0,0,900,450);
}
function rotateTriangle() {
    let progress=0;
    // clearTriangle();
    // drawLines();
    // ctx.beginPath();
    // ctx.moveTo(100,369);
    // ctx.strokeStyle='blue';
    // ctx.lineTo(150,369);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(150,369);
    // ctx.strokeStyle='yellow';
    // ctx.lineTo(125,419);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(125,419);
    // ctx.strokeStyle='red';
    // ctx.lineTo(100,369);
    // ctx.stroke();
    window.requestAnimationFrame(function loop(){
        clearTriangle();
        drawLines();
        ctx.beginPath();
        ctx.moveTo(100,369-progress);
        ctx.strokeStyle='blue';
        ctx.lineTo(150,369-progress);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(150,369-progress);
        ctx.strokeStyle='yellow';
        ctx.lineTo(125,419-progress);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(125,419-progress);
        ctx.strokeStyle='red';
        ctx.lineTo(100,369-progress);
        ctx.stroke();
        progress+=5;
        if(369-progress<30) return;
            window.requestAnimationFrame(loop);

    })
}
drawLines();
drawTriangle();
//rotateTriangle();
document.addEventListener("keydown",rotateTriangle);

//setInterval(drawLines,600);



