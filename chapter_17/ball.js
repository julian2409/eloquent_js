"use strict";

/** @type {CanvasRenderingContext2D} */
let cx = document.querySelector("canvas").getContext("2d");

  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      updateAnimation(Math.min(100, time - lastTime) / 1000);
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  const canvasX = 500, canvasY = 500;
  let currentX = 200, currentY = 300;
  let radius = 25;
  let directionX = 1, directionY = 1;

  function updateAnimation(step) {
    cx.clearRect(currentX - radius - 5, currentY - radius - 5, radius * 2.3, radius * 2.3);
    currentX = currentX + (step * 120 * directionX);
    currentY = currentY + (step * 100 * directionY);

    if (currentX > canvasX - radius || currentX - radius < 0) {
      directionX = directionX * -1;
    }

    if (currentY > canvasY - radius || currentY - radius < 0) {
      directionY = directionY * -1;
    }

    cx.beginPath();
    cx.arc(currentX, currentY, radius, 0, 2 * Math.PI);
    cx.fillStyle = "red";
    cx.fill();
  }
