function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

const promiseArray = [soon(1), soon(2)];
const resultArray = [false, false];

let done = false;

for (let i = 0; i < promiseArray.length; i++) {
  promiseArray[i].then(value => {
    resultArray[i] = value;
  });
}

console.log(resultArray);

setTimeout(() => console.log(resultArray) ,1000);

for (let i = 0;; i++) {
  console.log("run-to-completion " + i);
  if (i == 2000000) {
    break;
  }
}
