const playground = document.querySelector(".seesaw-playground");
const starterText = document.querySelector(".starter-text");
const restartButton = document.querySelector(".reset-button");

let gameStarted = false;
playground.classList.add("blink");

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  playground.classList.remove("blink");
  if (starterText) starterText.style.display = "none";
}

function resetGame() {
  gameStarted = false;
  playground.classList.add("blink");
  if (starterText) starterText.style.display = "block";
}
playground.addEventListener("click", function handler() {
  startGame();
});

restartButton.addEventListener("click", function () {
  resetGame();
});
