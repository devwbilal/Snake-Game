const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;
const snake = [{x: 0, y: 0}];
let food = {x: 0, y: 0};
let dx = gridSize;
let dy = 0;
let score = 0;

function drawSnake() {
ctx.fillStyle = '#0b8a3e';
for (let i = 0; i < snake.length; i++) {
ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
}
}

function drawFood() {
ctx.fillStyle = '#e74c3c';
ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function update() {
const head = {x: snake[0].x + dx, y: snake[0].y + dy};
snake.unshift(head);
snake.pop();

if (snake[0].x === food.x && snake[0].y === food.y) {
score++;
document.getElementById('score').innerHTML = `Score: ${score}`;
generateFood();
snake.push({});
}

if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height || checkCollision()) {
clearInterval(gameLoop);
alert(`Game Over! Your score is: ${score}`);
location.reload();
}

drawSnake();
drawFood();

// Check for self-collision
if (checkSelfCollision()) {
clearInterval(gameLoop);
alert(`Game Over! Your score is: ${score}`);
location.reload();
}
}

function generateFood() {
food = {
x: Math.floor(Math.random() * tileCount) * gridSize,
y: Math.floor(Math.random() * tileCount) * gridSize
};
}

function checkCollision() {
for (let i = 1; i < snake.length; i++) {
if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
    return true;
}
}
return false;
}

function checkSelfCollision() {
for (let i = 1; i < snake.length; i++) {
if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
    return true;
}
}
return false;
}

function handleKeyDown(event) {
const key = event.key;
const isArrowKey = key.startsWith('Arrow');
const isOppositeDirectionToCurrentDirection = (key ==='ArrowUp' && dy === gridSize) ||
(key === 'ArrowDown' && dy === -gridSize) ||
(key === 'ArrowLeft' && dx === gridSize) ||
(key === 'ArrowRight' && dx === -gridSize);
if (isArrowKey && !isOppositeDirectionToCurrentDirection) {
switch (key) {
    case 'ArrowUp':
        dx = 0;
        dy = -gridSize;
        break;
    case 'ArrowDown':
        dx = 0;
        dy = gridSize;
        break;
    case 'ArrowLeft':
        dx = -gridSize;
        dy = 0;
        break;
    case 'ArrowRight':
        dx = gridSize;
        dy = 0
        break;
        }
        }
        }
        
        document.addEventListener('keydown', handleKeyDown);
        
        generateFood();
        const gameLoop = setInterval(update, 100);