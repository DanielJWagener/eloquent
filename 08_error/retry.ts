class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a: number, b: number) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a: number, b: number) {
  for (;;) {
    try {
      const result = primitiveMultiply(a, b);
      return result;
    } catch (e) {
      if (e instanceof MultiplicatorUnitFailure) {
        console.log(e.message);
      } else {
        throw e;
      }
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64
