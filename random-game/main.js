const button = document.querySelector('.button');
const popUp = document.querySelector('.pop-up');
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.result').innerHTML = JSON.parse(localStorage.getItem('best'))
    const mas = JSON.parse(localStorage.getItem('score'));
    for (let i = 1; i <= mas.length; i++) {
        let img = document.createElement('img')
        const star = document.createElement('div');
        img.src = './assets/img/starbronze.png';
        img.alt = 'star';
        img.classList.add('img')
        star.classList.add('star');
        star.innerHTML = `${mas[mas.length - i]}`;
        if (mas[mas.length - i] >= 50) {
                star.appendChild(img);
                img.src = './assets/img/starsilver.png';
                star.appendChild(img);
                img.src = './assets/img/icons8-pixel-star-481.png'
                star.appendChild(img);
        }
        if (mas[mas.length - i] > 9 && mas[mas.length - i] < 50) {
                star.appendChild(img);
                img.src = './assets/img/starsilver.png';
                star.appendChild(img);
        }
        if (mas[mas.length - i].toString().length === 1) {
                star.appendChild(img)
        }
        document.querySelector('.block').appendChild(star);
    }
})
button.addEventListener('click', () => {
    popUp.classList.add('hidden')
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-conteiner');
    const ground = document.querySelector('.ground');

    let birdLeft = 22;
    let birdBottom = 15;
    let gravity = 0.2;
    let gap = 55;
    let score = -1;
    let isgameover = false
    let vel = 5;

    function startGame() {
        // if (birdBottom === 6) {
        //     gameOver();
        //     clearInterval(timerId);
        // }
        if (!isgameover) {
            birdBottom -= gravity;
            bird.style.bottom = birdBottom + 'rem';
            bird.style.left = birdLeft + 'rem';
        }
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
            bird.classList.add('jump')
            setTimeout(() => {
                bird.classList.remove('jump')
            }, 300)
        }
    }

    document.addEventListener('click', control)
    // document.addEventListener('keyup', (e) => {
    //     if (e.target === 32) {
    //         control()
    //     }
    // })

    function generate() {
        if (gap > 45 && score > vel) {
            gap -= 2;
            vel += 5
        }
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
                clearInterval(timerId);
                gameOver();
            }

            // if (birdBottom === 1) {
            //     gameOver();
            //     clearInterval(timerId);
            // }

            if (obstacleLeft < -7) {
                clearInterval(timerId);
                const obstacle = document.querySelector('.obstacle')
                const topObctacle = document.querySelector('.top-obstacle')
                    gameDisplay.removeChild(obstacle);
                    gameDisplay.removeChild(topObctacle);
            }

        }
        let timerId = setInterval(moveObstacle, 20);
        if (!isgameover) {
                setTimeout(generate, 3000);
        }

    }
    generate()

    function gameOver() {
        if (!isgameover){
            if (JSON.parse(localStorage.getItem('score')) === null) {
                console.log('of')
                localStorage.setItem('score', JSON.stringify([]))
                localStorage.setItem('best', JSON.stringify(0))
            }
            isgameover = true;
            clearInterval(gameTimerId);
            document.removeEventListener('click', control)
            // document.removeEventListener('keyup', control)
            bird.classList.add('gap-bird');
            bird.style.bottom = 0;
            let scoreResult = JSON.parse(localStorage.getItem('score'));
            if (scoreResult.length >= 10) {
                scoreResult.shift()
            }
            scoreResult.push(score)
            localStorage.setItem('score', JSON.stringify(scoreResult))
            let best = scoreResult.reduce((acc, elem) => Math.max(acc, elem), 0);
            best = Math.max(best, JSON.parse(localStorage.getItem('best')))
            localStorage.setItem('best', JSON.stringify(best))
            document.querySelector('.audio-die').play()
            setTimeout(() => {
                document.querySelector('.audio-die').pause()
            }, 1000)
            setTimeout(() => {
                location.reload();
            }, 3001)
        }
    }
})