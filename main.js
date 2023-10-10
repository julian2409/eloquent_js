"use strict";

const myObject = Object.create(null);

myObject.testValue = 5;

console.log(myObject.testValue);

myObject["testValue"] = 6;

console.log(Object.prototype.hasOwnProperty.call(myObject, "testValue"));

console.log(myObject.testValue);

const someStrings = ["hello", "beautiful", "world"];

const mappedStrings = someStrings.map((element, index) => {
  console.log(`Processing element "${element}" at index ${index}`);
  return [...element];
});

console.log(mappedStrings);
