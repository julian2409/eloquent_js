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

let select = document.querySelector("select");
let output2 = document.querySelector("#output2");

select.addEventListener("change", () => {
  let number = 0;
  for (let option of Array.from(select.options)) {
    if (option.selected) {
      number += Number(option.value);
    }
  }
  output2.textContent = number;
});

let input = document.querySelector("#file-input");
input.addEventListener("change", () => {
  if (input.files.length > 0) {
    let file = input.files[0];
    console.log("You chose", file.name);
    if (file.type) console.log("It has type", file.type);
  }
});

let input2 = document.querySelector("#file-input2");
input2.addEventListener("change", () => {
  for (let file of Array.from(input2.files)) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log("File", file.name, "starts with", reader.result.slice(0, 20));
    });
    reader.readAsText(file);
  }
});

let list = document.querySelector("#note-select");
let note = document.querySelector("#note-textarea");

let state;

function setState(newState) {
  list.textContent = "";
  for (let name of Object.keys(newState.notes)) {
    let option = document.createElement("option");
    option.textContent = name;
    if (newState.selected == name) option.selected = true;
    list.appendChild(option);
  }
  note.value = newState.notes[newState.selected];
  localStorage.setItem("Notes", JSON.stringify(newState));
  state = newState;
}

setState(
  JSON.parse(localStorage.getItem("Notes")) || {
    notes: { "shopping list": "Carrots\nRaisins" },
    selected: "shopping list",
  }
);
list.addEventListener("change", () => {
  setState({ notes: state.notes, selected: list.value });
});
note.addEventListener("change", () => {
  setState({
    notes: Object.assign({}, state.notes, { [state.selected]: note.value }),
    selected: state.selected,
  });
});
document.querySelector("button").addEventListener("click", () => {
  let name = prompt("Note name");
  if (name)
    setState({
      notes: Object.assign({}, state.notes, { [name]: "" }),
      selected: name,
    });
});
