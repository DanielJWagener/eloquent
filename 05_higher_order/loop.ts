let loop = (
  initialization: number,
  testFunction: (i: number) => boolean,
  updateFunction: (i: number) => number,
  body: (i: number) => any
): void => {
  for (let i = initialization; testFunction(i); i = updateFunction(i)) {
    body(i);
  }
};

loop(
  3,
  n => n > 0,
  n => n - 1,
  console.log
);
// → 3
// → 2
// → 1
