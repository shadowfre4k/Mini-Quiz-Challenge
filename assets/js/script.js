var secondsLeft = 50;
var mainEl = document.querySelector("section");
var timeEl = document.querySelector(".time");

function setTiume() {
  var timeInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Timer: " + secondsLeft + " seconds left";

    if (secondsLeft === 0) {
      clearInterval(timeInterval);
    }
  }, 1000);
}

setTiume();
