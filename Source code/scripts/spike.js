function drawSpike() {
    const canvas = document.getElementById("obs");
    let obstacleCanvas = document.getElementById('c').getContext('2d');
    let timer = setInterval(animate 20);
    let direction = false;
    let currentLocation = {
        x1:850,
        y1:419,
        x2:900,
        y2:419,
        x3:875,
        y3:329
    };
    let spike = {
        function animate() {
        ctx.clearRect(0, 0, 800, 600);

        ctx.beginPath();
        ctx.moveTo(location.x1,location.y1);
        ctx.lineWidth=5;
        ctx.strokeStyle='green';
        ctx.shadowBlur=20;
        ctx.lineTo(location.x2,location.y2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(location.x2,location.y2);
        ctx.strokeStyle='green';
        ctx.lineTo(location.x3,location.y3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(location.x3,location.y3);
        ctx.strokeStyle='green';
        ctx.lineTo(location.x1,location.y1);
        ctx.stroke();
        ctx.fill

        if (direction) {
            spike.x -=5
            if (spike.x<= 25) {
                spike.remove();
            }
        }
        requestAnimationFrame(animate);
    }
    animate()
    moveLeft : function (location) {
        xCoordinateMoveSpeed=5;
        location.x1 -= xCoordinateMoveSpeed;
        if(location.x1 <1 ) {
            location.x1 = 0;
            location.x2=50;
            location.x3=25;
            xCoordinateMoveSpeed=0;
        }
        location.x2 -= xCoordinateMoveSpeed;
        location.x3 -= xCoordinateMoveSpeed;
    },
}
}