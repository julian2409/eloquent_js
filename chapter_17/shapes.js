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
  cx.translate(x, y);
  let increment = (6 * Math.PI) / 100;
  for (let i = 0; i < 100; i = i + 1) {
    if (i % 30 == 0) {
      cx.beginPath();
      cx.arc(50, 0, 3 + increment * i, 0, Math.PI * 2);
      cx.closePath();
      cx.stroke();
    }
  }
  cx.restore();
}

cx.beginPath();
drawTrapezoid(5, 5);
drawDiamond(150, 20);
zigzag(250, 5);
cx.stroke();
spiral(50, 200);
