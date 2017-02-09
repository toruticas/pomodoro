const START_TIME = 25 * 60 * 1000;
const TIMEOUT_DELAY = 50;

let time = START_TIME, print, interval;

const getTime = () => {
  return time;
}

const setPrint = (callback) => {
  print = callback
}

const start = () => {
  if (interval) return;

  interval = setInterval(function () {
    time -= TIMEOUT_DELAY;

    if (time <= 0) {
      time = 0;
      clearInterval(interval);
    }

    print && print(time)
  }, TIMEOUT_DELAY);
}

const stop = () => {
  clearInterval(interval);
  interval = null;
  time = START_TIME;
  print && print(time)
}

const pause = () => {
  clearInterval(interval);
  interval = null;
}

module.exports = {
  getTime,
  setPrint,
  start,
  stop,
  pause,
}
