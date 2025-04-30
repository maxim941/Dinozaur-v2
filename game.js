const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const music = document.getElementById("bg-music");

let isJumping = false;
let velocity = 0;
let position = 0;
let gravity = 0.6;
let jumpPower = -12;
let gameOver = false;
let score = 0;
let musicStarted = false;

function jump() {
  if (!isJumping && !gameOver) {
    velocity = jumpPower;
    isJumping = true;

    if (!musicStarted) {
      music.play().catch(() => {});
      musicStarted = true;
    }
  }
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});
document.addEventListener("click", jump);
document.addEventListener("touchstart", jump);

function gameLoop() {
  if (gameOver) return;

  velocity += gravity;
  position += velocity;

  if (position < 0) {
    position = 0;
    isJumping = false;
  }

  dino.style.bottom = position + "px";

  // Столкновение
  const dinoRect = dino.getBoundingClientRect();
  const obsRect = obstacle.getBoundingClientRect();

  if (
    obsRect.left < dinoRect.right &&
    obsRect.right > dinoRect.left &&
    dinoRect.bottom > obsRect.top
  ) {
    gameOver = true;
    music.pause();
    alert("Игра окончена! Счёт: " + score);
    location.reload();
  }

  requestAnimationFrame(gameLoop);
}

setInterval(() => {
  if (!gameOver) {
    score++;
    scoreText.textContent = "Очки: " + score;
  }
}, 200);

gameLoop();

