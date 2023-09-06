class Group {
  constructor() {
    this.values = [];
  }

  add(item) {
    if (this.values.indexOf(item) == -1) {
      this.values.push(item);
    }
  }

  delete(item) {
    if (!this.has(item)) {
      return;
    } else {
      let itemIndex = this.values.indexOf(item);
      this.values = this.values.splice(0, itemIndex)
              .concat(this.values.splice(itemIndex+1, this.values.length));
    }
  }

  has(item) {
    return this.values.indexOf(item) === -1 ? false : true;
  }

  static from(iterable) {
    let newGroup = new Group();
    for (let element of iterable) {
      if (!newGroup.has(element)) {
        newGroup.add(element);
      }
    }
    return newGroup;
  }
}

class GroupIterator {
  constructor(group) {
    this.currentIndex = 0;
    this.group = group;
  }

  next() {
    if (this.currentIndex === this.group.values.length) { 
      return { done: true }
    } else {
      return { value: this.group.values[this.currentIndex++], done: false };
    }
  }
}

Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this);
};

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c