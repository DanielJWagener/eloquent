function isEven(number: number): boolean {
  if (number === 0) return true;
  return Math.abs(number) > 1 ? isEven(Math.abs(number) - 2) : false;
}
console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → false
console.log(isEven(-2));
// → true

function isEvenWithHelperFunction(number: number): boolean {
  function decrementAndTest(number: number): boolean {
    if (number === 0) return true;
    if (number === 1) return false;
    return decrementAndTest(number - 2);
  }
  return decrementAndTest(Math.abs(number));
}

console.log(isEvenWithHelperFunction(50));
// → true
console.log(isEvenWithHelperFunction(75));
// → false
console.log(isEvenWithHelperFunction(-1));
// → false
console.log(isEvenWithHelperFunction(-2));
// → true
