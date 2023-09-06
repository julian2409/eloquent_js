function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

const promiseArray = [soon(1), soon(2)];
const resultArray = [false, false];

let finished = false;

while(!finished) {
  for (let i = 0; i < resultArray.length; i++) {
    if(resultArray[i] === false) {
      break;
    } else {
      promiseArray[i].then(result => resultArray[i] = result);
    }
  }
  finished = true;
}

