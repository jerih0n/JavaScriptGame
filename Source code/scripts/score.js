function score() {
    let score = 0;
    let highScore = 0;
    points = 100;

    function newHighScore(score) {
        if (score > highScore) {
            highScore = score;
        }
    }

    score = setInterval(points, 1000);

    document.getElementById('score').innerHTML = "Score: " + score;

    function gameOver() {
        alert ("You reach  " + score + " points");
        document.getElementById("popup").innerHTML ="Game Over!";
        document.getElementById("popup").style.display = "block";
        setTimeout(messageHide, 5000); 	/* pop up appears when game is over */
    }
}

// This must be added in the HTML: <div id= "score"></div> 