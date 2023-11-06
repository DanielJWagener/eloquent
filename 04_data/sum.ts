function range(start: number, end: number, step = 1): number[] {
  let result: number[] = [];

  if (start <= end) {
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
  } else {
    if (step > 0) {
      step *= -1;
    }
    for (let i = start; i >= end; i += step) {
      result.push(i);
    }
  }

  return result;
}

function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55
