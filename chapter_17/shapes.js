"use strict";

let cx = document.querySelector(".myCanvas").getContext("2d");

function drawTrapezoid(x, y) {
  cx.save();
  cx.translate(x, y);
  cx.beginPath();
  cx.moveTo(0, 50);
  cx.lineTo(100, 50);
  cx.lineTo(80, 0);
  cx.lineTo(20, 0);
  cx.closePath();
  cx.restore();
}

drawTrapezoid(5, 5);

cx.stroke();