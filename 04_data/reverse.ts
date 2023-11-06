function reverseArray(arr: any[]): any[] {
  let result: any[] = [];
  for (let element of arr) {
    result.unshift(element);
  }
  return result;
}

function reverseArrayInPlace(arr: any[]): void {
  for (let i = 0; i < arr.length / 2; i++) {
    let correspondingEndIndex: number = arr.length - 1 - i;
    let beginningElement = arr[i];
    let endingElement = arr[correspondingEndIndex];

    arr[i] = endingElement;
    arr[correspondingEndIndex] = beginningElement;
  }
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
