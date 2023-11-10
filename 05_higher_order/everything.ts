function every(array: number[], test: (n: number) => boolean): boolean {
  for (const element of array) {
    if (!test(element)) {
      return false;
    }
  }
  return true;
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true

function everyWithSome(array: number[], test: (n: number) => boolean): boolean {
  return !array.some(element => !test(element));
}

console.log(everyWithSome([1, 3, 5], n => n < 10));
// → true
console.log(everyWithSome([2, 4, 16], n => n < 10));
// → false
console.log(everyWithSome([], n => n < 10));
// → true
