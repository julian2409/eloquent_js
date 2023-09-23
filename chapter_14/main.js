"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.body.getElementsByTagName("p");
  const element = elements[0];
  console.log(element.innerHTML);
  console.log(element.innerText);
  console.log(element.textContent);
});
