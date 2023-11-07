class GroupIterator {
  groupInstance: Group;
  i: number;

  constructor(group: Group) {
    this.groupInstance = group;
    this.i = 0;
  }

  next() {
    if (this.i === this.groupInstance.group.length) return { done: true };

    let value = this.groupInstance.group[this.i];

    this.i++;

    return { value, done: false };
  }
}

class Group {
  group: any[];

  constructor() {
    this.group = [];
  }

  add(newValue: any): void {
    if (!this.has(newValue)) {
      this.group = [...this.group, newValue];
    }
  }

  delete(valueToDelete: any): void {
    this.group = this.group.filter(x => x !== valueToDelete);
  }

  has(value: any): boolean {
    return this.group.includes(value);
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }

  static from(arr: any[]): Group {
    let group = new Group();
    for (let element of arr) {
      group.add(element);
    }
    return group;
  }
}

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
