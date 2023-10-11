document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-conteiner');
    const ground = document.querySelector('.ground');

    let birdLeft = 22;
    let birdBottom = 15;
    let gravity = 0.2;
    let gap = 43;
    let score = 0;
    let isgameover = false

    function startGame() {
        if (birdBottom === 6) {
            gameOver();
            clearInterval(timerId);
        }
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'rem';
        bird.style.left = birdLeft + 'rem';
    }

    let gameTimerId = setInterval(startGame, 20);

    function control(e) {
            jump();
    }

    function jump() {
        document.querySelector('.audio-fly').play()
        if (birdBottom < 48) {
            birdBottom += 4.1;
            bird.style.bottom = birdBottom + 'rem';
            console.log(birdBottom)
        }
    }

    document.addEventListener('click', control)

    function generate() {
        let obstacleLeft = 50;
        let randomHeight = Math.random() * 6
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div')
        const topObctacle = document.createElement('div')
        if (!isgameover) {
            document.querySelector('.audio-point').play()
            obstacle.classList.add('obstacle');
            topObctacle.classList.add('top-obstacle');
            score += 1;
            document.querySelector('.text').innerHTML = score;
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObctacle);
        obstacle.style.left = obstacleLeft + 'rem';
        obstacle.style.bottom = obstacleBottom + 'rem';
        topObctacle.style.left = obstacleLeft + 'rem';
        topObctacle.style.bottom = obstacleBottom + gap + 'rem';
        function moveObstacle() {
            obstacleLeft -= 0.2;
            obstacle.style.left = obstacleLeft + 'rem';
            topObctacle.style.left = obstacleLeft + 'rem';
            // if (obstacleLeft === 0) {
            //     clearInterval(timerId);
            //     document.querySelectorAll[0]('.obstacle').remove();

            // }

            if (obstacleLeft > 20 && obstacleLeft < 28 && birdLeft === 22 && birdBottom < obstacleBottom + 15.3 || birdBottom > obstacleBottom + gap - 20 && obstacleLeft > 20 && obstacleLeft < 28 && birdLeft === 22) {
                gameOver();
                clearInterval(timerId);
            }

            if (birdBottom === 1) {
                gameOver();
                clearInterval(timerId);
            }

            if (obstacleLeft < -6) {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObctacle);
            }

        }
        let timerId = setInterval(moveObstacle, 20);
        if (!isgameover) {
            setTimeout(generate, 3000)
        }

    }
    generate()

    function gameOver() {
        clearInterval(gameTimerId);
        isgameover = true;
        document.removeEventListener('click', control)
        bird.classList.add('gap-bird');
        bird.style.bottom = 0;
        document.querySelector('.audio-die').play()
    }
})