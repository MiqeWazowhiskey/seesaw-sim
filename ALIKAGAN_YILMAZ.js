const playground = document.querySelector(".seesaw-playground");
const starterText = document.querySelector(".starter-text");
const restartButton = document.querySelector(".reset-button");
const preWeight = document.querySelector(".weight-preview");
const currentWeightDisplay = document.querySelector(".next-weight");
const leftWeightDisplay = document.querySelector(".left-weight");
const rightWeightDisplay = document.querySelector(".right-weight");
const angleDisplay = document.querySelector(".angle");
const logContainer = document.querySelector(".log-container");
const seesawBoard = document.querySelector(".seesaw-board");

let gameStarted = false;
let currentWeight = 0;
let rightTotal = 0;
let leftTotal = 0;
let angle = 0;
let leftTorque = 0;
let rightTorque = 0;

// just an instinct of an engineer to keep logs rather than updating only the ui container :)
let logs = [];
playground.classList.add("blink");

function generateNewWeight() {
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

  currentWeight = randomWeight;
  currentWeightDisplay.textContent = `${currentWeight} kg`;
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
  leftTotal = 0;
  rightTotal = 0;
  angle = 0;
  leftTorque = 0;
  rightTorque = 0;
  leftWeightDisplay.textContent = `0 kg`;
  rightWeightDisplay.textContent = `0 kg`;
  angleDisplay.textContent = `0.0°`;
  const seesawBoard = document.querySelector(".seesaw-board");
  seesawBoard.style.transform = `translateX(-50%) rotate(0deg)`;
  const weights = document.querySelectorAll(".weight-generated");
  weights.forEach((weight) => weight.remove());
  logContainer.innerHTML = "";
  logs = [];
  generateNewWeight();
}

function logWeight(e) {
  let logText = "";
  const boardRect = seesawBoard.getBoundingClientRect();
  const mouseX = e.clientX - boardRect.left;
  const intWeight = parseInt(preWeight.dataset.weight);

  if (mouseX < boardRect.width / 2) {
    logText = `${intWeight} kg dropped on the LEFT side at ${Math.abs(
      mouseX - boardRect.width / 2
    ).toFixed(1)} px from the center`;

    logs.push(logText);

    const logEntry = document.createElement("div");
    logEntry.className = "log-entry";
    logEntry.textContent = logText;
    logContainer.prepend(logEntry);
  } else {
    logText = `${intWeight} kg dropped on the RIGHT side at ${Math.abs(
      mouseX - boardRect.width / 2
    ).toFixed(1)} px from the center`;
    logs.push(logText);

    const logEntry = document.createElement("div");
    logEntry.className = "log-entry";
    logEntry.textContent = logText;
    logContainer.prepend(logEntry);
  }
}
function updateAngle() {
  const rawAngle =
    ((rightTorque - leftTorque) / Math.max(leftTorque + rightTorque, 1)) * 30;
  const angle = Math.max(-30, Math.min(30, rawAngle));
  seesawBoard.style.transform = `translateX(-50%) rotate(${angle}deg)`;
  angleDisplay.textContent = `${angle.toFixed(1)}°`;
}

function dropWeight(e) {
  const playgroundRect = playground.getBoundingClientRect();
  const boardRect = seesawBoard.getBoundingClientRect();
  const previewRect = preWeight.getBoundingClientRect();
  const mouseX = e.clientX - boardRect.left;
  const weight = parseInt(preWeight.dataset.weight, 10);
  const weightSize = parseInt(preWeight.dataset.size, 10);
  const color = preWeight.dataset.color;
  const droppedWeight = document.createElement("div");
  droppedWeight.className = "weight-generated";
  droppedWeight.textContent = `${weight} kg`;
  droppedWeight.style.position = "absolute";
  droppedWeight.style.top = "0px";
  droppedWeight.style.width = `${weightSize}px`;
  droppedWeight.style.height = `${weightSize}px`;
  droppedWeight.style.background = color;
  droppedWeight.style.display = "flex";
  droppedWeight.style.justifyContent = "center";
  droppedWeight.style.alignItems = "center";
  droppedWeight.style.borderRadius = "6px";
  droppedWeight.style.color = "white";
  droppedWeight.style.fontWeight = "bold";
  droppedWeight.style.pointerEvents = "none";
  playground.appendChild(droppedWeight);
  droppedWeight.style.left = `${mouseX - weightSize / 2}px`;
  const startY = previewRect.top - playgroundRect.top;
  droppedWeight.style.top = `${startY}px`;
  droppedWeight.style.transform = "translateY(0px)";

  if (mouseX < boardRect.width / 2) {
    leftTotal += weight;
    leftWeightDisplay.textContent = `${leftTotal} kg`;
    leftTorque += weight * (boardRect.width / 2 - mouseX);
  } else {
    rightTotal += weight;
    rightWeightDisplay.textContent = `${rightTotal} kg`;
    rightTorque += weight * (mouseX - boardRect.width / 2);
  }
  logWeight(e);
  generateNewWeight();
  const targetY = boardRect.top - playgroundRect.top;
  console.log("startY:", startY, "targetY:", targetY);
  droppedWeight.animate(
    [
      { transform: `translateY(0px)` },
      { transform: `translateY(${targetY - startY}px)` },
    ],
    { duration: 500, easing: "ease-in" }
  ).onfinish = () => {
    seesawBoard.appendChild(droppedWeight);
    droppedWeight.style.bottom = "0px";
    droppedWeight.style.top = "";
    droppedWeight.style.transform = "translateY(0px)";
    updateAngle();
  };
}

generateNewWeight();

playground.addEventListener("click", (e) => {
  startGame();
  dropWeight(e);
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
