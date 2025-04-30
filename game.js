let dino = document.getElementById('dino');
let obstacle = document.getElementById('obstacle');
let isJumping = false;
let isGameOver = false;
let music = document.getElementById('gameMusic');

function startGame() {
    if (!isGameOver) {
        moveObstacle();
        detectCollision();
    }
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        dino.classList.add('jumping');
        setTimeout(() => {
            dino.classList.remove('jumping');
            isJumping = false;
        }, 500);
    }
}

function moveObstacle() {
    let obstaclePosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));
    if (obstaclePosition >= 600) {
        obstacle.style.right = '-30px';
    } else {
        obstacle.style.right = obstaclePosition + 2 + 'px';
    }
}

function detectCollision() {
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));

    if (obstacleRight > 50 && obstacleRight < 80 && dinoBottom <= 30) {
        gameOver();
    }
}

function gameOver() {
    isGameOver = true;
    alert('Игра окончена!');
}

document.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'ArrowUp') {
        jump();
    }
});

document.addEventListener('touchstart', (event) => {
    jump(); // Для мобильных устройств, по касанию экрана
});

// Запускаем музыку при старте игры
music.play();

setInterval(startGame, 20);

  
