"use strict";

const results = [
  { name: "Satisfied", count: 1043, color: "lightblue" },
  { name: "Neutral", count: 563, color: "lightgreen" },
  { name: "Unsatisfied", count: 510, color: "pink" },
  { name: "No comment", count: 175, color: "silver" },
];

/** @type {CanvasRenderingContext2D} */
let cx = document.querySelector("canvas").getContext("2d");
let total = results.reduce((sum, { count }) => sum + count, 0);
// Start at the top
let currentAngle = -0.5 * Math.PI;
const circleOriginX = 250,
  circleOriginY = 200,
  circleRadius = 100;

for (let result of results) {
  let sliceAngle = (result.count / total) * 2 * Math.PI;
  cx.beginPath();
  // center=100,100, radius=100
  // from current angle, clockwise by slice's angle
  cx.arc(
    circleOriginX,
    circleOriginY,
    circleRadius,
    currentAngle,
    currentAngle + sliceAngle
  );
  currentAngle += sliceAngle;
  cx.lineTo(circleOriginX, circleOriginY);
  cx.fillStyle = result.color;
  cx.fill();

  cx.font = "16px Georgia";
  cx.fillStyle = "black";
  if (currentAngle - sliceAngle < Math.PI / 4) {
    cx.fillText(
      result.name,
      Math.cos(currentAngle - sliceAngle / 2) * circleRadius * 1.1 +
        circleOriginX,
      Math.sin(currentAngle - sliceAngle / 2) * circleRadius * 1.1 +
        circleOriginY
    );
  } else {
    cx.fillText(
      result.name,
      Math.cos(currentAngle - sliceAngle / 2) * circleRadius * 1.1 +
        circleOriginX - 100,
      Math.sin(currentAngle - sliceAngle / 2) * circleRadius * 1.1 +
        circleOriginY
    );
  }
}
