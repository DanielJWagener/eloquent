function deepEqual(value1: any, value2: any): boolean {
  if (value1 === null) {
    return value2 === null;
  }
  if (value2 === null) {
    return value1 === null;
  }
  if (typeof value1 === "object" && typeof value2 === "object") {
    let value1Keys = Object.keys(value1);
    let value2Keys = Object.keys(value2);
    if (
      value1Keys.length !== value2Keys.length ||
      !value1Keys.every(key => value2Keys.includes(key))
    ) {
      return false;
    }
    return value1Keys.every(key => deepEqual(value1[key], value2[key]));
  }
  return value1 === value2;
}

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true
