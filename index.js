let scoreDisplay = document.getElementById('score');
let score = 0;

// Board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

// Snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velX = 0;
let velY = 0;

let snakeBody = [];

// Food
let foodX = blockSize * 10;
let foodY = blockSize * 10;
let foodImg = document.createElement('img');
foodImg.src = 'apple.png';

let gameOver = false;

window.onload = function(){
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // Used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 100); //Every 100 milliseconds it calls update
}

function update(){
    if (gameOver){
        document.getElementById('gameOver').classList.remove('hide');
        document.getElementById('playAgain').classList.remove('hide');
        return;
    }

    context.fillStyle = "#006400";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.drawImage(foodImg, foodX, foodY, blockSize, blockSize);

    checkAteFood();

    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length != 0){
        snakeBody[0] = [snakeX, snakeY];
    }

    drawSnake();

    scoreDisplay.innerHTML = 'Score: ' + score;
    gameOver = checkGameOver();
}

function drawSnake(){
    context.fillStyle = "orange";
    snakeX += velX * blockSize;
    snakeY += velY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    context.fillStyle = "lime";
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

}

function checkAteFood(){
    if (snakeX == foodX && snakeY == foodY){
        let audio = new Audio('audios/ateFoodSound.mp3');
        audio.play();
        score += 1;
        snakeBody.push([foodX, foodY])
        placeFood();
    }
}

function changeDirection(event){
    if (event.key == "ArrowUp" && velY != 1){
        velX = 0;
        velY = -1;
    }
    else if (event.key == "ArrowDown" && velY != -1){
        velX = 0;
        velY = 1;
    }
    else if (event.key == "ArrowLeft" && velX != 1){
        velX = -1;
        velY = 0;
    }
    else if (event.key == "ArrowRight" && velX != -1){
        velX = 1;
        velY = 0;
    }
}

function checkGameOver(){
    let audio = new Audio('audios/gameOverSound.mp3');
    if (snakeX < 0 || snakeX > (rows * blockSize) - blockSize
    || snakeY < 0 || snakeY > (cols * blockSize) - blockSize){
        audio.play();
        return true;
    }

    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            audio.play();
            return true;
        }
    }
    return false;
}

function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function resetGame(){
    gameOver = false;
    placeFood();
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    snakeBody = [];
    velX = 0;
    velY = 0;
    document.removeEventListener("keyup", changeDirection);
    document.addEventListener("keyup", changeDirection);
    document.getElementById('gameOver').classList.add('hide');
    document.getElementById('playAgain').classList.add('hide');
    score = 0;
}