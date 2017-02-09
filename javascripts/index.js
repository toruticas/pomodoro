const countdown = require("./javascripts/countdown")

const printTime = (time) => {
  const seconds = parseInt((time / 1000) % 60)
  $("#minutes").text(parseInt(time / 60 / 1000))
  $("#seconds").text(seconds < 10 ? `0${seconds}` : seconds)
}

let countdownIsRunning = false;

printTime(countdown.getTime());
countdown.setPrint(printTime);

$("#toggle-btn").on("click", () => {
  $("#stop-btn").show();

  if (countdownIsRunning) {
    countdown.pause();
    $("#toggle-btn").text("Play");
  } else {
    countdown.start();
    $("#toggle-btn").text("Pause");
  }

  countdownIsRunning = !countdownIsRunning
})

$("#stop-btn").on("click", () => {
  $("#stop-btn").hide();
  countdown.stop();
  $("#toggle-btn").text("Play");
  countdownIsRunning = false;
})
