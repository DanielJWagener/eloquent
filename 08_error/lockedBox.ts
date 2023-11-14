const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [] as string[],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withBoxUnlocked(body: () => any) {
  box.unlock();
  try {
    body();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e.message);
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function () {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function () {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked);
// → true
box.unlock();
console.log(box.content);
