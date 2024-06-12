let score = 0;
cross = true;

audio = new Audio('gameMusic.mp3');
GameOver = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function (e) {
    console.log("key code is:", e.keyCode)
    let dino = document.querySelector('.dino');
    // Play game music on first user interaction
    if (!audio.playing) {
        audio.play();
        audio.playing = true;
    }
    if (e.keyCode == 38) {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);
    console.log(offsetX, offsetY);
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again "
        obstacle.classList.remove('obstacleAni');
        GameOver.play();
        setTimeout(() => {
            GameOver.pause();
            audio.pause();
        }, 1000);
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('new animation duration',)
        }, 500);
    }
}, 100);

function updateScore(score) {
    let scoreCont = document.getElementById('scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}
