const reverseArray = function(arr) {
  let reversedArray = [];
  for (let item of arr) {
    reversedArray.unshift(item);
  }
  return reversedArray;
}

const reverseArrayInPlace = function(arr) {
  for (let i = 0; i <= Math.floor(arr.length / 2); i++) {
    let tmp = arr[i];
    arr[i] = arr[arr.length - i - 1];
    arr[arr.length - 1 - i] = tmp;
  }
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
