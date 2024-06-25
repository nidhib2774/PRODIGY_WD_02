let startTime, updatedTime, difference, tInterval, savedTime;
      let running = false;
      let lapCounter = 1;
      let previousLapTime = 0;

      function startStopwatch() {
        if (!running) {
          startTime = new Date().getTime() - (savedTime || 0);
          tInterval = setInterval(getShowTime, 10);
          running = true;
        }
      }

      function pauseStopwatch() {
        if (running) {
          clearInterval(tInterval);
          savedTime = difference;
          running = false;
        }
      }

      function resetStopwatch() {
        clearInterval(tInterval);
        running = false;
        savedTime = 0;
        previousLapTime = 0;
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        document.getElementById("milliseconds").innerHTML = "00";
        document.getElementById("lapList").innerHTML = "";
        lapCounter = 1;
      }

      function recordLap() {
        if (running) {
          const currentLapTime = difference;
          const lapTime = `${document.getElementById("minutes").innerHTML}:${
            document.getElementById("seconds").innerHTML
          }:${document.getElementById("milliseconds").innerHTML}`;
          const lapList = document.getElementById("lapList");
          const lapItem = document.createElement("li");
          const lapDifference = formatTime(currentLapTime - previousLapTime);
          lapItem.textContent = `Lap ${lapCounter++}: ${lapTime} (Interval: ${lapDifference})`;
          lapList.appendChild(lapItem);
          previousLapTime = currentLapTime;
        }
      }

      function getShowTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;

        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((difference % 1000) / 10);

        document.getElementById("minutes").innerHTML = padZero(minutes);
        document.getElementById("seconds").innerHTML = padZero(seconds);
        document.getElementById("milliseconds").innerHTML =
          padZero(milliseconds);
      }

      function padZero(number) {
        return (number < 10 ? "0" : "") + number;
      }

      function formatTime(ms) {
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${padZero(minutes)}:${padZero(seconds)}:${padZero(
          milliseconds
        )}`;
      }