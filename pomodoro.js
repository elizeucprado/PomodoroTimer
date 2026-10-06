let isLongTimer = true;
let isPomodoroRunning = false;
let timer = null;
let storedTime = 0;
let endTime = null; 

const alarme = new Audio('./assets/Alarm.mp3');
alarme.volume = 0.33;

function updateDisplay(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const formatted = `${min}:${String(sec).padStart(2, "0")}`;
  
  document.getElementById("timer").textContent = formatted;
  document.getElementById("title").textContent = formatted;
}

function timerSwitch() {
  if (!isPomodoroRunning) {
    isLongTimer = !isLongTimer;
    storedTime = 0;
    setTimer();
  }
}

function setTimer() {
  if (storedTime > 0) {
    document.getElementById("start-stop").textContent = "Resume";
    document.getElementById("title").textContent = "Pomodoro Timer";
    updateDisplay(storedTime);
  } else {
    document.getElementById("start-stop").textContent = "Start";
    const initialSeconds = isLongTimer ? 25 * 60 : 5 * 60;
    updateDisplay(initialSeconds);
    document.getElementById("title").textContent = "Pomodoro Timer";
  }
}

function stopTimer() {
  if (isPomodoroRunning) {
    clearInterval(timer);
    isPomodoroRunning = false;
    storedTime = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
  }
  setTimer();
}

function pomodoroTimer() {
  if (!isPomodoroRunning) {
    isPomodoroRunning = true;
    document.getElementById("start-stop").textContent = "Pause";

    const durationSeconds = storedTime > 0 
      ? storedTime 
      : (isLongTimer ? 25 * 60 : 5 * 60);

    endTime = Date.now() + durationSeconds * 1000;

    timer = setInterval(() => {
      const remainingMs = endTime - Date.now();
      const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));

      storedTime = remainingSec;
      updateDisplay(remainingSec);

      if (remainingSec <= 0) {
        clearInterval(timer);
        isPomodoroRunning = false;
        storedTime = 0;
        
        alarme.play();
        document.getElementById("title").textContent = "Pomodoro Timer";
        timerSwitch();
      }
    }, 250);
  } else {
    stopTimer();
  }
}

function skip() {
  if (storedTime > 0 || isPomodoroRunning) {
    stopTimer();
    storedTime = 0;
    timerSwitch();
  }
}