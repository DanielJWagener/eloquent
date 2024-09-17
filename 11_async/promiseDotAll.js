function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    const resolvedPromises = [];
    if (promises.length === 0) resolve(promises);

    let resolvedPromisesCounter = 0;

    function resolvePromise(i) {
      const promise = promises[i];
      promise
        .then(x => {
          resolvedPromises[i] = x;
          resolvedPromisesCounter++;
          if (resolvedPromisesCounter === promises.length) {
            resolve(resolvedPromises);
          }
        })
        .catch(e => reject(e));
    }
    for (let i = 0; i < promises.length; i++) {
      resolvePromise(i);
    }
  });
}

// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(() => {
    console.log("We should not get here");
  })
  .catch(error => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });
