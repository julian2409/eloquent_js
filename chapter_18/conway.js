"use strict";

let currentFieldArray = [];
const stateArray = [];
const fieldDiv = document.querySelector("div");
let tick = 0;

const seedFields = function(aliveRatio = 4) {
  for (let i = 0; i < 100; i++) {
    currentFieldArray[i] = (Math.random() * aliveRatio) < 1;
  }
};

seedFields();
stateArray[tick] = currentFieldArray;

function createField(i) {
  const field = document.createElement("input");
  field.type = "radio";
  field.checked = currentFieldArray[i];
  field.id = `field-${i}`;

  return field;
}

for (let i = 0; i < 100; i++) {
  let newField = createField(i);
  if (i % 10 == 0) {
    fieldDiv.appendChild(document.createElement("br"));
  }
  fieldDiv.appendChild(newField);
}

function checkNeighbors(i) {
  let countLiving = 0;
  // left
  if (i % 10 > 0 && currentFieldArray[i-1]) {
    countLiving++;
  }
  // right
  if (i % 10 < 9 && currentFieldArray[i+1]) {
    countLiving++;
  }
  // top
  if (i > 9 && currentFieldArray[i-10]) {
    countLiving++;
  }
  // bottom
  if (i < 90 && currentFieldArray[i+10]) {
    countLiving++;
  }
  // top left
  if (i > 9 && currentFieldArray[i-11] && i % 10 > 0) {
    countLiving++;
  }
  // top right
  if (i > 9 && currentFieldArray[i-9] && i % 10 < 9) {
    countLiving++;
  }
  // bottom left
  if (i < 90 && currentFieldArray[i+11] && i % 10 > 0) {
    countLiving++;
  }
  // bottom right
  if (i < 90 && currentFieldArray[i+9] && i % 10 < 9) {
    countLiving++;
  }

  return countLiving;
}

function advanceGeneration() {
  let newState = [];

  for (let i = 0; i < 100; i++) {
    let livingNeighbors = checkNeighbors(i);

    if (currentFieldArray[i] && (livingNeighbors == 2 || livingNeighbors == 3)) {
      newState[i] = true;
    } else if (!currentFieldArray[i] && livingNeighbors == 3) {
      newState[i] = true;
    } else {
      newState[i] = false;
    }
  }
  
  tick++;
  stateArray[tick] = newState;

  for (let i = 0; i < 100; i++) {
    draw(i);
  }

  currentFieldArray = newState;
}

function draw(i) {
  let currentRadioButton = document.querySelector(`#field-${i}`);
  currentRadioButton.checked = stateArray[tick][i];
}

const nextButton = document.querySelector("#nextGen");
const prevButton = document.querySelector("#previousGen");
nextButton.addEventListener("click", advanceGeneration);
