"use strict";

const currentFieldArray = [];
const stateArray = [];
const fieldDiv = document.querySelector("div");
let tick = 0;

const seedFields = function(aliveRatio = 4) {
  for (let i = 0; i < 100; i++) {
    currentFieldArray[i] = (Math.random() * aliveRatio) < 1;
  }
};

seedFields();

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

}

function advanceGeneration() {

}

function stepBack() {

}

console.log(currentFieldArray);
