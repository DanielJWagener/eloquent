/* eslint-disable @typescript-eslint/no-explicit-any */
class PGroup {
  group: any[];

  constructor(group: any[]) {
    this.group = group;
  }

  add(newValue: any): PGroup {
    return new PGroup([...this.group, newValue]);
  }

  delete(valueToDelete: any): PGroup {
    return new PGroup(this.group.filter(x => x !== valueToDelete));
  }

  has(value: any): boolean {
    return this.group.includes(value);
  }

  static empty = new PGroup([]);
}

const a = PGroup.empty.add("a");
const ab = a.add("b");
const b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
