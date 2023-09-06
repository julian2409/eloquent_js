class PGroup {
  static empty = new PGroup();

  constructor() {
    this.values = [];
  }

  add(item) {
    if (this.has(item)) {
      return this;
    } else {
      const newGroup = new PGroup();
      newGroup.values = this.values.slice(0, this.values.length);
      newGroup.values.push(item);
      return newGroup;
    }
  }

  delete(item) {
    if (!this.has(item)) {
      return;
    } else {
      let itemIndex = this.values.indexOf(item);
      const newGroup = new PGroup();
      newGroup.values = this.values.slice(0, this.values[itemIndex]).concat(this.values.slice(itemIndex+1, this.values.length));
      return newGroup;
    }
  }

  has(item) {
    return this.values.indexOf(item) === -1 ? false : true;
  }
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false