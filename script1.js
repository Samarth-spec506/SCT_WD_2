let startTime, updatedTime, difference = 0;
let tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function start() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(updateTime, 100);
    running = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
  }
}

function pause() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}

function reset() {
  clearInterval(tInterval);
  display.innerHTML = "00:00:00";
  difference = 0;
  running = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  laps.innerHTML = "";
  lapCounter = 1;
}

function updateTime() {
  updatedTime = new Date().getTime() - startTime;
  difference = updatedTime;

  let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((difference / (1000 * 60)) % 60);
  let seconds = Math.floor((difference / 1000) % 60);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
  if (running) {
    const li = document.createElement("li");
    li.innerText = `Lap ${lapCounter}: ${display.innerHTML}`;
    laps.appendChild(li);
    lapCounter++;
  }
}

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);
