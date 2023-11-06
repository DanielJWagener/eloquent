function logHashes(maxStringLength: number): void {
  let hashString = "";
  while (hashString.length < maxStringLength) {
    hashString += "#";
    console.log(hashString);
  }
}

logHashes(7);
