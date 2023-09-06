function everyLoop(array, test) {
  let result = true;
  for (e of array) {
    result = result && test(e);
  }
  return result;
}

function every(array, test) {
  return !array.some(e => !test(e));
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true