"use strict";

const inputTextarea = document.querySelector("textarea");
const button = document.querySelector("button");
const outputPre = document.querySelector("pre");

let input = "";
let inputEvaluator = Function("", input);

function buttonHandler() {
  input = inputTextarea.value;
  try {
    let evalResult = eval(input);
    console.log(evalResult);
    outputPre.textContent = evalResult;
  } catch (err) {
    outputPre.textContent = err;
  }
}

button.addEventListener("click", buttonHandler);
