function starGame() {
    const CANVAS_WIDTH = 900;
    const CANVAS_HEIGHT  = 450;
    const canvas = document.getElementById("cMain");
    let xCoordinateMoveSpeed = 10;
    let isTriangleFlipped = false;
    let ctx = canvas.getContext('2d');
    let lowerBottom = CANVAS_HEIGHT -25,
        highestTop  = 25;
    let triangleFlips = 0;
    let currentLocation = {
        x1:100,
        y1:419,
        x2:150,
        y2:419,
        x3:125,
        y3:369
        };
    let triangle = {

        draw: function drawTriangle(location){
            ctx.beginPath();
            ctx.moveTo(location.x1,location.y1);
            ctx.lineWidth=5;
            ctx.strokeStyle='red';
            ctx.shadowBlur=20;
            ctx.lineTo(location.x2,location.y2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(location.x2,location.y2);
            ctx.strokeStyle='yellow';
            ctx.lineTo(location.x3,location.y3);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(location.x3,location.y3);
            ctx.strokeStyle='blue';
            ctx.lineTo(location.x1,location.y1);
            ctx.stroke();
        },
        clear: function clearTriangle() {
            ctx.clearRect(0,0,900,450);
        },
        upperFlip: function upperFlip(location) {
            let progress=0;
            window.requestAnimationFrame(function loop(){
                triangle.clear();
                drawLines();
                ctx.beginPath();
                ctx.moveTo(location.x1,location.y3-progress);
                ctx.strokeStyle='blue';
                ctx.lineTo(location.x2,location.y3-progress);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(location.x2,location.y3-progress);
                ctx.strokeStyle='yellow';
                ctx.lineTo(location.x3,location.y2-progress);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(location.x3,location.y2-progress);
                ctx.strokeStyle='red';
                ctx.lineTo(location.x1,location.y3-progress);
                ctx.stroke();
                progress+=40;
                if(location.y3-progress<20) return;
                window.requestAnimationFrame(loop);

            })
        },
        downFlip: function (location) {
            let progress=0;
            window.requestAnimationFrame(function loop(){
                triangle.clear();
                drawLines();
                ctx.beginPath();
                ctx.moveTo(location.x1,location.y3+progress);
                ctx.strokeStyle='blue';
                ctx.lineTo(location.x2,location.y3+progress);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(location.x2,location.y3+progress);
                ctx.strokeStyle='yellow';
                ctx.lineTo(location.x3,location.y2+progress);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(location.x3,location.y2+progress);
                ctx.strokeStyle='red';
                ctx.lineTo(location.x1,location.y3+progress);
                ctx.stroke();
                progress+=40;
                if(location.y3+progress>400) return;
                window.requestAnimationFrame(loop);

            })

        },
        moveLeft : function (location) {
            location.x1 -= xCoordinateMoveSpeed;
            //TODO : Bounders
            if(location.x1 <=0 ) {
                location.x1 = 0;
            }
            location.x2 -= xCoordinateMoveSpeed;
            location.x3 -= xCoordinateMoveSpeed;
            triangle.draw(location);
        },
        moveRight : function (location) {

            location.x1 += xCoordinateMoveSpeed;
            location.x2 += xCoordinateMoveSpeed;
            location.x3 += xCoordinateMoveSpeed;
            if(location.x3 >= 900) {
                location.x3 = 900;
            }
            triangle.draw(location);
        }
    };
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
    triangle.draw(currentLocation); //By default values
//rotateTriangle();
    document.addEventListener("keydown",performAction);
function performAction(event) {
    switch (event.code) {
        case "Space" :
            if(triangleFlips %2 == 0) {
                triangle.upperFlip(currentLocation);
            }else {
                triangle.downFlip(currentLocation);
            }

            triangleFlips ++;
            break;
        case "ArrowLeft" :
            if(isTriangleFlipped) {
                //TODO:Logic moving flipped triangle
            }
            triangle.clear();
            drawLines(); // TODO : ADDING 3th canvas to stop lines and obstacles from deleting.
            triangle.moveLeft(currentLocation);
            break;
        case "ArrowUp" : //TODO jump
            break;
        case "ArrowRight" :
            if(isTriangleFlipped) {
                //TODO:Logic for moving flipped triangle
            }
            triangle.clear();
            drawLines();
            triangle.moveRight(currentLocation);

            break;

    }
}
//setInterval(drawLines,600);

}
starGame();




