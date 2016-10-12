function starGame() {  // The main function of the game Engine
    const CANVAS_WIDTH = 900;
    const CANVAS_HEIGHT  = 450;
    const canvas = document.getElementById("cMain");
    let obstacleCanvas = document.getElementById('c').getContext('2d');
    let lastMove = null;
    let xCoordinateMoveSpeed = 10;
    let isTriangleFlipped = false;
    let disableMovement =false;
    let ctx = canvas.getContext('2d');
    let lowerBottom = CANVAS_HEIGHT -25,
        highestTop  = 25;
    let triangleFlips = 0;
    let currentLocation = {
        x1:100,
        y1:419,    /*  The coordinates of the triangle for easy control in the code below
                        */
        x2:150,
        y2:419,
        x3:125,
        y3:369
        };

    let triangle = {  // Triangle object -> simply fuctions

        draw: function drawTriangle(location){
            // Drawing triangle with red    hypotenuse station on the floor - the red line
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
        drawUpsideDown: function (location) {
            // Drawing upside down triangle with blue hypotenuse. Must be station only on the ceil
            ctx.beginPath();
            ctx.moveTo(location.x1,location.y3);
            ctx.strokeStyle='blue';
            ctx.lineTo(location.x2,location.y3);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(location.x2,location.y3);
            ctx.strokeStyle='yellow';
            ctx.lineTo(location.x3,location.y2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(location.x3,location.y2);
            ctx.strokeStyle='red';
            ctx.lineTo(location.x1,location.y3);
            ctx.stroke();

        },
        clear: function clearTriangle() {
            ctx.clearRect(0,0,900,450);
            //Clear the triangle . NOTE: In fact this clears all the canvas so maybe need fix ?
        },
        upperFlip: function upperFlip(location) {
            //Animated movement that draws upside down triangle
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
                progress+=40; //The step that changes all of the y coordinates
                if(location.y3-progress<20){
                    // location.y1 -= progress -40 ;
                    // location.y2 -= progress - 40 ;
                    // location.y3 -= progress  - 40;
                    location.y1=35;
                    location.y2=85;
                    location.y3=35;
                    triangle.clear();
                    drawLines();
                    triangle.drawUpsideDown(location);
                    isTriangleFlipped=true;
                    // location.y1=35;
                    // location.y2=35;
                    // location.y3=85;
                    return;
                }
                window.requestAnimationFrame(loop);

            })
        },
        downFlip: function (location) {
            //Animated movement that draws normal triangle on the floor with red hypotenuse
            let progress=0;
            let temp = location.y2;
            location.y2=location.y3;
            location.y3=temp;
            window.requestAnimationFrame(function loop(){
                triangle.clear();
                drawLines();
                ctx.beginPath();
                ctx.moveTo(location.x1,location.y1+progress);
                ctx.strokeStyle='red';
                ctx.lineTo(location.x2,location.y2+progress);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(location.x2,location.y2+progress);
                ctx.strokeStyle='yellow';
                ctx.lineTo(location.x3,location.y3+progress);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(location.x3,location.y3+progress);
                ctx.strokeStyle='blue';
                ctx.lineTo(location.x1,location.y1+progress);
                ctx.stroke();
                progress+=40;
                if(location.y3+progress>400) {
                    // location.y1 += progress-40;
                    // location.y2 += progress-40;
                    // location.y3 += progress-40;
                    location.y1=419;
                    location.y2=419;
                    location.y3=369;
                    triangle.clear();
                    drawLines();
                    triangle.draw(location);
                    return;
                }
                window.requestAnimationFrame(loop);

            })

        },
        moveLeft : function (location,isTriangleFlipped) {
            // Moving the triangle left form the current location
            xCoordinateMoveSpeed=20;
            location.x1 -= xCoordinateMoveSpeed;
            //TODO : Bounders
            if(location.x1 <1 ) {
                location.x1 = 0;
                location.x2=50;
                 location.x3=25;
                xCoordinateMoveSpeed=0;
            }
            location.x2 -= xCoordinateMoveSpeed;
            location.x3 -= xCoordinateMoveSpeed;
            if(isTriangleFlipped) {//Checks if the triangle is normal or upside down

                triangle.drawUpsideDown(location)
            }else {
                triangle.draw(location);
            }

        },
        moveRight : function (location,isTriangleFlipped) {
            // Moving the triangle left form the current location
            //TODO Bounders have bug! Triangle must not go out of the canvas
            xCoordinateMoveSpeed=20;
            location.x1 += xCoordinateMoveSpeed;
            location.x2 += xCoordinateMoveSpeed;
            location.x3 += xCoordinateMoveSpeed;
            if(location.x2 >= 900) {
                location.x2 = 900;
                location.x3=875;
                location.x1=850;
                xCoordinateMoveSpeed=0;
            }
            if(isTriangleFlipped) { //Checks if the triangle is normal or upside down
                triangle.drawUpsideDown(location);
            }else {
                triangle.draw(location);
            }

        },
		Jump : function (location,isTriangleFlipped) {
           let progress=0;
            window.requestAnimationFrame(function loop(){
                triangle.clear();
                drawLines();
                ctx.beginPath();
                ctx.moveTo(location.x1,location.y3-progress);
                ctx.strokeStyle='red';
                ctx.lineTo(location.x2,location.y3-progress);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(location.x2,location.y3-progress);
                ctx.strokeStyle='red';
                ctx.lineTo(location.x3,location.y2-progress);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(location.x3,location.y2-progress);
                ctx.strokeStyle='red';
                ctx.lineTo(location.x1,location.y3-progress);
                ctx.stroke();
                progress+=40; //The step that changes all of the y coordinates
                if(location.y3-progress<20){

                    location.y1=185;
                    location.y2=235;
                    location.y3=185;
                    triangle.clear();
                    drawLines();
                    triangle.drawUpsideDown(location);
                    isTriangleFlipped=true;
                    // location.y1=35;
                    // location.y2=35;
                    // location.y3=85;
                    return;
                }
                window.requestAnimationFrame(loop);

            })
		
		 },
		  MoveDown : function (location,isTriangleFlipped) {
            let progress=0;
            let temp = location.y2;
            location.y2=location.y3;
            location.y3=temp;
            window.requestAnimationFrame(function loop(){
                triangle.clear();
                drawLines();
                ctx.beginPath();
                ctx.moveTo(location.x1,location.y1+progress);
                ctx.strokeStyle='red';
                ctx.lineTo(location.x2,location.y2+progress);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(location.x2,location.y2+progress);
                ctx.strokeStyle='red';
                ctx.lineTo(location.x3,location.y3+progress);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(location.x3,location.y3+progress);
                ctx.strokeStyle='red';
                ctx.lineTo(location.x1,location.y1+progress);
                ctx.stroke();
                progress+=40;
                if(location.y3+progress>400) {
         
                    location.y1=419;
                    location.y2=419;
                    location.y3=369;
                    triangle.clear();
                    drawLines();
                    triangle.draw(location);
                    return;
                }
                window.requestAnimationFrame(loop);
                window.clearInterval(myVar);
            })
		 },
 
    };
    
    function drawLines() { //Drawing the ceil and the top lines
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

    document.addEventListener("keydown",performAction); //Event listener for keypress event. Every time
    //a key is pressed this event is fired.
function performAction(event) { //Cheking  if the key is one of the following and performin action
    switch (event.code) {
        case "Space" :
            if(triangleFlips %2 == 0) {
                triangle.upperFlip(currentLocation);
                isTriangleFlipped = true;
				window.clearInterval(myVar);
            }else {
                triangle.downFlip(currentLocation);
                isTriangleFlipped = false;
				 window.clearInterval(myVar);
            }

            triangleFlips ++;
            break;
        case "ArrowLeft" :
                triangle.clear();
                drawLines();
                triangle.moveLeft(currentLocation, isTriangleFlipped);
            break;
         case "ArrowUp" :
            triangle.clear();
            drawLines();
			triangle.Jump(currentLocation, isTriangleFlipped);
			myVar = window.setInterval(function(){
                triangle.MoveDown(currentLocation, isTriangleFlipped)}, 2000);
					
			break;
            break;
        case "ArrowRight" :
            triangle.clear();
            drawLines();
            triangle.moveRight(currentLocation,isTriangleFlipped);
            break;
				case "ArrowDown" :
                triangle.clear();
                drawLines();
                triangle.MoveDown(currentLocation, isTriangleFlipped);
				 window.clearInterval(myVar);
            break;
        default :
            break;

    }
}

}
starGame(); // Starting the game 




