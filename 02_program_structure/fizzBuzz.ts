function fizzBuzz(number: number): void {
  for (let i = 0; i <= number; i++) {
    if (!(i % 5) && !(i % 3)) {
      console.log("FizzBuzz");
    } else if (!(i % 5)) {
      console.log("Buzz");
    } else if (!(i % 3)) {
      console.log("Fizz");
    } else {
      console.log(i);
    }
  }
}

fizzBuzz(100);
