const SCRIPTS = require("./scripts");

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex((c) => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

function dominantDirection(text) {
  let scripts = [];
  for (c of text) {
    scripts.push(characterScript(c.codePointAt(0)));
  }
  let directions = countBy(scripts.filter(s => s !== null), s => s.direction)
                    .reduce((a, b) => a.count > b.count ? a.name : b.name, "");
  return directions;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
