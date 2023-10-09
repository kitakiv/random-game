document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-conteiner');
    const ground = document.querySelector('.ground');

    let birdLeft = 22;
    let birdBottom = 10;
    let gravity = 0.2;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'rem';
        bird.style.left = birdLeft + 'rem';
    }

    let timerId = setInterval(startGame, 20);

    function control(e) {
        if (e.keyCode === 32) {
            jump();
        }
    }

    function jump() {
        if (birdBottom < 48) {
            birdBottom += 5;
            bird.style.bottom = birdBottom + 'rem';
            console.log(birdBottom)
        }
    }

    document.addEventListener('keyup', control)

    function generate() {
        let obstacleLeft = 50;
        let randomHeight = Math.random() * 6
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div')
        obstacle.classList.add('obstacle');
        gameDisplay.appendChild(obstacle);
        obstacle.style.left = obstacleLeft + 'rem';
        obstacle.style.bottom = obstacleBottom + 'rem';

        function moveObstacle()
    }
    generate()
})