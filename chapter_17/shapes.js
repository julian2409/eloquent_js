"use strict";

/** @type {CanvasRenderingContext2D} */
let cx = document.querySelector(".myCanvas").getContext("2d");

function drawTrapezoid(x, y) {
  cx.save();
  cx.translate(x, y);
  cx.moveTo(0, 50);
  cx.lineTo(100, 50);
  cx.lineTo(80, 0);
  cx.lineTo(20, 0);
  cx.closePath();
  cx.restore();
}

function drawDiamond(x, y) {
  cx.save();
  cx.translate(x, y);
  cx.translate(25, 25);
  cx.rotate(Math.PI / 4);
  cx.fillStyle = "red";
  cx.fillRect(-25, -25, 50, 50);
  cx.restore();
}

function zigzag(x, y) {
  cx.save();
  cx.translate(x, y);
  const width = 75;
  let nextX = width;
  cx.moveTo(0, 0);
  for (let y = 2.5; y < 80; y = y + 5, nextX = nextX + 75) {
    cx.lineTo(nextX % (width * 2), y);
  }
  cx.restore();
}

function spiral(x, y) {
  let step = (Math.PI * 6) / 100;

  cx.save();
  cx.translate(x, y);
  cx.beginPath();
  cx.moveTo(0, 0);
  for (let i = 0; i < 100; i++) {
    cx.lineTo(Math.cos(step * i) * i / 2, Math.sin(step * i) * i / 2);
  }
  cx.stroke();
  cx.restore();
}

function sun(x, y) {
  const radius = 50;

  cx.save();
  cx.translate(x, y);
  cx.beginPath();
  cx.moveTo(0, 0);
  cx.fillStyle = "orange";
  cx.ellipse(0, 0, radius, radius, 1, 0, Math.PI * 2);
  cx.fill();

  let lowAngle = -(Math.PI / 2);
  let highAngle = lowAngle + Math.PI / 4;
  for (let i = 0; i < 8; i++) {
    cx.strokeStyle = "white";
    cx.beginPath();
    cx.moveTo(Math.cos(lowAngle) * radius * 1.1, Math.sin(lowAngle) * radius  * 1.1);
    cx.quadraticCurveTo(0, 0, Math.cos(highAngle) * radius  * 1.1, Math.sin(highAngle) * radius  * 1.1);
    cx.closePath();
    cx.fillStyle = "white";
    cx.fill();
    cx.stroke();
    lowAngle += Math.PI / 4;
    highAngle += Math.PI / 4;
  }

  cx.restore();
}

cx.beginPath();
drawTrapezoid(5, 5);
drawDiamond(150, 20);
zigzag(250, 5);
cx.stroke();
spiral(100, 200);
sun(300, 200);

