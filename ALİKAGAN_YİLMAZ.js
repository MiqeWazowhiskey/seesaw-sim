const playground = document.querySelector(".seesaw-playground");
const starterText = document.querySelector(".starter-text");
const restartButton = document.querySelector(".reset-button");
const preWeight = document.querySelector(".weight-preview");

let gameStarted = false;
playground.classList.add("blink");

function generatePreview() {
  const randomWeight = Math.floor(Math.random() * 10) + 1;
  const randomSize = 32 + randomWeight * 4;
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const randomColor = `rgb(${r}, ${g}, ${b})`;

  preWeight.dataset.weight = randomWeight;
  preWeight.dataset.size = randomSize;
  preWeight.dataset.color = randomColor;
  preWeight.textContent = `${randomWeight} kg`;
  preWeight.style.width = `${randomSize}px`;
  preWeight.style.height = `${randomSize}px`;
  preWeight.style.background = randomColor;
  preWeight.style.justifyContent = "center";
  preWeight.style.alignItems = "center";
  preWeight.style.borderRadius = "6px";
  preWeight.style.color = "white";
  preWeight.style.fontWeight = "bold";
}

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
  generatePreview();
}

generatePreview();

function dropWeight() {
  const rect = playground.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;

  preWeight.style.left = `${mouseX - preWeight.offsetWidth / 2}px`;
  preWeight.style.display = "flex";

  preWeight.style.top = `0px`;

  const seesawBoard = document.querySelector(".seesaw-board");
  const boardRect = seesawBoard.getBoundingClientRect();
  const containerRect = playground.getBoundingClientRect();

  const targetY =
    boardRect.top - containerRect.top - preWeight.offsetHeight / 2;

  preWeight.animate(
    [
      { transform: `translateY(0px)` },
      { transform: `translateY(${targetY}px)` },
    ],
    {
      duration: 500,
      easing: "ease-in",
    }
  ).onfinish = () => {
    preWeight.style.top = `${targetY}px`;
  };
}

playground.addEventListener("click", (e) => {
  startGame();
  const rect = playground.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const weight = parseInt(preWeight.dataset.weight, 10);
  const weightSize = parseInt(preWeight.dataset.size, 10);
  const color = preWeight.dataset.color;
  const droppedWeight = document.createElement("div");
  droppedWeight.className = "weight-preview";
  droppedWeight.textContent = `${weight} kg`;
  droppedWeight.style.position = "absolute";
  droppedWeight.style.left = `${mouseX - weightSize / 2}px`;
  droppedWeight.style.top = `0px`;
  droppedWeight.style.width = `${weightSize}px`;
  droppedWeight.style.height = `${weightSize}px`;
  droppedWeight.style.background = color;
  droppedWeight.style.display = "flex";
  droppedWeight.style.justifyContent = "center";
  droppedWeight.style.alignItems = "center";
  droppedWeight.style.borderRadius = "6px";
  droppedWeight.style.color = "white";
  droppedWeight.style.fontWeight = "bold";
  playground.appendChild(droppedWeight);
  const seesawBoard = document.querySelector(".seesaw-board");
  const boardRect = seesawBoard.getBoundingClientRect();
  const containerRect = playground.getBoundingClientRect();
  const targetY =
    boardRect.top -
    containerRect.top -
    droppedWeight.offsetHeight / 2 +
    seesawBoard.offsetHeight / 2;
  droppedWeight.animate(
    [
      { transform: `translateY(0px)` },
      { transform: `translateY(${targetY}px)` },
    ],
    { duration: 500, easing: "ease-in" }
  ).onfinish = () => {
    droppedWeight.style.top = `${targetY}px`;
  };
  generatePreview();
});

restartButton.addEventListener("click", function () {
  resetGame();
});

playground.addEventListener("mousemove", (e) => {
  const rect = playground.getBoundingClientRect();
  const x = e.clientX - rect.left;
  preWeight.style.display = "flex";
  preWeight.style.left = `${x - preWeight.offsetWidth / 2}px`;
});

playground.addEventListener("mouseleave", () => {
  preWeight.style.display = "none";
});
