// تنظیمات بازی
const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const playAgainButton = document.getElementById('play-again');
const backHomeButton = document.getElementById('back-home');

const box = 20; // اندازه هر بلوک
let score = 0;

// تنظیمات اولیه مار
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = 'RIGHT';

// تنظیمات غذای مار
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

// کنترل جهت حرکت
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode == 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (event.keyCode == 38 && direction !== 'DOWN') direction = 'UP';
    if (event.keyCode == 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (event.keyCode == 40 && direction !== 'UP') direction = 'DOWN';
}

// تابع برای رسم صفحه بازی
function drawGame() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // حرکت مار
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // مار می‌خورد به خود یا دیوار
    if (snakeX < 0 || snakeX >= 400 || snakeY < 0 || snakeY >= 400 || collision(snakeX, snakeY)) {
        clearInterval(game);
        alert('Game Over!');
        score = 0;
        scoreElement.textContent = score;
    }

    // افزودن بلوک جدید به مار
    const newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);

    // اگر مار غذا خورد
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreElement.textContent = score;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }
}

// بررسی برخورد مار با خودش
function collision(x, y) {
    for (let i = 0; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) return true;
    }
    return false;
}

// شروع بازی
let game = setInterval(drawGame, 100);

// دکمه ریست بازی
playAgainButton.addEventListener('click', () => {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = 'RIGHT';
    score = 0;
    scoreElement.textContent = score;
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    game = setInterval(drawGame, 100);
});

// بازگشت به صفحه اصلی
backHomeButton.addEventListener('click', () => {
    window.location.href = 'Welcome.html';
});
