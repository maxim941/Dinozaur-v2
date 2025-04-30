const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const music = document.getElementById("bg-music");

let isJumping = false;
let score = 0;
let gameOver = false;
let musicStarted = false;

function jump() {
  if (isJumping || gameOver) return;

  if (!musicStarted) {
    music.play().catch(() => {});
    musicStarted = true;
  }

  isJumping = true;
  dino.animate([
    { transform: "translateY(0)" },
    { transform: "translateY(-120px)" },
    { transform: "translateY(0)" }
  ], {
    duration: 600,
    easing: "ease-out"
  });

  setTimeout(() => {
    isJumping = false;
  }, 600);
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});

document.addEventListener("click", jump);
document.addEventListener("touchstart", jump);

setInterval(() => {
  if (gameOver) return;

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
}, 10);

setInterval(() => {
  if (!gameOver) {
    score++;
    scoreText.textContent = "Очки: " + score;
  }
}, 200);

