let map = { one: true, two: true, hasOwnProperty: true };

// Fix this call
console.log(Object.prototype.hasOwnProperty.hasOwnProperty.call(map, "one"));
// → true
