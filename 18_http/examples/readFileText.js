function readFileText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.on("load", () => {
      resolve(reader.result);
    });
    reader.on("error", () => {
      reject(reader.error);
    });
    reader.readAsText(file);
  });
}
