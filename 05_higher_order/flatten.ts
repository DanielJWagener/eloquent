/* eslint-disable @typescript-eslint/no-explicit-any */
function flatten(arr: any[]): any[] {
  return arr.reduce(function (acc, val) {
    for (const element of val) {
      acc.push(element);
    }
    return acc;
  }, []);
}

const flattenSpread = (arr: any[]): any[] => arr.reduce((acc, val) => [...acc, ...val], []);

const arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flatten(arrays));
// → [1, 2, 3, 4, 5, 6]
console.log(flattenSpread(arrays));
// → [1, 2, 3, 4, 5, 6]
