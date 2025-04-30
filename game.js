const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const music = document.getElementById("bg-music");
const musicStatus = document.getElementById("music-status");
const musicToggleButton = document.getElementById("music-toggle");

let isJumping = false;
let velocity = 0;
let position = 0;
const gravity = 0.5;
const jumpPower = -10;
const maxJumpHeight = 120;
let gameOver = false;
let score = 0;
let musicStarted = false;

function toggleMusic() {
  if (music.paused) {
    music.play().catch(() => {});
    musicStatus.textContent = "Музыка: Включена";
    musicToggleButton.textContent = "Выключить музыку";
  } else {
    music.pause();
    musicStatus.textContent = "Музыка: Выключена";
    musicToggleButton.textContent = "Включить музыку";
  }
}

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

  // Ограничение по высоте
  if (position >= maxJumpHeight) {
    position = maxJumpHeight;
    velocity = Math.min(velocity, 0); // не даём прыгать выше
  }

  // Земля
  if (position <= 0) {
    position = 0;
    velocity = 0;
    isJumping = false;
  }

  dino.style.bottom = `${position}px`;

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
    scoreText.textContent = `Очки: ${score}`;
  }
}, 200);

gameLoop();
const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const music = document.getElementById("bg-music");
const musicStatus = document.getElementById("music-status");
const musicToggleButton = document.getElementById("music-toggle");

let isJumping = false;
let velocity = 0;
let position = 0;
const gravity = 0.5;
const jumpPower = -10;
const maxJumpHeight = 120;
let gameOver = false;
let score = 0;
let musicStarted = false;

function toggleMusic() {
  if (music.paused) {
    music.play().catch(() => {});
    musicStatus.textContent = "Музыка: Включена";
    musicToggleButton.textContent = "Выключить музыку";
  } else {
    music.pause();
    musicStatus.textContent = "Музыка: Выключена";
    musicToggleButton.textContent = "Включить музыку";
  }
}

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

  // Ограничение по высоте
  if (position >= maxJumpHeight) {
    position = maxJumpHeight;
    velocity = Math.min(velocity, 0); // не даём прыгать выше
  }

  // Земля
  if (position <= 0) {
    position = 0;
    velocity = 0;
    isJumping = false;
  }

  dino.style.bottom = `${position}px`;

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
    scoreText.textContent = `Очки: ${score}`;
  }
}, 200);

gameLoop();
