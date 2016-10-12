
function Spike(ctxObs) {
    let spikeOriginalCoords={
        x1:909,y1:425,
        x2:934,y2:425,
        x3:921.5,y3:325
    };

    this.drawSpikesDown = function () {
        function clearAll() {
            ctxObs.clearRect(0, 0, 900, 450);
        };
        ctxObs.lineWidth = 3;
        ctxObs.shadowBlur = 20;

        let progress = 0;
        function spikeDrawer(coords, progress) {
            ctxObs.beginPath();
            ctxObs.moveTo(coords.x1 - progress, coords.y1);
            ctxObs.lineTo(coords.x2 - progress, coords.y2);
            ctxObs.strokeStyle = 'red';
            ctxObs.lineTo(coords.x3 - progress, coords.y3);
            ctxObs.lineTo(coords.x1 - progress, coords.y1);
            ctxObs.stroke();
        }

        function animate() {
            window.requestAnimationFrame(function loop() {
                clearAll();
                spikeDrawer(spikeOriginalCoords, progress);
                progress += 2;
                if (spikeOriginalCoords.x2 <= 0) {
                    clearAll();
                    return;

                }
                window.requestAnimationFrame(loop);
            })
        }
        animate();
    };
    this.drawSpikesUp =  function() {

        function clearAll() {
            ctxObs.clearRect(0, 0, 900, 450);
        }
        //ctxObs.strokeStyle='red';
        ctxObs.lineWidth = 3;
        ctxObs.shadowBlur = 20;
        let spikeOriginalCoords = {
            x1: 909, y1: 25,
            x2: 934, y2: 25,
            x3: 921.5, y3: 125
        };
        let progress = 0;

        function spikeDrawer(coords, progress) {
            ctxObs.beginPath();
            ctxObs.moveTo(coords.x1 - progress, coords.y1);
            ctxObs.lineTo(coords.x2 - progress, coords.y2);
            ctxObs.strokeStyle = 'blue';
            ctxObs.lineTo(coords.x3 - progress, coords.y3);
            ctxObs.lineTo(coords.x1 - progress, coords.y1);
            ctxObs.stroke();
            
        }

        function animate() {
            window.requestAnimationFrame(function loop() {
                spikeDrawer(spikeOriginalCoords, progress);
                clearAll();
                progress += 2;
                if (spikeOriginalCoords.x2 - progress <= 0) {
                    clearAll();
                    return;
                }
                window.requestAnimationFrame(loop);

            })
        }
        animate();
    };

    
}