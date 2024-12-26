// انتخاب المان‌ها
const choices = document.querySelectorAll(".choice");
const userChoiceElement = document.querySelector("#user-choice span");
const cpuChoiceElement = document.querySelector("#cpu-choice span");
const winnerElement = document.getElementById("winner");
const playerPointsElement = document.getElementById("player-points");
const cpuPointsElement = document.getElementById("cpu-points");
const playAgainButton = document.getElementById("play-again");
const backHomeButton = document.getElementById("back-home");

// گزینه‌های CPU
const options = ["rock", "paper", "scissors"];

// امتیازات
let playerPoints = 0;
let cpuPoints = 0;

// رویداد کلیک برای هر گزینه
choices.forEach(button => {
    button.addEventListener("click", () => {
        const userChoice = button.dataset.choice;
        const cpuChoice = options[Math.floor(Math.random() * options.length)];

        userChoiceElement.textContent = userChoice;
        cpuChoiceElement.textContent = cpuChoice;

        determineWinner(userChoice, cpuChoice);
    });
});

// تعیین برنده
function determineWinner(user, cpu) {
    if (user === cpu) {
        winnerElement.textContent = "It's a draw! 🤝";
        return;
    }

    if (
        (user === "rock" && cpu === "scissors") ||
        (user === "paper" && cpu === "rock") ||
        (user === "scissors" && cpu === "paper")
    ) {
        winnerElement.textContent = "You win! 🎉";
        playerPoints++;
        playerPointsElement.textContent = playerPoints;
    } else {
        winnerElement.textContent = "CPU wins! 😢";
        cpuPoints++;
        cpuPointsElement.textContent = cpuPoints;
    }
}

// ریست بازی
playAgainButton.addEventListener("click", () => {
    userChoiceElement.textContent = "";
    cpuChoiceElement.textContent = "";
    winnerElement.textContent = "";
});

// بازگشت به صفحه اصلی
backHomeButton.addEventListener("click", () => {
    window.location.href = "Welcome.html";
});
