"use strict";

let scheduled = null;

document.addEventListener("DOMContentLoaded", function () {
  let balloonDiv = document.querySelector(".balloon");
  balloonDiv.style.fontSize = "20px";

  function reposition(event) {
    if (!scheduled) {
      setTimeout(() => {
        const viewportHeight = window.innerHeight / 2;
        balloonDiv.style.marginTop =
          viewportHeight - balloonDiv.clientHeight / 2 + "px";
      }, 100);
      scheduled = event;
    }
  }
  reposition();

  visualViewport.addEventListener("resize", reposition);

  function decreaseSize(event) {
    if (event.key == "ArrowDown") {
      const currentSize = parseFloat(balloonDiv.style.fontSize);
      const newSize = currentSize - currentSize / 10;
      balloonDiv.style.fontSize = newSize + "px";
      reposition();
    }
  }

  function increaseSize(event) {
    if (event.key == "ArrowUp") {
      const currentSize = parseFloat(balloonDiv.style.fontSize);
      if (currentSize > 200) {
        balloonDiv.textContent = "💥";
        this.window.removeEventListener("keyup", increaseSize);
        this.window.removeEventListener("keyup", decreaseSize);
      }
      const newSize = currentSize + currentSize / 10;
      balloonDiv.style.fontSize = newSize + "px";
      reposition();
    }
  }

  window.addEventListener("keyup", increaseSize);
  window.addEventListener("keyup", decreaseSize);
});
