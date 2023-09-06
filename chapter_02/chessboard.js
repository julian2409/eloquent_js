for (let row = 0; row < 8; row++) {
  let line = "";
  for(line = ""; line.length < 8; ) {
    if ((line.length + row) % 2 === 0) {
      line += " ";
    } else {
      line += "#";
    }
  }
  console.log(line);
}

console.log("------------------");

for (let column = 0, row = ""; column < 8; column++) {
  for (row = ""; row.length < 8; ) {
    if ((row.length + column) % 2 == 0) { row += " "; }
    else { row += "#";}
  }
  console.log(row);
}
