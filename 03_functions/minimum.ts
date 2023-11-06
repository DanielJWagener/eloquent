function min(number1: number, number2: number): number {
  return number1 <= number2 ? number1 : number2;
}

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10
