"use strict";

const myObject = Object.create(null);

myObject.testValue = 5;

console.log(myObject.testValue);

myObject["testValue"] = 6;

console.log(Object.prototype.hasOwnProperty.call(myObject, "testValue"));

console.log(myObject.testValue);
