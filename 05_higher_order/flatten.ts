function flatten(arr: any[]): any[] {
  return arr.reduce(function (acc, val) {
    for (let element of val) {
      acc.push(element);
    }
    return acc;
  }, []);
}

let flattenSpread = (arr: any[]): any[] => arr.reduce((acc, val) => [...acc, ...val], []);

let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flatten(arrays));
// → [1, 2, 3, 4, 5, 6]
console.log(flattenSpread(arrays));
// → [1, 2, 3, 4, 5, 6]
