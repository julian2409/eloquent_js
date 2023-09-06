const deepEqual = function(obj1, obj2) {
  if ((obj1 === null && obj2 !== null) || (obj1 !== null && obj2 === null)) { return false; }
  if (typeof obj1 !== typeof obj2) { return false; }

  if (typeof obj1 !== "object") { return obj1 === obj2; }

  let keys1 = Object.keys(obj1), keys2 = Object.keys(obj2);
  if (keys1.length != keys2.length) { return false; }

  for (let i = 0; i < keys1.length; i++) {
    if (keys1[i] !== keys2[i]) { return false; }
    return deepEqual(obj1[keys1[i]], obj2[keys2[i]]);
  }
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
