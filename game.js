const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const modeButton = document.getElementById("modeButton");

let dino = {
  x: 50,
  y: canvas.height - 55 - 50,
  width: 50,
  height: 50,
  color: "green",
  gravity: 0.6,
  lift: -15,
  velocity: 0,
};

let obstacles = [];
let score = 0;
let gameOver = false;
let isDarkMode = false;

function drawDino() {
  ctx.fillStyle = dino.color;
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function updateDino() {
  dino.velocity += dino.gravity;
  dino.y += dino.velocity;

  if (dino.y + dino.height > canvas.height - 5) {
    dino.y = canvas.height - dino.height - 5;
    dino.velocity = 0;
  }

  if (dino.y < 0) {
    dino.y = 0;
    dino.velocity = 0;
  }
}

function drawObstacles() {
  ctx.fillStyle = isDarkMode ? "#ff6347" : "red";
  for (let obs of obstacles) {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  }
}

function updateObstacles() {
  for (let obs of obstacles) {
    obs.x -= 5;
  }

  if (obstacles.length && obstacles[0].x < -obstacles[0].width) {
    obstacles.shift();
    score++;
  }

  if (Math.random() < 0.01) {
    obstacles.push({
      x: canvas.width,
      y: canvas.height - 55,
      width: 50,
      height: 50,
    });
  }
}

function checkCollision() {
  for (let obs of obstacles) {
    if (
      dino.x < obs.x + obs.width &&
      dino.x + dino.width > obs.x &&
      dino.y < obs.y + obs.height &&
      dino.y + dino.height > obs.y
    ) {
      gameOver = true;
    }
  }
}

function resetGame() {
  dino.y = canvas.height - 55 - dino.height;
  dino.velocity = 0;
  obstacles = [];
  score = 0;
  gameOver = false;
}

function drawGround() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, canvas.height - 5, canvas.width, 5);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameOver) {
    drawGround();
    drawDino();
    drawObstacles();
    updateDino();
    updateObstacles();
    checkCollision();

    requestAnimationFrame(draw);
  } else {
    ctx.fillStyle = isDarkMode ? "#fff" : "black";
    ctx.font = "48px serif";
    ctx.fillText("Game Over", canvas.width / 3, canvas.height / 2);
    ctx.font = "24px serif";
    ctx.fillText(
      "Press Space to Restart",
      canvas.width / 3,
      canvas.height / 2 + 50
    );
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (gameOver) {
      resetGame();
      draw();
    } else if (dino.y === canvas.height - dino.height - 5) {
      dino.velocity = dino.lift;
    }
  }
});

modeButton.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.documentElement.style.setProperty("--bg-color", "#333");
    document.documentElement.style.setProperty("--text-color", "#fff");
    document.documentElement.style.setProperty("--button-bg-color", "#555");
    document.documentElement.style.setProperty(
      "--button-hover-bg-color",
      "#444"
    );
    modeButton.textContent = "Switch to Light Mode";
  } else {
    document.documentElement.style.setProperty("--bg-color", "#f7f7f7");
    document.documentElement.style.setProperty("--text-color", "#000");
    document.documentElement.style.setProperty("--button-bg-color", "#ddd");
    document.documentElement.style.setProperty(
      "--button-hover-bg-color",
      "#ccc"
    );
    modeButton.textContent = "Switch to Dark Mode";
  }
  draw(); // Redraw the game to apply new colors
});

draw();
