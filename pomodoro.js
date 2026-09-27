let isLongTimer = true;
let isPomodoroRunning = false;
let timer = null;
let totalTime = null;
let storedTime = 0;

const alarme = new Audio('./assets/Alarm.mp3');
alarme.volume =  0.33;

function timerSwitch() {
  if (!isPomodoroRunning) {
    isLongTimer = !isLongTimer;
    storedTime = 0;
    setTimer();
    console.log("Mudou", isLongTimer);
  }
}

function setTimer() {
    if (storedTime > 0) {
        document.getElementById("start-stop").textContent = "Resume";
    } 
    else {
        document.getElementById("start-stop").textContent = "Start";
        document.getElementById("timer").textContent = isLongTimer ? "25:00" : "5:00";
    }
}

function stopTimer() {
  setTimer();
  isPomodoroRunning = false;
  clearInterval(timer);
}

function pomodoroTimer() {
  if (!isPomodoroRunning) {
    setTimer();
    document.getElementById("start-stop").textContent = "Pause";
    isPomodoroRunning = true;
    totalTime = (storedTime > 0) ? storedTime
                  : (isLongTimer) ? 60 * 25 : 5;
    timer = setInterval(() => {
      totalTime--;
      const min = parseInt(totalTime / 60);
      const sec = parseInt(totalTime % 60);
      const secFormatado = String(sec).padStart(2, "0");
      document.getElementById("timer").textContent =
        `${min}:${secFormatado}`;
      console.log(`${min}:${sec}`);
      storedTime = totalTime;
      if (totalTime == 0) {
        stopTimer();
        timerSwitch();
        alarme.play();
      }
    }, 1000);
  } else {
    stopTimer();
  }
}

function skip(){
    if (storedTime > 0) {
        stopTimer();
        totalTime = 0;
        storedTime = 0;
        timerSwitch();
        console.log("Total Time: ", totalTime);
        console.log("Stored Time: ", storedTime);
    }
}


