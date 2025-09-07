let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

// Format time
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Start/Pause
function startStop() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 100);
    startStopBtn.textContent = "Pause";
    startStopBtn.style.background = "linear-gradient(135deg, #f39c12, #e67e22)";
    isRunning = true;
  } else {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    startStopBtn.textContent = "Start";
    startStopBtn.style.background = "linear-gradient(135deg, #27ae60, #2ecc71)";
    isRunning = false;
  }
}

// Update display
function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

// Reset
function reset() {
  clearInterval(timer);
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  startStopBtn.style.background = "linear-gradient(135deg, #27ae60, #2ecc71)";
  laps.innerHTML = "";
  lapCounter = 1;
}

// Add Lap
function addLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCounter++}: ${lapTime}`;
    laps.appendChild(li);
  }
}

// Event Listeners
startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", addLap);
