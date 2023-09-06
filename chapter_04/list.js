const arrayToList = function(arr) {
  let list = null, rest = null;
  for (let i = arr.length-1; i >= 0; i--) {
    list = { value: arr[i], rest: rest };
    rest = list;
  }
  return list;
};

const listToArray = function(list) {
  let arr = [];
  while (list != null) {
    arr.push(list.value);
    list = list.rest;
  }
  return arr;
};

const prepend = function(value, list) {
  let element = { value: value, rest: list }
  return element;
};

const nth = function(element, searchedIndex, currentIndex = 0) {
  currentValue = element.value;
  if (currentIndex == searchedIndex) {
    return currentValue;
  } else {
    return nth(element.rest, searchedIndex, ++currentIndex);
  }
};

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
