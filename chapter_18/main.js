"use strict";

const textarea = document.querySelector("#textarea1");
textarea.addEventListener("keydown", (event) => {
  if (event.code == "F2") {
    replaceSelection(textarea, "Something");
    event.preventDefault();
  }
});

function replaceSelection(field, word) {
  let from = field.selectionStart,
    to = field.selectionEnd;
  field.value = field.value.slice(0, from) + word + field.value.slice(to);
  // Put the cursor after the word
  field.selectionStart = from + word.length;
  field.selectionEnd = from + word.length;
}

let text = document.querySelector("input");
let output = document.querySelector("#length");
text.addEventListener("input", () => {
  output.textContent = text.value.length;
});

let buttons = document.querySelectorAll("[name=color]");
for (let button of Array.from(buttons)) {
  button.addEventListener("change", () => {
    document.body.style.background = button.value;
  });
}
