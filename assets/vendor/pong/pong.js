/*--------------------------------------------
               Pong Game
----------------------------------------------*/

// Get references to HTML elements used for the game
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Define buttons and display elements
const playButton = document.getElementById("play-button");
const replayButton = document.getElementById("replay-button");
const pauseBtn = document.getElementById("pauseBtn");
const gameOverDiv = document.getElementById("game-over");
const gameOverText = document.getElementById("game-over-text");
const gameOverMessage = document.getElementById("game-over-message");

// Set the canvas dimensions
canvas.width = 594;
canvas.height = 485;

// Track game state variables
let gameInterval;
let isGameRunning = false;

// Define player and computer paddles with properties
const player = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 50,
    width: 8,
    height: 70,
    color: "#FFF",
    score: 0,
    dy: 0
};

const computer = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 8,
    height: 70,
    color: "#FFF",
    score: 0,
    dy: 5
};

// Define the ball with properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    speed: 25,
    dx: 5,
    dy: 5,
    color: "#FFF"
};

// Functions to draw shapes and text on the canvas
function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y) {
    context.fillStyle = "#FFF";
    context.font = "26px 'ComicNeue-Regular'";
    context.fillText(text, x, y);
}

// Resets ball position and direction when needed
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
    ball.dy = Math.random() > 0.5 ? 5 : -4;
    ball.speed = 5;
}

// AI movement logic for the computer paddle
  function computerMovement() {
    let targetY = ball.y - (computer.height / 2);
    let direction = targetY > computer.y ? 1 : -1;
    computer.y += direction * Math.min(Math.abs(targetY - computer.y ), computer.dy);
    computer.y = Math.max(Math.min(computer.y, canvas.height - computer.height), 0);
}

// Check for collisions between the ball and paddles
function collisionDetection(player, ball) {
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;
   
    // Return true if there's a collision between the player/ball rectangles
    return player.right > ball.left && player.top < ball.bottom && player.left < ball.right && player.bottom > ball.top;
}

// Update game objects' positions and logic
function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    computerMovement();

    let playerToCheck = ball.x < canvas.width / 2 ? computer : player;

    if (collisionDetection(playerToCheck, ball)) {
        let collidePoint = (ball.y - (playerToCheck.y + playerToCheck.height / 2)) / (playerToCheck.height / 2);
        let angleRad = collidePoint * Math.PI / 4;
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.dx = direction * ball.speed * Math.cos(angleRad);
        ball.dy = ball.speed * Math.sin(angleRad);
        ball.speed += 0.1;
    }

    if (ball.x - ball.radius < 0) {
        player.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        computer.score++;
        resetBall();
    }

    if (player.score === 50 || computer.score === 50) {
        endGame(player.score === 50 ? "Player Wins!" : "Computer Wins!");
    }

    if (player.dy) {
        player.y += player.dy;
    }

    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Render the game on the canvas
function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    drawText("Player Score: " + player.score, canvas.width / 20, 50);
    drawText("Computer Score: " + computer.score, canvas.width * 5 / 8.5, 50);
}

// Main game loop function
function game() {
    update();
    render();
}

// Start the game when the play or replay button is clicked
function startGame() {
    playButton.style.display = "none";
    replayButton.style.display = "none";
    pauseBtn.style.display = "block";
    gameOverDiv.style.display = "none";
    isGameRunning = true;
    player.score = 0;
    computer.score = 0;
    ball.speed = 5;
    gameInterval = setInterval(game, 1000 / 60);

}

// Pause the game when the  button is clicked.
let isPaused = false;
pauseBtn.addEventListener("click", function() {
    if (isGameRunning) {
      isPaused = !isPaused; 
      if (isPaused) {
        clearInterval(gameInterval); 
        pauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
      } else {
        gameInterval = setInterval(game, 1000 / 60); 
        pauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      }
    }
  });

// End the game when computer/player wins.
function endGame(message) {
    clearInterval(gameInterval);
    isGameRunning = false;
    gameOverText.innerText = "Game Over!";
    gameOverMessage.innerText = message;
    gameOverDiv.style.display = "block";
    replayButton.style.display = "block";
    pauseBtn.style.display = "none";
}

//Event Listener
playButton.addEventListener("click", startGame);
replayButton.addEventListener("click", startGame);

document.addEventListener("keydown", event => {
    if (!isGameRunning) return;
    switch (event.key) {
        case "w":
            player.dy = -10;
            break;
        case "s":
            player.dy = 10;
            break;
    }
});

document.addEventListener("keyup", event => {
    if (!isGameRunning) return;
    switch (event.key) {
        case "w":
        case "s":
            player.dy = 0;
            break;
    }
});
