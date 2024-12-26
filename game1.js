const cells = document.querySelectorAll("[data-cell]");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart");
let currentPlayer = "X";
let gameActive = true;

// ترکیب‌های برنده
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// شروع بازی
cells.forEach(cell => {
    cell.addEventListener("click", handleClick, { once: true });
});

restartButton.addEventListener("click", restartGame);

function handleClick(e) {
    const cell = e.target;

    if (!gameActive) return;

    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        messageElement.textContent = `Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
        return;
    }
    if (isDraw()) {
        messageElement.textContent = "It's a draw! 🤝";
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== "");
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.addEventListener("click", handleClick, { once: true });
    });
    currentPlayer = "X";
    messageElement.textContent = "";
    gameActive = true;
}

const backHomeButton = document.getElementById("back-home");

backHomeButton.addEventListener("click", () => {
    window.location.href = "Welcome.html"; // هدایت به صفحه اصلی
});
